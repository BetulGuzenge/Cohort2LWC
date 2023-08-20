import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateContacts extends LightningElement {

    firstName;
    lastName;
    phone;
    
    disableFirstName=false;//the reason that we create this variable ==> after we click save button this value will be disable and can not be changed 
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
            const event = new CustomEvent("readytosave", {detail: {fName : this.firstName, lName: this.lastName, phone: this.phone}});// as soon as we click the save button we dispatch the values with custom event
            this.dispatchEvent(event);// after we dispatch it we have to listen this on parent html where we add child lwc
                                        // after listen it on parent html , we add  the handler on parent js 
                                        // whenever we create a handler we have to create a variable on top to call it.==>this.variable=event.detail.value;
        }
    }

    @api resetComponents(){
        this.firstName = undefined;
        this.lastName = undefined;
        this.phone = undefined;
        this.disableFirstName=false;
        this.disableLastName=false;
        this.disablePhone=false;
    }
}