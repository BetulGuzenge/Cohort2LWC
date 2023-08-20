import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import myChannel from '@salesforce/messageChannel/myMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class Lwc1 extends LightningElement {

    @wire(MessageContext)
    mc;

    message;
    componentValue = 'lwc2';
    componentOptions=[
        {label: 'LWC 2', value: 'lwc2'},
        {label: 'LWC 3', value: 'lwc3'}
    ];

    handleMessageChange(event){
        this.message = event.detail.value;
    }

    handleSendClick(){
        if(this.message == undefined || this.message == ''){
            this.dispatchEvent(new ShowToastEvent({title:'ERROR', message:'Type in Message before sending!', variant:'error'}));
        }
        else{
            publish(this.mc, myChannel, {message: this.message, componentName: this.componentValue});
        }
    }

    handleComponentChange(event){
        this.componentValue = event.detail.value;
    }
}