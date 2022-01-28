// template for the calculator object 
class Calculator {
	constructor(previousText, currentText) {
		this.previousText = previousText;
		this.currentText = currentText;
		this.allCLear(); 
	}

	allCLear() {
		this.previousOperand = '';
		this.currentOperand = '';
		this.operator = undefined;
	}

	clear() {
		this.currentOperand = '';
	}

	delete() {
		this.currentOperand = this.currentOperand.slice(0, -1);
	}

	appendNumbers(number) {
		if (number === '.' && this.currentOperand.includes('.')) return; // disable the dot(".") if it is present already
 		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	operate(operator) {
		if(this.currentOperand === '') return
		if(this.previousOperand !== '' ) {
			this.calculate();
		}
		this.operator = operator;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	calculate() {
		let answer;
		const prevNumber = parseFloat(this.previousOperand);
		const currentNumber = parseFloat(this.currentOperand);
		if(isNaN(prevNumber) || isNaN(currentNumber)) return;
		switch(this.operator) {
			case '+':
				answer = prevNumber + currentNumber;
				break;
			case '-':
				answer = prevNumber - currentNumber;
				break;
			case '*':
				answer = prevNumber * currentNumber;
				break;
			case '÷':
				answer = prevNumber / currentNumber;
				break;		
			default:
				return;
		}
		this.currentOperand = answer;
		this.operator = undefined;
		this.previousOperand = '';
	}

	// method for formatting the outputs into readable numbers 
	getDisplay(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;

		if(isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			// turns integers into group of 3 digit separated by comma
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0 })
		}

		if(decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}


	updateText() {
		this.currentText.innerText = 
			this.getDisplay(this.currentOperand);
		if(this.operator != null) {
			this.previousText.innerText = 
				`${this.getDisplay(this.previousOperand)} ${this.operator}`;
		} else this.previousText.innerText = '';
	}
}

const numberButtons = document.querySelectorAll('[data-numbers]');
const operatorButtons = document.querySelectorAll('[data-operators]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const powerButton = document.querySelector('.power');
const previousText = document.querySelector('[data-previous-display]');
const currentText = document.querySelector('[data-current-display]');

// used let instead of const so that I can toggle the object using power() function
let calculator; 

function power() {
	powerButton.classList.toggle("battery");
	if(powerButton.classList.contains('battery')) {
		calculator = new Calculator(previousText, currentText);
		currentText.innerText = '0';
	} else {
		calculator = undefined;
		previousText.innerText = '';
		currentText.innerText = '';
	}

}

// Below are event listeners attached to each button of the calculator app

numberButtons.forEach( button => {
	button.addEventListener('click', () => {
		calculator.appendNumbers(button.innerText);
		calculator.updateText();
	});
});

operatorButtons.forEach( button => {
	button.addEventListener('click', () => {
		calculator.operate(button.innerText);
		calculator.updateText();
	});
});

allClearButton.addEventListener('click', () => {
	calculator.allCLear();
	calculator.updateText();
});

clearButton.addEventListener('click', () => {
	calculator.clear();
	calculator.updateText();
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateText();
});

equalsButton.addEventListener('click', () => {
	calculator.calculate();
	calculator.updateText();
});

