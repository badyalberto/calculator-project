/* GLOBALS*/
let operations = document.querySelectorAll('.btn-numbers');
let opers = document.querySelectorAll('.btn-operators');
let screen = document.querySelector('.calculator-screen');

/*EVENTS*/
document.querySelector('.btn-dot').addEventListener('click', addDot);
document.querySelector('.result').addEventListener('click', resultOperation);
document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelector('.negative').addEventListener('click', negativeConvertion);
document.querySelector('.reduction').addEventListener('click',closeCalculator);
document.querySelector('.ampliation').addEventListener('click',openCalculator);
document.querySelector('.close').addEventListener('click',definitiveCloseCalculator);
document.querySelector('.check').addEventListener('click', checkDarkMode)

for (const operation of operations) {
    operation.addEventListener('click', getNumbers);
}

for (const o of opers) {
    if (!o.classList.contains('clear') && !o.classList.contains('negative') && !o.classList.contains('sum'))
        o.addEventListener('click', operationsFunction);
}

//PRINT NUMBER TO SCREEN CALCULATOR
function getNumbers(e) {
    let char = screen.querySelector('.screen').textContent.slice(-1);
    if (char !== '' && char !== ')' && char !== '+' && char !== '-' && char !== '/' && char !== '%' && char !== '.' && char !== '*') {
        char = parseInt(char);
    }

    if (screen.querySelector('.screen').textContent.length <= 25) {
        if(screen.querySelector('.screen').textContent.length >= 15){
            document.querySelector('.screen').style.fontSize = '18px';
        }
        if (!isNaN(char)) {
            numberString = screen.querySelector('.screen').textContent;
            screen.querySelector('.screen').append(e.target.textContent);
            numberString += e.target.textContent;
        } else if (char === '+' || char === '-' || char === '/' || char === '%' || char === '.' || char === '*') {
            numberString = screen.querySelector('.screen').textContent;
            screen.querySelector('.screen').append(e.target.textContent);
            numberString += e.target.textContent;
        }

    }
}

//PRINT SIMBOLS OPERATION TO SCREEN CALCULATOR
function operationsFunction(e) {
    let char = screen.querySelector('.screen').textContent.slice(-1);
    if (char !== '' && char !== ')' && char !== '+' && char !== '-' && char !== '/' && char !== '%' && char !== '.' && char !== '*') {
        char = parseInt(char);
    }
    if ((screen.querySelector('.screen').textContent.length <= 25)) {
        if (!isNaN(char) || char == ')') { //Number
            if(char !== ''){
                screen.querySelector('.screen').append(e.target.textContent);
            }
            
        }
    }
}

//Perform and display the result
function resultOperation(e) {
    if (screen.querySelector('.screen').textContent.length !== 0) {
        console.log(screen.querySelector('.screen').textContent);
        let result = eval(screen.querySelector('.screen').textContent);
        console.log(screen.querySelector('.screen').textContent + ' = ' + result);
            if(result.toString().indexOf('.') !== -1){ // Not found
                result = result.toFixed(4);
            }
            document.querySelector('.subscreen').textContent = screen.querySelector('.screen').textContent + '=';
            screen.querySelector('.screen').textContent = '';
            screen.querySelector('.screen').append(result);

    }
}

//CLEAN THE SCREEN CALCULATOR
function clearScreen(e) {
    screen.querySelector('.screen').textContent = "";
    document.querySelector('.screen').style.fontSize = '32px';
    screen.querySelector('.subscreen').textContent = "";
}

//PUT NEGATIVE SYMBOL TO NUMBER
function negativeConvertion(e) {
    let result = screen.querySelector('.screen').textContent;
    var regexp = /^\d+.?\d*$/gm;
    let array = result.split(/[-\+\*\%\/\(\)]/);
    console.log(array.indexOf('('));
    if (array.length >= 1 && array[array.length - 1] !== '' && array.indexOf('(') === -1) {
        let num = array.pop();
        let lastNumber = '';
        if(num.indexOf('.') === -1){
            lastNumber = parseInt(num);
        }else{
            lastNumber = parseFloat(num);
        }

        if (lastNumber > 0) {
            let negative = replaceLast(num, `(${-(num)})`, result);
            screen.querySelector('.screen').textContent = `${negative}`;
        } else {
            let positive = replaceLast(num, `(${num})`, result);
            screen.querySelector('.screen').textContent = `${positive}`;
        }
    }
}

//ADD POINT TO LAST NUMBER
function addDot(e) {
    if ((screen.querySelector('.screen').textContent.length <= 25)) {
        var regexp = /^\d+?$/;
        let nums = screen.querySelector('.screen').textContent;
        let array = nums.split(/[-\+\*\%]/);
        let ele = array.pop();
        if (regexp.test(ele) === true) {
            screen.querySelector('.screen').append(e.target.textContent);
        }
    }
}

/*DARK MODE ENABLED */
function checkDarkMode(e) {
    let darkContainer = document.querySelector('.container');
    darkContainer.classList.toggle('containerDark');

    let screenContainer = document.querySelector('.calculator-screen');
    screenContainer.classList.toggle('screenDark')

    let darkButtons = document.querySelectorAll('.btn-operators');
    for (const button of darkButtons) {
        button.classList.toggle('buttonDark');
    }

    let btnDark = document.querySelectorAll('.btn-numbers');
    for (const drkBtn of btnDark) {
        drkBtn.classList.toggle('darkBtn');
    }
    let darkDot = document.querySelector('.btn-dot');
    darkDot.classList.toggle('btn-dotDark');
}

/*  PUT NEGATIVE TO LAST NUMBER */
function replaceLast(find, replace, string) {
    var lastIndex = string.lastIndexOf(find);

    if (lastIndex === -1) {
        return string;
    }

    var beginString = string.substring(0, lastIndex);
    var endString = string.substring(lastIndex + find.length);

    return beginString + replace + endString;
}

function closeCalculator(){
    document.querySelector('.calculator-screen').classList.add('calculator-screen-none');
    document.querySelector('.calculator-keyboard').classList.add('calculator-keyboard-none');
}

function openCalculator(){
    document.querySelector('.calculator-screen').classList.remove('calculator-screen-none');
    document.querySelector('.calculator-keyboard').classList.remove('calculator-keyboard-none');
}

function definitiveCloseCalculator(){
    document.querySelector('.container').style.display = 'none';
}

