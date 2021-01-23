'use strict'


const MINE = '💣'
const FLAG = '🏁'
const EMPTY = ''

var gBoard;

var gInterval = setInterval(showTime, 1000)


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

function init(SIZE, MINE) {
    gGame.isOn = true
    gBoard = buildBoard(SIZE)
    for (var i = 0; i < MINE; i++) {
        addMine()
    }
    renderBoard(gBoard)
}


function buildBoard(SIZE) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = []
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

        }
    }

    console.table(board)
    return board
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHTML += `<tr>`;
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = ''
            if (cell.isMine) className = 'mine'

            strHTML += `<td class="cell ${className}" data-i="${i}"
            data-j="${j}" oncontextmenu="cellMarked(this)" onclick="cellClicked(this, ${i}, ${j})" >
            </td>\n`
        }
        strHTML += `</tr>\n`
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

}

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gBoard[i][j].isShown) return
    gBoard[i][j].isShown = true
    elCell.classList.add('clicked')

    if (!gBoard[i][j].isMine) {
        if (gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)) {
            elCell.innerText = gBoard[i][j].minesAroundCount
        } else {
            expandShown(gBoard, i, j)
            elCell.innerText = 0
        }
    }
    if (elCell.classList.contains('mine')) {
        elCell.innerText = MINE
        gameOver()

    }
}


function cellMarked(elCell) {
    document.addEventListener('contextmenu', event => event.preventDefault());
    var posI = elCell.dataset.i
    var posJ = elCell.dataset.j
    if (gBoard[posI][posJ].isShown) return
    // update model
    gBoard[posI][posJ].isMarked = true
    gGame.markedCount++
    // update dom
    elCell.innerText = FLAG
}

function findEmptyCells(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (!currCell.isMine) {
                emptyCells.push({
                    i: i,
                    j: j
                })
            }
        }
    }
    return emptyCells;
}

function addMine() {
    var emptyCells = findEmptyCells(gBoard)
    if (emptyCells.length === 0) return
    var randCell = getRandomInt(emptyCells.length)
    var emptyPos = emptyCells[randCell]
    gBoard[emptyPos.i][emptyPos.j].isMine = true
    renderBoard(gBoard)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function gameOver() {
    (gGame.isOn = false)
    alert('game over')
    countSec = 0
    gInterval = clearInterval(showTime, 1000)
}



function expandShown(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            var currCell = board[i][j];
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            else if (currCell.isMarked || currCell.isMine || currCell.isShown)
                continue;

            currCell.isShown = true;
            gGame.shownCount++;
            var elNegsCell = document.querySelector(
                `[data-i="${i}"][data-j="${j}"]`
            );
            elNegsCell.classList.add('clicked');
            elNegsCell.innerText = setMinesNegsCount(gBoard, i, j)
        }
    }
}



function setMinesNegsCount(mat, cellI, cellJ) {
    var count = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ || j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) {
                mat[cellI][cellJ].minesAroundCount++
                count++
            }
        }
    }
    return count
}

function openNegsCount(mat, cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ || j < 0 || j >= mat[i].length) continue
            if (mat[cellI][cellJ].minesAroundCount === 0) {
                gGame.shownCount = true

            }
        }
    }
}


var countSec = -1

function showTime() {
    countSec += 1
    var elCount = document.querySelector('h2')
    gGame.secsPassed = countSec
    elCount.innerText = "Time: " + countSec
}

function changeLevel(Level) {
    switch (Level) {
        case 'easy':
            init(4, 2)
            countSec = -1
            break;

        case 'medium':
            init(8, 8)
            countSec = -1
            break;

        case 'hard':
            init(12, 30)
            countSec = -1
            break;
    }
}


// function checkWin () {  not working!!
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j <gBoard[0].length; j++) {
//            currCell =  gBoard[i][j] 
//            if (!currCell === !gBoard.isShown) alert ('win')
//         }
//     }
//         }