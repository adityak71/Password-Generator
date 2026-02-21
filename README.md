# 🔐 Password Generator Web App

🔗 **Live Demo:** [Click Here to View Project](DEPLOYED_LINK_HERE)

A responsive and customizable Password Generator built using HTML, CSS, and Vanilla JavaScript.  
This application allows users to generate strong and random passwords based on selected criteria such as uppercase letters, lowercase letters, numbers, and symbols.

---

## 🚀 Features

- Adjustable password length (1–20 characters)
- Include:
  - Uppercase Letters (A–Z)
  - Lowercase Letters (a–z)
  - Numbers (0–9)
  - Symbols (~`!@#$%^&*()_+-=[]:;<>)
- Real-time password strength indicator
- Copy to clipboard functionality
- Fisher-Yates shuffle algorithm for better randomness
- Clean and responsive UI

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)

---

## ⚙️ How It Works

### 1️⃣ Password Length Control
A range slider dynamically updates:
- Selected password length
- UI display value

### 2️⃣ Character Selection
Selected checkboxes determine which character generators are used:
- Uppercase letters
- Lowercase letters
- Numbers
- Symbols

Each selected type is guaranteed to appear at least once in the generated password.

### 3️⃣ Password Generation Logic

- Selected generator functions are stored in an array.
- One character from each selected category is added.
- Remaining characters are filled randomly.
- Final password is shuffled using the Fisher-Yates algorithm.

### 4️⃣ Strength Indicator

Password strength depends on:
- Character variety
- Password length

| Condition | Strength |
|-----------|----------|
| Upper + Lower + (Number/Symbol) + Length ≥ 8 | Strong (Green) |
| Letters + (Number/Symbol) + Length ≥ 6 | Medium (Yellow) |
| Otherwise | Weak (Red) |


### 5️⃣ Password Shuffling

Implements the **Fisher–Yates Shuffle Algorithm** to ensure true randomness in the final password.

```javascript
function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}
```
---

## 📋 Installation & Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/adityak71/Password-Generator.git
   ```
2. Check Live Link