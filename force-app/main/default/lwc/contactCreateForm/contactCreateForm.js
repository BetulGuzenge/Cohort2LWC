import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactCreateForm extends LightningElement {
    lastName;
    phoneNumber;
    disableLastName = false;
    disablePhoneNumber = false;
    disableSave = false;
    disableReset = true;

    handleLastNameChange(event){
        this.lastName = event.detail.value;
    }

    handlePhoneNumberChange(event){
        this.phoneNumber = event.detail.value;
    }

    handleSaveClick(){
        if(this.lastName == undefined){
            this.dispatchEvent(new ShowToastEvent({title:'Error', message: 'Last Name is required to save contact details!', variant:'error'}));
        }
        else if(this.phoneNumber == undefined){
            this.dispatchEvent(new ShowToastEvent({title:'Error', message: 'Phone number is required to save contact details!', variant:'error'}));
        }
        else{
            this.disableLastName = true;
            this.disablePhoneNumber = true;
            this.disableSave = true;
            this.disableReset = false;
            const event = new CustomEvent('saved', {detail : {lastName: this.lastName, phone : this.phoneNumber}});
            this.dispatchEvent(event);
        }
    }

    handleResetClick(){
        this.disableLastName = false;
        this.disablePhoneNumber = false;
        this.disableSave = false;
        this.disableReset = true;
        const event = new CustomEvent('reset');
        this.dispatchEvent(event);
    }

    @api resetAll(){
        this.handleResetClick();
        this.lastName = undefined;
        this.phoneNumber = undefined;
    }
}

// we will show it on accountcreateform html just before handleAddContactClick 