// The Basic Math Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Can't divide by 0!");
        return "Error";
    }
    return a / b;
}

// Setting Up Some 'Storage Boxes' (Variables) for Our Calculator
let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldReset = false;

// The 'Brain' of Our Calculator
function operate() {
    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}

// Event listeners for buttons
const display = document.querySelector('.display');
const numButtons = document.querySelectorAll('.num');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (shouldReset) {
            display.textContent = button.dataset.value;
            shouldReset = false;
        } else {
            display.textContent += button.dataset.value;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!firstNumber) {
            firstNumber = display.textContent;
            operator = button.dataset.value;
            display.textContent += operator; // Display the operator
        } else {
            secondNumber = display.textContent.split(operator)[1];
            if (secondNumber) {
                firstNumber = operate().toString();
                operator = button.dataset.value;
                display.textContent = firstNumber + operator;
                secondNumber = "";
            } else {
                operator = button.dataset.value;
                display.textContent = firstNumber + operator;
            }
        }
    });
});

equalsButton.addEventListener('click', () => {
    if (!firstNumber || !operator) return;
    secondNumber = display.textContent.split(operator)[1];
    if (secondNumber) {
        display.textContent = operate();
        firstNumber = "";
        operator = "";
        secondNumber = "";
        shouldReset = true;
    }
});

clearButton.addEventListener('click', () => {
    display.textContent = "0";
    firstNumber = "";
    operator = "";
    secondNumber = "";
});
