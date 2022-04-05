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
	const { target } = event;
	const { value } = target;
	//if target is not a button element
	if (!target.matches('button')) {
		return; //we return nothing
	} else {
		calculator.parseInput(value);
	}
});

const calculator = {
	displayText: '0',
	prevTotal: null,

	parseInput(value) {
		switch (value) {
			case '=':
				this.calcAnswer(this.displayText);
				break;
			case 'AC':
				this.clearAll();
				break;
			case '.':
				if (this.displayText == '0') {
					this.addText('0.');
				} else {
					this.addText(value);
				}
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

		if (isNaN(+value) && isNaN(+this.displayText)) {
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
		this.outputText(result);
		this.displayText = result;
	},

	clearAll() {
		this.displayText = '0';
		this.prevTotal = null;
		this.outputText(this.displayText);
	},
};
