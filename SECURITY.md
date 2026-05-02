# Security Policy

## Secrets Management
- All sensitive keys (GEMINI_API_KEY, etc.) are securely managed via **GCP Secret Manager** or injected as environment variables.
- Secrets are strictly excluded from source code and version control.
- `.env` files are added to `.gitignore` and `.dockerignore`.

## Rate Limiting
- The `/api` routes are protected against DDoS and abuse by rate limiting middleware.
- Current configuration: **20 requests per minute per IP address**.

## Input Validation & Sanitization
- All user-provided chat messages are capped at **500 characters** to prevent buffer overflow or excessive token usage.
- Request payloads are validated for proper JSON structure.
- Input is sanitized to prevent prompt injection before calling the Gemini AI API.

## Docker Security
- The application runs securely as a **non-root user** (`node`) within the container.
- We use the `node:18-alpine` base image to maintain a minimal footprint and reduce the attack surface.

## Network Security & CORS
- Cross-Origin Resource Sharing (CORS) is strictly configured. In production, CORS is locked to the specific production domain to prevent unauthorized API access.

## Logging & Privacy
- No sensitive user information or API keys are ever logged to the console, external logging services, or monitoring tools.
- User sessions are stateless and anonymous.
