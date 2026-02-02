// Calculator functionality
class Calculator {
  constructor() {
    this.display = document.querySelector('.text-wrapper-6');
    this.history = document.querySelector('.element');
    this.expression = '';
    this.result = '';
    this.previousOperand = '';
    this.operation = null;
    this.shouldResetDisplay = false;
    this.initializeButtons();
  }

  initializeButtons() {
    // Digit buttons (0-9)
    const digitButtons = {
      '1': document.querySelector('[aria-label="1"]'),
      '2': document.querySelector('[aria-label="2"]'),
      '3': document.querySelector('[aria-label="3"]'),
      '4': document.querySelector('[aria-label="4"]'),
      '5': document.querySelector('[aria-label="5"]'),
      '6': document.querySelector('[aria-label="6"]'),
      '7': document.querySelector('[aria-label="7"]'),
      '8': document.querySelector('[aria-label="8"]'),
      '9': document.querySelector('[aria-label="9"]'),
      '0': document.querySelector('[aria-label="0"]'),
    };

    Object.entries(digitButtons).forEach(([digit, button]) => {
      if (button) {
        button.addEventListener('click', () => this.appendDigit(digit));
      }
    });

    // Operation buttons
    const addBtn = document.querySelector('[aria-label="Add"]');
    const subtractBtn = document.querySelector('[aria-label="Subtract"]');
    const multiplyBtn = document.querySelector('[aria-label="Multiply"]');
    const divideBtn = document.querySelector('[aria-label="Divide"]');
    const equalsBtn = document.querySelector('[aria-label="Equals"]');
    const acBtn = document.querySelector('[aria-label="All Clear"]');
    const backspaceBtn = document.querySelector('[aria-label="Backspace"]');
    const decimalBtn = document.querySelector('[aria-label="Decimal point"]');

    if (addBtn) addBtn.addEventListener('click', () => this.chooseOperation('+'));
    if (subtractBtn) subtractBtn.addEventListener('click', () => this.chooseOperation('-'));
    if (multiplyBtn) multiplyBtn.addEventListener('click', () => this.chooseOperation('*'));
    if (divideBtn) divideBtn.addEventListener('click', () => this.chooseOperation('/'));
    if (equalsBtn) equalsBtn.addEventListener('click', () => this.compute());
    if (acBtn) acBtn.addEventListener('click', () => this.clear());
    if (backspaceBtn) backspaceBtn.addEventListener('click', () => this.backspace());
    if (decimalBtn) decimalBtn.addEventListener('click', () => this.appendDecimal());

    // Keyboard support
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  appendDigit(digit) {
    if (this.shouldResetDisplay) {
      this.expression = digit;
      this.shouldResetDisplay = false;
    } else {
      if (this.expression.length < 10) {
        this.expression += digit;
      }
    }
    this.updateDisplay();
  }

  appendDecimal() {
    if (this.shouldResetDisplay) {
      this.expression = '0.';
      this.shouldResetDisplay = false;
    } else if (!this.expression.includes('.')) {
      if (this.expression === '') {
        this.expression = '0.';
      } else {
        this.expression += '.';
      }
    }
    this.updateDisplay();
  }

  chooseOperation(op) {
    if (this.expression === '') return;
    
    if (this.previousOperand !== '') {
      this.compute();
    }
    
    this.operation = op;
    this.previousOperand = this.expression;
    this.expression = '';
    this.updateHistory();
  }

  compute() {
    if (this.operation === null || this.previousOperand === '' || this.expression === '') {
      return;
    }

    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.expression);

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert('Error: Division by zero');
          this.clear();
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.expression = computation.toString();
    this.operation = null;
    this.previousOperand = '';
    this.shouldResetDisplay = true;
    this.updateDisplay();
    this.updateHistory();
  }

  clear() {
    this.expression = '';
    this.previousOperand = '';
    this.operation = null;
    this.result = '';
    this.shouldResetDisplay = false;
    this.updateDisplay();
    this.updateHistory();
  }

  backspace() {
    this.expression = this.expression.toString().slice(0, -1);
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.expression === '') {
      this.display.textContent = '0';
    } else {
      this.display.textContent = this.expression;
    }
  }

  updateHistory() {
    if (this.previousOperand === '' && this.operation === null) {
      this.history.innerHTML = '';
    } else {
      let historyText = this.previousOperand;
      if (this.operation) {
        let displayOp = this.operation;
        if (this.operation === '*') displayOp = 'x';
        if (this.operation === '/') displayOp = '÷';
        historyText += ` <span class="text-wrapper-7">${displayOp}</span> `;
      }
      if (this.expression) {
        historyText += this.expression;
      }
      this.history.innerHTML = historyText;
    }
  }

  handleKeyboard(e) {
    if (e.key >= '0' && e.key <= '9') this.appendDigit(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      e.preventDefault();
      this.chooseOperation(e.key);
    }
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      this.compute();
    }
    if (e.key === 'Backspace') this.backspace();
    if (e.key === 'Escape') this.clear();
    if (e.key === '.') this.appendDecimal();
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
  initializeThemeToggle();
});

// Theme toggle functionality
function initializeThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Set initial theme from localStorage
  if (isDarkMode) {
    document.body.classList.add('dark-theme');
    updateThemeButton(true);
  }
  
  themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    
    if (isCurrentlyDark) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('darkMode', 'false');
      updateThemeButton(false);
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('darkMode', 'true');
      updateThemeButton(true);
    }
  });
}

function updateThemeButton(isDark) {
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}
