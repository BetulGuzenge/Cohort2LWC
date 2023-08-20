// <***************************************>
//Connected With showAcountsOfType
// Below we are using an other code to prevent the user to type something except Account ID
//Above the code has been written with  wire approach . Below we wrote an imperative codes
// THE DIFFERENCE BETWEEN WIRE CODE AND IMPERATIVE CODES , IMPERATIVE CODES CAN BE CALLED EVEN THOUGH THE PARAMETRE IS BLANK BUT IN ORDER US TO CALL WIRE METHOD WE HAVE TO PASS A VALUE ON THE PARAMETRE

import { LightningElement, track } from 'lwc';
import getAccountDetails from '@salesforce/apex/RecordFetcherController.getAccountDetails';
import getAccountTypePicklistValues from '@salesforce/apex/RecordFetcherController.getAccountTypePicklistValues';

export default class ShowAccountsOfTypePart2 extends LightningElement {
    
    type;
    @track accountRecords; 
    options;

    connectedCallback(){
        getAccountTypePicklistValues() // We are creating combo box here 
        .then((data) => {
            this.options = [];
            for(let temp of data){
                this.options.push({label : temp, value : temp});
            }
            this.type = data[0];
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleTypeChange(event){
        this.type = event.detail.value;
    }

    handleClick(){// comparing the previous code that we wrote for same purpose 'showaccountsoftype' istead of using wire approach we use imperative method
        getAccountDetails({accType : this.type})// with imperative method we can call the apex class method directly inside of handler 
        .then((data) => { // .then , .catch are the PROMISES in JS . It has only two options. They are used with array =>
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
                this.accountRecords.push(temp);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
}