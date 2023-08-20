import { LightningElement } from 'lwc';

export default class ParentHello extends LightningElement {
    name;
    
    handleHello(event){
        this.name = event.detail;
    }
}