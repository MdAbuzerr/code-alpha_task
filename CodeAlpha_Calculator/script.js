/**
 * CodeAlpha Frontend Internship — Task 2: Precision Calculator
 * Arithmetic Engine, Full Keyboard Integration, Calculation History & Audio Feedback
 */

class CalculatorApp {
  constructor() {
    // Calculator Core State
    this.currentInput = "0";
    this.expression = "";
    this.previousResult = null;
    this.isResultState = false;
    this.activeOperator = null;
    this.soundEnabled = true;

    // Load History from localStorage
    this.history = JSON.parse(localStorage.getItem("codealpha_calc_history") || "[]");

    // Initialize DOM References
    this.cacheDomElements();
    this.initAudioContext();
    this.bindEvents();
    this.initTheme();
    this.renderDisplay();
    this.updateHistoryUI();
  }

  cacheDomElements() {
    this.expressionDisplay = document.getElementById("expressionDisplay");
    this.resultDisplay = document.getElementById("resultDisplay");
    this.operatorBadge = document.getElementById("operatorBadge");
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    this.soundToggleBtn = document.getElementById("soundToggleBtn");
    this.historyToggleBtn = document.getElementById("historyToggleBtn");
    this.historyDrawer = document.getElementById("historyDrawer");
    this.closeHistoryBtn = document.getElementById("closeHistoryBtn");
    this.clearHistoryBtn = document.getElementById("clearHistoryBtn");
    this.historyList = document.getElementById("historyList");
    this.historyCountBadge = document.getElementById("historyCountBadge");
    this.keys = document.querySelectorAll(".key");
  }

  /**
   * Subtle Web Audio API click tone generator (No external MP3 files needed)
   */
  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    } catch (e) {
      this.audioCtx = null;
    }
  }

  playClickSound(frequency = 600, duration = 0.035) {
    if (!this.soundEnabled || !this.audioCtx) return;

    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (err) {
      // Audio playback failed silently
    }
  }

  /**
   * Bind DOM & Keyboard Events
   */
  bindEvents() {
    // Keypad Click
    this.keys.forEach(key => {
      key.addEventListener("click", () => {
        this.handleKeyAction(key);
        this.animateKey(key);
      });
    });

    // Theme Toggle
    this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());

    // Sound Toggle
    this.soundToggleBtn.addEventListener("click", () => this.toggleSound());

    // History Drawer Events
    this.historyToggleBtn.addEventListener("click", () => this.toggleHistoryDrawer(true));
    this.closeHistoryBtn.addEventListener("click", () => this.toggleHistoryDrawer(false));
    this.clearHistoryBtn.addEventListener("click", () => this.clearHistory());

    // Full Keyboard Listener
    document.addEventListener("keydown", (e) => this.handleKeyboardInput(e));
  }

  /**
   * Action Router based on Key Attributes
   */
  handleKeyAction(keyElement) {
    const action = keyElement.dataset.action;
    const value = keyElement.dataset.value;

    this.playClickSound(action === "calculate" ? 800 : 500);

    if (value !== undefined && !action) {
      this.inputNumber(value);
    } else if (action === "operator") {
      this.inputOperator(value);
    } else if (action === "calculate") {
      this.calculate();
    } else if (action === "all-clear") {
      this.allClear();
    } else if (action === "backspace") {
      this.backspace();
    } else if (action === "parentheses") {
      this.inputParentheses();
    } else if (action === "negate") {
      this.negate();
    }

    this.renderDisplay();
  }

  /**
   * Keyboard Shortcuts Handler
   */
  handleKeyboardInput(e) {
    const key = e.key;

    // Prevent default scrolling for Space / Slash / Enter if focused
    if ([" ", "/", "Enter"].includes(key) && e.target.tagName !== "INPUT") {
      e.preventDefault();
    }

    let matchedKeyElement = null;

    if (key >= "0" && key <= "9") {
      this.inputNumber(key);
      matchedKeyElement = document.querySelector(`.key-number[data-value="${key}"]`);
    } else if (key === ".") {
      this.inputNumber(".");
      matchedKeyElement = document.querySelector(`.key-number[data-value="."]`);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      this.inputOperator(key);
      matchedKeyElement = document.querySelector(`.key-operator[data-value="${key}"]`);
    } else if (key === "Enter" || key === "=") {
      this.calculate();
      matchedKeyElement = document.querySelector('.key-equals');
    } else if (key === "Backspace") {
      this.backspace();
      matchedKeyElement = document.querySelector('.key[data-action="backspace"]');
    } else if (key === "Escape" || key.toLowerCase() === "c") {
      this.allClear();
      matchedKeyElement = document.querySelector('.key[data-action="all-clear"]');
    } else if (key === "(" || key === ")") {
      this.inputParentheses(key);
      matchedKeyElement = document.querySelector('.key[data-action="parentheses"]');
    }

    if (matchedKeyElement) {
      this.animateKey(matchedKeyElement);
      this.playClickSound(key === "Enter" ? 800 : 500);
      this.renderDisplay();
    }
  }

  animateKey(keyElement) {
    keyElement.classList.add("key-pressed");
    setTimeout(() => keyElement.classList.remove("key-pressed"), 140);
  }

  /**
   * Input Handlers
   */
  inputNumber(val) {
    // If in error or after a calculated result, reset current input
    if (this.currentInput === "Error" || this.currentInput === "Cannot divide by 0") {
      this.currentInput = val === "." ? "0." : val;
      this.expression = "";
      this.isResultState = false;
      return;
    }

    if (this.isResultState) {
      this.currentInput = val === "." ? "0." : val;
      this.expression = "";
      this.isResultState = false;
      return;
    }

    if (val === ".") {
      if (this.currentInput.includes(".")) return; // Prevent multiple decimal points
      this.currentInput += ".";
      return;
    }

    if (this.currentInput === "0") {
      this.currentInput = val;
    } else {
      // Max 14 digits length safety
      if (this.currentInput.replace(/[^0-9]/g, "").length < 14) {
        this.currentInput += val;
      }
    }
  }

  inputOperator(op) {
    if (this.currentInput === "Error" || this.currentInput === "Cannot divide by 0") {
      this.allClear();
      return;
    }

    const opSymbol = this.getOperatorSymbol(op);

    if (this.isResultState) {
      this.isResultState = false;
    }

    // If an operator was already pressed and currentInput is empty, update the operator
    if (this.currentInput === "" && this.expression !== "") {
      const trimmed = this.expression.trimEnd();
      const lastChar = trimmed.slice(-1);
      if (["+", "−", "×", "÷"].includes(lastChar)) {
        this.expression = trimmed.slice(0, -1) + ` ${opSymbol} `;
        this.activeOperator = opSymbol;
        return;
      }
    }

    this.expression += `${this.currentInput} ${opSymbol} `;
    this.currentInput = "";
    this.activeOperator = opSymbol;
  }

  inputParentheses(explicitChar = null) {
    if (this.isResultState) {
      this.expression = "";
      this.currentInput = "(";
      this.isResultState = false;
      return;
    }

    if (explicitChar === "(" || explicitChar === ")") {
      this.currentInput = this.currentInput === "0" ? explicitChar : this.currentInput + explicitChar;
      return;
    }

    // Auto-detect open vs close parentheses
    const fullExpr = this.expression + this.currentInput;
    const openCount = (fullExpr.match(/\(/g) || []).length;
    const closeCount = (fullExpr.match(/\)/g) || []).length;

    const lastChar = fullExpr.trim().slice(-1);

    if (openCount > closeCount && lastChar !== "(" && !["+", "−", "×", "÷"].includes(lastChar)) {
      this.currentInput += ")";
    } else {
      if (this.currentInput === "0" || this.currentInput === "") {
        this.currentInput = "(";
      } else {
        this.currentInput += " × (";
      }
    }
  }

  negate() {
    if (this.currentInput === "0" || this.currentInput === "" || this.currentInput === "Error") return;

    if (this.currentInput.startsWith("-")) {
      this.currentInput = this.currentInput.slice(1);
    } else {
      this.currentInput = "-" + this.currentInput;
    }
  }

  backspace() {
    if (this.isResultState) {
      this.allClear();
      return;
    }

    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = "0";
    }
  }

  allClear() {
    this.currentInput = "0";
    this.expression = "";
    this.activeOperator = null;
    this.isResultState = false;
  }

  /**
   * Safe Arithmetic Evaluation (Handles order of operations & precision)
   */
  calculate() {
    if (this.isResultState || (this.expression === "" && !this.currentInput.includes("(") && !this.currentInput.includes(")"))) {
      return;
    }

    let fullExpression = this.expression + (this.currentInput || "0");

    // Close any unclosed parentheses
    const openParen = (fullExpression.match(/\(/g) || []).length;
    const closeParen = (fullExpression.match(/\)/g) || []).length;
    if (openParen > closeParen) {
      fullExpression += ")".repeat(openParen - closeParen);
    }

    // Convert display symbols to standard math operators
    let sanitized = fullExpression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    // Check for division by zero
    if (/\/(\s*)0(?![0-9.])/.test(sanitized)) {
      this.currentInput = "Cannot divide by 0";
      this.expression = fullExpression + " =";
      this.isResultState = true;
      this.activeOperator = null;
      return;
    }

    try {
      // Safe mathematical expression evaluation
      const result = this.safeEval(sanitized);

      if (isNaN(result) || !isFinite(result)) {
        this.currentInput = "Error";
      } else {
        // Fix floating point errors (e.g. 0.1 + 0.2 = 0.3)
        const roundedResult = this.formatResult(result);
        const record = {
          expression: fullExpression,
          result: roundedResult,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        this.saveHistory(record);
        this.expression = fullExpression + " =";
        this.currentInput = roundedResult;
        this.isResultState = true;
      }
    } catch (err) {
      this.currentInput = "Error";
      this.isResultState = true;
    }

    this.activeOperator = null;
  }

  /**
   * Safe Expression Evaluator avoiding dangerous eval
   */
  safeEval(expr) {
    // Only allow digits, basic operators, parens, decimal, spaces
    if (/[^0-9+\-*/().\s]/.test(expr)) {
      throw new Error("Invalid characters");
    }

    // Function constructor provides an isolated evaluation context
    return Function(`"use strict"; return (${expr});`)();
  }

  formatResult(num) {
    // Round to 10 decimal places to eliminate floating point artifacts
    const cleaned = Math.round((num + Number.EPSILON) * 1e10) / 1e10;
    return cleaned.toString();
  }

  getOperatorSymbol(op) {
    switch (op) {
      case "*": return "×";
      case "/": return "÷";
      case "-": return "−";
      case "+": return "+";
      default: return op;
    }
  }

  /**
   * Render Display Screen
   */
  renderDisplay() {
    this.expressionDisplay.textContent = this.expression;
    this.resultDisplay.textContent = this.currentInput || "0";
    this.operatorBadge.textContent = this.activeOperator || "";

    // Adjust font size dynamically for long numbers
    const len = this.resultDisplay.textContent.length;
    if (len > 12) {
      this.resultDisplay.style.fontSize = "1.5rem";
    } else if (len > 9) {
      this.resultDisplay.style.fontSize = "1.9rem";
    } else {
      this.resultDisplay.style.fontSize = "2.4rem";
    }
  }

  /**
   * Theme Management
   */
  initTheme() {
    const savedTheme = localStorage.getItem("codealpha_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("codealpha_theme", newTheme);
    this.updateThemeIcon(newTheme);
  }

  updateThemeIcon(theme) {
    this.themeToggleBtn.innerHTML = theme === "dark" 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }

  /**
   * Sound Toggle
   */
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.soundToggleBtn.classList.toggle("active", this.soundEnabled);
    this.soundToggleBtn.innerHTML = this.soundEnabled
      ? '<i class="fa-solid fa-volume-high"></i>'
      : '<i class="fa-solid fa-volume-xmark"></i>';
    this.soundToggleBtn.title = `Toggle Button Sound (${this.soundEnabled ? 'On' : 'Off'})`;
  }

  /**
   * Calculation History Management
   */
  saveHistory(item) {
    this.history.unshift(item);
    if (this.history.length > 25) this.history.pop(); // Cap history to 25 entries
    localStorage.setItem("codealpha_calc_history", JSON.stringify(this.history));
    this.updateHistoryUI();
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem("codealpha_calc_history");
    this.updateHistoryUI();
  }

  toggleHistoryDrawer(show) {
    this.historyDrawer.classList.toggle("active", show);
    this.historyDrawer.setAttribute("aria-hidden", (!show).toString());
  }

  updateHistoryUI() {
    const count = this.history.length;
    if (count > 0) {
      this.historyCountBadge.textContent = count;
      this.historyCountBadge.classList.remove("hidden");
    } else {
      this.historyCountBadge.classList.add("hidden");
    }

    this.historyList.innerHTML = "";

    if (count === 0) {
      this.historyList.innerHTML = `
        <div class="history-empty">
          <i class="fa-regular fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
          <p>No calculation history yet</p>
        </div>
      `;
      return;
    }

    this.history.forEach((item) => {
      const row = document.createElement("div");
      row.className = "history-item";
      row.title = "Click to load this result into calculator";
      row.innerHTML = `
        <span class="history-item-expr">${item.expression}</span>
        <span class="history-item-res">= ${item.result}</span>
      `;
      row.addEventListener("click", () => {
        this.currentInput = item.result;
        this.expression = "";
        this.isResultState = true;
        this.renderDisplay();
        this.toggleHistoryDrawer(false);
      });
      this.historyList.appendChild(row);
    });
  }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  new CalculatorApp();
});
