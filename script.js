document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const operationDisplay = document.getElementById('operationDisplay'); // Operation display
    let currentOperation = null;
    let firstOperand = '';
    let secondOperand = '';
    let shouldResetScreen = false;

    // Handle click event on buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.hasAttribute('data-num')) inputNumber(button.getAttribute('data-num'));
            if (button.hasAttribute('data-op')) chooseOperation(button.getAttribute('data-op'));
            if (button.classList.contains('equals')) evaluate();
            if (button.classList.contains('clear')) clear();
        });
    });

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        if ((e.key >= 0 && e.key <= 9) || e.key === '.') inputNumber(e.key);
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') chooseOperation(e.key);
        if (e.key === 'Enter' || e.key === '=') evaluate();
        if (e.key === 'Backspace' || e.key === 'Escape') clear();
    });

    function inputNumber(number) {
        if (display.textContent === '0' || shouldResetScreen) resetScreen();
        if (number === '.' && display.textContent.includes('.')) return; // Prevent multiple decimals
        display.textContent += number;
    }

    function chooseOperation(operation) {
        if (currentOperation !== null) evaluate();
        firstOperand = display.textContent;
        currentOperation = operation;
        updateOperationDisplay();
        shouldResetScreen = true;
    }

    function evaluate() {
        if (currentOperation === null || shouldResetScreen) return;
        secondOperand = display.textContent;
        display.textContent = operate(currentOperation, firstOperand, secondOperand);
        operationDisplay.textContent = ''; // Clear operation display after evaluation
        currentOperation = null;
    }

    function operate(operation, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operation) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : 'Error';
            default: return;
        }
    }

    function clear() {
        display.textContent = '0';
        operationDisplay.textContent = ''; // Clear operation display
        currentOperation = null;
        shouldResetScreen = false;
    }

    function resetScreen() {
        display.textContent = '';
        shouldResetScreen = false;
    }

    function updateOperationDisplay() {
        operationDisplay.textContent = `${firstOperand} ${currentOperation} `;
    }
});
