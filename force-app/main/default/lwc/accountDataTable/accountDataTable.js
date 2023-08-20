import { LightningElement, wire, track, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getAllAccounts from '@salesforce/apex/AccountDataTableController.getAllAccounts';

export default class AccountDataTable extends LightningElement {

    searchAccountName;

    pageSize;
    pageSizeOptions;

    totalRecords;
    pageNumber = 1;
    totalPages;
    recordsToShow = [];

    wiredAccountData;
    @track dataList;
    @track filteredDataList;// THIS IS CREATED FOR ACCOUNT SEARCH BUTTON

    columnsList = [
        // {label: 'Account Id', fieldName: 'Id', type: 'url',typeAttributes:{label: {fieldName:'Id'}}, target:'_blank', onclick:'gettheRecordPage'},
        {label: 'Account Id', fieldName: 'Id'},
        {label: 'Account Name', fieldName: 'Name'},
        {label: 'Account Type', fieldName: 'Type'},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue'},
        {label: 'SLA Expiry Date', fieldName: 'SLAExpirationDate__c'},
        {label: 'Phone Number', fieldName: 'Phone'}
    ];


    @wire(getAllAccounts)
    wiredGetAllAccounts(result){
        this.wiredAccountData = result;
        const {data, error} = result;
        if(data){
            this.dataList = data;
            this.filteredDataList = this.dataList;// BY DEFAULT THIS.FILTERDATALIST WILL BE EQUAL TO DATALIST
            this.setRecordsInfo();
        }
        if(error){
            console.log(error);
        }
    }

        // navigateToRecord(event){
        //     console.log(event);
        //     event.preventDefault();
        //     this.data.Id = event.target.value;
        //     const url = '/lightning/r/Account/{account.Id}/view';
        //     window.open(url,'_blank');
        // }
    // gettheRecordPage(event){
    //     console.log('HELLO');
    //     console.log(event);
    //     // this.data.Id =event.detail.value;
    //     // console.log(this.recordId);
    //     // const url ='https://yollacademy-e-dev-ed.develop.lightning.force.com/lightning/r/Account/${this.recordId}/view';
    //     // console.log(url);
    //     // window.open(url,'_blank');
    // }


    @api refreshData(){
        refreshApex(this.wiredAccountData);
    }

    setRecordsInfo(){
        this.totalRecords = this.filteredDataList.length;
        this.setPageSizeOptions();
        this.setPagination();
    }

    setPageSizeOptions(){
        this.pageSizeOptions = [];
        for(let val=5; val <= this.totalRecords; val += 5){
            this.pageSizeOptions.push({label: val, value : ''+val});// BY ADDING ONE BLANK STRING IT WILL AUTHOMATICALLY CONVERT IT IN TO STRING
        }
        this.pageSize = '5';// BY DEFAULT IT IS 5
    }

    setPagination(){
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);//math.ceil make decimal to integer . it make higher nearest number
        this.recordsToShow = [];
        for(let index=(this.pageNumber-1)*this.pageSize; index < this.pageNumber * this.pageSize ; index++){// pageNumber-1 because of index number // this is for which records are shown according to page that we choose
            if(index == this.totalRecords){
                break;
            }
            this.recordsToShow.push(this.filteredDataList[index]);
        }
    }

    handlePageSizeChange(event){
        this.pageSize = event.detail.value;
        this.pageNumber = 1;
        this.setPagination();
    }

    handleFirstClick(){
        this.pageNumber = 1;
        this.setPagination();
    }

    handlePreviousClick(){
        this.pageNumber--;
        this.setPagination();
    }

    handleNextClick(){
        this.pageNumber++;
        this.setPagination();
    }

    handleLastClick(){
        this.pageNumber = this.totalPages;
        this.setPagination();
    }

    get isFirstPage(){
        return this.pageNumber == 1;// to make the button disable. check html
    }

    get isLastPage(){
        return this.pageNumber == this.totalPages;//to make the button disable check html
    }

    get rowOffset(){
        return (this.pageNumber-1)*this.pageSize; 
    }

    handleSearchAccountNameChange(event){
        this.searchAccountName = event.detail.value;
    }

    handleSearchClick(){
        if(this.searchAccountName == undefined || this.searchAccountName == ''){
            this.filteredDataList = this.dataList;
        }
        else{
            this.filteredDataList = this.filteredDataList.filter((item) => item.Name.includes(this.searchAccountName));//WE USE FILTER METHOD OF ARRAY
        }
        this.setRecordsInfo();//we call it to update all records
        this.setPagination();
    }
}