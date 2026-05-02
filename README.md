# 🗳️ Chunav Saathi (चुनाव साथी)
### *Your Personal Guide to Indian Democracy*

Chunav Saathi is a premium, bilingual AI assistant designed to bridge the information gap in the Indian electoral process. It provides citizens with instant, accurate, and interactive guidance on everything from Voter ID registration to understanding Electronic Voting Machines (EVMs).

---

## 🏛️ Chosen Vertical: Civic Tech & Electoral Education
In a democracy of 1.4 billion people, navigating the rules and processes of the **Election Commission of India (ECI)** can be overwhelming. **Chunav Saathi** focuses on:
- **Voter Empowerment**: Simplifying complex registration forms (Form 6, 7, 8).
- **Procedural Transparency**: Step-by-step guidance on how to vote.
- **Combating Misinformation**: Factual, unbiased answers about EVM security and the Model Code of Conduct (MCC).

---

## 🧠 Approach and Logic: "Local-First, AI-Powered"
To ensure sustainability and cost-efficiency (saving API credits), the application utilizes a **Hybrid Routing Architecture**:

1.  **Guided Session Engine (Priority 1)**: 
    - Common workflows (like "Registering for a Voter ID") are hardcoded as multi-step guided sessions. 
    - This allows for **instant, zero-latency, and zero-cost** navigation using interactive UI buttons.
2.  **Local Knowledge Base (Priority 2)**: 
    - The server maintains an extensive local knowledge base in both English and Hindi.
    - User queries are first matched against this local data using a keyword-scoring algorithm before calling any external APIs.
3.  **AI Fallback (Priority 3)**: 
    - If a query is complex or not in the local data, it falls back to a specialized **LLM API**.
    - A strict system prompt ensures the AI remains on-topic and responds in the user's selected language.

---

## 🛠️ How the Solution Works

### **1. The Guided Navigation System**
When a user asks for a process (e.g., "Step by step voting"), the server initiates an **Active Guided Session**. 
- **Interactive UI**: Instead of typing "Next", users get **Orange (Next)**, **Blue (Prev)**, and **Red (Stop)** buttons inside the chat.
- **Progress Tracking**: A dynamic progress bar (e.g., "Step 2 of 5") keeps the user oriented.

### **2. Bilingual Synchronization**
The app is built with **Bilingualism at its Core**:
- **Frontend**: A comprehensive translation mapping handles all UI elements, suggested chips, and navigation labels.
- **Backend**: Parallel knowledge bases in English and Hindi ensure that "Local Hits" are linguistically accurate.

### **3. Educational Modules**
- **Quiz Engine**: Tests your knowledge with randomized questions from a mock dataset.
- **Flashcards**: Uses a custom UI for quick memorization of election terms.
- **Timeline**: A visual journey through the 8 stages of an Indian election.

---

## 📋 Assumptions Made
- **Local-First Priority**: We assume that 90% of user queries revolve around common topics (Voter ID, EVM, Dates). By handling these locally, we reduce API dependency by ~90%.
- **ECI 2026 Guidelines**: All logic and data follow the latest protocols established by the Election Commission of India for the 2026 State Elections.
- **Mobile-First Accessibility**: The UI is designed to be claymorphic and touch-friendly, assuming most users will access it via mobile devices.
- **No-Login Experience**: To maximize reach and privacy, the app assumes no user authentication is required; sessions are managed anonymously via IP/Session logic.

---

## 🚀 Getting Started
1.  **Clone**: `git clone [repo-url]`
2.  **Install**: `npm install`
3.  **Configure**: Create a `.env` file with your `GEMINI_API_KEY`.
4.  **Run**: `npm start`
5.  **Access**: `http://localhost:8080`

---

*Made with ❤️ for the Indian Voter.*
