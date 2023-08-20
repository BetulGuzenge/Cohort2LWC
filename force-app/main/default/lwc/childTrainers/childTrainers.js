import { LightningElement, api } from 'lwc';

export default class ChildTrainers extends LightningElement {
    trainerValue;
    trainerOptions;
    @api selectedSubject;// we create this variable to send the combobox to parent 

    subjectAndTrainers = {//we create value for each subjects as an object==> then we add it inside of parent html in template if
        apex : ["abc", "def", "ghi"],
        html : ["jkl", "mno"],
        css : ["pqr", "stu"],
        js : ["vwx", "xyz"],
        lwc : ["abc", "jkl", "pqr", "vwx"]
        
        };
   

    connectedCallback(){// connectedcall back only calls once 
        this.setTrainers();
    }
    
    @api selectedSubjectChanged(newSubject){
        this.selectedSubject = newSubject;
        this.setTrainers();
    }

    setTrainers() {//this is called by connectedcallback and selectedsubjectChanged // instead of writing code twice we create this 
        this.trainerOptions = [];
        for(let train of this.subjectAndTrainers[this.selectedSubject]){
            this.trainerOptions.push({label : train, value : train});
        }
    }

    handleTrainerChange(event){
        this.trainerValue = event.detail.value;
    }

    handleSelectClick(){
        if(this.trainerValue){
            const ce = new CustomEvent('trainerselected', {detail: this.trainerValue});//in this way we pass the value to parent 
            this.dispatchEvent(ce);
        }
    }
}