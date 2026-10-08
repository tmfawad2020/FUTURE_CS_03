# FUTURE_CS_03 — API Security Risk Analysis

## API
`https://jsonplaceholder.typicode.com/posts/1`

## Scope
Read-only GET request and security analysis. No flooding, bypass attempts, or destructive testing.

## Key observations
- Public GET endpoint is accessible without an API key, which is expected for this demo API.
- Response contains test fields such as userId, id, title and body.
- Authorization/IDOR was not actively exploited.
- Rate limiting was not stress-tested.
- Unsafe input was not submitted.

## Evidence note
The report separates observed behavior from controls that were not tested. A genuine Postman screenshot should be added if the internship evaluator requires tool evidence.

## Sources
https://jsonplaceholder.typicode.com/
https://futureinterns.com/cyber-security-task-3-2026/
https://github.com/OWASP/API-Security