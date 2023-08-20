import { LightningElement } from 'lwc';

export default class AccountComponent extends LightningElement {

    handleAccountCreated(){
        const comp = this.template.querySelector("c-account-data-table");
        comp.refreshData();
    }
}