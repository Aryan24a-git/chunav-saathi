# 🗳️ Chunav Saathi (चुनाव साथी)
### *Your Personal Guide to Indian Democracy*
> Empowering the Indian Voter through Interactive AI Education.
>Chunav Saathi is a premium, bilingual AI assistant designed to bridge the information gap in the Indian electoral process. It provides citizens    
 with instant, accurate, and interactive guidance on everything from Voter ID registration to understanding Electronic Voting Machines (EVMs).

🔗 **Live Demo**: [https://chunav-saathi-692586675932.us-central1.run.app/]  
📦 **Tech**: Node.js • Gemini AI • GCP Cloud Run • Vanilla JS

---

## 🎯 The Problem
Navigating the rules and processes of the Election Commission of India (ECI) can be overwhelming for many citizens. Complex forms, procedural confusion, and rampant misinformation often deter active voter participation.

## 💡 Our Solution
Chunav Saathi is a premium, bilingual AI assistant that provides instant, accurate, and interactive guidance on everything from Voter ID registration to understanding EVMs. It simplifies the voting process through a Local-First, AI-Powered architecture.

---

## ✨ Features
| Feature | Description |
|---|---|
| 🤖 AI Chat Assistant | A smart chatbot offering guidance on election procedures and answering queries. |
| 🧠 Quiz Engine | Interactive quizzes to test and improve your knowledge of Indian democracy. |
| 🃏 Flashcards | Quick, bite-sized facts and terms related to the electoral process. |
| 📅 Election Timeline | A visual journey guiding users through the 8 stages of an Indian election. |
| 🗺️ Guided Voter Flow | Step-by-step, zero-latency workflows for common tasks like registration. |
| 🌐 Hindi / English | Full bilingual support to reach a broader audience across India. |

---

## ☁️ Google Services Integration

| Service | SDK / API | Usage in Code |
|---|---|---|
| Gemini 3 Flash Preview | @google/generative-ai | server/services/gemini.js |
| Cloud Run | gcloud CLI | cloudbuild.yaml |
| Cloud Build | cloudbuild.yaml | .github/workflows/deploy.yml |
| Artifact Registry | Docker | cloudbuild.yaml |
| Google Fonts | fonts.googleapis.com | public/index.html |

---

## 🏗️ Architecture
The application utilizes a **Hybrid Routing Architecture** focusing on speed, cost-efficiency, and accuracy.

### Why This Architecture?
- **Local Knowledge Router**: Keyword-scoring against a localized database handles 90% of queries instantly.
- **Stateless Sessions**: Managed anonymously via IP/Session logic for a fast, no-login experience.
- **Hybrid AI Fallback**: Complex queries seamlessly fall back to Gemini AI for accurate responses.

---

## 🛠️ Tech Stack
| Layer | Technology | Why |
|---|---|---|
| Backend | Node.js + Express | Lightweight, fast, and handles concurrent API requests efficiently. |
| Frontend | Vanilla JS / HTML / CSS | Zero dependencies for maximum performance and easy maintenance. |
| AI | Google Gemini 3 Flash Preview | Provides rapid, cost-effective LLM fallback for complex user queries. |
| Hosting | GCP Cloud Run | Serverless scaling, secure execution, and easy CI/CD integration. |
| CI/CD | GitHub Actions + Cloud Build | Automated testing and deployment pipeline for continuous delivery. |
| Container | Docker (Alpine) | Minimal attack surface and small image size for faster deployments. |

---

## 📊 Evaluation Criteria Coverage
| Criterion | Implementation | Evidence |
|---|---|---|
| Code Quality | Modular routes, hybrid router pattern | `server/routes/` |
| Security | Rate limiting, input sanitization, Secret Manager | `server/middleware/` |
| Efficiency | 90% local cache, no framework, Alpine Docker | `server/prompts/` |
| Testing | Unit tests for router + API routes | `tests/` |
| Accessibility | Hindi toggle, ARIA labels, high contrast | `public/` |
| Google Services | Gemini AI, Cloud Run, Cloud Build, Artifact Registry | `cloudbuild.yaml` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API Key (free at aistudio.google.com)
- GCP Account

### Local Setup
```bash
git clone https://github.com/Aryan24a-git/chunav-saathi.git
cd chunav-saathi
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm start
# Open http://localhost:8080
```

### Environment Variables
```
GEMINI_API_KEY=    # From aistudio.google.com
GCP_PROJECT_ID=    # Your GCP project ID
PORT=8080
```

---

## 🔒 Security
- [x] API keys via GCP Secret Manager
- [x] Rate limiting on all /api routes
- [x] Input sanitization before AI calls
- [x] Non-root Docker user
- [x] CORS locked to production domain

*(See [SECURITY.md](SECURITY.md) for full details)*

---

## 📁 Project Structure
```
chunav-saathi/
├── server/
│   ├── index.js
│   ├── routes/
│   │   ├── chat.js
│   │   ├── quiz.js
│   │   └── tts.js
│   ├── prompts/
│   │   └── systemPrompt.js
│   └── middleware/
│       └── rateLimiter.js
├── public/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── tests/
├── Dockerfile
├── cloudbuild.yaml
└── .github/workflows/deploy.yml
```

---

## 🧠 How the AI Works
The system first parses user input against a hardcoded knowledge base (Local Knowledge Router). If a match is found, it provides a zero-latency response. If no match is found, it falls back to the **Gemini 3 Flash Preview API**, using a strict system prompt to ensure responses are factual, unbiased, and aligned with ECI guidelines.

---

## 🔮 Assumptions Made
- Content based on 2024 Lok Sabha ECI guidelines
- Hindi and English supported in Phase 1
- Gemini 3 Flash Preview used for speed and cost efficiency

---

## 👨‍💻 Author
**SK FIRDOUS ALI**  
• [LinkedIn:https://www.linkedin.com/in/sk-firdous-ali-b8ba92379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app]

• [GitHub:https://github.com/Aryan24a-git]

---

*Made with ❤️ for the Indian Voter.*