import { LightningElement, wire, track } from 'lwc';
import getAccountDetails from '@salesforce/apex/RecordFetcherController.getAccountDetails';

export default class ShowAccountsOfType extends LightningElement {

    type;
    accountType;//we have created two values. First one for getting the value from org , second one to create the parametre to pass the wire method 
    @track accountRecords;

    @wire(getAccountDetails, {accType: '$accountType'})
    accountDetails({data, error}){
        if(data){
            this.accountRecords = [];
            for(let rec of data){
                let temp = {
                    Id : rec.Id,
                    Name : rec.Name,
                    AccountNumber : rec.AccountNumber,
                    Phone : rec.Phone,
                    AnnualRevenue : rec.AnnualRevenue,
                    Type : rec.Type,
                    Link : "/lightning/r/Account/"+rec.Id+"/view"
                };
                this.accountRecords.push(temp);// we add the new object that we have created to the array 
            }
        }
        if(error){
            console.log(error);
        }
    }

    handleTypeChange(event){
        this.type = event.detail.value;
    }

    handleClick(){
        this.accountType = this.type;
    }
}