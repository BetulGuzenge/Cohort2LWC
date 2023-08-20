import { LightningElement } from 'lwc';

export default class MyComboboxComponent extends LightningElement {

    options = [];
    value = '2';
    showSpinner = true;
    street;
    city;
    province;
    postalCode;
    country;
    address;

    connectedCallback(){
        setTimeout(() => {
            this.options = [
                {label: 'Option 1', value: '1'},
                {label: 'Option 2', value: '2'},
                {label: 'Option 3', value: '3'},
                {label: 'Option 4', value: '4'}
            ];
            this.showSpinner=false
        }, 5000);
    }

    handleChange(event){
        this.value=event.detail.value;
    }

    handleOnChange(event){
        this.street = event.detail.street;
        this.city = event.detail.city;
        this.province = event.detail.province;
        this.postalCode = event.detail.postalCode;
        this.country = event.detail.country;
        this.address = {
            street : this.street,
            city : this.city,
            province : this.province,
            postalCode : this.postalCode,
            country : this.country,
        }
        console.log(JSON.stringify(this.address));
    }
}

