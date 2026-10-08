# FUTURE_CS_03 — API Security Risk Analysis

**Future Interns Cyber Security Internship — Task 3**

## Executive Summary
This report implements Future Interns Task 3 using JSONPlaceholder, a public fake REST API intended for testing and learning. The analysis is read-only.

## Endpoint
**GET** https://jsonplaceholder.typicode.com/posts/1

## Observed API Evidence

| Check | Result | Risk / Interpretation |
|---|---|---|
| Public GET endpoint | Accessible without signup/API key | Informational/Low for this demo API |
| Response data | userId, id, title and body | Low because the data is test data |
| Authentication | No API key required for documented usage | Expected for this demo; serious if private production data were exposed |
| Authorization / IDOR | Not actively exploited | Not verified |
| Rate limiting | Not stress-tested | Not verified |
| Input validation | No unsafe payloads sent | Not verified |

## Risk Analysis

### 1. Unauthenticated Data Access
**Low/Informational for this demo.** JSONPlaceholder is intentionally public. In a production API containing private information, unauthenticated access could be a serious authentication failure.

### 2. Excessive Data Exposure
**Low/Context-dependent.** The observed response is small and non-sensitive. Production APIs should return only the fields required by the client.

### 3. Missing/Unverified Rate Limiting
**Not verified.** Flooding and DoS testing were outside scope. Production APIs should enforce rate limits, quotas, monitoring, and abuse controls.

### 4. Input Validation
**Not verified.** No unsafe payloads were submitted. Production APIs should validate types, length, format, ranges, and allowed values server-side.

### 5. Authorization
**Not verified.** No authorization-bypass or IDOR exploitation was performed. Production APIs should enforce object-level authorization on every sensitive resource.

## Recommended Controls
- Strong authentication for private APIs
- Object-level authorization
- Least-privilege access
- Minimum necessary response fields
- HTTPS and secure security headers
- Server-side input validation
- Rate limiting and quotas
- Security logging and monitoring
- Short-lived tokens and secret rotation

## Evidence Note
A fresh Postman request/response screenshot was not generated in this environment. Do not claim Postman execution unless you add your own genuine screenshot.

## Sources
- https://jsonplaceholder.typicode.com/
- Future Interns Cyber Security Task 3
- https://github.com/OWASP/API-Security

Official task: https://futureinterns.com/cyber-security-task-3-2026/