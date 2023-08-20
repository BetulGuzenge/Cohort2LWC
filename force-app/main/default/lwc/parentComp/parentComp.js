import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {

    count = 0;

    handleChildButtonClick(){
        this.count++;
    }
}