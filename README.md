# 🗳️ Chunav Saathi — Indian Election Assistant

## Vertical
Civic Education & Voter Awareness

## Architecture
The application follows a **Single-Server Architecture** using Node.js/Express. It serves a Single Page Application (SPA) as static assets and provides a set of REST APIs for AI interactions, quiz generation, and text-to-speech services. The frontend is built with vanilla JavaScript, HTML5, and CSS3, ensuring zero build overhead and maximum compatibility.

## Google Services Used
| Service | Purpose |
|---|---|
| Gemini 1.5 Flash API | AI chat assistant + dynamic quiz generation |
| Google Text-to-Speech | Accessibility — read content aloud |
| GCP Cloud Run | Serverless deployment, auto-scaling |
| GCP Cloud Build | CI/CD pipeline from GitHub |
| Artifact Registry | Docker image storage |

## Features
- 🤖 **AI Chat Assistant**: Gemini-powered conversational agent specialized in Indian election laws, voter rights, and ECI processes.
- 🧠 **Dynamic Quiz**: AI-generated questions tailored to specific topics (e.g., EVMs, MCC) to test user knowledge.
- 🃏 **Flashcards**: 30+ interactive cards with spaced repetition logic for quick learning of election terminology.
- 📅 **Interactive Election Timeline**: 8 key stages of the election process with detailed facts and assistant integration.
- 🌐 **Bilingual Support**: Seamless toggle between Hindi and English for all UI elements and AI responses.
- 🔊 **Text-to-Speech**: Integrated audio playback for assistant replies to improve accessibility.

## How It Works
1. **Request Flow**: User interacts with the UI -> Frontend sends a fetch request to `/api` -> Node.js backend processes request (using Gemini or local mock data) -> Response is returned and rendered.
2. **AI Logic**: Chat queries are sent to Gemini 1.5 Flash with a strict system prompt to ensure domain-specific, neutral, and factual accuracy.
3. **Deployment**: Pushing to the `main` branch triggers GitHub Actions, which submits a build to Cloud Build. The resulting Docker image is deployed to Cloud Run.

## Local Development
```bash
git clone [repo-url]
cd chunav-saathi
npm install
cp .env.example .env  # Add your GEMINI_API_KEY
npm start
# Open http://localhost:8080 (or 3000 depending on environment)
```

## Assumptions
- Content is based on the 2024 Lok Sabha election rules defined by the Election Commission of India (ECI).
- Hindi and English are the primary supported languages in Phase 1.
- Gemini 1.5 Flash is selected as the primary LLM for its optimal balance of speed, cost, and factual recall.
