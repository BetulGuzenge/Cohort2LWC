import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {

    prevNumber;
    currentNumber;
    previousOperator;
    alreadyClicked = false;
    readyForNewNumber = false;

    handleNumberClick(event){
        let enteredValue = event.target.label;
        const textField = this.template.querySelector("lightning-input");
        if(this.alreadyClicked === true && this.readyForNewNumber === true){
            textField.value = enteredValue;
            this.readyForNewNumber = false;
        }
        else{
            textField.value = textField.value + enteredValue;
        }
        this.currentNumber = parseFloat(textField.value);
    }

    handleTextChange(event){
        this.currentNumber = parseFloat(event.detail.value);
    }

    handleOperationClick(event){
        let operator = event.target.label;
        if(this.alreadyClicked === true){
            let res = 0;
            if(this.previousOperator === "/"){
                res = this.prevNumber / this.currentNumber;
            }
            else if(this.previousOperator === 'x'){
                res = this.prevNumber * this.currentNumber;
            }
            else if(this.previousOperator === '-'){
                res = this.prevNumber - this.currentNumber;
            }
            else {
                res = this.prevNumber + this.currentNumber;
            }
            const textField = this.template.querySelector("lightning-input");
            textField.value = res;
            this.prevNumber = res;
        }
        else{
            this.prevNumber = this.currentNumber;
            this.currentNumber = undefined;
        }
        this.alreadyClicked = true;
        this.readyForNewNumber = true;
        this.previousOperator = operator;
    }

    handleEqualClick(){
        if(this.alreadyClicked === true && this.readyForNewNumber === false){
            let res = 0;
            if(this.previousOperator === "/"){
                res = this.prevNumber / this.currentNumber;
            }
            else if(this.previousOperator === 'x'){
                res = this.prevNumber * this.currentNumber;
            }
            else if(this.previousOperator === '-'){
                res = this.prevNumber - this.currentNumber;
            }
            else {
                res = this.prevNumber + this.currentNumber;
            }
            const textField = this.template.querySelector("lightning-input");
            textField.value = res;
            this.prevNumber = res;
            this.alreadyClicked = false;
            this.readyForNewNumber = false;
            this.previousOperator = undefined;
        }
    }

    handleClearClick(){
        this.currentNumber = undefined;
        this.prevNumber = undefined;
        this.previousOperator = undefined;
        this.alreadyClicked = false;
        this.readyForNewNumber = false;
        const textField = this.template.querySelector("lightning-input");
        textField.value = "";
    }
}