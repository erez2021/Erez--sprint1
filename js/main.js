'use strict'


const MINE = '💣'
const FLAG = '🏁'
const EMPTY = ''

var gBoard;

var gInterval;


// var gLevel= {
//     SIZE: 4,
//     MINES: 2
// };

//  var gLevel2 =  {
//     SIZE: 8,
//     MINES: 12
// }

// var gLevel3 =  {
//     SIZE: 12,
//     MINES: 30
// }

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init(SIZE, MINE) {
    (gGame.isOn)
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
                isMarked: true
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

            strHTML += `<td class="cell ${className}" data-i=""
            data-j="" oncontextmenu="cellMarked(this)" onclick="cellClicked(this, ${i}, ${j})" >
            </td>\n`
        }
        strHTML += `</tr>\n`
    }
    console.log(strHTML);
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

}

function cellClicked(elCell, i, j) {
    checkGameOver()
    if (elCell.classList.contains('mine')) {
        console.log('game over')
        elCell.innerText = MINE
        return false
    } else {
        elCell.classList.add('clicked')
        gBoard[i][j].minesAroundCount = setMinesNegsCount(gBoard, i, j)
        elCell.style.backgroundColor = 'grey'
        elCell.innerText = gBoard[i][j].minesAroundCount

            }
        }
    

 

function cellMarked(elCell) {
    document.addEventListener('contextmenu', event => event.preventDefault());
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


function checkGameOver() {
    (!gGame.isOn)
}

function expandShown(board, elCell,
    i, j) {
}


function setMinesNegsCount(mat, cellI, cellJ) {
    var count = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ || j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) {
                count++
            }
        }
    }
    return count
}

document.addEventListener('DOMcontentLoaded', () => {
    var time = document.querySelector('.time')
    var start = document.querySelector('.start')
    var timeLeft = 90

    function countDown() {
        setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(timeLeft = 0)
            }
            time.innerHTML = timeLeft
            timeLeft -= 1
        }, 1000)
    }
    start.addEventListener('click', countDown)
})