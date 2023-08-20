import { LightningElement, track } from 'lwc';

export default class TrackableExample extends LightningElement {
    @track employees = [];// By default primitive variables are reactive but collections or all other complex variables are not. In order us to make array being reactive we use @track 
    name;
    salary; 
    

    handleNameChange(event){
        this.name = event.detail.value;
    }

    handleSalaryChange(event){
        this.salary = event.detail.value;
    }

    handleClick(){
        let employee = {
            name : this.name,
            salary : this.salary
        };
        this.employees.push(employee);
    }

    // We can print the employee object on console. In order to see an object as string we need to use JSON.stringify.
    // console.log  (JSON.stringify(this.employee));

}


// notes for code:
//  instead of array in line number 4 , we can create an object 
// employees = {};
// name;
// salary;
