let firstNumber = '';
let operator = '';
let secondNumber = '';

function updateDisplay(value) {
  document.getElementById('display').textContent = value;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : 'Error: Divide by 0';
    default:
      return 'Error: Invalid operator';
  }
}

function handleButtonClick(event) {
  const buttonValue = event.target.dataset.value;

  if (!isNaN(buttonValue) || buttonValue === '.') {
    if (operator === '') {
      firstNumber += buttonValue;
      updateDisplay(firstNumber);
    } else {
      secondNumber += buttonValue;
      updateDisplay(secondNumber);
    }
  } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
    if (firstNumber !== '' && secondNumber === '') {
      operator = buttonValue;
    }
  } else if (buttonValue === '=') {
    if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
      const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
      updateDisplay(result);
      firstNumber = result.toString();
      operator = '';
      secondNumber = '';
    }
  } else if (buttonValue === 'clear') {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    updateDisplay('0');
  }
}

const calculator = document.getElementById('calculator');

for (let i = 0; i <= 9; i++) {
  const button = document.createElement('button');
  button.className = 'col-span-1 bg-gray-300 p-4 rounded-lg text-center font-bold text-2xl';
  button.dataset.value = i.toString();
  button.textContent = i.toString();
  calculator.appendChild(button);
}

const operators = ['+', '-', '*', '/'];
const otherButtons = ['=', '.', 'clear'];

[...operators, ...otherButtons].forEach(buttonValue => {
  const button = document.createElement('button');
  button.className = buttonValue === '=' ? 'col-span-2 bg-green-500 p-4 rounded-lg text-center font-bold text-2xl' :
    buttonValue === 'clear' ? 'col-span-2 bg-red-500 p-4 rounded-lg text-center font-bold text-2xl' :
    'col-span-1 bg-yellow-500 p-4 rounded-lg text-center font-bold text-2xl';
  button.dataset.value = buttonValue;
  button.textContent = buttonValue;
  calculator.appendChild(button);
});

const buttons = document.querySelectorAll('#calculator button');
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});
