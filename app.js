const blocks = document.querySelectorAll(".grid div")
let player1 = document.getElementById('player-1')
let player2 = document.getElementById('player-2')
let playerTurn = 1
let moveCount = 0
let targetElement
let coordinates
let moveArray = [['-1', '-1', '-1'], ['-1', '-1', '-1'], ['-1', '-1', '-1']]
const idToIndexMap = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2]
}

blocks.forEach(block => block.addEventListener('click', fillBlock))

function fillBlock(event) {
    targetElement = event.target.querySelector('p')
    if (targetElement !== null) {
        coordinates = idToIndexMap[event.target.id]
        if (playerTurn === 1) {
            targetElement.innerHTML = 'X'
            moveArray[coordinates[0]][coordinates[1]] = 'X'
            console.log(moveArray)
            moveCount++
            if (checkForWin('X')) {
                alert("Player 1 won")
                playerTurn = -1
            }
            else if (moveCount === 9) {
                alert("Its a tie")
                playerTurn = -1
            }
            else {
                playerTurn = 2
                player1.innerHTML = player1.innerHTML.substring(0, player1.innerHTML.length - 1)
                player2.innerHTML += "*"
            }
        }
        else if (playerTurn === 2) {
            targetElement.innerHTML = 'O'
            moveArray[coordinates[0]][coordinates[1]] = 'O'
            moveCount++
            if (checkForWin('O')) {
                alert("Player 2 won")
                playerTurn = -1
            }
            else if (moveCount === 9) {
                alert("Its a tie")
            }
            else {
                playerTurn = 1
                player2.innerHTML = player2.innerHTML.substring(0, player2.innerHTML.length - 1)
                player1.innerHTML += "*"
            }
        }
    }
    else if (moveCount === 9) {
        alert("Game already over")
    }
    else {
        alert("You chose the wrong block. Try again!")
    }
}

function checkForWin(playerSign) {
    let result = false
    if (checkRowWise(playerSign)) {
        result = true
    }
    else if (checkColumnWise(playerSign)) {
        result = true
    }
    else if ((coordinates[0] === 0 && coordinates[1] === 0) || (coordinates[0] === 2 && coordinates[1] === 2)) {
        result = checkLeftDiagonal(playerSign)
    }
    else if ((coordinates[0] === 0 && coordinates[1] === 2) || (coordinates[0] === 2 && coordinates[1] === 0)) {
        result = checkRightDiagonal(playerSign)
    }
    else if (coordinates[0] === 1 && coordinates[1] === 1) {
        if (checkLeftDiagonal()) {
            result = true
        }
        else if (checkRightDiagonal()) {
            result = true
        }
    }
    return result
}

function checkRowWise(playerSign) {
    let matchCount = 0
    for (let i = 0; i < 3; i++) {
        if (moveArray[coordinates[0]][i] === playerSign) {
            matchCount++
        }
    }
    return matchCount === 3 ? true : false
}

function checkColumnWise(playerSign) {
    let matchCount = 0
    for (let i = 0; i < 3; i++) {
        if (moveArray[i][coordinates[1]] === playerSign) {
            matchCount++
        }
    }
    return matchCount === 3 ? true : false
}

function checkLeftDiagonal(playerSign) {
    let matchCount = 0
    for (let i = 0; i < 3; i++) {
        if (moveArray[i][i] === playerSign) {
            matchCount++
        }
    }
    return matchCount === 3 ? true : false
}

function checkRightDiagonal(playerSign) {
    let matchCount = 0
    for (let i = 0; i < 3; i++) {
        if (moveArray[i][2 - i] === playerSign) {
            matchCount++
        }
    }
    return matchCount === 3 ? true : false
}