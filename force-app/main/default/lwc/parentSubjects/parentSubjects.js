import { LightningElement, track } from 'lwc';

export default class ParentSubjects extends LightningElement {
    @track subjectValue;
    subjectOptions;
    message;
    alreadySelected = false;

    connectedCallback(){
        this.subjectOptions = [];
        this.subjectOptions.push({label: "Apex", value: "apex"});
        this.subjectOptions.push({label: "HTML", value: "html"});
        this.subjectOptions.push({label: "CSS", value: "css"});
        this.subjectOptions.push({label: "JS", value: "js"});
        this.subjectOptions.push({label: "LWC", value: "lwc"});
       
    }

    handleSubjectChange(event){//this is for displaying trainers after choosing subject
        this.subjectValue = event.detail.value;
        if(this.alreadySelected == true){
            this.template.querySelector("c-child-trainers").selectedSubjectChanged(this.subjectValue);
        }

                this.alreadySelected = true;
    }

    handleTrainerSelect(event){
        this.message = 'You have selected subject : '+this.subjectValue+" and trainer : "+event.detail;
    }
}