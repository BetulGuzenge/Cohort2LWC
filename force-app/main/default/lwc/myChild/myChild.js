import { LightningElement, api, track } from 'lwc';

export default class MyChild extends LightningElement {

    @api childName; // In this way child variable become a public variable 
    @track childDescription;// when track is added in front of private variable (here childDescription is private , by default all variables are private ), variable can not be accessed from parent but it can be accessed from org

    connectedCallback(){
        this.childDescription = "This is a child component";
    }

    @api changeTheName(){// We can change Child Name that we named in Parent.html creating one function and we can make this function by adding @api before the function. 
                        // Then we call this method from parent js 
        this.childName=" Changed Name ";
        this.childDescription="This is changed description";
    }
}