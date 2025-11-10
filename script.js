let firstNumber = '';
let secondNumber = '';
let operator = '';
let currentValue = '';
let resultDisplayed = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

function add(x,y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function multiply(x,y){
    return x*y;
}

function divide(x,y){
    if(y === 0){
        return "Can't divide by zero, you moron.";
    }
    return x/y;
}

function operate(firstNumber, secondNumber, operator){
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    let result;

    if(operator === '+'){
        result = add(firstNumber, secondNumber);
    }
    else if(operator === '-'){
        result = subtract(firstNumber, secondNumber);
    }
    else if(operator === '*'){
        result = multiply(firstNumber, secondNumber);
    }
    else if(operator === '/'){
        result = divide(firstNumber, secondNumber);
    }

    if(typeof(result) === 'string'){
        return result;
    }

    if(typeof(result) === 'number' && !Number.isInteger(result)){
        result = parseFloat(result.toFixed(5));
    }

    return result;
}

function showErrorAndReset(message){
    display.textContent = message;

    firstNumber = '';
    secondNumber = '';
    operator = '';
    currentValue = '';
    resultDisplayed = false;
}

buttons.forEach(button => {
    const value = button.textContent;

    if(!isNaN(value)){
        button.addEventListener('click', () => {
            if (resultDisplayed) {
                currentValue = value;
                firstNumber = '';
                secondNumber = '';
                operator = '';
                resultDisplayed = false;
            } else {
                currentValue += value;
            }
            display.textContent = currentValue;
    })
    }

    if(['+','-','*','/'].includes(value)){
        button.addEventListener('click', () => {
            if(currentValue === '' && firstNumber !== ''){
                operator = value;
                return;
            }

            if(firstNumber !== '' && operator !== '' && currentValue !== ''){
                secondNumber = currentValue;
                const result = operate(firstNumber, secondNumber, operator);

                if(typeof(result) === 'string'){
                    showErrorAndReset(result);
                    return;
                }

                display.textContent = result;
                firstNumber = result;
                currentValue = '';
            }
            else if(currentValue !== ''){
                firstNumber = currentValue;
                currentValue = '';
            }
            operator = value;
            resultDisplayed = false;
        })
    }

    if(value === '.'){
        button.addEventListener('click', () => {
            if (!currentValue.includes('.')) {
                if (resultDisplayed) {
                    currentValue = '0.';
                    firstNumber = '';
                    secondNumber = '';
                    operator = '';
                    resultDisplayed = false;
                } else if (currentValue === '') {
                    currentValue = '0.';
                } else {
                    currentValue += '.';
                }
                display.textContent = currentValue;
            }
        })
    }

    if(value === '='){
        button.addEventListener('click', ()=>{
            if(firstNumber === '' || operator === '' || currentValue === ''){
                return;
            }

            secondNumber = currentValue;
            const result = operate(firstNumber, secondNumber, operator);

            if(typeof(result) === 'string'){
                showErrorAndReset(result);
                return;
            }

            display.textContent = result;
            firstNumber = result;
            currentValue = '';
            secondNumber = '';
            operator = '';
            resultDisplayed = true;
        })
    }

    if(value.toLowerCase() === 'clear'){
        button.addEventListener('click', () => {
            firstNumber = '';
            secondNumber = '';
            operator = '';
            currentValue = '';
            display.textContent = '';
            resultDisplayed = false;
        })
    }

    if (value.toLowerCase() === 'backspace' || value === '←') {
        button.addEventListener('click', () => {
            if (resultDisplayed) {
                firstNumber = '';
                secondNumber = '';
                operator = '';
                currentValue = '';
                display.textContent = '';
                resultDisplayed = false;
                return;
            }

            currentValue = currentValue.slice(0, -1);
            display.textContent = currentValue;
        });
    }
})