# Task 04 — Password Strength Analyzer

## Task
Develop a tool that evaluates the strength of user-entered passwords.

## Implementation
The project is a standalone HTML/CSS/JavaScript application.

### Requirement mapping
| Requirement | Implementation |
|---|---|
| Check password length | 12-character minimum check plus score contribution from length |
| Check complexity | Uppercase, lowercase, number and special-character checks |
| Check uniqueness | Common-password list, repeated-pattern detection and character-diversity scoring |
| Suggest stronger alternatives | Actionable suggestions plus random 18-character example generator |
| Optional password reuse database | Not enabled; the demo avoids storing passwords for safety |

## Security design
The analyzer processes the entered password locally in the browser and does not send it to a server. It intentionally does not save entered passwords.

For production authentication systems, passwords should be stored only as salted password hashes using an appropriate password-hashing algorithm such as Argon2id, bcrypt or scrypt.

## Testing examples
- `123456` → very weak/common
- `Password123` → weak/moderate because it is predictable/common
- `Summer2026!` → moderate/strong depending on pattern/context; a unique generated password is preferred
- A random 18-character mixed password → strong/very strong

## Conclusion
The task demonstrates password-security fundamentals, client-side validation, password-strength scoring, pattern detection, safer password generation, and basic cryptography concepts.

**Important:** Never use passwords shown in examples as real account passwords.