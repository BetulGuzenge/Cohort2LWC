import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccountTypePicklistValues from '@salesforce/apex/AccountCreateFormController.getAccountTypePicklistValues';
import createAccount from '@salesforce/apex/AccountCreateFormController.createAccount';
import createContacts from '@salesforce/apex/AccountCreateFormController.createContacts';

export default class AccountCreateForm extends LightningElement {
    defaultTypeValue;
    accountName;
    typeValue;
    typeOptions;
    annualRevenue;
    expiryDate;
    phoneNumber;
    activeValue = 'No';
    activeOptions = [
        {label: 'Yes', value:'Yes'},
        {label: 'No', value:'No'}
    ];
    @track contactRecords = [];
    numberOfContacts = 0;
    currentContact = 1;// we use this variable for the purpose of adding next contact component if needed 

    @wire(getAccountTypePicklistValues)
    wiredGetAccountTypePicklistValues({data, error}){
        if(data){
            this.typeOptions = [];
            let count = 0;
            for(let temp of data){
                count++;
                this.typeOptions.push({label: temp, value: temp});
                if(count == 1){
                    this.typeValue = temp;
                    this.defaultTypeValue = temp;
                }
            }
        }
        if(error){
            console.log(error);
        }
    }

    handleAccountNameChange(event){
        this.accountName = event.detail.value;
    }

    handleTypeChange(event){
        this.typeValue = event.detail.value;
    }

    handleAnnualRevenueChange(event){
        this.annualRevenue = event.detail.value;
    }

    handleExpiryDateChange(event){
        this.expiryDate = event.detail.value;
    }

    handlePhoneNumberChange(event){
        this.phoneNumber = event.detail.value;
    }

    handleActiveChange(event){
        this.activeValue = event.detail.value;
    }

    handleAddContactClick(){
        this.numberOfContacts++;
        for(let index=this.currentContact; index <= this.numberOfContacts; index++){
            this.contactRecords.push({id : index, saved : false});//we need to push an object with an id 
            this.currentContact++;
        }
    }

    handleCreateClick(){
        if(this.accountName == undefined || this.accountName == ''){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'Account name is required to create an Account!', variant : 'error'}));
        }
        else if(this.annualRevenue == undefined || this.annualRevenue == ''){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'Annual Revenue is required to create an Account!', variant : 'error'}));
        }
        else if(this.expiryDate == undefined || this.expiryDate == ''){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'SLA Expiry Date is required to create an Account!', variant : 'error'}));
        }
        else if(this.phoneNumber == undefined || this.phoneNumber == ''){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'Phone Number is required to create an Account!', variant : 'error'}));
        }
        else if(this.isAllContactsSaved() == false){
            this.dispatchEvent(new ShowToastEvent({title: 'Error', message: 'All contacts should be saved to create an Account!', variant : 'error'}));
        }
        else{
            let accountRecord = {
                name : this.accountName,
                type : this.typeValue,
                annualRevenue: this.annualRevenue,
                expiryDate : this.expiryDate,  
                phone : this.phoneNumber,
                active : this.activeValue
            };
            createAccount({record : accountRecord})
            .then((data) => {
                createContacts({accId: data.Id, records: this.contactRecords})
                .then((d) => {
                    this.dispatchEvent(new ShowToastEvent({title: 'Success', message: 'Account Created Successfully : '+data.Id+'!', variant : 'success'}));
                    this.handleResetClick();
                    const event = new CustomEvent('accountcreated');
                    this.dispatchEvent(event);
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

    handleResetClick(){
        this.accountName = undefined;
        this.typeValue = this.defaultTypeValue;
        this.annualRevenue = undefined;
        this.expiryDate = undefined;
        this.phoneNumber = undefined;
        this.activeValue = 'No';
        this.numberOfContacts = 0;
        this.currentContact = 1;
        this.contactRecords = [];
        const comps = this.template.querySelectorAll("c-contact-create-form");
        for(let comp of comps){
            comp.resetAll();// we called this method  from contactCreateForm
        }
    }

    handleContactSaved(event){
        const formId = event.currentTarget.dataset.id;
        for(let cont of this.contactRecords){
            if(cont.id == formId){
                cont.saved = true;
                cont.lastName = event.detail.lastName;
                cont.phone = event.detail.phone;
            }
        }
    }

    handleContactReset(event){
        const formId = event.currentTarget.dataset.id;
        for(let cont of this.contactRecords){
            if(cont.id == formId){
                cont.saved = false;
                cont.lastName = undefined;
                cont.phone = undefined;
            }
        }
    }

    isAllContactsSaved(){// this a validation to avoid create if there is any contact which was not saved 
        let saved = true;
        for(let cont of this.contactRecords){
            if(cont.saved == false){
                saved = false;
                break;
            } 
        }
        return saved;
    }
}



// import { LightningElement,wire } from 'lwc';
// import {ShowToastEvent} from 'lightning/platformShowToastEvent';
// import getAccountTypePicklistValues from '@salesforce/apex/AccountCreateFormController.getAccountTypePicklistValues';
// import createAccount from '@salesforce/apex/AccountCreateFormController.createAccount';

// export default class AccountCreateForm extends LightningElement {
//     defaultTypeValue;// we created this variable for when user press the reset , it will be assigned default picklist value as well
//     accountName;
//     typeValue;
//     typeOptions;
//     annualRevenue;
//     expiryDate;
//     phonenumber;
//     activeValue='No';// by default active value will be 'no'
//     activeOptions=[
//         {label: 'Yes', value:'Yes'},
//         {label: 'No', value:'No'}

//     ];

//     @wire(getAccountTypePicklistValues)
//     wiredgetAccountTypePicklistValues({data,error}){
//         if(data){
//             this.typeOptions =[];
//             let count=0;
//             for(let temp of data){
//                 count++;
//                 this.typeOptions.push({label: temp , value: temp});
//                 if(count == 1){
//                     this.typeValue=temp;
//                     this.defaultTypeValue=temp;
//                 }

//             }
//         }
//         if(error){
//             console.log(error);
//         }
//     }

       

//     handleAccountNameChange(event){
//         this.accountName = event.detail.value;
//     }

//     handleTypeChange(event){
//         this.typeValue=event.detail.value;
//     }

//     handleAnnualRevenueChange(event){
//         this.annualRevenue=event.detail.value;
//     }

//     handleExpiryDateChange(event){
//         this.expiryDate=event.detail.value;
//     }
//     handlePhoneNumberChange(event){
//         this.phonenumber=event.detail.value;
//     }
//     handleActiveChange(event){
//         this.activeValue=event.detail.value;
//     }

//     handleAddContactClick(){

//     }

//     handleCreateClick(){
//         if (this.accountName== undefined){
//             const t1 = new ShowToastEvent ({title:'Error' , message:'Account Name is required to create an Account' , variant: 'error'});
//             this.dispatchEvent(t1);

//         }

//         if (this.accountName== undefined){
//             this.dispatchEvent = new ShowToastEvent ({title:'Error' , message:'Account Name is required to create an Account' , variant: 'error'});
//         }
//         if (this.annualRevenue == undefined){
//             this.dispatchEvent = new ShowToastEvent ({title:'Error' , message:'Annual Revenue is required to create an Account' , variant: 'error'});
//         }

//         if (this.expiryDate == undefined){
//             this.dispatchEvent = new ShowToastEvent ({title:'Error' , message:'SLA Expiry Date is required to create an Account' , variant: 'error'});
//         }

//         if (this.phonenumber == undefined){
//             this.dispatchEvent = new ShowToastEvent ({title:'Error' , message:'Phone Number is required to create an Account' , variant: 'error'});
//         }
//         else{
//             let accountRecord={
//                 name: this.accountName,
//                 type: this.typeValue,
//                 annualRevenue: this.annualRevenue,
//                 expiryDate: this.expiryDate,
//                 phone: this.phonenumber,
//                 active: this.activeValue
//             };
//             createAccount({record : accountRecord})
//             .then ((data)=>{
//                 this.dispatchEvent = new ShowToastEvent ({title:'Success' , message:'Account is Created Successfully : ' +data.Id+' !', variant: 'success'});
//                 this.handleResetClick();
//             })
//             .catch((error)=>{
//                 console.log(error);
//             });
            
//         }




//     }

//     handleResetClick(){
//         this.accountName=undefined;
//         this.typeValue=this.defaultTypeValue;
//         this.annualRevenue=undefined;
//         this.expiryDate=undefined;
//         this.phonenumber=undefined;
//         this.activeValue='No';
        

//     }
// }

// **********************************************


// notes for this component ==>
// After creating necessary html and js variables and handlers, 
// first thing we need to do , if we check the org we will need to provide options for combo-box
// which are TYPE and ACTIVE
// for this purpose we use connected call back or we can directly assign the options as an array
// as we did for active 

// for accounttype picklist we utilize class and schemabuilder.c/accountComponent
//We import the class 
// must use wire to reach the class and create following method 


// @wire(getAccountTypePicklistValues)
// wiredgetAccountTypePicklistValues({data,error}){
//     if(data){
//         this.typeOptions =[];
//         for(let temp of data){
//             count++;// we created this count value to assign first option of picklist as default value 
//             this.typeOptions.push({label: temp , value: temp});
//             if(count== 1){
//                 this.typeValue=temp;
//             }

//         }
//     }
//     if(error){
//         console.log(error);
//     }
// }


// AFTER WE SET ALL THE PICKLIST OPTIONS WE HAVE TO CONSIDER USER FAULTS BEFORE CREATE ACCOUNT 
// AND WE HAVE TO CREATE TOAST ( we will create toast for empty values. If ant value is provided by default no need to create a validation (toast) for them )
// INORDER TO DO THIS FIRST IMPORT THE PREDEFINED TOAST CLASS ON TOP OF CHILD JS AND THEN 
// DEFINE IT ONCLICK HANDLER AS BELOW 