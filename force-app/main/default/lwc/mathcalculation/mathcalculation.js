import { LightningElement } from 'lwc';

export default class MathCalculation extends LightningElement {

    firstNum;
    secondNum;

    result;

    handleFirstNumberChange(event){
        this.firstNum = parseInt(event.detail.value);
    }

    handleSecondNumberChange(event){
        this.secondNum = parseInt(event.detail.value);
    }

    handleAddClick(){
        let res = this.firstNum+this.secondNum;
        this.result = `Total Sum = ${res}`;
    }
}