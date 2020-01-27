//Operations display
function createDisplay(mainContainer) {
    let display = document.createElement('div');
    display.classList.add('display');

    let infoSection = document.createElement('p');
    infoSection.classList.add('info');

    let resultSection = document.createElement('p');
    resultSection.classList.add('result');

    display.appendChild(infoSection);
    display.appendChild(resultSection);

    mainContainer.appendChild(display);
}


//Power and Clear
function createButtons(mainContainer) {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons');

    let power = document.createElement('button');
    power.textContent = 'Power';
    power.id = 'power';

    let clear = document.createElement('button');
    clear.textContent = 'Clear';
    clear.id = 'clear';

    buttonsContainer.appendChild(power);
    buttonsContainer.appendChild(clear);
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
    key.classList.add(`dot`);

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
            key.classList.add(`add`);
            opr.textContent = '+';
        }
        else if(i == 1) {
            key.classList.add(`subtract`);
            opr.textContent = '-';
        }
        else if(i == 2) {
            key.classList.add(`multiply`);
            opr.textContent = '*';
        }
        else if(i == 3) {
            key.classList.add(`divide`);
            opr.textContent = '/';
        }

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


function displayInfo(e) {
    const display = document.querySelector('.display');
    let info = document.querySelector('.info');
    
    if(display.getAttribute('unlocked') == null)
        return;

    content = e.target.childNodes[0].textContent;

    info.textContent += content;
}

function displayResult(e) {

}


function keyEvent() {
    const keys = document.querySelectorAll('.key');

    keys.forEach(key => {
        key.addEventListener('click', displayInfo);
    });
}


//Event Listeners
function toggleClear() {
    const info = document.querySelector('.info');
    const result = document.querySelector('.result')
    info.textContent = '';
    result.textContent = '';
}

function clearEvent() {
    const clearBtn = document.querySelector('#clear');

    clear.addEventListener('click', toggleClear);
}

function togglePower() {
    const display = document.querySelector('.display');

    if(display.getAttribute('unlocked') != null) {
        toggleClear();
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
}



//Calling functions
generateCalculator();
setEvents();
