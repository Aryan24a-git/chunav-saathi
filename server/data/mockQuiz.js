const QUIZ_DATA = {
  "Basics": [
    {
      question: "What is the minimum age to vote in India?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      answer: 1,
      explanation: "The voting age was lowered from 21 to 18 by the 61st Amendment Act in 1988."
    },
    {
      question: "Which body conducts the Lok Sabha elections?",
      options: ["State Government", "Supreme Court", "Election Commission of India", "NITI Aayog"],
      answer: 2,
      explanation: "The ECI is an autonomous constitutional authority responsible for administering election processes in India."
    },
    {
      question: "Which Constitutional Amendment lowered the voting age from 21 to 18?",
      options: ["42nd Amendment", "44th Amendment", "61st Amendment", "73rd Amendment"],
      answer: 2,
      explanation: "The 61st Amendment Act of 1988 reduced the voting age to 18."
    },
    {
      question: "What is the maximum number of candidates an EVM can support?",
      options: ["16", "32", "64", "128"],
      answer: 2,
      explanation: "One EVM (Balloting Unit) supports 16 candidates; up to 4 BUs can be linked for a total of 64 candidates."
    }
  ],
  "Voter ID": [
    {
      question: "Which form is used for new voter registration?",
      options: ["Form 7", "Form 8", "Form 6", "Form 12"],
      answer: 2,
      explanation: "Form 6 is specifically used for registration of new voters."
    },
    {
      question: "Can a 17-year-old apply for a Voter ID?",
      options: ["No, only after 18", "Yes, but only offline", "Yes, as an advance application", "Only if they are married"],
      answer: 2,
      explanation: "ECI allows 17+ year olds to apply in advance for their name to be added when they turn 18."
    },
    {
      question: "What does 'EPIC' stand for in Voter ID?",
      options: ["Election Photo Identity Card", "Electoral Photo Identification Card", "Election Paper Identity Card", "Electoral Process Identity Card"],
      answer: 1,
      explanation: "EPIC stands for Electoral Photo Identity Card."
    }
  ],
  "EVM & Tech": [
    {
      question: "What does VVPAT stand for?",
      options: ["Voter Verified Paper Audit Trail", "Voter Verifiable Paper Audit Trail", "Visual Voter Paper Audit Trail", "Voter Validated Paper Audit Trail"],
      answer: 1,
      explanation: "VVPAT allows voters to verify that their vote was cast correctly."
    },
    {
      question: "Is an EVM connected to the Internet?",
      options: ["Yes, for real-time counting", "No, it is a standalone machine", "Only during the final counting", "Only if GPS is enabled"],
      answer: 1,
      explanation: "Indian EVMs are standalone, non-networked machines to prevent hacking."
    },
    {
      question: "How long is the VVPAT slip visible behind the glass?",
      options: ["3 seconds", "7 seconds", "10 seconds", "15 seconds"],
      answer: 1,
      explanation: "The VVPAT slip stays visible for 7 seconds before falling into the sealed box."
    }
  ],
  "Stages & Laws": [
    {
      question: "When does the Model Code of Conduct (MCC) begin?",
      options: ["When nominations start", "Immediately after ECI announces dates", "One week before polling", "On the day of counting"],
      answer: 1,
      explanation: "MCC comes into effect immediately upon the announcement of the election schedule."
    },
    {
      question: "Which app allows reporting of MCC violations within 100 minutes?",
      options: ["BHIM", "cVIGIL", "mParivahan", "Garuda"],
      answer: 1,
      explanation: "cVIGIL allows citizens to report violations with photo/video evidence."
    },
    {
      question: "What is the maximum limit of election expenditure for a Lok Sabha candidate?",
      options: ["50 Lakhs", "75 Lakhs", "95 Lakhs", "1.5 Crore"],
      answer: 2,
      explanation: "The expenditure limit for a Lok Sabha candidate is up to 95 Lakhs in larger states."
    }
  ]
};

module.exports = QUIZ_DATA;
