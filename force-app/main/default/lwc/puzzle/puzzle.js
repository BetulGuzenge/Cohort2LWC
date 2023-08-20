import { LightningElement } from 'lwc';

export default class Puzzle extends LightningElement {
    
    isRendered = false;
    randomNumbers = [];// we created this array to hold 8 numbers in random order 

    connectedCallback(){// connectedcallback is executed before renderedcallback.definatelly we will have random numbers before assigning any number with renderedcallback method below
        this.randomNumbers = [];
        for(;;){// called infinite loop
            let num = parseInt(Math.random()*10);// math.random method provide us to have any random number such as 0.52. with this line by multplying it by 10 and converting it in to integer with parseINt we get a number such as 0.52==>5
            if(num != 0 && num != 9 && !this.randomNumbers.includes(num)){// number should not be zero and 9 and it should not be duplicate
                this.randomNumbers.push(num);// add the number to array
            }
            if(this.randomNumbers.length == 8){
                break;
            }
        }
    }

    renderedCallback(){ // this method is executed whenever we make a change on lightning page 
        if(this.isRendered === false){
            const buttons = this.template.querySelectorAll("lightning-button");
            for(let index=0; index < buttons.length-1; index++){
                buttons[index].label = this.randomNumbers[index];
            }
            buttons[buttons.length-1].label = "-"
            this.isRendered = true;// on the top of page isRendered is false .So it executed as long as it is false. we do not want it to be executed again. so we change it to true at the end ,
        }
    }

    handleButtonClick(event){
        let buttonClickedId = event.target.id.split("-")[0];// id is given such as 1-2321 number , that is why we want to split it before  - 
        if(buttonClickedId === "1"){
            let b1 = this.template.querySelector('lightning-button[data-id="2"]');//'lightning-button[data-id="2"]'==> this is an other way to fetch any element using queryselector 
            let b2 = this.template.querySelector('lightning-button[data-id="4"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        else if(buttonClickedId === "2"){
            let b1 = this.template.querySelector('lightning-button[data-id="1"]');
            let b2 = this.template.querySelector('lightning-button[data-id="3"]');
            let b3 = this.template.querySelector('lightning-button[data-id="5"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else if(buttonClickedId === "3"){
            let b1 = this.template.querySelector('lightning-button[data-id="2"]');
            let b2 = this.template.querySelector('lightning-button[data-id="6"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        else if(buttonClickedId === "4"){
            let b1 = this.template.querySelector('lightning-button[data-id="1"]');
            let b2 = this.template.querySelector('lightning-button[data-id="5"]');
            let b3 = this.template.querySelector('lightning-button[data-id="7"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else if(buttonClickedId === "5"){
            let b1 = this.template.querySelector('lightning-button[data-id="2"]');
            let b2 = this.template.querySelector('lightning-button[data-id="4"]');
            let b3 = this.template.querySelector('lightning-button[data-id="6"]');
            let b4 = this.template.querySelector('lightning-button[data-id="8"]');
            this.checkAndSwap(event.target, [b1, b2, b3, b4]);
        }
        else if(buttonClickedId === "6"){
            let b1 = this.template.querySelector('lightning-button[data-id="3"]');
            let b2 = this.template.querySelector('lightning-button[data-id="5"]');
            let b3 = this.template.querySelector('lightning-button[data-id="9"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else if(buttonClickedId === "7"){
            let b1 = this.template.querySelector('lightning-button[data-id="4"]');
            let b2 = this.template.querySelector('lightning-button[data-id="8"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        else if(buttonClickedId === "8"){
            let b1 = this.template.querySelector('lightning-button[data-id="5"]');
            let b2 = this.template.querySelector('lightning-button[data-id="7"]');
            let b3 = this.template.querySelector('lightning-button[data-id="9"]');
            this.checkAndSwap(event.target, [b1, b2, b3]);
        }
        else {
            let b1 = this.template.querySelector('lightning-button[data-id="6"]');
            let b2 = this.template.querySelector('lightning-button[data-id="8"]');
            this.checkAndSwap(event.target, [b1, b2]);
        }
        this.checkForWin();
    }

    checkAndSwap(target, buttonArray){
        for(let button of buttonArray){
            if(button.label === "-"){
                button.label = target.label;
                target.label = "-";
                break;
            }
        }
    }

    checkForWin(){
        let myarray = ['1', '2', '3', '4', '5', '6', '7', '8', '-'];
        let won = true;
        const buttons = this.template.querySelectorAll("lightning-button");// to take reference the existing buttons
        for(let index=0; index < buttons.length; index++){
            if(buttons[index].label != myarray[index]){
                won = false;
                break;
            }
        }
        if(won === true){
            alert("Congratulation, You Won!");
        }
    }
}