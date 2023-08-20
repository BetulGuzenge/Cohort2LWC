import { LightningElement, wire } from 'lwc';
import myChannel from '@salesforce/messageChannel/myMessageChannel__c';
import { MessageContext, subscribe, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';

export default class Lwc3 extends LightningElement {

    message;

    @wire(MessageContext)
    mc;

    subscription = null;

    connectedCallback(){
        if(this.subscription == null){
            this.subscription = subscribe(this.mc, myChannel, (data) => this.handleMessage(data), {scope: APPLICATION_SCOPE});
        }
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(data){
        if(data.componentName == 'lwc3'){
            this.message = data.message;
        }
    }
}