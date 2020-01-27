function createDisplay(mainContainer) {
    let display = document.createElement('div');
    display.classList.add('display');
    display.textContent = 'Display';
    mainContainer.appendChild(display);
}

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

function createKeys(mainContainer) {
    let keysContainer = document.createElement('div');
    keysContainer.classList.add('keyContainer');

    createDigits(keysContainer);
    createOperations(keysContainer);

    mainContainer.appendChild(keysContainer);
}

function generateCalculator() {
    let mainContainer = document.querySelector('#calculatorContainer');
    
    createDisplay(mainContainer);
    createKeys(mainContainer);
};

generateCalculator();