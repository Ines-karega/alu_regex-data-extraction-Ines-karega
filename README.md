# alu_regex-data-extraction-Ines-karega
A program that finds and organizes specific information from messy text.


## What Does It Do?

Imagine you have a document with emails, phone numbers, websites, money amounts, and credit card numbers all mixed together. This program finds each type of information and puts them in a neat organized list.


## The Three Files

### **regex.js** - The Main Program
This is the "worker" that:
1. Reads messy text from `sample-input.txt`
2. Searches for specific patterns (emails, URLs, phone numbers, money, credit cards) using regex (special search patterns)
3. Hides credit card numbers for security (shows only last 4 digits)
4. Saves all found information to `sample-output.json` in organized format

### **sample-input.txt** - The Messy Text
Contains example data with:
- Emails: `ines.karega@gmail.com`, `support@tech-africa.co.rw`
- Websites: `https://www.techafrica.com`
- Phone numbers: `+(250)788123456`, `0798-123-456`
- Money: `$1,250.50`, `$19.99`
- Credit card: `1234 5678 9012 3456`

### **sample-output.json** - The Results
Shows what the program found, organized neatly:
- Emails → hidden (`[REDACTED]`)
- Websites → shown
- Phone numbers → shown
- Money amounts → shown
- Credit cards → masked (`**** **** **** 3456`)

---

## How to Use

```bash
node regex.js
```
This runs the program. It automatically creates/updates `sample-output.json` with the extracted data.

---

## Security Features
Credit cards are masked (only last 4 digits visible)
Emails are hidden for privacy
Phone numbers and websites are safe to show
