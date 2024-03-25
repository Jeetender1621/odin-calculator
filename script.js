// Calculator state variables
let previousValue = '';
let currentValue = '';
let operator = '';

// Display elements
const previousDisplay = document.querySelector('.previous');
const currentDisplay = document.querySelector('.current');

// Function to update the display
function updateDisplay() {
    previousDisplay.textContent = previousValue;
    currentDisplay.textContent = currentValue;
}

// Function to clear the display and reset calculator state
function clearDisplay() {
    previousValue = '';
    currentValue = '';
    operator = '';
    updateDisplay();
    currentDisplay.style.color = 'black';
}


// Function to set the operator
function setOperator(op) {
    if (currentValue === '') return; // No current value to operate on
    if (previousValue !== '') calculate(); // Calculate previous operation if present
    operator = op;
    previousValue = currentValue;
    currentValue = '';
    updateDisplay();
}

function appendDigit(digit) {
    if (digit === '.' && currentValue.includes('.')) return; // Prevent multiple decimal points
    if (digit === '.' && currentValue === '') {
        currentValue = '0'; // Add leading zero if decimal point is entered first
    }
    currentValue += digit;
    updateDisplay();
}

// Function to perform calculation based on operator
function calculate() {
    if (operator === '') return; // No operator set
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    switch (operator) {
        case '+':
            result = (prev + current).toFixed(2);
            break;
        case '-':
            result = (prev - current).toFixed(2);
            break;
        case '×':
            result = (prev * current).toFixed(2);
            break;
        case '/':
            if (current === 0) {
                displayError("Error");
                return;
            }
            result = (prev / current).toFixed(2);
            break;
        default:
            return; // Invalid operator
    }
    previousValue = '';
    currentValue = result.toString();
    operator = '';
    updateDisplay();
}

// Function to display error message on the calculator
function displayError(message) {
    previousDisplay.textContent = '';
    currentDisplay.textContent = message;
    currentDisplay.style.color = 'red';
}

// Add event listeners to number and operator buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendDigit(button.textContent));
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent));
});

// Add event listener to the equals button
const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', calculate);

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => appendDigit('.'));

// Add event listener to the clear button
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearDisplay);
