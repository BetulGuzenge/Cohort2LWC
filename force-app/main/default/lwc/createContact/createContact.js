import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateContacts extends LightningElement {

    firstName;
    lastName;
    phone;
    
    disableFirstName=false;
    disableLastName=false;
    disablePhone=false;

    handleFirstNameChange(event){
        this.firstName = event.detail.value;
    }

    handleLastNameChange(event){
        this.lastName = event.detail.value;
    }

    handlePhoneChange(event){
        this.phone = event.detail.value;
    }

    handleSaveClick(){
        if(this.lastName == undefined){
            const errorToast1 = new ShowToastEvent({
                                    title: "Error", 
                                    message: "Contact Last Name is required to create a Contact!", 
                                    variant: "error"});
            this.dispatchEvent(errorToast1);
        }
        else if(this.phone == undefined){
            const errorToast2 = new ShowToastEvent({
                                    title: "Error", 
                                    message: "Contact Phone is required to create a Contact!", 
                                    variant: "error"});
            this.dispatchEvent(errorToast2);
        }
        else {
            this.disableFirstName = true;
            this.disableLastName = true;
            this.disablePhone = true;
            const event = new CustomEvent("readytosave");
            this.dispatchEvent(event);
        }
    }

    @api getDetails(){
        return {fName : this.firstName, lName: this.lastName, phone: this.phone};
    }
}