// Import the 'fs' module inorder to be able to read and write in files 
const fs = require("fs");

// Read the content of 'sample-input.txt' file in the text variable 
const text = fs.readFileSync("sample-input.txt", "utf-8");

// Regex patterns with short explanations:
// - emailRegex: matches common email formats (user@domain.tld, supports dots and hyphens)
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
// - urlRegex: matches http/https URLs (stops at whitespace)
const urlRegex = /https?:\/\/[^\s)]+/g;
// - phoneRegex: matches common phone formats with optional country code
const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
// - currencyRegex: matches dollar amounts like $1,234.56 or $19.99
const currencyRegex = /\$\d{1,3}(,\d{3})*(\.\d{2})?/g;
// - cardRegex: matches 16-digit cards in groups separated by space or dash
const cardRegex = /\b(?:\d{4}[- ]?){3}\d{4}\b/g;

// Helper: remove trailing punctuation that often gets picked up in text (.,;:)
function clean(s) {
  return String(s).replace(/[.,;:!?]+$/g, "").trim();
}

// Simple safety check: reject obvious script-like or data URIs and inline event handlers
function isSafe(s) {
  const str = String(s);
  return !(/<\s*script\b|javascript:|data:text\/html|on\w+\s*=|<\s*iframe\b/i.test(str));
}

// Extract and clean matches for a given regex (keeps only safe results)
function extractAndClean(regex) {
  const found = text.match(regex) || [];
  const out = [];
  for (let i = 0; i < found.length; i++) {
    const c = clean(found[i]);
    if (c && isSafe(c)) out.push(c);
  }
  return out;
}

let emails = extractAndClean(emailRegex);
let urls = extractAndClean(urlRegex);
let phones = extractAndClean(phoneRegex);
let currencies = extractAndClean(currencyRegex);
let cards = extractAndClean(cardRegex);

// Masking functions (simple and safe):
function maskEmail(email) {
  // hide the local-part entirely and keep the domain
  return "***@" + String(email).split("@").slice(1).join("@");
}

function maskCard(cardNumber) {
  return "**** **** **** " + String(cardNumber).slice(-4);
}

// Mask all found sensitive items using clear loops (easy to follow)
const maskedEmails = [];
for (let i = 0; i < emails.length; i++) {
  maskedEmails.push(maskEmail(emails[i]));
}

const maskedCards = [];
for (let i = 0; i < cards.length; i++) {
  maskedCards.push(maskCard(cards[i]));
}

// creating an object called output that groups all the results (emails, URLs, phone numbers, currency amounts, and credit cards) into one place
const output = {
  emails: maskedEmails,
  urls: urls,
  "phone numbers": phones,
  "currency amounts": currencies,
  "credit_cards": maskedCards
};

// Write results to sample-output.json file (masked and filtered)
fs.writeFileSync("sample-output.json", JSON.stringify(output, null, 2));
console.log("-----Extracted Results (masked/filtered)------");
console.log(JSON.stringify(output, null, 2));
console.log("Results saved to sample-output.json");
