import { LightningElement, wire, track } from 'lwc';

import getAccountDetail from '@salesforce/apex/RecordFetcherController.getAccountDetail'; // we are importing apex class to LWC in this way. Instead of 'getAccountDEtail' we can name it with any name

export default class ShowSpecificAccount extends LightningElement {

    id;
    accRecordId;
    @track accountRecord;

    @wire(getAccountDetail, {accId : '$accRecordId'}) // we are calling Apex class variables using import elements on top of the calss. That method in the Apex class requires 1 parameter which is accId . we are fetching it with the record that we created using $ {must use $}
    accountDetail({data, error}){// we are naming our method as accountDetail // as soon as we change the account id (parametre of method ) this method will be called//instead of accountdetail we can name it any 
        if(data){
            this.accountRecord = data;
        }
        if(error){
            console.log(error);
        }
    }

    handleIdChange(event){
        this.id = event.detail.value;
    }

    handleClick(){
        this.accRecordId = this.id;
    }

}