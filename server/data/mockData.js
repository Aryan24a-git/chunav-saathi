const TIMELINE_DATA = [
  {
    stage: "Announcement",
    icon: "📢",
    days: "Day 0",
    description: "The Election Commission of India (ECI) announces the full schedule of the elections.",
    keyFact: "The Model Code of Conduct (MCC) is enforced immediately across the country.",
    learnMore: "mcc"
  },
  {
    stage: "Nomination",
    icon: "📝",
    days: "Day 1-14",
    description: "Candidates file their nomination papers and affidavits (Form 26).",
    keyFact: "Candidates must pay a security deposit of ₹25,000 for Lok Sabha contests.",
    learnMore: "nomination"
  },
  {
    stage: "Scrutiny",
    icon: "🔍",
    days: "Day 15",
    description: "Election officials examine all filed nominations for eligibility.",
    keyFact: "Nominations with incomplete details or eligibility issues are rejected.",
    learnMore: "scrutiny"
  },
  {
    stage: "Withdrawal",
    icon: "↩️",
    days: "Day 17",
    description: "Candidates who do not wish to contest can withdraw their names.",
    keyFact: "The final list of contesting candidates is frozen after this stage.",
    learnMore: "withdrawal"
  },
  {
    stage: "Campaign",
    icon: "🗣️",
    days: "15+ Days",
    description: "Parties and candidates outreach to voters via rallies and media.",
    keyFact: "Campaigning must stop 48 hours before the conclusion of polling.",
    learnMore: "campaigning"
  },
  {
    stage: "Polling",
    icon: "🗳️",
    days: "Poll Day",
    description: "Citizens visit polling booths to cast their votes using EVMs.",
    keyFact: "Indelible ink is applied to prevent duplicate voting.",
    learnMore: "voting process"
  },
  {
    stage: "Counting",
    icon: "🔢",
    days: "Result Day",
    description: "Votes recorded in EVMs are counted under strict supervision.",
    keyFact: "VVPAT slips from 5 random polling stations per assembly segment are verified.",
    learnMore: "counting"
  }
];

const ELECTION_CATEGORIES = [
  { id: 'basics', title: 'Election Basics', icon: '🗳️', count: 12 },
  { id: 'registration', title: 'Registration', icon: '📝', count: 8 },
  { id: 'tech', title: 'EVM & VVPAT', icon: '💻', count: 5 },
  { id: 'laws', title: 'Election Laws', icon: '⚖️', count: 6 }
];

module.exports = { TIMELINE_DATA, ELECTION_CATEGORIES };
