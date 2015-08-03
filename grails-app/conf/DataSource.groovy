dataSource {
    pooled = true
    jmxExport = true
    driverClassName = "org.h2.Driver"
    username = "sa"
    password = ""
}
hibernate {
    cache.use_second_level_cache = true
    cache.use_query_cache = false
//    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory' // Hibernate 3
    cache.region.factory_class = 'org.hibernate.cache.ehcache.EhCacheRegionFactory' // Hibernate 4
    singleSession = true // configure OSIV singleSession mode
    flush.mode = 'manual' // OSIV session flush mode outside of transactional context
}

// environment specific settings
environments {
    test {
        dataSource {
          dbCreate = "update"
          url = "jdbc:h2:mem:testDb:MVCC=TRUE;LOCK_TIMEOUT=10000"
        }
    }
    development {
        dataSource {
          dbCreate = "update"
          driverClassName = "com.mysql.jdbc.Driver"
          dialect = org.hibernate.dialect.MySQL5InnoDBDialect

          //DEV
          url = "jdbc:mysql://localhost:3306/streama"
          username = "root"
          password = ""
        }
    }
    production {
        dataSource {
          dbCreate = "update"
          driverClassName = "com.mysql.jdbc.Driver"
          dialect = org.hibernate.dialect.MySQL5InnoDBDialect

          //DEV
          url = "jdbc:mysql://localhost:3306/streama"
          username = "root"
          password = ""

            properties {
               // See http://grails.org/doc/latest/guide/conf.html#dataSource for documentation
               jmxEnabled = true
               initialSize = 5
               maxActive = 50
               minIdle = 5
               maxIdle = 25
               maxWait = 10000
               maxAge = 10 * 60000
               timeBetweenEvictionRunsMillis = 5000
               minEvictableIdleTimeMillis = 60000
               validationQuery = "SELECT 1"
               validationQueryTimeout = 3
               validationInterval = 15000
               testOnBorrow = true
               testWhileIdle = true
               testOnReturn = false
               jdbcInterceptors = "ConnectionState"
               defaultTransactionIsolation = java.sql.Connection.TRANSACTION_READ_COMMITTED
            }
        }
        docker {
          dataSource {
            dbCreate = "update"
            driverClassName = "com.mysql.jdbc.Driver"
            dialect = org.hibernate.dialect.MySQL5InnoDBDialect

            //DEV
            String host = System.getenv('MYSQL_HOST')
            if(!host) host = "mysql"
            String port = System.getenv('MYSQL_PORT')
            if(!port) port = "3306"
            String db = System.getenv('MYSQL_DB')
            if(!db) db = "streama"
            String user = System.getenv('MYSQL_USER')
            if(!user) user = "streama"
            String pass = System.getenv('MYSQL_PASSWORD')
            if(!pass) pass = "streama"
            url = "jdbc:mysql://$host:$port/$db"
            username = "$user"
            password = "$pass"

            properties {
              // See http://grails.org/doc/latest/guide/conf.html#dataSource for documentation
              jmxEnabled = true
              initialSize = 5
              maxActive = 50
              minIdle = 5
              maxIdle = 25
              maxWait = 10000
              maxAge = 10 * 60000
              timeBetweenEvictionRunsMillis = 5000
              minEvictableIdleTimeMillis = 60000
              validationQuery = "SELECT 1"
              validationQueryTimeout = 3
              validationInterval = 15000
              testOnBorrow = true
              testWhileIdle = true
              testOnReturn = false
              jdbcInterceptors = "ConnectionState"
              defaultTransactionIsolation = java.sql.Connection.TRANSACTION_READ_COMMITTED
            }
          }
        }
    }
}
