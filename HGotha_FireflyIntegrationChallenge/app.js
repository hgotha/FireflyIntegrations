/************************************************************************
*   Name: Hannah Gotha
*   Date: 8/5/2022
*   Project: Firefly Integration Challenge
*
*   Description:    This project is to replicate the calculator shown in
*                   the Firefy Integrations PDF. It has functional 
*                   buttons, two themes and fonts, portrait and
*                   landscape layouts, and a log.
*   
*   Flaws:          1. After running a calculation, the decimal button won't 
*                   work correctly if you just click this button, must click
*                   a number or clear button before using
*                   2. CSS and classes I think I could edit to be more efficient,
*                   there is a lot of repetitive styling and classes that make code
*                   long
*                   3. Hamburger button for some reason does not trigger when 
*                   clicking on the image, have to click around the border to 
*                   work
*                   4. I attempted to rotate and transform the table to create a 
*                   Landscape version, but it was not working well. What I did 
*                   instead was create a new page and table of what I think it would 
*                   look like sideways
*
*
*   References:
*
*       Calculator Example:
*           https://www.youtube.com/watch?v=1EgszRlxs9w&ab_channel=Webnoob
*       Dropdown button:
*           https://www.w3schools.com/howto/howto_js_dropdown.asp 
*
***********************************************************************/


const app = Vue.createApp({
    data() {
        return {
            result: '0',                            // number that shows up on input
            reset: false,                           // resetting calculator to 0
            tmp_value: 0,                           // stores first value while choosing second
            logMessages: [],                        // array to list logs
            enteredValue: '',                       // string that gets pushed into log array
            mode: 'dark',                           // var to change CSS theme
            font: 'font1',                          // var to change CSS font
        };
    },
    methods: {
        // when button is pushed, sends to method which changes result value
        test(value) {
            // checks for reset or 0 to let result empty and = new number
            if (this.result == '0' || this.reset == true) {
                this.result = '';
            }
            this.result += value.toString();        // adds new number to string
            this.reset = false;
        },
        // when decimal is added, makes sure only 1 can be added to string
        addpoint() {
            if (this.result == '0') this.result += '.';
            else if (!this.result.includes('.')) this.result += '.';
            this.result = value.toString();
        },
        // clears result 
        clear() {
            this.result = '0';
            this.reset = true;
            this.tmp_value = 0;
        },
        // stores operator value and goes to calculate method if there is a temporary value
        setOperator(operator) {
            if (this.tmp_value != 0)                // goes to calculate if temp has a stored value
                this.calculate();

            this.tmp_value = this.result;           // storing firstNum into temporary
            this.result = '0';
            this.operator = operator;
        },
        // calculates answer, has switch case for different operators, also helps keep track of log messages
        // assigns string values to new float variables to calculate
        calculate() {
            let value = 0;
            let firstNum = parseFloat(this.tmp_value);  
            let secondNum = parseFloat(this.result);

            switch (this.operator) {
                case '+':
                    value = firstNum + secondNum;
                    break;
                case '-':
                    value = firstNum - secondNum;
                    break;
                case '*':
                    value = firstNum * secondNum;
                    break;
                case '/':
                    value = firstNum / secondNum;
                    break;
                case '^':
                    value = firstNum ** secondNum;
                    break;
            }

            // entering string first part of string 
            this.enteredValue += this.tmp_value + " " + this.operator + " " + this.result;

            // assigning result to calculated value
            this.result = value;

            // entering value into string and then sending to method to add to log
            this.enteredValue += " = " + this.result;
            this.addLogMessage();

            // resetting values 
            this.reset = true;
            this.result = '0';
        },
        equal() {
            this.calculate();
            this.operator = undefined;
            this.tmp_value = 0;
        },
        addLogMessage() {
            this.logMessages.push(this.enteredValue);
            this.enteredValue = '';
        },
        changeTheme() {
            (this.mode == 'dark') ? this.mode = 'light' : this.mode = 'dark';
        },
        changeFont() {
            (this.font == 'font1') ? this.font = 'font2' : this.font = 'font1';
        }

    }
}).mount('#calc');