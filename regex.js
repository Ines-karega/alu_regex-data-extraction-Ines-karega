// Step 1: Import the 'fs' module to work with the file system // This allows us to read and write files
const fs = require("fs");

// Step 2: Read the content of 'sample-input.txt' file // We are reading the text from this file into a variable
const text = fs.readFileSync("sample-input.txt", "utf-8");

// Step 3: Define regular expressions (regex) for different patterns // Regex helps us find specific formats in the text

const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g; // This pattern matches email addresses
const urlRegex = /https?:\/\/[^\s]+/g; // This pattern matches web URLs
const phoneRegex = /(\+\(250\)\d{9}|07\d{2}-?\d{3}-?\d{3})/g; // This pattern matches phone numbers
const currencyRegex = /\$\d{1,3}(,\d{3})*(\.\d{2})?/g; // This pattern matches currency amounts
const cardRegex = /\b\d{4} \d{4} \d{4} \d{4}\b/g; // This pattern matches credit card numbers

// Step 4: Extract matches from the text // We will find all occurrences of each pattern in the text
const emails = text.match(emailRegex) || []; // This finds all email addresses in the text
const urls = text.match(urlRegex) || []; // This finds all URLs in the text
const phones = text.match(phoneRegex) || []; // This finds all phone numbers in the text
const currencies = text.match(currencyRegex) || []; // This finds all currency amounts in the text
const cards = text.match(cardRegex) || []; // This finds all credit card numbers in the text

// Step 5: Mask credit cards for security // We replace the first 12 digits with asterisks to protect sensitive information
const maskedCards = cards.map(card => "**** **** **** " + card.slice(-4));

// Step 6: Prepare JSON output // We create an object to hold all the extracted data in a structured format
const output = {
  emails, // List of extracted email addresses
  urls, // List of extracted URLs
  "phone numbers": phones, // List of extracted phone numbers
  "currency amounts": currencies, // List of extracted currency amounts
  credit_cards: maskedCards // List of masked credit card numbers
};

// Step 7: Write results to sample-output.json // We save the output object as a JSON file for easy access
fs.writeFileSync("sample-output.json", JSON.stringify(output, null, 2));

console.log("Data extracted successfully! Check sample-output.json"); // This message confirms that the data extraction is complete
