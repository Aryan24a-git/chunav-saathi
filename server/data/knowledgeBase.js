const INTENT_DATA = {
  "greeting": {
    "en": [
      "🗳️ **Namaste! I am Chunav Saathi**, your Election Assistant.",
      "I can help you with:",
      "- Voter ID Registration & Forms",
      "- Understanding the Voting Process",
      "- Election Stages (Announcement to Results)",
      "- MCC Rules & reporting violations",
      "\nHow can I help you today?"
    ],
    "hi": [
      "🗳️ **नमस्ते! मैं हूँ चुनाव साथी**, आपका चुनावी सहायक।",
      "मैं आपकी मदद कर सकता हूँ:",
      "- वोटर आईडी पंजीकरण और फॉर्म",
      "- मतदान प्रक्रिया को समझना",
      "- चुनाव के चरण (घोषणा से परिणाम तक)",
      "- एमसीसी (आचार संहिता) नियम और उल्लंघन की रिपोर्ट करना",
      "\nआज मैं आपकी कैसे सहायता कर सकता हूँ?"
    ]
  }
};

const englishKnowledgeBase = [
  {
    q: "hello",
    keywords: ["namaste", "hello", "hi"],
    a: "🗳️ **Namaste! I am Chunav Saathi**, your Election Assistant."
  },
  // --- Common Questions & Definitions ---
  {
    q: "What is democracy?",
    keywords: ["democracy", "republic", "system"],
    a: "Democracy is a system of government where citizens exercise power by voting to elect their representatives."
  },
  {
    q: "Who conducts elections in India?",
    keywords: ["conduct", "eci", "body", "election commission"],
    a: "Elections in India are conducted by the Election Commission of India (ECI), an independent constitutional body under Article 324."
  },
  {
    q: "What is the minimum voting age in India?",
    keywords: ["age", "18", "eligible", "minimum age", "voting age"],
    a: "The minimum voting age in India is 18 years, as per the 61st Constitutional Amendment Act, 1988."
  },
  {
    q: "How to apply for a new voter ID online?",
    keywords: ["apply", "new voter", "registration", "form 6", "make id", "voter id online"],
    a: "You can apply online via the Voters Service Portal (voters.eci.gov.in). Use Form 6 for new registration.",
    steps: [
      "🌐 Step 1: Visit the official portal - Go to voters.eci.gov.in or download the Voter Helpline App.",
      "👤 Step 2: Sign Up - Create an account using your mobile number and email.",
      "📝 Step 3: Fill Form 6 - Select 'New Registration' and fill in your personal details, address, and date of birth.",
      "🖼️ Step 4: Upload Documents - You will need a photograph, proof of age (like Aadhaar), and proof of residence.",
      "✅ Step 5: Submit & Tracking - Once submitted, you'll get a reference ID to track your application status.",
      "🏠 Step 6: Verification - A Booth Level Officer (BLO) may visit your house for verification.",
      "✉️ Step 7: Delivery - Once approved, your EPIC (Voter ID card) will be delivered to your address by post."
    ]
  },
  {
    q: "What documents are required for voter ID?",
    keywords: ["documents", "required", "id proof", "address proof", "form 6 documents"],
    a: "To apply for a Voter ID, you need: 1. A passport-sized photograph, 2. Age proof (Aadhaar, Birth Certificate, or 10th Marksheet), and 3. Address proof (Aadhaar, Electric Bill, or Water Bill)."
  },
  {
    q: "Can I apply for voter ID at 17?",
    keywords: ["17", "advance", "application", "seventeen"],
    a: "Yes, you can apply at 17 years. Your name will be added to the roll as soon as you turn 18 on any of the qualifying dates (Jan 1, April 1, July 1, Oct 1)."
  },
  {
    q: "How to check voter ID status?",
    keywords: ["check status", "tracking", "reference id", "id status"],
    a: "You can check your Voter ID application status on the Voters Service Portal (voters.eci.gov.in) by entering the Reference ID you received after submitting Form 6."
  },
  {
    q: "Can NRIs vote in India?",
    keywords: ["nri", "overseas", "abroad", "passport"],
    a: "Yes, NRIs can vote in India. They must be physically present at their polling station in India with their original passport to cast their vote."
  },
  {
    q: "Can prisoners vote?",
    keywords: ["prisoner", "jail", "convict", "custody"],
    a: "In India, currently, persons confined in prison (whether under sentence or in police custody) are NOT allowed to vote under Section 62(5) of the RPA 1951."
  },
  {
    q: "How to find my polling booth?",
    keywords: ["polling booth", "where to vote", "location", "booth"],
    a: "You can find your polling booth on the ECI website (electoralsearch.in) or by using the Voter Helpline App by entering your EPIC number."
  },
  {
    q: "What are the stages in Indian elections?",
    keywords: ["stages", "how many stages", "election cycle", "10 stages", "process"],
    a: "Indian elections generally happen in 10 stages: Date Announcement, Notification, Nominations, Scrutiny, Withdrawal, Campaigning, Polling, Counting, and Results.",
    steps: [
      "📍 Stage 1: Announcement - ECI sets dates and enforces MCC.",
      "📝 Stage 2: Notification - Official call for election.",
      "🤝 Stage 3: Nominations - Candidates file papers.",
      "🔍 Stage 4: Scrutiny - Papers are checked for validity.",
      "🔙 Stage 5: Withdrawal - Candidates can opt out.",
      "📣 Stage 6: Manifesto - Parties release their plans.",
      "🚛 Stage 7: Campaigning - Public rallies and meetings.",
      "🗳️ Stage 8: Polling - Voting day at booths.",
      "📊 Stage 9: Counting - Votes are tallied securely.",
      "🏆 Stage 10: Results - Winners are declared."
    ]
  },
  {
    q: "Is EVM secure?",
    keywords: ["secure", "hacked", "tamper", "safe", "evm secure"],
    a: "Yes, EVMs are highly secure. They are standalone machines (not connected to the internet), use One-Time Programmable chips, and undergo multiple mock polls before the actual election."
  },
  {
    q: "What is NOTA?",
    keywords: ["nota", "none of the above", "rejection"],
    a: "NOTA (None of the Above) allows voters to officially register a vote of rejection for all candidates in the constituency. It was introduced in India in 2013."
  },
  {
    q: "How to report election violations?",
    keywords: ["report", "violations", "complain", "complaint", "mcc violation"],
    a: "You can report election or MCC violations using the ECI's cVIGIL app. It allows you to upload photos or videos of the incident, and action is typically taken within 100 minutes."
  },
  {
    q: "What is cVIGIL app?",
    keywords: ["cvigil", "app", "report tool"],
    a: "cVIGIL is an app where citizens can report MCC violations directly to the ECI with photos or videos."
  },
  {
    q: "What is SVEEP?",
    keywords: ["sveep", "awareness", "education", "participation"],
    a: "SVEEP (Systematic Voters' Education and Electoral Participation) is the flagship program of the ECI for voter education and awareness."
  },

  // --- Process Navigation Specifics ---
  {
    q: "Process of voting",
    keywords: ["process of voting", "how to vote", "voting process"],
    a: "The voting process at the polling booth is simple and secure.",
    steps: [
      "🚪 Step 1: Entry - Go to your designated polling booth.",
      "📄 Step 2: Verification - First polling officer checks your name on the electoral roll and ID.",
      "✍️ Step 3: Ink & Register - Second officer marks your finger with ink, takes a signature, and gives a slip.",
      "🗳️ Step 4: Voting - Hand slip to the third officer, go to the voting compartment, and press the button on the EVM.",
      "📄 Step 5: VVPAT - Check the VVPAT window for 7 seconds to confirm your vote.",
      "👋 Step 6: Exit - You have successfully cast your vote!"
    ]
  },

  // --- Timeline Specific Nodes (Matching TIMELINE_DATA in app.js) ---
  {
    q: "Announcement",
    keywords: ["announcement stage", "day 0", "mcc start"],
    a: "The Announcement stage is when ECI sets dates and enforces the Model Code of Conduct (MCC). MCC begins immediately."
  },
  {
    q: "Nomination",
    keywords: ["nomination stage", "form 26", "affidavit"],
    a: "Candidates submit Form 26 affidavits disclosing assets and criminal records, along with security deposits."
  },
  {
    q: "Scrutiny",
    keywords: ["scrutiny and withdrawal", "scrutiny stage"],
    a: "Officials examine papers for eligibility. Incomplete papers lead to rejection."
  },
  {
    q: "Campaign",
    keywords: ["campaigning stage", "rallies"],
    a: "Parties conduct outreach under MCC rules. Campaigning must stop 48 hours before the polls begin."
  },
  {
    q: "Polling",
    keywords: ["polling day", "voting day"],
    a: "Voters cast votes using EVMs at booths. Indelible ink is applied to prevent duplicate voting."
  },
  {
    q: "Counting",
    keywords: ["counting stage", "results"],
    a: "Votes are counted under strict supervision. VVPAT slips are partially verified to ensure accuracy."
  }
];

const hindiKnowledgeBase = [
  {
    q: "लोकतंत्र क्या है?",
    keywords: ["लोकतंत्र", "सरकार", "प्रणाली"],
    a: "लोकतंत्र सरकार की एक ऐसी प्रणाली है जहाँ नागरिक अपने प्रतिनिधियों को चुनने के लिए मतदान करके अपनी शक्ति का उपयोग करते हैं।"
  },
  {
    q: "भारत में चुनाव कौन कराता है?",
    keywords: ["चुनाव", "ईसीआई", "आयोग", "निर्वाचन आयोग"],
    a: "भारत में चुनाव भारत निर्वाचन आयोग (ECI) द्वारा कराए जाते हैं, जो अनुच्छेद 324 के तहत एक स्वतंत्र संवैधानिक निकाय है।"
  },
  {
    q: "भारत में मतदान की न्यूनतम आयु क्या है?",
    keywords: ["आयु", "18", "पात्र", "न्यूनतम उम्र", "मतदान की आयु"],
    a: "भारत में मतदान की न्यूनतम आयु 18 वर्ष है।"
  },
  {
    q: "नए वोटर आईडी के लिए ऑनलाइन आवेदन कैसे करें?",
    keywords: ["आवेदन", "नया वोटर", "पंजीकरण", "फॉर्म 6", "आईडी बनाएं", "ऑनलाइन"],
    a: "आप वोटर्स सर्विस पोर्टल (voters.eci.gov.in) के माध्यम से ऑनलाइन आवेदन कर सकते हैं। नए पंजीकरण के लिए फॉर्म 6 का उपयोग करें।",
    steps: [
      "🌐 चरण 1: पोर्टल पर जाएं - voters.eci.gov.in पर जाएं या वोटर हेल्पलाइन ऐप डाउनलोड करें।",
      "👤 चरण 2: साइन अप करें - अपने मोबाइल नंबर का उपयोग करके खाता बनाएं।",
      "📝 चरण 3: फॉर्म 6 भरें - व्यक्तिगत विवरण और पता भरें।",
      "🖼️ चरण 4: दस्तावेज अपलोड करें - फोटो, आयु प्रमाण और निवास प्रमाण अपलोड करें।",
      "✅ चरण 5: सबमिट करें - आपको स्टेटस ट्रैक करने के लिए एक संदर्भ आईडी मिलेगी।"
    ]
  },
  {
    q: "वोटर आईडी के लिए कौन से दस्तावेज चाहिए?",
    keywords: ["दस्तावेज", "डॉक्यूमेंट", "आधार", "फोटो"],
    a: "वोटर आईडी के लिए आपको चाहिए: 1. पासपोर्ट साइज फोटो, 2. आयु प्रमाण (आधार, जन्म प्रमाण पत्र), 3. निवास प्रमाण (बिजली बिल, आधार)।"
  },
  {
    q: "क्या मैं 17 साल की उम्र में वोटर आईडी के लिए आवेदन कर सकता हूँ?",
    keywords: ["17", "आवेदन", "अग्रिम", "सत्रह"],
    a: "हाँ, आप 17 साल की उम्र में आवेदन कर सकते हैं। आप 18 वर्ष के होते ही मतदाता सूची में जुड़ जाएंगे।"
  },
  {
    q: "वोटर आईडी का स्टेटस कैसे चेक करें?",
    keywords: ["स्टेटस", "चेक", "ट्रैक", "आईडी स्टेटस"],
    a: "आप voters.eci.gov.in पर जाकर अपने संदर्भ आईडी के माध्यम से स्थिति की जांच कर सकते हैं।"
  },
  {
    q: "क्या एनआरआई (NRI) भारत में वोट दे सकते हैं?",
    keywords: ["एनआरआई", "nri", "विदेश"],
    a: "हाँ, एनआरआई भारत में वोट दे सकते हैं, लेकिन उन्हें अपने पोलिंग बूथ पर व्यक्तिगत रूप से उपस्थित होना होगा।"
  },
  {
    q: "क्या कैदी वोट दे सकते हैं?",
    keywords: ["कैदी", "जेल", "वोट"],
    a: "भारत में जेल में बंद व्यक्तियों को वर्तमान में मतदान करने की अनुमति नहीं है।"
  },
  {
    q: "मेरा पोलिंग बूथ कहां है?",
    keywords: ["बूथ", "पोलिंग बूथ", "कहां है"],
    a: "आप 'electoralsearch.in' पर जाकर या 'Voter Helpline App' का उपयोग करके अपना पोलिंग बूथ खोज सकते हैं।"
  },
  {
    q: "भारतीय चुनावों के चरण क्या हैं?",
    keywords: ["चरण", "प्रक्रिया", "कितने चरण"],
    a: "भारतीय चुनाव 10 चरणों में होते हैं: घोषणा, अधिसूचना, नामांकन, जांच, वापसी, प्रचार, मतदान, गिनती और परिणाम।"
  },
  {
    q: "क्या ईवीएम सुरक्षित है?",
    keywords: ["ईवीएम सुरक्षित", "हैक", "सुरक्षित है"],
    a: "हाँ, ईवीएम पूरी तरह से सुरक्षित हैं। ये इंटरनेट से नहीं जुड़ी होती हैं।"
  },
  {
    q: "नोटा (NOTA) क्या है?",
    keywords: ["नोटा", "nota"],
    a: "नोटा मतदाताओं को सभी उम्मीदवारों को अस्वीकार करने का विकल्प देता है।"
  },
  {
    q: "चुनाव उल्लंघन की रिपोर्ट कैसे करें?",
    keywords: ["रिपोर्ट", "शिकायत", "उल्लंघन", "कंप्लेंट"],
    a: "आप cVIGIL ऐप के माध्यम से चुनाव उल्लंघन की रिपोर्ट कर सकते हैं।"
  },
  {
    q: "cVIGIL ऐप क्या है?",
    keywords: ["cVIGIL", "ऐप"],
    a: "cVIGIL एक ऐप है जहाँ नागरिक आचार संहिता के उल्लंघन की रिपोर्ट कर सकते हैं।"
  },
  {
    q: "SVEEP क्या है?",
    keywords: ["SVEEP", "जागरूकता"],
    a: "SVEEP मतदाता शिक्षा और जागरूकता फैलाने के लिए ईसीआई का कार्यक्रम है।"
  },
  {
    q: "मतदान की प्रक्रिया",
    keywords: ["मतदान की प्रक्रिया", "वोट कैसे डालें"],
    a: "मतदान की प्रक्रिया आसान है।",
    steps: [
      "🚪 चरण 1: पोलिंग बूथ पर जाएं।",
      "📄 चरण 2: अधिकारी आपकी आईडी चेक करेंगे।",
      "✍️ चरण 3: उंगली पर स्याही लगाई जाएगी।",
      "🗳️ चरण 4: ईवीएम पर बटन दबाकर वोट दें।",
      "📄 चरण 5: वीवीपीएटी में पर्ची देखें।"
    ]
  }
];

module.exports = { englishKnowledgeBase, hindiKnowledgeBase, INTENT_DATA };
