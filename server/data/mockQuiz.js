const QUIZ_DATA = {
  "ECI": [
    {
      question: "Which Article of the Constitution establishes the ECI?",
      options: ["Article 324", "Article 356", "Article 370", "Article 51A"],
      answer: 0,
      explanation: "Article 324 provides for the power of superintendence, direction, and control of elections."
    },
    {
      question: "Who appoints the Chief Election Commissioner?",
      options: ["Prime Minister", "President", "Chief Justice", "Parliament"],
      answer: 1,
      explanation: "The President of India appoints the CEC and other Election Commissioners."
    }
  ],
  "MCC": [
    {
      question: "When does the Model Code of Conduct come into effect?",
      options: ["When polling starts", "After nominations", "Immediately after ECI announcement", "1 month before election"],
      answer: 2,
      explanation: "MCC starts the moment ECI announces the election schedule."
    },
    {
      question: "Which app is used to report MCC violations?",
      options: ["cVIGIL", "Voter Helpline", "Garuda", "Suvidha"],
      answer: 0,
      explanation: "cVIGIL is specifically for reporting violations like bribery or hate speech."
    }
  ],
  "EVM/VVPAT": [
    {
      question: "What is the full form of VVPAT?",
      options: ["Voter Verified Paper Audit Trail", "Voter Verifiable Paper Audit Trail", "Visual Voter Paper Audit Trail", "Voter Validated Paper Audit Trail"],
      answer: 1,
      explanation: "VVPAT allows voters to see a paper slip verifying their vote."
    },
    {
      question: "How long does the VVPAT slip stay visible?",
      options: ["3 seconds", "5 seconds", "7 seconds", "10 seconds"],
      answer: 2,
      explanation: "The slip is visible for 7 seconds before falling into the box."
    }
  ],
  "Forms": [
    {
      question: "Which form is used for new voter registration?",
      options: ["Form 6", "Form 7", "Form 8", "Form 6A"],
      answer: 0,
      explanation: "Form 6 is for new voters (Indian citizens)."
    },
    {
      question: "Which form is used for deletion of name from roll?",
      options: ["Form 6", "Form 7", "Form 8", "Form 12"],
      answer: 1,
      explanation: "Form 7 is for objection to inclusion or deletion of a name."
    }
  ],
  "NOTA": [
    {
      question: "When was NOTA first introduced in India?",
      options: ["2009", "2013", "2014", "2019"],
      answer: 1,
      explanation: "NOTA was introduced following a 2013 Supreme Court judgment."
    }
  ],
  "Constituencies": [
    {
      question: "How many elected seats are in the Lok Sabha?",
      options: ["543", "545", "550", "250"],
      answer: 0,
      explanation: "There are 543 elected constituencies in the Lok Sabha."
    }
  ],
  "History": [
    {
      question: "When were the first General Elections held in India?",
      options: ["1947", "1950", "1951-52", "1955"],
      answer: 2,
      explanation: "The first elections were held between Oct 1951 and Feb 1952."
    }
  ],
  "Rights": [
    {
      question: "What is the minimum voting age in India?",
      options: ["18", "21", "25", "16"],
      answer: 0,
      explanation: "The 61st Amendment lowered the age from 21 to 18 in 1988."
    }
  ]
};

const HINDI_QUIZ_DATA = {
  "ECI": [
    {
      question: "चुनाव आयोग की स्थापना किस अनुच्छेद के तहत हुई है?",
      options: ["अनुच्छेद 324", "अनुच्छेद 356", "अनुच्छेद 370", "अनुच्छेद 51A"],
      answer: 0,
      explanation: "अनुच्छेद 324 चुनाव आयोग की शक्तियों का वर्णन करता है।"
    }
  ],
  "MCC": [
    {
      question: "आचार संहिता कब लागू होती है?",
      options: ["मतदान शुरू होने पर", "नामांकन के बाद", "चुनाव घोषणा के तुरंत बाद", "1 महीने पहले"],
      answer: 2,
      explanation: "चुनाव आयोग द्वारा कार्यक्रम की घोषणा के साथ ही यह लागू हो जाती है।"
    }
  ],
  "EVM/VVPAT": [
    {
      question: "वीवीपीएटी (VVPAT) की पर्ची कितने समय तक दिखती है?",
      options: ["3 सेकंड", "5 सेकंड", "7 सेकंड", "10 सेकंड"],
      answer: 2,
      explanation: "पर्ची 7 सेकंड के लिए कांच के पीछे दिखाई देती है।"
    }
  ],
  "Forms": [
    {
      question: "नया वोटर आईडी बनाने के लिए कौन सा फॉर्म भरते हैं?",
      options: ["फॉर्म 6", "फॉर्म 7", "फॉर्म 8", "फॉर्म 6A"],
      answer: 0,
      explanation: "फॉर्म 6 नए मतदाताओं के पंजीकरण के लिए है।"
    }
  ],
  "Rights": [
    {
      question: "भारत में वोट देने की न्यूनतम आयु क्या है?",
      options: ["18", "21", "25", "16"],
      answer: 0,
      explanation: "1988 में आयु 21 से घटाकर 18 कर दी गई थी।"
    }
  ]
};

// Default values for missing topics in Hindi to prevent errors
const topics = ['ECI', 'MCC', 'EVM/VVPAT', 'Forms', 'NOTA', 'Constituencies', 'History', 'Rights'];
topics.forEach(t => {
  if (!HINDI_QUIZ_DATA[t]) HINDI_QUIZ_DATA[t] = HINDI_QUIZ_DATA["ECI"]; // Fallback to ECI if topic missing
  if (!QUIZ_DATA[t]) QUIZ_DATA[t] = QUIZ_DATA["ECI"];
});

module.exports = { QUIZ_DATA, HINDI_QUIZ_DATA };
