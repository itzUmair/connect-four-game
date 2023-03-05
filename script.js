let board = document.getElementsByClassName('board');
let winWindow = document.getElementsByClassName('winDisplay');
let winnerName = document.getElementById('winnerName');

let winner = undefined;

let turn = '1';

let grid = [
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_'],
    ['_', '_', '_', '_', '_', '_', '_']        
];

function displayColumn(event) {
    let column = (event.target.getAttribute("data-ref")) % 7
    let prompt = document.querySelectorAll(".prompt")
    prompt.forEach(element => {
        element.classList.remove("active")
    });
    prompt[column].classList.add("active")
    if (!prompt[column].classList.contains("active")) {
        prompt[column].classList.add("active")
    }
}   

function move(event) {
    let column = (event.target.getAttribute("data-ref")%7)
    if (grid[0][column] != '_') {
        return
    }
    for(let r = 0; r < 6; r++) {
        if(r === 5 && grid[r][column] === "_") {
            grid[r][column] = turn
            break
        } else if (grid[r][column] === "1" || grid[r][column] === "0"){
            grid[r-1][column] = turn
            break
        }
    }
    drawBoard()
}


function drawBoard() {
    board[0].innerHTML = ''
    let key = 0;
    checkWin(turn)
    alternateTurn()
    grid.forEach(row => {
        row.forEach(sec => {
            let section = document.createElement('div');
            section.classList.add('section');
            if (sec === '1') {
                section.classList.add('player-one');
            }
            if (sec === '0') {
                section.classList.add('player-two');
            }
            section.setAttribute('data-ref', key.toString());
            section.addEventListener('mouseover', (e) => displayColumn(e));
            section.addEventListener('click', (e) => move(e));
            board[0].appendChild(section)
            key++;
        })
    })
}

function alternateTurn() {
    if (turn === '1') { turn = '0' }
    else {turn = '1'}
}

function turnSystem() {
    turn = (Math.round(Math.random())).toString()
}

function checkWin(player) {
    // horizontal check
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length - 3; j++) {
            if (grid[i][j] === player && grid[i][j+1] === player && grid[i][j+2] === player && grid[i][j+3] === player) {
                winner = player
                displayWinWindow()
            }
        }
    }
    
    // vertical check
    for (let i = 0; i < grid.length - 3 ; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === player && grid[i+1][j] === player && grid[i+2][j] === player && grid[i+3][j] === player) {
                winner = player
                displayWinWindow()
            }
        }
    }
    
    // top left to bottom right diagonal check
    for (let i = 0; i < grid.length - 3 ; i++) {
        for (let j = 0; j < grid[0].length - 3; j++) {
            if (grid[i][j] === player && grid[i+1][j+1] === player && grid[i+2][j+2] === player && grid[i+3][j+3] === player) {
                winner = player
                displayWinWindow()
            }
        }
    }
    
    // bottom left to top right diagonal check
    for (let i = grid.length - 1; i > 2 ; i--) {
        for (let j = 0; j < grid[0].length - 3; j++) {
            if (grid[i][j] === player && grid[i-1][j+1] === player && grid[i-2][j+2] === player && grid[i-3][j+3] === player) {
                winner = player
                displayWinWindow()
            }
        }
    }  
}

function resetGame() {
    if (winWindow[0].classList.contains('active')) {
        winWindow[0].classList.remove('active')
    }
    let prompt = document.querySelectorAll(".prompt")
    prompt.forEach(element => {
        element.classList.remove("active")
    });
    grid = [
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_']        
    ];
    drawBoard()
}

function displayWinWindow() {
    winWindow[0].classList.add("active")
    if (winner === '0') {
        winnerName.textContent = 'Player 2 Won!'
    } else {
        winnerName.textContent = 'Player 1 Won!'
    }

}

turnSystem()
drawBoard()