# CodeAlpha Task 2: Precision Calculator

A sleek, modern, and high-precision **Interactive Calculator Web Application** developed for the **CodeAlpha Frontend Development Internship**.

![CodeAlpha Task 2 Badge](https://img.shields.io/badge/CodeAlpha-Frontend%20Internship-6366f1?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/HTML5-CSS3-JavaScript-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

---

## 🌟 Key Features

- **🧮 Comprehensive Arithmetic Engine**:
  - All standard arithmetic operations: Addition (`+`), Subtraction (`−`), Multiplication (`×`), and Division (`÷`).
  - Parentheses support `( )` with auto-closing and order of operations (BODMAS / PEMDAS).
  - Plus/Minus toggle (`±`) for sign negation.
  - Safe zero-division protection (`"Cannot divide by 0"`).
  - Decimal precision correction preventing floating-point artifacts (e.g. `0.1 + 0.2 = 0.3`).
- **📟 Dual-Line Display**:
  - Secondary top row showing past expression tape.
  - Primary bottom row displaying active input with auto-scaling font size for long numbers.
  - Active operator indicator badge.
- **⌨️ Full Keyboard Support (Bonus)**:
  - Complete keyboard navigation with visual button press animations on the screen.
- **🕒 Interactive Calculation History (Bonus)**:
  - Slide-out history tape logging previous calculations with timestamps.
  - One-click restore: clicking any past calculation reloads that result directly into the active display.
  - Persisted in browser `localStorage`.
- **🎨 Glassmorphism & Theme Switching**:
  - Beautiful frosted glass aesthetic with neon gradient accents.
  - Seamless Light / Dark mode toggle with saved user preference.
- **🔊 Subtle Audio Feedback (Web Audio API)**:
  - Synthesized tactile click sounds on button presses (toggleable sound button, no external audio files required).

---

## ⌨️ Keyboard Shortcuts Reference

| Keyboard Key | Action / Function |
|:---|:---|
| `0` – `9` | Input Digits |
| `.` | Decimal Point |
| `+`, `-`, `*`, `/` | Add, Subtract, Multiply, Divide |
| `Enter` or `=` | Calculate Result |
| `Backspace` | Delete last digit |
| `Escape` or `C` | All Clear (`AC`) |
| `(` and `)` | Parentheses |

---

## 🛠️ Built With

- **HTML5**: Semantic markup with ARIA accessibility roles and live regions.
- **CSS3**: CSS Variables (Dark/Light themes), Glassmorphism, CSS Grid, Flexbox, Micro-animations.
- **Vanilla JavaScript (ES6+ Class-Based)**: Modular `CalculatorApp` architecture, custom safe math evaluator, `localStorage` persistence, and Web Audio API synthesis.

---

## 🚀 How to Run Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/CodeAlpha_Calculator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CodeAlpha_Calculator
   ```
3. Open `index.html` directly in your browser:
   - Double click `index.html` in your file explorer, OR
   - Run via PowerShell:
     ```powershell
     Start-Process index.html
     ```

---

## 📋 CodeAlpha Submission Checklist

- [x] Basic calculator using HTML, CSS, and JavaScript
- [x] All arithmetic operations: `+`, `−`, `×`, `÷`
- [x] Buttons and display screen UI
- [x] User input handling, screen clearing, and real-time result display
- [x] Bonus: Full keyboard support with visual feedback
- [x] Bonus: Dark/Light theme switcher
- [x] Bonus: Calculation history drawer with localStorage persistence
- [x] Bonus: Web Audio tactile click feedback

---

## 📢 Social Post Template (LinkedIn)

> 🚀 Delighted to share my second task completed as a **Frontend Development Intern** at **@CodeAlpha**!
>
> 📌 **Task 2: Interactive Precision Calculator**
> I developed a modern calculator web application featuring full arithmetic operations, decimal precision handling, parentheses support, complete keyboard integration, light/dark theme toggle, and a slide-out calculation history drawer!
>
> 💻 **GitHub Repository**: [Your Repo Link Here]  
> 
> #CodeAlpha #FrontendDevelopment #WebDevelopment #JavaScript #CSS3 #HTML5 #Coding #Internship
