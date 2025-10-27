let firstNumber;
let secondNumber;
let operator;

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
    return x/y;
}

function operate(firstNumber, secondNumber, operator){
    if(operator === '+'){
        return add(firstNumber, secondNumber);
    }
    else if(operator === '-'){
        return subtract(firstNumber, secondNumber);
    }
    else if(operator === '*'){
        return multiply(firstNumber, secondNumber);
    }
    else if(operator === '/'){
        return divide(firstNumber, secondNumber);
    }
}