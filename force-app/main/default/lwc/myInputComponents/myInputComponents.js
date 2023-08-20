import { LightningElement, track } from 'lwc';

export default class MyInputComponents extends LightningElement {
    @track firstName = "Betul";
    @track dob;// in order to apply today's date by default , the code is ==> this.dob = dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
    @track doa;
    @track dobMax;
    @track dobMin;
    @track salary;

    connectedCallback(){
        let dt = new Date();
        this.dobMax = (dt.getFullYear()-18)+"-"+(dt.getMonth()+1)+"-"+dt.getDate();//instead of todays month and day we can write specific date 1==> January, 12==> 12th of the month
        this.dobMin = (dt.getFullYear()-50)+"-"+(dt.getMonth()+1)+"-"+dt.getDate();
        this.dob = this.dobMax;//we set it as default value
    }

    handleClick(){
        alert(this.firstName);
        alert(this.dob);
        alert(this.doa);
        alert(this.salary);
    }

    handleFirstNameChange(event){
        this.firstName = event.detail.value;
    }

    handleDateOfBirthChange(event){
        this.dob = event.detail.value;
    }
    handleDateOfAppointmentChange(event){
        this.doa = event.detail.value;
    }
    handleSalaryChange(event){
        this.salary=event.detail.value;
    }
}

// creatin current date-time 
//value="2023-07-20T11:40:20" ==>hard coded==> we shoulh write this in html 

