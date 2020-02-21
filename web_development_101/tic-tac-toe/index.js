const playerFactory = (name) => {
    let score = 0;
    const addScore = () => { score++ };
    const getScore = () => { return score };
    const resetScore = () => { score = 0 };
    return { name, addScore, getScore, resetScore };
};

const menu = (function() {
    let player1, player2;
    const container = document.querySelector('.container');
    
    const generateMenu = () => {
        const menu = document.createElement('div');
        const form = document.createElement('div');
        const description = document.createElement('h3');
        const player1 = document.createElement('input');
        const player2 = document.createElement('input');
        const submitButton = document.createElement('button');

        menu.classList.add('menu');
        form.classList.add('form');
        description.textContent = 'Please insert the names of the players';
        player1.classList.add('player');
        player2.classList.add('player');
        player1.setAttribute('autocomplete', 'off');
        player2.setAttribute('autocomplete', 'off');
        player1.id = 'p1';
        player2.id = 'p2';
        player1.required = true;
        player2.required = true;
        player1.placeholder = 'Player 1';
        player2.placeholder = 'Player 2';
        submitButton.textContent = 'Submit names';
        submitButton.addEventListener('click', generatePlayers);

        form.appendChild(description);
        form.appendChild(player1);
        form.appendChild(player2);
        form.appendChild(submitButton);
        menu.appendChild(form);
        container.appendChild(menu);
    }

    const rebuildMenu = () => {
        for(let i = 0; i < 3; i++)
            container.lastChild.remove();
        generateMenu();
    }

    const clearMenu = () => {
        if (container.hasChildNodes) { container.lastChild.remove(); }
        displayController.generateDisplay();
        gameBoard.generateBoard();
    }

    const generatePlayers = () => {
        p1Name = document.querySelector('#p1').value;
        p2Name = document.querySelector('#p2').value;

        if (p1Name == '' || p2Name == '') {
            p1Name = 'Player 1';
            p2Name = 'Player 2';
        }
        else if (p1Name == ' ' || p2Name == ' ') {
            alert('Error: Please input a valid name!');
            return;
        }

        else if (p1Name == p2Name) {
            alert('Error: Two players can\'t have the same name!');
            return;
        }

        player1 = playerFactory(p1Name);
        player2 = playerFactory(p2Name);
        
        clearMenu();
    }

    const getPlayers = () => {
        return [player1, player2] ;
    }

    return {
        generateMenu,
        rebuildMenu,
        getPlayers,
    }
})();

const displayController = (function() {
    const container = document.querySelector('.container');
    let player1, player2;
    
    const generateDisplay = () => {
        const display = document.createElement('div');
        const score = document.createElement('h3');
        const turn = document.createElement('h3');
        display.classList.add('display');
        score.classList.add('score');
        turn.classList.add('turn');
        display.appendChild(score);
        display.appendChild(turn);
        container.appendChild(display);
        
        setPlayers();
        showInfo();
    }
    
    const setPlayers = () => {
        const players = menu.getPlayers();
        player1 = players[0];
        player2 = players[1];
    }
    
    const showInfo = () => {
        let totalMoves = gameBoard.getMove()[0];
        const score = document.querySelector('.score');
        const turn = document.querySelector('.turn');
        
        score.textContent = `${player1.name} | ${player1.getScore()} X ${player2.getScore()} | ${player2.name}`;        
        
        if (turn.getAttribute('lock') != null) { return; }
        turn.textContent = ((totalMoves % 2 == 0) ? `${player1.name}` : `${player2.name}`) + '\'s turn';
    }

    const roundEnd = () => {
        const buttonContainer = document.createElement('div');
        const resetBtn = document.createElement('button');
        const roundBtn = document.createElement('button');
        buttonContainer.classList.add('button-container');
        resetBtn.textContent = 'Change Players';
        resetBtn.classList.add('reset');
        resetBtn.addEventListener('click', () => {
            gameBoard.resetBoard();
            menu.rebuildMenu();
        });
        roundBtn.classList.add('next');
        roundBtn.textContent = 'Next Round';
        roundBtn.addEventListener('click', () => {
            gameBoard.clearBoard();
        });

        buttonContainer.appendChild(resetBtn);
        buttonContainer.appendChild(roundBtn);
        container.appendChild(buttonContainer);
    }

    const tie = () => {
        const turn = document.querySelector('.turn');
        turn.textContent = 'It\'s a tie!';
        turn.toggleAttribute('lock');
        roundEnd();
    }

    const win = (player, condition) => {
        for(let i = 0; i < condition.length; i++) {
            const square = document.querySelector(`#pos-${condition[i]}`);
            square.classList.add('win');
        }
        player == 0 ? player1.addScore() : player2.addScore();
        const turn = document.querySelector('.turn');
        turn.textContent = ((player == 0) ? `${player1.name}` : `${player2.name}`) + ` won this round!`;
        turn.toggleAttribute('lock');
        roundEnd();
    }

    return {
        generateDisplay,
        showInfo,
        tie,
        win,
    }
})();

const gameBoard = (function() {
    let totalMoves = 0;
    let turnMoves = 0;
    let array = [];
    const container = document.querySelector('.container');

    const generateBoard = () => {
        const board = document.createElement('div');
        board.classList.add('board');
        
        for(i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `pos-${i}`;
            square.addEventListener('click', setValue);
            board.appendChild(square);
        }
        container.appendChild(board);

        displayController.showInfo();
    };

    const resetBoard = () => {
        const turn = document.querySelector('.turn');
        turn.toggleAttribute('lock');
        array = [];
        turnMoves = 0;
        totalMoves = 0;
    }

    const clearBoard = () => {
        for(let i = 0; i < 2; i++ ) { container.lastChild.remove(); }
        const turn = document.querySelector('.turn');
        turn.toggleAttribute('lock');
        array = [];
        turnMoves = 0;
        
        generateBoard();
    }

    const setArray = () => {
        for(i = 0; i < 9; i++) {
            square = document.querySelector(`#pos-${i}`);
            array[i] = square.textContent;                
        }
    }

    const getSquares = (symbol) => {
        let positions = [];
        for(i = 0; i < array.length; i++) 
            if (array[i] == symbol) { positions.push(i); }
    
        return positions;
    }

    const findSubarray = (main, sub) => {
        let count = 0;
        for(let i = 0; i < main.length; i++) {
            for(let j = 0; j < sub.length; j++) 
                if (main[i] == sub[j]) { count++; }

            if (count == 3) { return true; }
        }
        return false;
    }

    const checkBoard = () => {
        let xPlacement = getSquares('X');
        let oPlacement = getSquares('O');
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        if (turnMoves > 2) {
            for(let i = 0; i < winCondition.length; i++) {
                if (findSubarray(winCondition[i], xPlacement)) { 
                    displayController.win(0, winCondition[i]); 
                    return;
                }
                else if (findSubarray(winCondition[i], oPlacement)) { 
                    displayController.win(1, winCondition[i]); 
                    return;
                }
            }
            if (turnMoves == 9) {
                displayController.tie();
                return;
            }
        }
    }

    const setValue = (e) => {
        const turn = document.querySelector('.turn');
        if (turn.getAttribute('lock') != null || e.target.textContent) { return; }

        e.target.textContent = (totalMoves % 2 == 0) ? 'X' : 'O';
        totalMoves++;
        turnMoves++;
        setArray();
        checkBoard();
        displayController.showInfo();
    }

    const getMove = () => { return [totalMoves, turnMoves]; }

    return {
        generateBoard,
        clearBoard,
        resetBoard,
        getMove,
    } 
})();

menu.generateMenu();