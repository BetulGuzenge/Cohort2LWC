// import { LightningElement } from 'lwc';

// export default class Calculator extends LightningElement {

//         prevNumber;
//         currentNumber;
//         previousoperator;
//         alreadyClicked = false;
//         readyforNewNumber =false; 

//     handleNumberClick(event){// This is for entering number value 1st click==> 1 digit , second click keeps the value and add the second digit
//         let enteredValue = event.target.label;// where does target come from?
//         const textField = this.template.querySelector("lightning-input");
//         if(this.alreadyclicked=== true && this.readyforNewNumber===true){
//         textField.value = enteredValue;
//         this.readyForNewNumber=false;
          
//         }
//         else{
//             textField.value = textField.value + enteredValue;
//         }
//         this.currentNumber = parseFloat(textField.value);
//     }
        

//     handleTextChange(event){// This is for in case of user want to enter the value by typing instead of clicking on calculator
//         console.log(event.detail.value);// ==> (event.detail.value ) always gives you the current value in a text field 
//         this.currentNumber = parseFloat(event.detail.value);
//     }

//     handleOperationClick(event){// this method is for using operations ==> first we create two vaule on top of the class. 1st currentnumber ,2. alreadyclicked==> and we create alreadyclicked as false , but as soon as this method is called , means an operation button is clicked this value will be turned in to true. Then method will operate. We cahnge the value from false to true in the first line of method
        
//         let operator = event.target.label;

//         if (this.alreadyClicked === true){
//             let res = 0;

//             if(this.previousOperator === "/"){
//                 res = this.prevNumber / this.currentNumber;
//             }
//             else if(this.previousOperator === 'x'){
//                 res = this.prevNumber * this.currentNumber;
//             }
//             else if(this.previousOperator === '-'){
//                 res = this.prevNumber - this.currentNumber;
//             }
//             else {
//                 res = this.prevNumber + this.currentNumber;
//             }

//             const textField = this.template.querySelector("lightning-input");
//             textField.value = "";//IT WAS RES
//             this.prevNumber = res;

//         }else{
//             this.prevNumber = this.currentNumber;
//             this.currentNumber=undefined;
//             // const textField = this.template.querySelector("lightning-input");
//             // textField.value = "";
           
//         }
//             this.alreadyClicked=true;
//             this.readyforNewNumber=true;
//             this.previousoperator=operator;// we have created 'previous operator ' on top of page . The reason is when we perform more than one operator , when we click on operators button second time , the calculator perform previous opeartor . ex: 25+35-5==> here when we click - it will perform + then continues the rest of calculation  
        
    
//      }

//     handleEqualClick(){

                                                                                
//         if( this.alreadyclicked === true && this.readyforNewNumber === false){// this if statement means user clicked an operator then entered the number ( this avoid that operator buttons to perform without entering number )
//                                                                             //// if this if statement done we can perform an operation otherwise , we can not perform any operation 
//             let res = 0;
//             if(this.previousOperator === "/"){
//                 res = this.prevNumber / this.currentNumber;
//             }
//             else if(this.previousOperator === 'x'){
//                 res = this.prevNumber * this.currentNumber;
//             }
//             else if(this.previousOperator === '-'){
//                 res = this.prevNumber - this.currentNumber;
//             }
//             else {
//                 res = this.prevNumber + this.currentNumber;
//             }   
            
//             const textField = this.template.querySelector("lightning-input");
//             textField.value = res;
//             this.prevNumber = res;
//             this.alreadyClicked = false;
//             this.readyforNewNumber=false;
//             this.previousOperator=undefined;
                                                                                                                                       
                                      
//          }
//         }
       

//          handleClearClick(){
//             this.currentNumber = undefined;
//             this.prevNumber = undefined;
//             this.previousOperator = undefined;
//             this.alreadyClicked = false;
//             this.readyForNewNumber = false;
//             const textField = this.template.querySelector("lightning-input");
//             textField.value = "";
//          }
    
// }
