const FLASHCARD_DATA = [
  { id: 1, topic: 'ECI', question: 'What is the full form of ECI?', answer: 'Election Commission of India', difficulty: 'easy' },
  { id: 2, topic: 'ECI', question: 'Under which Article of the Constitution is ECI established?', answer: 'Article 324', difficulty: 'medium' },
  { id: 3, topic: 'MCC', question: 'What is MCC?', answer: 'Model Code of Conduct', difficulty: 'easy' },
  { id: 4, topic: 'EVM', question: 'What is the full form of VVPAT?', answer: 'Voter Verifiable Paper Audit Trail', difficulty: 'medium' },
  { id: 5, topic: 'Seats', question: 'How many elected seats are there in Lok Sabha?', answer: '543', difficulty: 'easy' },
  { id: 6, topic: 'Seats', question: 'What is the maximum strength of Rajya Sabha?', answer: '250 (Current: 245)', difficulty: 'medium' },
  { id: 7, topic: 'ECI', question: 'What is the term of the Chief Election Commissioner?', answer: '6 years or until the age of 65, whichever is earlier', difficulty: 'hard' },
  { id: 8, topic: 'History', question: 'When was the first general election held in India?', answer: '1951-52', difficulty: 'medium' },
  { id: 9, topic: 'Forms', question: 'Which form is used for new voter registration?', answer: 'Form 6', difficulty: 'medium' },
  { id: 10, topic: 'NOTA', question: 'When was NOTA first introduced in India?', answer: '2013', difficulty: 'hard' },
  { id: 11, topic: 'EVM', question: 'Which company manufactures EVMs in India?', answer: 'BEL (Bharat Electronics Limited) and ECIL (Electronics Corporation of India Limited)', difficulty: 'hard' },
  { id: 12, topic: 'ECI', question: 'Who was the first Chief Election Commissioner of India?', answer: 'Sukumar Sen', difficulty: 'hard' },
  { id: 13, topic: 'Age', question: 'What is the minimum age to vote in India?', answer: '18 years', difficulty: 'easy' },
  { id: 14, topic: 'Age', question: 'What is the minimum age to contest Lok Sabha elections?', answer: '25 years', difficulty: 'medium' },
  { id: 15, topic: 'Age', question: 'What is the minimum age to contest Rajya Sabha elections?', answer: '30 years', difficulty: 'medium' },
  { id: 16, topic: 'MCC', question: 'When does the Model Code of Conduct come into effect?', answer: 'Immediately after the election schedule is announced by ECI', difficulty: 'medium' },
  { id: 17, topic: 'Symbols', question: 'Who allotts symbols to political parties?', answer: 'Election Commission of India', difficulty: 'easy' },
  { id: 18, topic: 'Voting', question: 'What is the maximum number of votes an EVM can record?', answer: '2,000 votes', difficulty: 'hard' },
  { id: 19, topic: 'EVM', question: 'How many candidates can a single EVM (Balloting Unit) cater to?', answer: '16 candidates (up to 24 units can be linked for 384 candidates)', difficulty: 'hard' },
  { id: 20, topic: 'Ink', question: 'What chemical is used in the indelible ink?', answer: 'Silver Nitrate (AgNO3)', difficulty: 'hard' },
  { id: 21, topic: 'History', question: 'In which year was the voting age lowered from 21 to 18?', answer: '1988 (61st Amendment Act)', difficulty: 'medium' },
  { id: 22, topic: 'Voters', question: 'What is "Epic"?', answer: 'Elector\'s Photo Identity Card', difficulty: 'easy' },
  { id: 23, topic: 'ECI', question: 'Who appoints the Election Commissioners?', answer: 'The President of India', difficulty: 'medium' },
  { id: 24, topic: 'Rajya Sabha', question: 'How many members of Rajya Sabha are nominated by the President?', answer: '12 members', difficulty: 'medium' },
  { id: 25, topic: 'Polling', question: 'What is a "Tendered Vote"?', answer: 'A vote cast when someone else has already voted in a voter\'s name', difficulty: 'hard' },
  { id: 26, topic: 'Counting', question: 'Which form is used for the declaration of results?', answer: 'Form 21C', difficulty: 'hard' },
  { id: 27, topic: 'Forms', question: 'Which form is used for name deletion from electoral rolls?', answer: 'Form 7', difficulty: 'medium' },
  { id: 28, topic: 'Forms', question: 'Which form is used for correction of entries in electoral rolls?', answer: 'Form 8', difficulty: 'medium' },
  { id: 29, topic: 'ECI', question: 'Where is the headquarters of ECI located?', answer: 'Nirvachan Sadan, New Delhi', difficulty: 'easy' },
  { id: 30, topic: 'Voters', question: 'Can an NRI vote in Indian elections?', answer: 'Yes, if they are registered in the electoral roll of their home constituency', difficulty: 'medium' }
];

const TIMELINE_DATA = [
  { stage: "Announcement", icon: "📢", days: "Day 0", description: "Election Commission announces schedule, Model Code of Conduct kicks in immediately", keyFact: "MCC makes it binding on all political parties and candidates", learnMore: "mcc" },
  { stage: "Nomination", icon: "📝", days: "Day 1-14", description: "Candidates file nomination papers with Returning Officer...", keyFact: "Security deposit: ₹25,000 for Lok Sabha, ₹10,000 for state assembly" },
  { stage: "Scrutiny", icon: "🔍", days: "Day 15", description: "Returning Officer examines nomination papers for validity", keyFact: "Can be rejected if candidate disqualified under RPA 1951" },
  { stage: "Withdrawal", icon: "↩️", days: "Day 17", description: "Candidates may withdraw nominations by 3pm on withdrawal day", keyFact: "Symbol allotment happens after withdrawal deadline" },
  { stage: "Campaign", icon: "🗣️", days: "Day 17 to Day -2", description: "Active campaigning period. No campaigning 48 hours before polling", keyFact: "The 48-hour silence period is called the Campaign Silence Period" },
  { stage: "Poll Day", icon: "🗳️", days: "Polling Day", description: "Voting happens 7am to 6pm. Voters use EVM and VVPAT machines", keyFact: "Voters get indelible ink mark on left index finger" },
  { stage: "Counting", icon: "🔢", days: "Count Day", description: "Votes counted at counting centers under ECI supervision", keyFact: "EVMs are stored in strong rooms with multi-party seals" },
  { stage: "Result", icon: "🏆", days: "Result Day", description: "Winners declared, certificates issued by Returning Officer", keyFact: "Requires simple majority in Lok Sabha to form government" }
];

const TRANSLATIONS = {
  en: {
    navAssistant: "Assistant", navQuiz: "Quiz", navFlashcard: "Flashcards", navTimeline: "Timeline",
    chatPlaceholder: "Ask about Indian elections...",
    btnSend: "Send", btnLang: "हिं/EN",
    suggest1: "How do I register to vote?", suggest2: "What is Model Code of Conduct?", suggest3: "Difference between Lok Sabha and Rajya Sabha?",
    quizLoading: "Quiz loading...", scorePerfect: "🏆 Perfect! You're an election expert!",
    scoreGood: "✅ Good knowledge! Keep learning!", scoreLow: "📚 Let's study more — try Flashcards!",
    btnRetry: "Try Again", btnStudy: "Study Flashcards",
    fcFront: "Question", fcBack: "Answer", fcMastered: "✓ Got it", fcRetry: "✗ Study Again",
    timelineAsk: "Ask Assistant about this →"
  },
  hi: {
    navAssistant: "सहायक", navQuiz: "प्रश्नोत्तरी", navFlashcard: "फ्लैशकार्ड", navTimeline: "समयरेखा",
    chatPlaceholder: "भारतीय चुनावों के बारे में पूछें...",
    btnSend: "भेजें", btnLang: "EN/हिं",
    suggest1: "वोट डालने के लिए पंजीकरण कैसे करें?", suggest2: "आचार संहिता क्या है?", suggest3: "लोकसभा और राज्यसभा में क्या अंतर है?",
    quizLoading: "प्रश्नोत्तरी लोड हो रही है...", scorePerfect: "🏆 शानदार! आप चुनाव विशेषज्ञ हैं!",
    scoreGood: "✅ अच्छा ज्ञान! सीखते रहें!", scoreLow: "📚 चलिए और अध्ययन करते हैं — फ्लैशकार्ड आज़माएं!",
    btnRetry: "पुनः प्रयास करें", btnStudy: "फ्लैशकार्ड पढ़ें",
    fcFront: "प्रश्न", fcBack: "उत्तर", fcMastered: "✓ समझ गया", fcRetry: "✗ फिर से पढ़ें",
    timelineAsk: "सहायक से इस बारे में पूछें →"
  }
};

const App = {
  currentPage: 'assistant',
  language: 'en',
  chatHistory: [],
  currentQuiz: null,
  currentCardIndex: 0,

  init() {
    this.Chat.init();
    this.Quiz.init();
    this.Flashcard.init();
    this.Timeline.init();

    // Nav Logic
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => this.showPage(btn.dataset.page));
    });

    // Lang Toggle
    document.getElementById('lang-toggle').addEventListener('click', () => this.toggleLanguage());

    this.showPage('assistant');
    this.translateUI();
  },

  showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });
    this.currentPage = pageId;
  },

  toggleLanguage() {
    this.language = this.language === 'en' ? 'hi' : 'en';
    this.translateUI();
  },

  translateUI() {
    const t = TRANSLATIONS[this.language];
    document.getElementById('nav-assistant').innerHTML = `🤖 ${t.navAssistant}`;
    document.getElementById('nav-quiz').innerHTML = `🧠 ${t.navQuiz}`;
    document.getElementById('nav-flashcard').innerHTML = `🃏 ${t.navFlashcard}`;
    document.getElementById('nav-timeline').innerHTML = `📅 ${t.navTimeline}`;
    document.getElementById('chat-input').placeholder = t.chatPlaceholder;
    document.getElementById('send-btn').textContent = t.btnSend;
    document.getElementById('lang-toggle').textContent = t.btnLang;
    
    // Update initial message if history is empty
    if (this.chatHistory.length === 0) {
        const initialBubble = document.querySelector('.bubble-bot');
        if (initialBubble) {
            initialBubble.textContent = this.language === 'hi' 
                ? "🗳️ नमस्ते! मैं आपका चुनाव साथी हूँ। आज मैं भारतीय चुनावों के बारे में आपकी क्या सहायता कर सकता हूँ?"
                : "🗳️ Namaste! I am your Chunav Saathi. How can I help you today regarding Indian elections?";
        }
    }

    // Refresh Suggestions
    if (this.currentPage === 'assistant') {
        this.Chat.renderSuggestions([t.suggest1, t.suggest2, t.suggest3]);
    }
  },

  Chat: {
    init() {
      const input = document.getElementById('chat-input');
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage(input.value);
        }
      });
      document.getElementById('send-btn').addEventListener('click', () => this.sendMessage(input.value));
      document.getElementById('tts-btn').addEventListener('click', () => {
        const lastBotMsg = Array.from(document.querySelectorAll('.bubble-bot')).pop();
        if (lastBotMsg) this.speakText(lastBotMsg.innerText.replace('🗳️ ', ''));
      });
      
      this.renderSuggestions([TRANSLATIONS.en.suggest1, TRANSLATIONS.en.suggest2, TRANSLATIONS.en.suggest3]);
    },

    async sendMessage(text) {
      if (!text.trim()) return;
      document.getElementById('chat-input').value = '';
      
      this.addBubble('user', text);
      const loading = this.addLoadingBubble();
      
      App.chatHistory.push({ role: "user", parts: [{ text }] });

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: App.chatHistory, lang: App.language })
        });
        const data = await res.json();
        
        loading.remove();
        this.addBubble('bot', data.reply);
        App.chatHistory.push({ role: "model", parts: [{ text: data.reply }] });
        
        const suggestions = this.getSuggestions(data.reply);
        this.renderSuggestions(suggestions);
      } catch (e) {
        loading.remove();
        this.addBubble('bot', "Connection error. Please check your internet.");
      }
      
      const container = document.getElementById('chat-messages');
      container.scrollTop = container.scrollHeight;
    },

    getSuggestions(reply) {
      const s = [];
      const lower = reply.toLowerCase();
      if (lower.includes('form 6')) s.push("What documents do I need for Form 6?", "How long does registration take?");
      else if (lower.includes('evm') || lower.includes('vvpat')) s.push("What is VVPAT?", "Is EVM tamper-proof?");
      else if (lower.includes('model code') || lower.includes('mcc')) s.push("When does MCC start?", "What happens if MCC is violated?");
      else s.push("Who is eligible to vote?", "How to find my polling booth?");
      return s;
    },

    renderSuggestions(chips) {
      const bar = document.getElementById('suggested-chips');
      bar.innerHTML = '';
      chips.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'chip';
        btn.textContent = text;
        btn.onclick = () => this.sendMessage(text);
        bar.appendChild(btn);
      });
    },

    addBubble(role, text) {
      const div = document.createElement('div');
      div.className = role === 'user' ? 'bubble-user' : 'bubble-bot';
      div.textContent = (role === 'bot' ? '🗳️ ' : '') + text;
      document.getElementById('chat-messages').appendChild(div);
      return div;
    },

    addLoadingBubble() {
      const div = document.createElement('div');
      div.id = 'loading-bubble';
      div.className = 'bubble-loading';
      div.innerHTML = '<span></span><span></span><span></span>';
      document.getElementById('chat-messages').appendChild(div);
      return div;
    },

    async speakText(text) {
      const btn = document.getElementById('tts-btn');
      btn.style.opacity = '0.5';
      try {
        const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}`);
        const data = await res.json();
        const player = document.getElementById('tts-player');
        player.src = `data:audio/mp3;base64,${data.audioContent}`;
        player.play();
        player.onended = () => btn.style.opacity = '1';
      } catch (e) {
        btn.style.opacity = '1';
      }
    }
  },

  Quiz: {
    state: { questions: [], current: 0, score: 0, timer: null, timeLeft: 20 },
    
    init() {
      const topics = ['ECI', 'MCC', 'EVM/VVPAT', 'Forms', 'NOTA', 'Constituencies', 'History', 'Rights'];
      const selector = document.getElementById('topic-selector');
      topics.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'chip';
        btn.textContent = t;
        btn.onclick = () => this.startQuiz(t);
        selector.appendChild(btn);
      });
    },

    async startQuiz(topic) {
      document.getElementById('topic-selector').style.display = 'none';
      document.getElementById('quiz-content').style.display = 'block';
      document.getElementById('quiz-question').textContent = 'Generating quiz...';
      
      try {
        const res = await fetch('/api/quiz/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic })
        });
        const data = await res.json();
        this.state.questions = data.quiz;
        this.state.current = 0;
        this.state.score = 0;
        this.showQuestion();
      } catch (e) {
        document.getElementById('quiz-question').textContent = 'Error loading quiz.';
      }
    },

    showQuestion() {
      const q = this.state.questions[this.state.current];
      if (!q) return this.showScore();

      clearInterval(this.state.timer);
      this.state.timeLeft = 20;
      document.getElementById('quiz-timer').textContent = `${this.state.timeLeft}s`;
      
      document.getElementById('quiz-progress-inner').style.width = `${(this.state.current / 5) * 100}%`;
      document.getElementById('quiz-question').textContent = q.question;
      
      const options = document.getElementById('quiz-options');
      options.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => this.selectAnswer(i);
        options.appendChild(btn);
      });

      this.state.timer = setInterval(() => {
        this.state.timeLeft--;
        document.getElementById('quiz-timer').textContent = `${this.state.timeLeft}s`;
        if (this.state.timeLeft <= 0) {
          clearInterval(this.state.timer);
          this.selectAnswer(-1); // Timeout
        }
      }, 1000);
    },

    selectAnswer(idx) {
      clearInterval(this.state.timer);
      const q = this.state.questions[this.state.current];
      const btns = document.querySelectorAll('.option-btn');
      
      btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) btn.classList.add('correct');
        else if (i === idx) btn.classList.add('wrong');
      });

      if (idx === q.answer) this.state.score++;

      setTimeout(() => {
        this.state.current++;
        this.showQuestion();
      }, 1500);
    },

    showScore() {
      document.getElementById('quiz-content').style.display = 'none';
      const screen = document.getElementById('quiz-score-screen');
      screen.style.display = 'block';
      
      const t = TRANSLATIONS[App.language];
      let msg = t.scoreLow;
      if (this.state.score === 5) msg = t.scorePerfect;
      else if (this.state.score >= 3) msg = t.scoreGood;

      screen.innerHTML = `
        <h2>${msg}</h2>
        <p style="font-size: 3rem; margin: 1rem 0;">${this.state.score} / 5</p>
        <div style="display:flex; gap:1rem; justify-content:center;">
          <button class="btn-primary" onclick="App.Quiz.reset()">${t.btnRetry}</button>
          <button class="btn-secondary" onclick="App.showPage('flashcard')">${t.btnStudy}</button>
        </div>
      `;
    },

    reset() {
        document.getElementById('quiz-score-screen').style.display = 'none';
        document.getElementById('topic-selector').style.display = 'grid';
    }
  },

  Flashcard: {
    state: { cards: [], current: 0, mastered: new Set(), studyAgain: new Set() },

    init() {
      const topics = ['All', ...new Set(FLASHCARD_DATA.map(c => c.topic))];
      const filters = document.getElementById('flashcard-filters');
      topics.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'chip';
        btn.textContent = t;
        btn.onclick = () => this.filterByTopic(t);
        filters.appendChild(btn);
      });

      document.getElementById('flashcard').onclick = (e) => {
        e.currentTarget.classList.toggle('flipped');
      };

      document.getElementById('fc-prev').onclick = () => this.move(-1);
      document.getElementById('fc-next').onclick = () => this.move(1);
      document.getElementById('fc-mastered').onclick = () => this.markMastered();
      document.getElementById('fc-retry').onclick = () => this.markStudyAgain();

      this.filterByTopic('All');
    },

    filterByTopic(topic) {
      this.state.cards = topic === 'All' ? [...FLASHCARD_DATA] : FLASHCARD_DATA.filter(c => c.topic === topic);
      this.state.current = 0;
      this.showCard();
    },

    showCard() {
      const card = this.state.cards[this.state.current];
      document.getElementById('flashcard').classList.remove('flipped');
      document.getElementById('flashcard-q').textContent = card.question;
      document.getElementById('flashcard-a').textContent = card.answer;
      document.getElementById('flashcard-counter').textContent = `${this.state.current + 1} / ${this.state.cards.length}`;
      
      const mastery = Math.round((this.state.mastered.size / FLASHCARD_DATA.length) * 100);
      document.getElementById('mastery-percent').textContent = `${mastery}% Mastered`;
    },

    move(dir) {
      this.state.current = (this.state.current + dir + this.state.cards.length) % this.state.cards.length;
      this.showCard();
    },

    markMastered() {
      const card = this.state.cards[this.state.current];
      this.state.mastered.add(card.id);
      this.state.studyAgain.delete(card.id);
      this.move(1);
    },

    markStudyAgain() {
      const card = this.state.cards[this.state.current];
      this.state.studyAgain.add(card.id);
      this.move(1);
    }
  },

  Timeline: {
    init() {
      const container = document.getElementById('timeline-nodes');
      TIMELINE_DATA.forEach((stage, i) => {
        const node = document.createElement('div');
        node.className = 'timeline-node';
        node.innerHTML = `<div class="node-circle"></div><span class="node-label">${stage.icon} ${stage.stage}</span>`;
        node.onclick = () => this.selectStage(i);
        container.appendChild(node);
      });

      document.getElementById('stage-ask-btn').onclick = () => {
        const stage = TIMELINE_DATA[this.activeStage];
        this.askAboutStage(stage.stage);
      };

      this.selectStage(0);
    },

    selectStage(index) {
      this.activeStage = index;
      const nodes = document.querySelectorAll('.timeline-node');
      nodes.forEach((n, i) => n.classList.toggle('active', i === index));
      
      const stage = TIMELINE_DATA[index];
      const card = document.getElementById('stage-detail-card');
      card.style.display = 'block';
      document.getElementById('stage-title').textContent = `${stage.icon} ${stage.stage}`;
      document.getElementById('stage-days').textContent = stage.days;
      document.getElementById('stage-desc').textContent = stage.description;
      document.getElementById('stage-fact').textContent = stage.keyFact;
    },

    askAboutStage(stageName) {
      App.showPage('assistant');
      const input = document.getElementById('chat-input');
      input.value = `Tell me more about the ${stageName} stage in Indian elections.`;
      setTimeout(() => App.Chat.sendMessage(input.value), 300);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
