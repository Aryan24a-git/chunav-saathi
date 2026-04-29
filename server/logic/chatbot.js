const intentsData = require('../data/intents.json');
const { englishKnowledgeBase, hindiKnowledgeBase, INTENT_DATA } = require('../data/knowledgeBase');

/**
 * AI Logic Layer for Chunav Saathi
 * Supports Bilingual (English/Hindi) Datasets
 */

let flowState = {
  currentSteps: [],
  stepIndex: 0,
  lang: 'en'
};

let state = {
  currentIntent: null,
  currentStep: 0,
  lastQuery: ""
};

/**
 * Normalize Input
 */
function normalize(text) {
  if (!text) return "";
  return text.toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, "") 
    .replace(/\s+/g, " ") 
    .trim();
}

/**
 * Detect Intent with Language Context
 */
function detectIntent(input, lang = 'en') {
  const currentKB = lang === 'hi' ? hindiKnowledgeBase : englishKnowledgeBase;
  
  // Handle 'Stop' globally (Priority)
  const stopTriggers = ["stop process", "cancel", "end", "stop", "रद्द करें", "बंद करें", "रोकें"];
  if (stopTriggers.some(t => input === t || input.includes(t))) {
    return { intent: "stop", confidence: 5, type: 'command' };
  }

  // Handle 'Next' globally
  const nextTriggers = ["next", "continue", "अगला", "आगे", "बताएं", "कंटिन्यू", "next step"];
  if (nextTriggers.some(t => input.includes(t))) {
    if (flowState.currentSteps.length > 0) return { intent: "next", confidence: 3, type: 'flow' };
    if (state.currentIntent) return { intent: state.currentIntent, confidence: 2, type: 'workflow' };
  }

  // 0. Check Static Intents (Greetings, etc.)
  for (const key in INTENT_DATA) {
    const data = INTENT_DATA[key];
    const keywords = data.keywords || []; // Old format fallback
    const langKeywords = (lang === 'hi' ? ["नमस्ते", "नमस्ते", "नमस्ते", "हे", "हैलो"] : ["hi", "hello", "hey", "namaste"]);
    
    // Check if any keyword matches
    const allKeywords = [...keywords, ...langKeywords];
    if (allKeywords.some(k => input.includes(normalize(k)))) {
      return { intent: { ...data, response: data[lang] || data.response }, confidence: 2, type: 'static' };
    }
  }

  // 0.1 Check for EXACT FAQ match first
  const exactFaq = currentKB.find(item => normalize(item.q) === input);
  if (exactFaq) {
    return { intent: exactFaq, confidence: 3, type: 'faq' };
  }

  let bestMatch = null;
  let maxScore = 0;

  // 1. Check Workflows (Mostly English based keywords in intents.json)
  for (const key in intentsData) {
    const intent = intentsData[key];
    let currentScore = 0;
    
    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (input === normalizedKeyword) currentScore += 10;
      else if (input.includes(normalizedKeyword)) currentScore += 5;
    }
    
    if (currentScore > maxScore) {
      maxScore = currentScore;
      bestMatch = key;
    }
  }

  // 2. Check FAQ with fuzzy scoring
  let bestFaq = null;
  let maxFaqScore = 0;
  let maxFaqMatches = 0;
  
  currentKB.forEach(item => {
    const result = calculateFuzzyScore(input, normalize(item.q), lang);
    if (result.score > maxFaqScore || (result.score === maxFaqScore && result.matches > maxFaqMatches)) {
      maxFaqScore = result.score;
      maxFaqMatches = result.matches;
      bestFaq = item;
    }
  });

  // Decide between Workflow and FAQ
  if (maxFaqScore >= 1.5 || (maxFaqScore >= 1.0 && maxFaqScore > maxScore / 5)) {
    return { intent: bestFaq, confidence: maxFaqScore, type: 'faq' };
  }

  return { 
    intent: bestMatch, 
    confidence: maxScore >= 4 ? 2 : (maxScore >= 2 ? 1 : 0),
    type: 'workflow'
  };
}

/**
 * Fuzzy word overlap algorithm
 */
function calculateFuzzyScore(input, target, lang = 'en') {
  if (input === target) return { score: 3, matches: 10 }; 
  if (target.includes(input) || input.includes(target)) return { score: 2.5, matches: 5 };

  const commonWords = [
    'what', 'is', 'the', 'how', 'to', 'of', 'in', 'a', 'an', 'are', 'can', 'i', 'do', 
    'tell', 'me', 'more', 'about', 'details', 'detail', 'please', 'give', 'info', 'information',
    'election', 'elections', 'india', 'indian',
    'या', 'क्या', 'है', 'में', 'का', 'के', 'की', 'बताओ', 'बताएं', 'जानकारी', 'कैसे',
    'भारत', 'भारतीय', 'चुनाव'
  ];

  const inputWords = input.split(/\s+/).filter(w => w.length >= 1 && !commonWords.includes(w.toLowerCase()));
  const targetWords = target.split(/\s+/).filter(w => w.length >= 1 && !commonWords.includes(w.toLowerCase()));

  if (inputWords.length === 0) return { score: 0, matches: 0 };

  const highValueKeywords = [
    'announcement', 'nomination', 'scrutiny', 'withdrawal', 'campaigning', 'polling', 
    'counting', 'cvigil', 'vvpat', 'evm', 'nota', 'form', 'epic', 'nri', 'correction',
    'status', 'mcc', 'conduct',
    'पंजीकरण', 'मतदान', 'नामांकन', 'जांच', 'ईवीएम', 'नोटा', 'वोटर', 'आईडी'
  ];

  let matches = 0;
  let bonus = 0;
  
  inputWords.forEach(word => {
    const stem = word.endsWith('s') ? word.slice(0, -1) : word;
    const isMatch = targetWords.includes(word) || targetWords.some(tw => tw.startsWith(stem));
    
    if (isMatch) {
      matches++;
      if (highValueKeywords.includes(word) || highValueKeywords.includes(stem)) {
        bonus += 0.5;
      }
    }
  });

  const matchRatio = matches / inputWords.length;
  let score = 0;
  if (matchRatio >= 0.8) score = 2.2;
  else if (matchRatio >= 0.5) score = 1.8;
  else if (matchRatio >= 0.3) score = 1.2;
  
  return { score: score + bonus, matches };
}

/**
 * Generate Response
 */
function generateResponse(match, input, lang = 'en') {
  const { intent, confidence, type } = match;

  // Language specific terms
  const terms = {
    en: { next: "Next Step", stop: "Stop Process", completed: "✅ **Process completed!** How else can I help you?", menu: "Main Menu", start: "🚀 **Let's start the process:**" },
    hi: { next: "अगला चरण", stop: "प्रक्रिया रोकें", completed: "✅ **प्रक्रिया पूरी हुई!** मैं आपकी और क्या मदद कर सकता हूँ?", menu: "मुख्य मेनू", start: "🚀 **चलिए प्रक्रिया शुरू करते हैं:**" }
  };
  const t = terms[lang] || terms.en;

  // Handle "next" keyword for step-by-step flow
  const isNextTrigger = ["next", "अगला", "आगे", "बताएं", "continue"].some(tr => input.includes(tr));

  // 1. Handle Stop Command (Priority)
  if (type === 'command' && intent === 'stop') {
    flowState.currentSteps = [];
    flowState.stepIndex = 0;
    state.currentIntent = null;
    return {
      text: lang === 'hi' ? "🛑 प्रक्रिया रोक दी गई है। आप कुछ और पूछ सकते हैं।" : "🛑 Process stopped. You can ask me something else.",
      type: 'command',
      suggestions: lang === 'hi' ? ["मुख्य मेनू", "वोटर आईडी गाइड"] : ["Main Menu", "Voter ID Guide"]
    };
  }

  if (isNextTrigger && flowState.currentSteps.length > 0) {
    flowState.stepIndex++;
    if (flowState.stepIndex < flowState.currentSteps.length) {
      return {
        text: `➡️ **${flowState.currentSteps[flowState.stepIndex]}**`,
        type: 'flow',
        suggestions: [t.next, t.stop],
        progress: { current: flowState.stepIndex + 1, total: flowState.currentSteps.length }
      };
    } else {
      flowState.currentSteps = [];
      flowState.stepIndex = 0;
      return {
        text: t.completed,
        type: 'flow',
        suggestions: lang === 'hi' ? ["वोटर आईडी के लिए आवेदन", "वोट कैसे डालें", "मुख्य मेनू"] : ["Apply for Voter ID", "How to Vote", "Main Menu"]
      };
    }
  }

  // Fallback
  if (confidence === 0 || !intent) {
    flowState.currentSteps = []; 
    return {
      text: lang === 'hi' ? "🗳️ मुझे लगता है कि आप मतदाता सेवाओं के बारे में पूछ रहे हैं। इनमें से किसी एक को आज़माएं:" : "🗳️ I think you are asking about voter services. Try one of these:",
      suggestions: lang === 'hi' ? ["वोटर आईडी कैसे बनाएं", "वोट कैसे डालें", "कौन पात्र है"] : ["How to make voter ID", "How to vote", "Who is eligible to vote"],
      type: 'fallback'
    };
  }

  // Start new flow if answer contains "Step" or "चरण"
  const hasSteps = intent.a && (intent.a.includes("Step") || intent.a.includes("चरण") || intent.a.includes("\n"));
  if (type === 'faq' && hasSteps) {
    flowState.currentSteps = intent.a.split("\n");
    flowState.stepIndex = 0;
    return {
      text: `${t.start}\n\n➡️ **${flowState.currentSteps[0]}**`,
      type: 'flow',
      suggestions: [t.next, t.stop],
      progress: { current: 1, total: flowState.currentSteps.length }
    };
  } else if (!isNextTrigger) {
    flowState.currentSteps = [];
    flowState.stepIndex = 0;
  }

  if (type === 'static') {
    return {
      text: Array.isArray(intent.response) ? intent.response.join('\n') : intent.response,
      suggestions: lang === 'hi' ? ["वोटर आईडी कैसे बनाएं", "मतदान की प्रक्रिया", "चुनाव की समयरेखा"] : ["How to make Voter ID", "Process of Voting", "Election Timeline"],
      type: 'static'
    };
  }

  if (type === 'faq') {
    return {
      text: intent.a,
      suggestions: [t.menu],
      type: 'faq'
    };
  }

  // Workflow Logic (Default to English as per intents.json structure)
  const workflow = intentsData[intent];
  if (!workflow) return { text: "Error processing request.", type: "fallback" };

  state.currentIntent = intent;
  state.currentStep = 0;

  return {
    text: `📋 **Guide**: ${intent.replace(/_/g, ' ')}\n\n**Step 1**: ${workflow.steps[0]}`,
    suggestions: [t.next],
    type: "step"
  };
}


function handleMessage(userInput, lang = 'en') {
  const clean = normalize(userInput);
  const match = detectIntent(clean, lang);
  const response = generateResponse(match, clean, lang);
  return response;
}

module.exports = { handleMessage, normalize, detectIntent, generateResponse, state };
