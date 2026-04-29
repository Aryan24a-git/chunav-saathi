const { handleMessage } = require('./chatbot');

const tests = [
    "Tell me more about the Nomination stage in Indian elections.",
    "how to make voter id",
    "process of voting",
    "what are the document need for voter id",
    "what is democracy?",
    "Can prisoners vote?",
    "Tell me more about the Polling stage in Indian elections."
];

console.log("--- CHUNAV SAATHI BRAIN TEST (STRICT) ---");
tests.forEach(q => {
    const res = handleMessage(q);
    console.log(`\nQ: ${q}`);
    console.log(`A: ${res.text.substring(0, 150)}...`);
    console.log(`Type: ${res.type} | Score: ${res.confidence}`);
});
