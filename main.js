//Global Variables
// const input = document.querySelector('.window');
// const allClear = document.getElementById('clear');
// const plus = document.getElementById('plus');
// const minus = document.getElementById('minus');
// const div = document.getElementById('div');
// const mult = document.getElementById('mult');
// const equal = document.getElementById('equal');


//Event Listeners

// allClear.addEventListener('click', clearIt)
// plus.addEventListener('click', add)
// minus.addEventListener('click', subtract)
// div.addEventListener('click', divide)
// mult.addEventListener('click', multiply)
// equal.addEventListener('click', equals)




// document.querySelectorAll(".number,#point").forEach((el) => {
//     el.onclick = function (){
//         input.textContent += el.textContent;
//     }
// })




//Tutorial Help

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

//Functions

function updateDisplay(){
    const display = document.querySelector('.window');
    display.textContent = calculator.displayValue;
}
updateDisplay();

function inputDigit(digit){
    const { displayValue, waitingForSecondOperand } = calculator;
    
    if( waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot){
    if (calculator.waitingForSecondOperand === true){
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return
    }
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOper){
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOper;

    console.log(calculator);
}

function resetCalc(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator){
    if(operator === '+'){
        return firstOperand + secondOperand;
    }else if(operator === '-'){
        return firstOperand - secondOperand;
    }else if(operator === 'x'){
        return firstOperand * secondOperand;
    }else if(operator === '/'){
        return firstOperand / secondOperand;
    }

    return secondOperand;
}


//Event Listeners
const keys = document.querySelector('.calcKeys');
keys.addEventListener('click', (event) => {
    const target = event.target;
    if(!target.matches('button')){
        return;
    }

    if(target.classList.contains('operator')){
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('decimal')){
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('allClear')){
        resetCalc();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});