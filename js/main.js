'use strict'


const MINE = '💣'
const FLAG = '🏁'
const EMPTY = ''

var gBoard = buildBoard(4)

var gMinesAroundCount = gBoard.minesAroundCount

var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}



function init() {
    (gGame.isOn)
    
}



function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: true,
                isMarked: true
            }

        }
    }
    board[1][1] = MINE;
    console.table(board)
    return board
}


renderBoard(gBoard)
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHTML += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var shown = (cell.isShown) ? 'class = "shown"' : null
            var mine = (cell.isMine) ? 'class = "mine"' : null
            var minePic = (cell.isMine) ? MINE : ''
            strHTML += `<td class="cell" data-i="${i}"
            data-j="${j}"onClick="cellClicked(this, ${i}, ${j})">${minePic}</td>`
        }
        strHTML += `</tr>`
    }
    console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    if (elCell.innerText == MINE) {
        elCell.classList.add = 'mine'
        console.log('game over')
        
    } else {
        var count = setMinesNegsCount(i, j, gBoard) // not good!!
        console.log(count)
        
    }
}




// function cellMarked(elCell) {

// }

// function addMine() {
//     var randCell = getRandomInt(0, board[i].length * board[j].length)
//     var emptyPos = emptyCells[randCell]
//     // update model
//     gBoard[emptyPos.i][emptyPos.j] = MINE
//     // update dom
//     renderBoard(gBoard)

// }

// console.log(findCellsForMines(gBoard))
// function findCellsForMines() {
//     var putMines = getEmptyCells(gBoard)
//     putMines.splice(getRandomInt(16), 2)
//     return putMines
// }

// console.log(getEmptyCells(gBoard))   //  contains 16 objects, should put 2 mines
// function getEmptyCells(board) {
//     var emptyCells = []
//     for (var i = 0; i <board.length; i++) {
//         for (var j = 0; j < board[0].length; j++) {
           
//                 emptyCells.push({ i: i, j: j })
            
//         }
//     }
//     return emptyCells;
// }



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function checkGameOver() {

}

function expandShown(board, elCell,
    i, j) {

}




function setMinesNegsCount(cellI, cellJ, mat) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ || j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === EMPTY) continue;
            if (mat[i][j] === MINE && (gBoard.isMine)) gMinesAroundCount++; //should change code and should update dom     
        }
    }
    
    return gMinesAroundCount
}