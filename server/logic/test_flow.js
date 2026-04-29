const { handleMessage } = require('./chatbot');

console.log("--- CHUNAV SAATHI FLOW TEST ---");

console.log("\n1. Triggering Step-by-Step FAQ...");
let res1 = handleMessage("how to make voter id");
console.log(`A1: ${res1.text}`);
console.log(`Suggestions: ${res1.suggestions}`);

console.log("\n2. Sending 'next' for FAQ Flow...");
let res2 = handleMessage("next");
console.log(`A2: ${res2.text}`);

console.log("\n3. Sending 'next' again...");
let res3 = handleMessage("next");
console.log(`A3: ${res3.text}`);

console.log("\n4. Triggering Workflow...");
let res4 = handleMessage("Apply online");
console.log(`A4: ${res4.text}`);

console.log("\n5. Sending 'next' for Workflow...");
let res5 = handleMessage("next");
console.log(`A5: ${res5.text}`);
