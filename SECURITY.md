# Security Policy

## Supported Versions

| Version  | Supported          |
| -------- | ------------------ |
| 1.10.6   | :white_check_mark: |
| < 1.10.6 | :x:                |

## Reporting a Vulnerability

Please report security issues to dularion@gmail.com

## Security Advisories

### CVE-2025-34452 - Subtitle Download Path Traversal and SSRF

**Severity:** HIGH (CVSS 4.0: 8.7)

**Affected Versions:** 1.10.0 through 1.10.5

**Fixed In:** 1.10.6 (commit b7c8767)

**Description:**
Streama versions 1.10.0 through 1.10.5 contain a combination of path traversal (CWE-22) and server-side request forgery (CWE-918) vulnerabilities in the subtitle download functionality. These vulnerabilities allow an authenticated attacker to write arbitrary files to the server filesystem by supplying a crafted subtitle download URL and a path traversal sequence in the file name, potentially leading to remote code execution.

**Mitigation:**
Upgrade to version 1.10.6 or later.

**Credit:**
Valentin Lobstein (Chocapikk)

**References:**
- https://github.com/streamaserver/streama/commit/b7c8767
- https://chocapikk.com/posts/2025/streama-path-traversal-ssrf/
