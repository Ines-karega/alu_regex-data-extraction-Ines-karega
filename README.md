# alu_regex-data-extraction- 
A short project that extracts useful data from messy text and protects sensitive pieces.

## Project overview
This program reads a text file, finds common data (emails, links, phone numbers, money, credit-card-like numbers), performs simple validation, masks sensitive values, and saves the results as JSON.

## What I implemented
- Extraction of the following data types: **Emails, URLs, Phone numbers, Currency amounts, Credit card numbers**.
- Simple validation and filtering to ignore likely unsafe or malformed matches (e.g: data URIs, obvious broken formats).
- Masking of sensitive fields so outputs do not reveal full personal data (emails : `(first letter)***(@domain)`, cards:`**** **** **** (last four digits)`).

## Input design
- `sample-input.txt` contains realistic, messy examples: variations in spacing, punctuation, separators (spaces, dashes, dots), and some malformed/malicious inputs to test filtering.It is the file the program reads as input — replace it with your own raw text when you want to test or use the script.

## Output design
- `sample-output.json` contains the extracted structured data (emails, URLs, phone numbers, currency amounts, credit cards) taken from `sample-input.txt`. Sensitive values are masked to protect privacy.


## Implementation (simple explanations)
- Language: JavaScript (Node.js). Main file: `regex.js`.

- Important regex ideas:
  - Email: a common local@domain.tld pattern that allows dots, hyphens, plus signs.
  - URL: simple http/https pattern that stops at whitespace or a closing parenthesis.
  - Phone: accepts common formats with spaces, dots, dashes, optional country code and parentheses.
  - Currency: matches dollar amounts with optional thousands separators and two decimals.
  - Card: accepts 16-digit numbers grouped by spaces or dashes.

See inline comments in `regex.js` for easy explanations on each code.

## Security & robustness notes
- Privacy: outputs are masked to avoid leaking full emails or card numbers.
- Filtering: Malicious or malformed inputs are also ignored when they do not match the regex patterns defined for valid inputs of the data types used.

## How to run
1. Make sure you installed Node.js .
2. Open a terminal in the project folder.
3. Run:

```bash
node regex.js
```

4. Open `sample-output.json` to see the results that were also displayed in the terminal after running the program since they are being saved in this `sample-output.json` file.
