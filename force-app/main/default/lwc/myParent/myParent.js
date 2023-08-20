import { LightningElement } from 'lwc';

export default class MyParent extends LightningElement {

    handleClick(){
        const comp = this.template.querySelector("c-my-child");
        comp.changeTheName();
    }
}