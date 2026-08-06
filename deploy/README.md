# Deployment config

Mirrors the stack that runs on the live host from `/data/streama`. The compose
file here is the same topology with credentials and host paths pulled out into
`.env`.

> **Note:** this is *not* the same thing as `docker/docker-compose.yml` at the
> repo root. That one is the upstream sample stack (MySQL 5.7, builds the app
> from source, nginx reverse proxy image built locally). This directory
> describes how the app is actually deployed: a prebuilt `streama.jar` run on
> `anapsix/alpine-java:8`, MariaDB 10.11, and `jwilder/nginx-proxy` with the
> LetsEncrypt companion for TLS.

## Usage

```bash
cp .env.example .env    # then fill in real values
docker compose up -d
```

The compose file expects these to exist alongside it on the host:

```
streama.jar              # prebuilt app jar
application.yml          # app config
volumes/db/              # MariaDB data directory
volumes/streama/uploads/
volumes/streama/local-files/
volumes/nginx/…          # conf.d, html, htpasswd, dhparam, vhost, certs
```

## Why the db service looks the way it does

Two settings on the `db` service exist because of a real incident, and removing
them will bring it back:

**`image: mariadb:10.11` (pinned, not `mariadb:10`).**
The floating `mariadb:10` tag rolled the server binary forward underneath an
existing data directory. Pin the minor series so version changes are deliberate.

**`MARIADB_AUTO_UPGRADE=1`.**
When the data directory predates the server binary, the official entrypoint
detects it and then *skips* the upgrade unless this is set:

```
[Note] [Entrypoint]: MariaDB upgrade information missing, assuming required
[Note] [Entrypoint]: MariaDB upgrade (mariadb-upgrade) required, but skipped
                     due to $MARIADB_AUTO_UPGRADE setting
```

Left unset, the `mysql` system schema stayed on the old layout while the server
expected the new one. Because `use_stat_tables` defaults to
`PREFERABLY_FOR_QUERIES`, the optimizer reads `mysql.column_stats` on virtually
every table open, and each read logged two errors:

```
[ERROR] Incorrect definition of table mysql.column_stats: expected column
        'hist_type' … to have type enum(…,'JSON_HB'), found enum(…)
[ERROR] Incorrect definition of table mysql.column_stats: expected column
        'histogram' … to have type longblob, found varbinary(255)
```

That produced **87,712 error lines / ~21 MB** of container log in 19 days.
`mysql.event` and `mysql.proc` were stale too — the Event Scheduler refused to
start, and `mariadb-dump --routines` failed with *"Cannot load from mysql.proc.
The table is probably corrupted"*.

Running `mariadb-upgrade` fixed all of it. Post-fix the log is ~160 lines per
start with zero errors.

**`logging:` limits on every service.**
The default `json-file` driver has no rotation, so a chatty container can fill
the disk. 10 MB × 3 caps each service.

## Recovering if the system schema goes stale again

```bash
# back up first -- logical dump of app data, plus a cold copy of the data dir
docker compose exec -e MYSQL_PWD="$MYSQL_ROOT_PASSWORD" db \
  mariadb-dump -uroot --databases streama --single-transaction --triggers > streama.sql
docker compose stop streama db
docker run --rm -v "$PWD/volumes/db:/src:ro" -v "$PWD/backups:/dst" \
  alpine cp -a /src /dst/db-datadir-$(date +%F)

# then just start it -- MARIADB_AUTO_UPGRADE=1 runs mariadb-upgrade on boot
docker compose up -d
```

Verify afterwards:

```bash
docker compose exec db cat /var/lib/mysql/mysql_upgrade_info   # should show the server version
docker compose logs db | grep -c '\[ERROR\]'                   # should be 0
```

Note that `mariadb-dump --events` fails while the Event Scheduler is disabled,
and `--routines` fails while `mysql.proc` is stale — so on a broken system dump
the app database only, and rely on the cold data-directory copy as the real
rollback point.
