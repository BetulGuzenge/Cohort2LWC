import { LightningElement } from 'lwc';

export default class FirstParent extends LightningElement {
    constructor(){
        super();
        console.log("CONSTRUCTOR: From Parent");
        const para = this.template.querySelector("p");
        console.log("CONSTRUCTOR: Component: "+para);
    }

    connectedCallback(){
        console.log("CONNECTED CALLBACK: From Parent");
        const para = this.template.querySelector("p");
        console.log("CONNECTED CALLBACK: Component: "+para);
    }
    

    renderedCallback(){
        console.log("RENDERED CALLBACK: From Parent");
        const para = this.template.querySelector("p");
        console.log("RENDERED CALLBACK: Component: "+para);
    }

    disconnectedCallback(){
        console.log (" DISCONNECTED CALLBACK: FROM PARENT")
    }
}