import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/RecordFetcherController.getAllAccounts';

export default class MyDataTable extends LightningElement {

    dataList;
    
    @wire(getAllAccounts)
    wireGetAllAccounts({data, error}){
        if(data){
            console.log(data);
            this.dataList = data;
        }
        if(error){
            console.log(error);
        }
    }

    columnsList = [
        { label: 'Account Id', fieldName: 'Id' },
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Phone Number', fieldName: 'Phone' }
    ]
}