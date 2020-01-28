//Operation values
let value1 = value2 = '';

//Operations display
function createDisplay(mainContainer) {
    let display = document.createElement('div');
    display.classList.add('display');

    let storageSection = document.createElement('p');
    storageSection.classList.add('storage');

    let ongoingSection = document.createElement('p');
    ongoingSection.classList.add('ongoing');

    display.appendChild(storageSection);
    display.appendChild(ongoingSection);

    mainContainer.appendChild(display);
}


//Power, Clear and Del
function createButtons(mainContainer) {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons');

    let power = document.createElement('button');
    power.textContent = 'Power';
    power.id = 'power';

    let clear = document.createElement('button');
    clear.textContent = 'Clear';
    clear.id = 'clear';

    let del = document.createElement('button');
    del.textContent = 'Del';
    del.id = 'del';

    buttonsContainer.appendChild(power);
    buttonsContainer.appendChild(clear);
    buttonsContainer.appendChild(del);
    mainContainer.appendChild(buttonsContainer);
}


//Numbered Keys, '.' and '='
function createDigits(keysContainer) {
    let digitsContainer = document.createElement('div');
    digitsContainer.classList.add('digits');

    for(i = 1; i <= 9; i++) {
        let key = document.createElement('div');
        key.classList.add('key');
        key.classList.add('digit');
        
        let digit = document.createElement('p'); 
        digit.textContent = i;
        key.appendChild(digit);

        digitsContainer.appendChild(key);
    }

    
    //Creates '.' key
    let key = document.createElement('div');
    key.classList.add('key');
    key.classList.add(`digit`);

    let digit = document.createElement('p'); 
    digit.textContent = '.';
    key.appendChild(digit);

    digitsContainer.appendChild(key);


    //Creates '0' key
    key = document.createElement('div');
    key.classList.add('key');
    key.classList.add('digit');

    digit = document.createElement('p'); 
    digit.textContent = 0;
    key.appendChild(digit);

    digitsContainer.appendChild(key);


    //Creates '=' key
    key = document.createElement('div');
    key.classList.add('key');
    key.classList.add(`equals`);

    digit = document.createElement('p'); 
    digit.textContent = '=';
    key.appendChild(digit);

    digitsContainer.appendChild(key);
    keysContainer.appendChild(digitsContainer);
}

//Operation keys
function createOperations(keysContainer) {
    let oprContainer = document.createElement('div');
    oprContainer.classList.add('operations');

    for(i = 0; i < 4; i++) {
        let key = document.createElement('div');
        let opr = document.createElement('p'); 

        key.classList.add('key');

        if(i == 0) {
            key.setAttribute('opr', 'add');
            opr.textContent = '+';
        }
        else if(i == 1) {
            key.setAttribute('opr', 'subtract');
            opr.textContent = '-';
        }
        else if(i == 2) {
            key.setAttribute('opr', 'multiply');
            opr.textContent = '*';
        }
        else if(i == 3) {
            key.setAttribute('opr', 'divide');
            opr.textContent = '/';
        }

        key.classList.add('operator');

        key.appendChild(opr);
        oprContainer.appendChild(key);
    }

    keysContainer.appendChild(oprContainer);
}

//Creates all keys
function createKeys(mainContainer) {
    let keysContainer = document.createElement('div');
    keysContainer.classList.add('keysContainer');

    createDigits(keysContainer);
    createOperations(keysContainer);

    mainContainer.appendChild(keysContainer);
}

//Main function
function generateCalculator() {
    let mainContainer = document.querySelector('#calculatorContainer');
    
    createDisplay(mainContainer);
    createButtons(mainContainer);
    createKeys(mainContainer);
};


//Event Listeners and operations


//Checks number of dots inside string

function add() {
    let num = value1 + value2;
    return Math.round(num * 100) / 100;
}

function subtract() {
    let num = value1 - value2;
    return Math.round(num * 100) / 100;}

function multiply() {
    let num = value1 * value2;
    return Math.round(num * 100) / 100;}

function divide() {
    let num = value1 / value2;
    return Math.round(num * 100) / 100;
}

function operations(opr) {
    let result;
    
    if(opr == 1)
        result = add();
    else if(opr == 2)
        result = subtract();
    else if(opr == 3)
        result = multiply();
    else if(opr == 4)
        result = divide();
    else
        return;

    return result;
}

function chkDots(value, ongoing) {
    const dots = value.match(/\./g);
    if(dots && dots.length > 1) {
        ongoing.textContent = 'Error';
        return true;
    }
}

function setResult() {
    const ongoing = document.querySelector('.ongoing');
    const storage = document.querySelector('.storage');

    let secondValue = ongoing.textContent;
    if(!secondValue)
        return;

    if(chkDots(secondValue, ongoing))
        return;

    if(!storage.getAttribute('opr'))
        return;
    
    value2 = Number(secondValue);

    console.log(value1, value2);

    let opr = storage.getAttribute('opr');
    let result = operations(opr);
    console.log(result);
    clear();
    ongoing.textContent = result;
}

function operationControl(e) {
    const oprKey = e.target;
    const ongoing = document.querySelector('.ongoing');
    const storage = document.querySelector('.storage');

    let firstValue = ongoing.textContent;
    if(!firstValue)
        return;

    if(chkDots(firstValue, ongoing))
        return;
    
    ongoing.textContent = '';

    value1 = Number(firstValue);
    let storedText = firstValue;
    
    const opr = oprKey.getAttribute('opr');
    console.log(opr);

    switch(opr) {
        case 'add':
            index = 1;
            storedText += ' + ';
            break;
        case 'subtract':
            index = 2;
            storedText += ' - ';
            break;
        case 'multiply':
            index = 3;
            storedText += ' * ';
            break;
        case 'divide':
            index = 4;
            storedText += ' / ';
            break;
        default:
            break;
    }

    storage.textContent = storedText;
    storage.setAttribute('opr', index);
}

function displaystorage(e) {
    const display = document.querySelector('.display');
    let ongoing = document.querySelector('.ongoing');
    
    if(display.getAttribute('unlocked') == null)
        return;

    content = e.target.childNodes[0].textContent;

    ongoing.textContent += content;
}


function keyEvent() {
    const digitKeys = document.querySelectorAll('.digit');

    digitKeys.forEach(key => {
        key.addEventListener('click', displaystorage);
    });

    const oprKeys = document.querySelectorAll('.operator');

    oprKeys.forEach(opr => {
        opr.addEventListener('click', operationControl);
    })

    const equals = document.querySelector('.equals');
    equals.addEventListener('click', setResult);

}

function del() {
    const ongoing = document.querySelector('.ongoing');

    let ongoingText = ongoing.textContent;

    if(ongoingText);
        ongoing.textContent = ongoing.textContent.slice(0, -1);    
}

function delEvent() {
    const delBtn = document.querySelector('#del');

    delBtn.addEventListener('click', del);
}

function clear() {
    const storage = document.querySelector('.storage');
    const ongoing = document.querySelector('.ongoing')
    storage.textContent = '';
    ongoing.textContent = '';
    if(storage.getAttribute('opr'))
        storage.removeAttribute('opr');
    value1 = value2 = '';
}

function clearEvent() {
    const clearBtn = document.querySelector('#clear');

    clearBtn.addEventListener('click', clear);
}

function togglePower() {
    const display = document.querySelector('.display');

    if(display.getAttribute('unlocked') != null) {
        clear();
    }

    display.toggleAttribute('unlocked');
    display.classList.toggle('on');
}

function powerEvent() {
    const powerBtn = document.querySelector('#power');
    
    powerBtn.addEventListener('click', togglePower);
}

function setEvents() {    
    keyEvent();
    powerEvent();
    clearEvent();
    delEvent();
}



//Calling functions
generateCalculator();
setEvents();
