const FLASHCARD_DATA = [
  { id: 1, topic: 'ECI', question: 'What is the full form of ECI?', answer: 'Election Commission of India', difficulty: 'easy' },
  { id: 2, topic: 'ECI', question: 'Under which Article is ECI established?', answer: 'Article 324', difficulty: 'medium' },
  { id: 3, topic: 'MCC', question: 'When does MCC come into effect?', answer: 'Immediately after the election schedule is announced', difficulty: 'easy' },
  { id: 4, topic: 'EVM', question: 'What is the full form of VVPAT?', answer: 'Voter Verifiable Paper Audit Trail', difficulty: 'medium' },
  { id: 5, topic: 'Seats', question: 'How many elected seats are in Lok Sabha?', answer: '543', difficulty: 'easy' },
  { id: 6, topic: 'Registration', question: 'Which form is for new voter registration?', answer: 'Form 6', difficulty: 'medium' },
  { id: 7, topic: 'History', question: 'When was the first general election in India?', answer: '1951-52', difficulty: 'medium' },
  { id: 8, topic: 'Age', question: 'What is the minimum voting age?', answer: '18 years', difficulty: 'easy' },
  { id: 9, topic: 'NOTA', question: 'When was NOTA introduced?', answer: '2013', difficulty: 'medium' },
  { id: 10, topic: 'EVM', question: 'Are EVMs connected to the internet?', answer: 'No, they are standalone machines', difficulty: 'easy' }
];

const TIMELINE_DATA = [
  { stage: "Announcement", icon: "📢", days: "Day 0", description: "ECI sets dates and enforces Model Code of Conduct.", keyFact: "MCC begins immediately upon announcement.", learnMore: "Announcement stage" },
  { stage: "Nomination", icon: "📝", days: "Day 1-14", description: "Candidates submit forms and security deposits.", keyFact: "Form 26 affidavit discloses assets and criminal records.", learnMore: "Nomination stage" },
  { stage: "Scrutiny", icon: "🔍", days: "Day 15", description: "Officials examine papers for eligibility.", keyFact: "Incomplete papers lead to rejection.", learnMore: "Scrutiny and Withdrawal" },
  { stage: "Campaign", icon: "🗣️", days: "15+ Days", description: "Parties conduct outreach under MCC rules.", keyFact: "Campaigning stops 48 hours before polls.", learnMore: "Campaigning stage" },
  { stage: "Polling", icon: "🗳️", days: "Poll Day", description: "Voters cast votes using EVMs at booths.", keyFact: "Indelible ink prevents duplicate voting.", learnMore: "Polling Day" },
  { stage: "Counting", icon: "🔢", days: "Result Day", description: "Votes are counted under strict supervision.", keyFact: "VVPAT slips are partially verified.", learnMore: "Counting" }
];


const TRANSLATIONS = {
  en: {
    navAssistant: "Assistant", navQuiz: "Quiz", navFlashcard: "Flashcards", navTimeline: "Timeline",
    chatPlaceholder: "Ask about Indian elections...",
    btnSend: "Send", btnLang: "हिं/EN",
    suggest1: "Apply for new Voter ID", 
    suggest2: "Process of voting step by step", 
    suggest3: "Report code of conduct violation",
    quizLoading: "Quiz loading...", scorePerfect: "🏆 Perfect! You're an election expert!",
    scoreGood: "✅ Good knowledge! Keep learning!", scoreLow: "📚 Let's study more — try Flashcards!",
    btnRetry: "Try Again", btnStudy: "Study Flashcards",
    fcFront: "Question", fcBack: "Answer", fcMastered: "✓ Got it", fcRetry: "✗ Study Again",
    timelineAsk: "Ask Assistant about this →"
  },
  hi: {
    timelineAsk: "Ask Assistant about this →"
  },
  hi: {
    navAssistant: "सहायक", navQuiz: "प्रश्नोत्तरी", navFlashcard: "फ्लैशकार्ड", navTimeline: "समयरेखा",
    chatPlaceholder: "भारतीय चुनावों के बारे में पूछें...",
    btnSend: "भेजें", btnLang: "EN/हिं",
    suggest1: "नया वोटर आईडी कैसे बनाएं?", 
    suggest2: "वोट डालने की प्रक्रिया", 
    suggest3: "शिकायत कैसे दर्ज करें?",
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
    


    // Refresh Suggestions
    if (this.currentPage === 'assistant') {
        this.Chat.renderSuggestions([t.suggest1, t.suggest2, t.suggest3]);
        this.Chat.populateCommonQuestions();
    }
    
    // Update Dropdown Placeholder
    const select = document.getElementById('common-questions-select');
    if (select) {
        select.options[0].text = this.language === 'hi' ? "एक सामान्य प्रश्न चुनें..." : "Select a Common Question...";
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


      document.getElementById('common-questions-select').addEventListener('change', (e) => {
        if (e.target.value) {
          this.sendMessage(e.target.value);
          e.target.selectedIndex = 0; // Reset after sending
        }
      });
      
      this.populateCommonQuestions();

      // Welcome message logic
      if (App.chatHistory.length === 0) {
        const welcomeMsg = App.language === 'hi' 
          ? "🗳️ **नमस्ते! मैं चुनाव साथी हूँ**, आपका चुनाव सहायक। आज आप क्या जानना चाहेंगे?"
          : "🗳️ **Namaste! I am Chunav Saathi**, your Election Assistant. What would you like to know today?";
        
        // Use a flag to prevent double message
        if (!this.welcomeSent) {
          this.addBubble('bot', welcomeMsg);
          this.renderSuggestions([
            App.language === 'hi' ? "वोटर आईडी के लिए आवेदन" : "How to apply for Voter ID",
            App.language === 'hi' ? "मतदान की प्रक्रिया" : "Process of voting",
            App.language === 'hi' ? "नोटा (NOTA) क्या है?" : "What is NOTA?"
          ]);
          this.welcomeSent = true;
        }
      }

    },

    populateCommonQuestions() {
      const select = document.getElementById('common-questions-select');
      const questionsEN = [
        "What is democracy?",
        "Who conducts elections in India?",
        "What is the minimum voting age in India?",
        "How to apply for a new voter ID online?",
        "What documents are required for voter ID?",
        "Can I apply for voter ID at 17?",
        "How to check voter ID status?",
        "Can NRIs vote in India?",
        "Can prisoners vote?",
        "How to find my polling booth?",
        "What are the stages in Indian elections?",
        "Is EVM secure?",
        "What is NOTA?",
        "How to report election violations?",
        "What is cVIGIL app?",
        "What is SVEEP?"
      ];

      const questionsHI = [
        "लोकतंत्र क्या है?",
        "भारत में चुनाव कौन कराता है?",
        "भारत में मतदान की न्यूनतम आयु क्या है?",
        "नए वोटर आईडी के लिए ऑनलाइन आवेदन कैसे करें?",
        "वोटर आईडी के लिए कौन से दस्तावेज चाहिए?",
        "क्या मैं 17 साल की उम्र में वोटर आईडी के लिए आवेदन कर सकता हूँ?",
        "वोटर आईडी का स्टेटस कैसे चेक करें?",
        "क्या एनआरआई (NRI) भारत में वोट दे सकते हैं?",
        "क्या कैदी वोट दे सकते हैं?",
        "मेरा पोलिंग बूथ कहां है?",
        "भारतीय चुनावों के चरण क्या हैं?",
        "क्या ईवीएम सुरक्षित है?",
        "नोटा (NOTA) क्या है?",
        "चुनाव उल्लंघन की रिपोर्ट कैसे करें?",
        "cVIGIL ऐप क्या है?",
        "SVEEP क्या है?"
      ];
      
      const questions = this.language === 'hi' ? questionsHI : questionsEN;
      
      // Preserve the first (placeholder) option
      const placeholder = select.options[0];
      select.innerHTML = '';
      select.appendChild(placeholder);

      questions.forEach(q => {
        const opt = document.createElement('option');
        opt.value = q;
        opt.textContent = q;
        select.appendChild(opt);
      });
    },

    async sendMessage(text) {
      if (!text.trim()) return;
      document.getElementById('chat-input').value = '';
      
      this.addBubble('user', text);
      const loading = this.addLoadingBubble();
      
      App.chatHistory.push({ role: "user", parts: [{ text }] });

      try {
        const lowText = text.toLowerCase().trim();
        const isNext = ["next step", "अगला चरण", "next", "अगला", "आगे", "बताएं"].includes(lowText);
        
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: isNext ? "next" : text, 
            history: App.chatHistory, 
            lang: App.language 
          })
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `Server Error (${res.status})`);
        }

        const data = await res.json();
        
        if (loading) loading.remove();
        this.addBubble('bot', data.reply, data.progress);
        App.chatHistory.push({ role: "model", parts: [{ text: data.reply }] });
        
        const suggestions = data.suggestions && data.suggestions.length > 0 
          ? data.suggestions 
          : this.getSuggestions(data.reply);
          
        this.renderSuggestions(suggestions);
      } catch (e) {
        if (loading) loading.remove();
        const errorMsg = e.message.includes('Too many requests') 
          ? (App.language === 'hi' ? "बहुत अधिक अनुरोध। कृपया एक मिनट प्रतीक्षा करें।" : "Too many requests. Please wait a minute.")
          : (App.language === 'hi' ? "कनेक्शन त्रुटि। कृपया अपना इंटरनेट जांचें।" : "Connection error. Please check your internet.");
        this.addBubble('bot', errorMsg);
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

    addBubble(role, text, progress = null) {
      const div = document.createElement('div');
      div.className = role === 'user' ? 'bubble-user' : 'bubble-bot';
      
      let content = (role === 'bot' ? '🗳️ ' : '') + text;
      // Convert markdown-style bold to HTML
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      content = content.replace(/\n/g, '<br>');
      
      div.innerHTML = content;

      if (progress) {
        const progDiv = document.createElement('div');
        progDiv.className = 'chat-progress';
        progDiv.innerHTML = `
          <div class="progress-label">Step ${progress.current} of ${progress.total}</div>
          <div class="progress-track"><div class="progress-fill" style="width: ${(progress.current/progress.total)*100}%"></div></div>
        `;
        div.appendChild(progDiv);
      }

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
      
      document.getElementById('quiz-progress-inner').style.width = `${(this.state.current / this.state.questions.length) * 100}%`;
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
        <p style="font-size: 3rem; margin: 1rem 0;">${this.state.score} / ${this.state.questions.length}</p>
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
      const query = this.language === 'hi' 
        ? `भारतीय चुनावों में ${stageName} चरण के बारे में और बताएं।`
        : `Tell me more about the ${stageName} stage in Indian elections.`;
      
      input.value = query;
      // Also add the Hindi variations to knowledgeBase if not present
      setTimeout(() => App.Chat.sendMessage(query), 300);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
