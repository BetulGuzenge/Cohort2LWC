import { LightningElement } from 'lwc';

export default class ChildComp extends LightningElement {
    
    handleChildClick(){
        // Create a "buttonclick" event
        // dispatch this event
        const ce = new CustomEvent("buttonclick");// To create a customevent , there is an object named "CustomEvent". We create an instance (object) of CustomEvent Class. 
        this.dispatchEvent(ce);// this dispatchEvent method exists in Lightning elements
    }
}