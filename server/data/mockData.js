const mockData = {
  assistant: {
    name: "Chunav Saathi",
    role: "Expert on Indian elections, voter rights, and ECI processes",
    language_supported: ["English", "Hindi"],
    strict_domain: true,
    out_of_scope_response: "I can only assist with Indian elections, voter rights, and Election Commission processes.",
    tone: "neutral, factual, law-grounded",
  },
  faqs: [
    {
      q: "Who conducts elections in India?",
      a: "The Election Commission of India conducts elections under Article 324 of the Constitution.",
    },
    {
      q: "What is the minimum age to vote?",
      a: "18 years, as per Article 326 of the Constitution.",
    },
    {
      q: "Is voter ID mandatory?",
      a: "No. Other approved IDs (Aadhaar, Passport, Driving License, PAN Card) can also be used as per ECI guidelines.",
    },
    {
      q: "What is NOTA?",
      a: "None Of The Above allows voters to reject all candidates.",
    },
    {
      q: "What is Form 6 used for in Indian elections?",
      a: "Form 6 is used for New voter registration, as per the Representation of the People Act, 1950.",
    },
    {
      q: "What is Form 7 used for?",
      a: "Form 7 is used for the Deletion of a name from the electoral roll.",
    },
    {
      q: "What is Form 8 used for?",
      a: "Form 8 is used for the Correction of details in the electoral roll.",
    },
  ],
};

module.exports = mockData;
