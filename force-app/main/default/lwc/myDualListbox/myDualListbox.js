import { LightningElement } from 'lwc';

export default class MyDualListbox extends LightningElement {

    options = [
        {label: 'English', value:'English'},
        {label: 'French', value:'French'},
        {label: 'Spanish', value:'Spanish'},
        {label: 'Azerbaijani', value:'Azerbaijani'}
    ];
    values = ['English','French'];

    handleChange(event){
        alert(event.detail.value);
    }
    
}