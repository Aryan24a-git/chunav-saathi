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
    q: "how to make voter id",
    a: "Step 1: Go to NVSP portal or Voter Helpline app\nStep 2: Fill Form 6\nStep 3: Upload ID, age and address proof\nStep 4: Submit and track status",
    keywords: ["make", "apply", "id", "card", "registration", "new"],
    category: "registration"
  },
  {
    q: "how to apply for voter id",
    a: "Apply online using Form 6 or visit Electoral Office → Submit documents → Verification → Approval",
    keywords: ["apply", "id", "card", "process"],
    category: "registration"
  },
  {
    q: "how long does voter registration take",
    a: "It usually takes 2 to 4 weeks after verification",
    keywords: ["time", "long", "duration", "days"],
    category: "registration"
  },
  {
    q: "what documents are needed for voter id",
    a: "Age proof, identity proof, and address proof",
    keywords: ["documents", "needed", "proof", "papers"],
    category: "registration"
  },
  {
    q: "what documents are needed for form 6",
    a: "Age proof, identity proof, address proof, passport photo",
    keywords: ["form 6", "documents", "list"],
    category: "registration"
  },
  {
    q: "who is eligible to vote",
    a: "Any Indian citizen aged 18 or above and registered in voter list",
    keywords: ["eligible", "who", "age", "18"],
    category: "voting"
  },
  {
    q: "how to vote",
    a: "Step 1: Visit polling booth\nStep 2: Verify identity\nStep 3: Finger ink\nStep 4: Press EVM button\nStep 5: Verify via VVPAT",
    keywords: ["vote", "how to", "procedure"],
    category: "voting"
  },
  {
    q: "what is the process of voting",
    a: "Identity check → Ink mark → Vote in EVM → VVPAT confirmation",
    keywords: ["process", "steps", "voting"],
    category: "voting"
  },
  {
    q: "tell me more about nomination stage",
    a: "In nomination stage, candidates submit forms, documents and security deposit to contest election",
    keywords: ["nomination", "stage", "candidate"],
    category: "stages"
  },
  {
    q: "tell me more about scrutiny stage",
    a: "Officials verify nomination papers and eligibility of candidates",
    keywords: ["scrutiny", "stage", "verification"],
    category: "stages"
  },
  {
    q: "tell me more about polling stage",
    a: "Voters cast votes at polling booths using EVM under strict security",
    keywords: ["polling", "stage", "election day"],
    category: "stages"
  },
  {
    q: "tell me more about announcement stage",
    a: "The announcement stage is when the Election Commission of India declares the full election schedule, including nomination, polling, and counting dates. It also enforces the Model Code of Conduct, ensuring fair elections by restricting government actions and campaign behavior.",
    keywords: ["announcement", "stage", "schedule", "mcc"],
    category: "faq"
  },
  {
    q: "tell me more about campaigning stage",
    a: "Candidates and parties share their vision and appeal for votes through rallies, meetings, and manifestos.",
    keywords: ["campaign", "campaigning", "stage", "rally"],
    category: "stages"
  },
  {
    q: "tell me more about counting stage",
    a: "Votes recorded in EVMs are counted under strict supervision of the Returning Officer and candidate agents.",
    keywords: ["counting", "stage", "votes"],
    category: "stages"
  },
  {
    q: "tell me more about results stage",
    a: "The final results are declared by the Election Commission, and successful candidates are officially certified.",
    keywords: ["results", "stage", "winner", "declaration"],
    category: "stages"
  },
  {
    q: "What is NOTA?",
    a: "**NOTA** stands for 'None of the Above'. It is an option on the EVM that allows you to officially record that you do not support any of the candidates.",
    keywords: ["nota", "none", "above"]
  },
  {
    q: "What is democracy?",
    a: "Democracy is a system of government where the citizens exercise power by voting. In India, we have a representative democracy where we elect leaders to make laws on our behalf.",
    keywords: ["democracy", "system", "government"]
  },
  {
    q: "Who conducts elections in India?",
    a: "Elections in India are conducted by the **Election Commission of India (ECI)**, an autonomous constitutional body established under **Article 324**.",
    keywords: ["who conducts", "eci", "body", "election commission"]
  },
  {
    q: "Is EVM secure?",
    a: "Yes, Indian **EVMs** are standalone machines. They are not connected to the internet, Bluetooth, or any network. They use OTP (One-Time Programmable) chips, ensuring they cannot be hacked remotely.",
    keywords: ["evm", "secure", "hack", "tamper", "safe"]
  },
  {
    q: "What is cVIGIL app?",
    a: "**cVIGIL** is a mobile app by ECI that allows citizens to report Model Code of Conduct violations (like bribes or illegal banners) with photo or video evidence. Action is taken within 100 minutes.",
    keywords: ["cvigil", "app", "report", "violation"]
  },
  {
    q: "What is the minimum voting age in India?",
    a: "The minimum voting age in India is **18 years**. This was reduced from 21 years by the 61st Amendment Act in 1988.",
    keywords: ["age", "minimum", "voting", "18"]
  },
  {
    q: "How to find my polling booth?",
    a: "You can find your polling booth by visiting the **ECI Voter Portal** and entering your EPIC number or searching by name and state details.",
    keywords: ["booth", "polling", "find", "location"]
  }
];

const hindiKnowledgeBase = [
  {
    q: "वोटर आईडी कैसे बनाएं?",
    a: "चरण 1: NVSP पोर्टल या वोटर हेल्पलाइन ऐप पर जाएं\nचरण 2: फॉर्म 6 भरें\nचरण 3: आईडी, आयु और पते का प्रमाण अपलोड करें\nचरण 4: जमा करें और स्थिति को ट्रैक करें",
    keywords: ["बनाएं", "आवेदन", "आईडी", "कार्ड", "पंजीकरण", "नया"],
    category: "registration"
  },
  {
    q: "वोटर आईडी के लिए आवेदन कैसे करें?",
    a: "फॉर्म 6 का उपयोग करके ऑनलाइन आवेदन करें या चुनावी कार्यालय जाएं → दस्तावेज जमा करें → सत्यापन → स्वीकृति",
    keywords: ["आवेदन", "आईडी", "कार्ड", "प्रक्रिया"],
    category: "registration"
  },
  {
    q: "वोटर पंजीकरण में कितना समय लगता है?",
    a: "सत्यापन के बाद आमतौर पर 2 से 4 सप्ताह का समय लगता है",
    keywords: ["समय", "कितना", "अवधि", "दिन"],
    category: "registration"
  },
  {
    q: "वोटर आईडी के लिए कौन से दस्तावेज चाहिए?",
    a: "आयु प्रमाण, पहचान प्रमाण और पते का प्रमाण",
    keywords: ["दस्तावेज", "चाहिए", "प्रमाण", "कागज"],
    category: "registration"
  },
  {
    q: "फॉर्म 6 के लिए कौन से दस्तावेज चाहिए?",
    a: "आयु प्रमाण, पहचान प्रमाण, पते का प्रमाण, पासपोर्ट फोटो",
    keywords: ["फॉर्म 6", "दस्तावेज", "सूची"],
    category: "registration"
  },
  {
    q: "वोट डालने के लिए कौन पात्र है?",
    a: "कोई भी भारतीय नागरिक जिसकी आयु 18 वर्ष या उससे अधिक है और मतदाता सूची में पंजीकृत है",
    keywords: ["पात्र", "कौन", "उम्र", "18"],
    category: "voting"
  },
  {
    q: "वोट कैसे डालें?",
    a: "चरण 1: मतदान केंद्र पर जाएं\nचरण 2: पहचान सत्यापित करें\nचरण 3: उंगली पर स्याही लगवाएं\nचरण 4: ईवीएम बटन दबाएं\nचरण 5: वीवीपीएटी के माध्यम से सत्यापित करें",
    keywords: ["वोट", "कैसे", "प्रक्रिया"],
    category: "voting"
  },
  {
    q: "मतदान की प्रक्रिया क्या है?",
    a: "पहचान की जांच → स्याही का निशान → ईवीएम में वोट → वीवीपीएटी पुष्टिकरण",
    keywords: ["प्रक्रिया", "चरण", "मतदान"],
    category: "voting"
  },
  {
    q: "नामांकन चरण के बारे में और बताएं",
    a: "नामांकन चरण में, उम्मीदवार चुनाव लड़ने के लिए फॉर्म, दस्तावेज और सुरक्षा जमा राशि जमा करते हैं",
    keywords: ["नामांकन", "चरण", "उम्मीदवार"],
    category: "stages"
  },
  {
    q: "जांच चरण के बारे में और बताएं",
    a: "अधिकारी नामांकन पत्रों और उम्मीदवारों की पात्रता की पुष्टि करते हैं",
    keywords: ["जांच", "चरण", "सत्यापन"],
    category: "stages"
  },
  {
    q: "मतदान चरण के बारे में और बताएं",
    a: "मतदाता कड़ी सुरक्षा के बीच ईवीएम का उपयोग करके मतदान केंद्रों पर वोट डालते हैं",
    keywords: ["मतदान", "चरण", "चुनाव का दिन"],
    category: "stages"
  },
  {
    q: "घोषणा चरण के बारे में और बताएं",
    a: "घोषणा चरण वह है जब भारत का चुनाव आयोग नामांकन, मतदान और मतगणना की तारीखों सहित पूर्ण चुनाव कार्यक्रम की घोषणा करता है। यह सरकारी कार्यों और अभियान व्यवहार को प्रतिबंधित करके निष्पक्ष चुनाव सुनिश्चित करते हुए आदर्श आचार संहिता को भी लागू करता है।",
    keywords: ["घोषणा", "चरण", "कार्यक्रम", "आचार संहिता"],
    category: "faq"
  },
  {
    q: "प्रचार चरण के बारे में और बताएं",
    a: "उम्मीदवार और दल रैलियों, सभाओं और घोषणापत्रों के माध्यम से अपना दृष्टिकोण साझा करते हैं और वोटों की अपील करते हैं।",
    keywords: ["प्रचार", "चरण", "रैली", "सभा"],
    category: "stages"
  },
  {
    q: "मतगणना चरण के बारे में और बताएं",
    a: "ईवीएम में दर्ज वोटों की गिनती रिटर्निंग ऑफिसर और उम्मीदवार एजेंटों की कड़ी निगरानी में की जाती है।",
    keywords: ["गिनती", "मतगणना", "चरण", "वोट"],
    category: "stages"
  },
  {
    q: "परिणाम चरण के बारे में और बताएं",
    a: "अंतिम परिणाम चुनाव आयोग द्वारा घोषित किए जाते हैं, और सफल उम्मीदवारों को आधिकारिक रूप से प्रमाणित किया जाता है।",
    keywords: ["परिणाम", "चरण", "विजेता", "घोषणा"],
    category: "stages"
  },
  {
    q: "नोटा (NOTA) क्या है?",
    a: "**नोटा** का अर्थ है 'इनमें से कोई नहीं'। यह ईवीएम पर एक विकल्प है जो आपको आधिकारिक रूप से यह दर्ज करने की अनुमति देता है कि आप किसी भी उम्मीदवार का समर्थन नहीं करते हैं।",
    keywords: ["नोटा", "कोई", "नहीं", "ऊपर"]
  },
  {
    q: "लोकतंत्र क्या है?",
    a: "लोकतंत्र सरकार की एक प्रणाली है जहां नागरिक मतदान करके शक्ति का प्रयोग करते हैं। भारत में, हमारे पास एक प्रतिनिधि लोकतंत्र है जहां हम अपनी ओर से कानून बनाने के लिए नेताओं को चुनते हैं।",
    keywords: ["लोकतंत्र", "प्रणाली", "सरकार"]
  },
  {
    q: "भारत में चुनाव कौन कराता है?",
    a: "भारत में चुनाव **भारतीय चुनाव आयोग (ECI)** द्वारा आयोजित किए जाते हैं, जो अनुच्छेद 324 के तहत स्थापित एक स्वायत्त संवैधानिक निकाय है।",
    keywords: ["कौन कराता", "ईसीआई", "निकाय", "चुनाव आयोग"]
  },
  {
    q: "क्या ईवीएम सुरक्षित है?",
    a: "हाँ, भारतीय **ईवीएम** स्टैंडअलोन मशीनें हैं। वे इंटरनेट, ब्लूटूथ या किसी नेटवर्क से जुड़ी नहीं हैं। वे ओटीपी (वन-टाइम प्रोग्रामेबल) चिप्स का उपयोग करते हैं, जिससे यह सुनिश्चित होता है कि उन्हें दूरस्थ रूप से हैक नहीं किया जा सकता है।",
    keywords: ["ईवीएम", "सुरक्षित", "हैक", "छेड़छाड़", "सेफ"]
  },
  {
    q: "cVIGIL ऐप क्या है?",
    a: "**cVIGIL** ईसीआई द्वारा एक मोबाइल ऐप है जो नागरिकों को फोटो या वीडियो साक्ष्य के साथ आदर्श आचार संहिता के उल्लंघन (जैसे रिश्वत या अवैध बैनर) की रिपोर्ट करने की अनुमति देता है। 100 मिनट के भीतर कार्रवाई की जाती है।",
    keywords: ["cVIGIL", "ऐप", "रिपोर्ट", "उल्लंघन"]
  },
  {
    q: "भारत में मतदान की न्यूनतम आयु क्या है?",
    a: "भारत में मतदान की न्यूनतम आयु **18 वर्ष** है। इसे 1988 में 61वें संशोधन अधिनियम द्वारा 21 वर्ष से घटाकर 18 वर्ष कर दिया गया था।",
    keywords: ["आयु", "न्यूनतम", "मतदान", "18"]
  },
  {
    q: "अपना मतदान केंद्र कैसे खोजें?",
    a: "आप **ईसीआई वोटर पोर्टल** पर जाकर और अपना ईपीआईसी नंबर दर्ज करके या नाम और राज्य के विवरण खोजकर अपना मतदान केंद्र पा सकते हैं।",
    keywords: ["बूथ", "मतदान", "खोज", "स्थान"]
  }
];

module.exports = { englishKnowledgeBase, hindiKnowledgeBase, INTENT_DATA };
