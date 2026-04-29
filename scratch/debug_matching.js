const { knowledgeBase } = require('../server/data/knowledgeBase');

const STOP_WORDS = new Set([
  'what', 'is', 'the', 'tell', 'me', 'about', 'how', 'to', 'for', 'in', 'of', 'and', 'are', 'can', 'you', 'your', 'with', 'does', 'it', 'any', 'at', 'an', 'who', 'whom', 'where',
  'क्या', 'है', 'का', 'की', 'में', 'से', 'के', 'लिए', 'और', 'को', 'पर', 'हो', 'तो', 'भी', 'हैं'
]);

function getMatchDetails(query, target) {
  const clean = (str) => {
    let s = str.toLowerCase().replace(/[?.,!]/g, '');
    s = s.replace(/\beci\b/g, 'election commission india');
    return s.split(/\s+/).filter(w => (w.length > 1 || /\d/.test(w)) && !STOP_WORDS.has(w));
  };

  const qWords = clean(query);
  const tWords = clean(target);
  if (qWords.length === 0 || tWords.length === 0) return { score: 0 };

  const intersection = qWords.filter(qW => 
    tWords.some(tW => tW.includes(qW) || qW.includes(tW))
  );
  
  const queryCoverage = intersection.length / qWords.length;
  const targetCoverage = intersection.length / tWords.length;
  const score = (queryCoverage * 0.8) + (targetCoverage * 0.2);
  return { score };
}

const testQueries = [
  "what is nota",
  "tell me about nota",
  "what is process of voting",
  "how to register for vote",
  "form 6 use",
  "who is eci",
  "minimum age for voting",
  "वोटर आईडी कैसे बनवाएं",
  "नोटा क्या है"
];

console.log("Testing Knowledge Base Matching:\n");

testQueries.forEach(query => {
  let bestMatch = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    const { score } = getMatchDetails(query, item.q);
    const keywordCheck = query.toLowerCase().includes(item.q.toLowerCase().replace(/[?.,!]/g, '')) ? 0.9 : 0;
    const finalScore = Math.max(score, keywordCheck);

    if (finalScore > highestScore) {
      highestScore = finalScore;
      bestMatch = item;
    }
  }

  console.log(`Query: "${query}"`);
  console.log(`Best Match: "${bestMatch ? bestMatch.q : 'NONE'}" (Score: ${highestScore.toFixed(2)})`);
  
  if (highestScore > 0.75) {
    console.log(`Action: DIRECT ANSWER`);
  } else if (highestScore > 0.4) {
    console.log(`Action: SUGGESTION`);
  } else {
    // Keyword search logic matching production
    const words = query.toLowerCase().split(' ').filter(w => w.length > 3);
    const keywordMatches = knowledgeBase.filter(item => 
      words.some(w => item.q.toLowerCase().includes(w) || item.a.toLowerCase().includes(w))
    );

    if (keywordMatches.length > 0) {
      keywordMatches.sort((a, b) => {
        const countA = words.filter(w => a.q.toLowerCase().includes(w) || a.a.toLowerCase().includes(w)).length;
        const countB = words.filter(w => b.q.toLowerCase().includes(w) || b.a.toLowerCase().includes(w)).length;
        return countB - countA;
      });
      console.log(`Action: KEYWORD MATCH ("${keywordMatches[0].q}")`);
    } else {
      console.log(`Action: FALLBACK`);
    }
  }
  console.log("-".repeat(40));
});
