//Operations display
function createDisplay(mainContainer) {
    let display = document.createElement('div');
    display.classList.add('display');
    display.textContent = 'Display';

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


//Numbered Keys and '='
function createDigits(keysContainer) {
    let digitsContainer = document.createElement('div');
    digitsContainer.classList.add('digits');

    for(i = 1; i <= 9; i++) {
        let key = document.createElement('div');
        key.classList.add('key');
        key.classList.add(`digit-${i}`);
        
        let digit = document.createElement('p'); 
        digit.textContent = i;
        key.appendChild(digit);

        digitsContainer.appendChild(key);
    }

    let key = document.createElement('div');
    key.classList.add('key');
    key.classList.add(`digit-0`);

    let digit = document.createElement('p'); 
    digit.textContent = 0;
    key.appendChild(digit);

    digitsContainer.appendChild(key);

    let keyEquals = document.createElement('div');
    keyEquals.classList.add('key');
    keyEquals.classList.add(`equals`);

    let symbol = document.createElement('p'); 
    symbol.textContent = '=';
    keyEquals.appendChild(symbol);

    digitsContainer.appendChild(keyEquals);
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

generateCalculator();