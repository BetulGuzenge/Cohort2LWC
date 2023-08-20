import { LightningElement } from 'lwc';

export default class ChildHello extends LightningElement {

    childName;

    handleNameChange(event){
        this.childName = event.detail.value;
    }

    handleHelloClick(){
        const n = new CustomEvent("hello", {detail: this.childName});
        this.dispatchEvent(n);
    }
}