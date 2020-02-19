const playerFactory = (name) => {
    let score = 0;

    const addScore = () => {
        score++;
    }

    const getScore = () => {
        return score;
    }

    const resetScore = () => {
        score = 0;
    }

    return { name, addScore, getScore, resetScore };
};

const menu = (function() {
    let player1, player2;
    const container = document.querySelector('.container');

    const generateMenu = () => {
        if(container.hasChildNodes)
            container.firstChild.remove();
        
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
        player1.id = 'p1';
        player2.id = 'p2';
        player1.required = true;
        player2.required = true;
        player1.placeholder = 'Player 1';
        player2.placeholder = 'Player 2';
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', generatePlayers);

        form.appendChild(description);
        form.appendChild(player1);
        form.appendChild(player2);
        form.appendChild(submitButton);
        menu.appendChild(form);
        container.appendChild(menu);
    }

    const clearMenu = () => {
        if(container.hasChildNodes)
            container.firstChild.remove();
    }

    const generatePlayers = () => {
        p1Name = document.querySelector('#p1').value;
        p2Name = document.querySelector('#p2').value;

        if(p1Name == '' || p2Name == '') {
            alert('Please insert the necessary information');
            return; 
        }

        player1 = playerFactory(p1Name);
        player2 = playerFactory(p2Name);

        clearMenu();
        displayController.generateDisplay();
        gameBoard.generateBoard();
    }

    const getPlayers = () => {
        return [player1, player2] ;
    }

    return {
        generateMenu,
        getPlayers,
    }
})();

const displayController = (function() {
    const container = document.querySelector('.container');
    let player1, player2;

    const setPlayers = () => {
        const players = menu.getPlayers();
        player1 = players[0];
        player2 = players[1];
    }

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

    const showInfo = () => {
        let move = gameBoard.getMove();
        console.log(move);
        const score = document.querySelector('.score');
        const turn = document.querySelector('.turn');
        score.textContent = `${player1.getScore()} X ${player2.getScore()}`;
        turn.textContent = (move % 2 == 0) ? `${player1.name}'s turn` : `${player2.name}'s turn`;
    }

    return {
        generateDisplay,
        showInfo,
    }
})();

const gameBoard = (function() {
    let move = 0;
    let array = ['O', ,'X' , , ,'X' ,'O' , ,];
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
    };

    const setArray = () => {
        for(i = 0; i < 9; i++) {
            square = document.querySelector(`#pos-${i}`);
            array[i] = square.textContent;                
        }
        console.log(array);
    }

    const setValue = (e) => {
        if(e.target.textContent)
            return;

        e.target.textContent = (move % 2 == 0) ? 'X' : 'O';
        move++;
        setArray();
        displayController.showInfo();
    }

    const getMove = () => {
        return move;
    }

    return {
        generateBoard,
        getMove,
    } 
})();


menu.generateMenu();