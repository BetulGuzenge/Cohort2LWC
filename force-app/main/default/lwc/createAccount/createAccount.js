import { LightningElement } from 'lwc';
import create from '@salesforce/apex/CreateAccountsController.create';
import createRelatedContact from '@salesforce/apex/CreateAccountsController.createRelatedContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateAccounts extends LightningElement {

    accountName;
    expiryDate;
    emp;
    annualRevenue;
    isContactReady = false;

    handleAccountNameChange(event){
        this.accountName = event.detail.value;
    }

    handleExpirationDateChange(event){
        this.expiryDate = event.detail.value;
    }

    handleNumberOfEmployeesChange(event){
        this.emp = event.detail.value;
    }

    handleAnnualRevenueChange(event){
        this.annualRevenue = event.detail.value;
    }

    handleCreate(){
        if(this.accountName == undefined){
            const errorToast = new ShowToastEvent({
                                    title: "Error", 
                                    message: "Account Name is required to create an Account!", 
                                    variant: "error"});
            this.dispatchEvent(errorToast);
        }
        else if(this.isContactReady == false){
            const errorToast1 = new ShowToastEvent({
                title: "Error", 
                message: "Provide Contact details to create an Account!", 
                variant: "error"});
            this.dispatchEvent(errorToast1);
        }
        else{
            create({name: this.accountName, expiry: this.expiryDate, employees: this.emp, revenue: this.annualRevenue})
            .then((data) => {
                let accId = data.Id;
                const contactRecord = this.template.querySelector("c-create-contacts").getDetails();
                createRelatedContact({accId : accId, firstName: contactRecord.fName, lastName : contactRecord.lName, phone : contactRecord.phone})
                .then((d) => {
                    const successToast = new ShowToastEvent({
                                            title: "Success", 
                                            message: data.Name+" Account is created with ID :"+data.Id+"!", 
                                            variant: "success"});
                    this.dispatchEvent(successToast);
                    this.accountName = undefined;
                    this.expiryDate = undefined;
                    this.emp = undefined;
                    this.annualRevenue = undefined;
                })
                .catch((e) => {
                    console.log(e);
                });
                
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    handleReadyToSave(){
        this.isContactReady = true;
    }
}