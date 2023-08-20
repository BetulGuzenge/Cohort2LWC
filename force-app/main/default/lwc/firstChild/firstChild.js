import { LightningElement } from 'lwc';

export default class FirstChild extends LightningElement {
    constructor(){
        super();
        console.log("CONSTRUCTOR: From Child");
    }

    connectedCallback(){
        console.log("CONNECTED CALLBACK: From Child");
    }

    

    renderedCallback(){
        console.log("RENDERED CALLBACK: From Child");
    }
}