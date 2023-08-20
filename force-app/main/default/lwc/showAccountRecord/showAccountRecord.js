import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';// adaptor method ==> use UI Record API (search in google ) for wire modules and methods

import ACC_ID from '@salesforce/schema/Account.Id';
import ACC_NAME from '@salesforce/schema/Account.Name';
import ACC_NUMBER from '@salesforce/schema/Account.AccountNumber';
import ACC_WEBSITE from '@salesforce/schema/Account.Website';
import ACC_REVENUE from '@salesforce/schema/Account.AnnualRevenue';

export default class ShowAccountRecord extends LightningElement {

    recId = '0016e00003N1NylAAF';

    @wire(getRecord, {recordId: '$recId', fields: [ACC_ID, ACC_NAME, ACC_NUMBER, ACC_REVENUE, ACC_WEBSITE]}) // here record id is not dynamic . it always show the id that we created above. we call that id  by writin '$recId'. in order to make it dynamic check the other lwc ' show Accoount details
    accountRecord;// we create this variable to show above values in html . ACC_ID ( the names that we used while we are getting the values from SCHEma can be use only for that purpose )
 

}

//SECOND VERSION OF STORING FIELDS ==> entire js 

// This is harcoded record that we added record id and it is shown in app page 

// import { LightningElement, wire, track } from 'lwc';
// import { getRecord } from 'lightning/uiRecordApi';

// import ACC_ID from '@salesforce/schema/Account.Id';
// import ACC_NAME from '@salesforce/schema/Account.Name';
// import ACC_NUMBER from '@salesforce/schema/Account.AccountNumber';
// import ACC_WEBSITE from '@salesforce/schema/Account.Website';
// import ACC_REVENUE from '@salesforce/schema/Account.AnnualRevenue';

// export default class ShowAccountRecord extends LightningElement {

//     recId = '0012t00000T9wqKAAR';

//     @track accountRecord = undefined;

//     @wire(getRecord, {recordId: '$recId', fields: [ACC_ID, ACC_NAME, ACC_NUMBER, ACC_REVENUE, ACC_WEBSITE]})
//     getAccountRecord({data, error}){
//         if(data){
//             this.accountRecord = {
//                 Id : data.fields.Id.value,
//                 Name : data.fields.Name.value,
//                 AccountNumber : data.fields.AccountNumber.value,
//                 AnnualRevenue : data.fields.AnnualRevenue.value,
//                 Website : data.fields.Website.value
//             };
//         }
//         if(error){
//             console.log(error);
//         }
//     }

// }