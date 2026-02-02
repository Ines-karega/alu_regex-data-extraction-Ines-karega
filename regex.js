// Import fs module to read and write files
const fs = require("fs");

// Opens the file "sample-input.txt", reads all the texts inside it as proper letters and symbols using UTF-8, and stores those texts in the variable named text
const text = fs.readFileSync("sample-input.txt", "utf-8");

// Regex patterns to find different data types in the input text:

// This regex builds the shape of an email by looking for a name part, then an @ symbol, then a domain name, then a dot and ending letters
const EmailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
// This regex matches the shape of a website link by looking for http or https, then ://, then keeps reading characters until a space
const UrlRegex = /https?:\/\/[^\s)]+/g;
// This regex matches the shape of a phone number by looking for an optional country code, then an area code, then groups of digits separated by spaces, dashes, or dots
const PhoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
// This regex matches the shape of a currency amount by looking for a $ sign, then digits, optional commas for thousands, and it requires exactly two digits after a decimal point (cents)
const CurrencyRegex = /\$\d{1,3}(,\d{3})*(\.\d{2})\b/g;
// This regex matches the shape of a creditcard number by looking for 16 digits grouped into 4s, with optional spaces or dashes between groups
const CardRegex = /\b(?:\d{4}[- ]?){3}\d{4}\b/g;


// Stores all email addresses found in the input text that match the email regex pattern, and if none are found it stays empty
let emails = text.match(EmailRegex) || [];
// Stores all website links found in the input text that match the URL regex pattern, and if none are found it stays empty
let urls = text.match(UrlRegex) || [];
// Stores all phone numbers found in the input text that match the phone regex pattern, and if none are found it stays empty
let phone_nbrs = text.match(PhoneRegex) || [];
// Stores all money amounts found in the input text that match the currency regex pattern, and if none are found it stays empty
let currencies = text.match(CurrencyRegex) || [];
// Stores all credit card numbers found in the input text that match the card regex pattern, and if none are found it stays empty
let credit = text.match(CardRegex) || [];


// Function to hide email by keeping the first letter, then *** and then later show the domain
function maskEmail(email) { 
  return email[0] + "***@" + email.split("@")[1]; 
}

// Function to hide the credit card number using **** and then show only the last 4 digits
function maskCard(cardNumber) {
  return "**** **** **** " + cardNumber.slice(-4);
}

// This function checks if the text is safe by looking for dangerous parts like <script> or javascript:, and returns false if it finds them, otherwise true
function isSafe(value) { 
  const blocked = ["<script", "</script>", "javascript:"]; 
  for (let bad of blocked) { 
    if (value.toLowerCase().includes(bad)) return false; // change text to lowercase and check if it contains one of the blocked words
  } return true; 
}

//removing anything unsafe by calling the isSafe check function on each data type
emails = emails.filter(isSafe); // filter out unsafe emails
urls = urls.filter(isSafe); // filter out unsafe urls
phone_nbrs = phone_nbrs.filter(isSafe); // filter out unsafe phone numbers
currencies = currencies.filter(isSafe); // filter out unsafe currency amounts
credit = credit.filter(isSafe); // filter out unsafe credit card numbers

// Goes through the emails list, changes it by calling the maskEmail function, makes a new list with the masked emails and then stores it in a variable
const maskedEmails = emails.map(maskEmail);

// Goes through the credit list, calls maskCard function on each, makes a new list of masked card numbers and stores it in a variable
const maskedCards = credit.map(maskCard);

// Putting all results into the output object
const outputs = {
  "emails": maskedEmails,
  "urls": urls,
  "phone numbers": phone_nbrs,
  "currency amounts": currencies,
  "credit_cards": maskedCards
};

// Save results to sample-output.txt file 
fs.writeFileSync("sample-output.txt", JSON.stringify(outputs, null, 2));
// displays results in the console while maintaining the json format 
console.log("-----Extracted Results------");
console.log(JSON.stringify(outputs, null, 2));
console.log("The above results are saved to sample-output.txt file");
