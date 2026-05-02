# Security Policy

## Secrets Management
- All sensitive keys (GEMINI_API_KEY, etc.) are managed via **GCP Secret Manager** or environment variables.
- Secrets are never hard-coded in the source code.
- `.env` files are excluded from version control and Docker images.

## Rate Limiting
- The `/api` routes are protected by rate limiting.
- Current configuration: **20 requests per minute per IP address**.

## Input Validation
- All user-provided chat messages are capped at **500 characters** to prevent abuse.
- Request payloads are validated for proper JSON structure.

## Docker Security
- The application runs as a **non-root user** (`node`) within the container.
- Base image is `node:18-alpine` for a minimal attack surface.

## CORS Configuration
- In production, CORS is restricted to the specific production domain.

## Logging
- No sensitive user information or API keys are logged to the console or any logging service.

## AI Model Security
- The application utilizes the `gemini-flash-latest` model.
- Strict system prompts are implemented to ensure the AI remains on-topic and prevents prompt injection attacks or generation of inappropriate election-related content.
- Generative AI is only used as a fallback after local knowledge base matching.
