import { LightningElement } from 'lwc';

export default class LWCSample extends LightningElement {
    name = " ";

    handleonchange(event){
       this.name= event.detail.value;
    }
}