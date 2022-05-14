//Required abilities of a calculator:
//accept user inputs
//should accept decimal numbers
//store inputs
//recognize inputs and perform calculations
//return a result

//optional features:
//should accept longer arithmetic operations
//display input as it is being entered
//store previous result as the start of the next operation
//clear button should clear all entries.
//should prevent invalid  inputs (operators next to each other, two decimal points)

const keys = document.querySelector('.buttons');
keys.addEventListener('click', (event) => {
	//prettier-ignore
	const { target, target: { value } } = event;
	console.log(event);
	console.log(event.target);
	console.log(value);
	//if target is not a button element
	if (!target.matches('button')) {
		return; //we return nothing, stp the function and start over
	} else {
		calculator.parseInput(value); //otherwise, we input the value.
	}
});

const calculator = {
	displayText: '0',
	prevTotal: null,
	decimalInNumber: false,

	parseInput(value) {
		switch (value) {
			case '=':
				this.calcAnswer(this.displayText);
				break;
			case 'AC':
				this.clearAll();
				break;
			case "-":
			case "+":
			case "*":
			case "/":
				this.decimalInNumber = false
				this.addText(value);
				break;
			case '.':
				if (!this.decimalInNumber) {
					console.log('no decimal')
					if (this.displayText == '0') {
						this.addText('0.');
					} else {
						this.addText(value);
					}
					this.decimalInNumber = !this.decimalInNumber
				} else {
					console.log('decimal in number oh no')
				}
				break;
			default:
				this.addText(value);
				break;
		}
	},

	addText(value) {
		if (this.displayText === '0') {
			this.displayText = '';
		} else if (this.prevTotal !== null) {
			this.displayText = this.prevTotal;
			this.prevTotal = null;
		}

		if (isNaN(Number(value)) && isNaN(Number(this.displayText))) {
			if (isNaN(this.displayText.slice(-1))) {
				return;
			}
		}

		this.displayText += value;
		this.outputText(this.displayText);
	},

	outputText(text) {
		document.querySelector('.calculator-screen').value = text;

		//when we are working with inputs, we cannot use the 'InnerText' option to add values to the input, we need to use the 'value' option.
	},

	calcAnswer(equation) {
		let result = Function('return ' + equation)();
		const resultRounded = this.roundAnswers(result)
		this.outputText(resultRounded);
		this.displayText = resultRounded;
		console.log({ result })
		console.log(Number.isInteger(resultRounded), 'is integer')
		if (Number.isInteger(resultRounded)) {
			this.decimalInNumber = false
		} else {
			this.decimalInNumber = true
		}
	},

	roundAnswers(result) {
		//round number to 3 decimal places
		const resultRounded = Number(result).toFixed(3)
		//convert to number to get rid of trailing 0s
		return Number(resultRounded)
	},

	clearAll() {
		this.displayText = '0';
		this.prevTotal = null;
		this.outputText(this.displayText);
		this.decimalInNumber = false
	},
};
