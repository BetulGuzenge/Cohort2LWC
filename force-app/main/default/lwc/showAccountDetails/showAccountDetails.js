import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi'; // we will get record from org

import ACC_ID from '@salesforce/schema/Account.Id';
import ACC_NAME from '@salesforce/schema/Account.Name';
import ACC_NUMBER from '@salesforce/schema/Account.AccountNumber';
import ACC_WEBSITE from '@salesforce/schema/Account.Website';
import ACC_REVENUE from '@salesforce/schema/Account.AnnualRevenue';

export default class ShowAccountDetails extends LightningElement {

    @api recordId;// recordId should be exactly this case // when record id is wriiten in this form , it is only for record page. it can nor be seen in App Page
                // An other word : recordId will be fetched from url bar . it can be possible when the account record is shown 
    @track accountRecord = undefined;// we have to create account record variable to use while we are getting the record details 
                                        // we ad @track to get the values below if part

    @wire(getRecord, {recordId: '$recordId', fields: [ACC_ID, ACC_NAME, ACC_NUMBER, ACC_REVENUE, ACC_WEBSITE]})// comparing to previous lwc that we have created which is ' show account record , here we are getting record id from url . this provide us to do the record dynamic.
                                                                                                                // previous one was not dynamic. it gives us same record all the time 
    getAccountRecord({data, error}){
        if(data){
            this.accountRecord = {
                Id : data.fields.Id.value,
                Name : data.fields.Name.value,
                AccountNumber : data.fields.AccountNumber.value,
                AnnualRevenue : data.fields.AnnualRevenue.value,
                Website : data.fields.Website.value
            };
        }
        if(error){
            console.log(error);
        }
    }
}