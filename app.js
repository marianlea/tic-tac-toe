console.log('Ghibli Tic-Tac-Toe');


// game state (globals)
let player1Hearts = 3
let player2Hearts = 3
let player1ChoicesArr = []
let player2ChoicesArr = []
let roundCounter = 1
let whosPlayerTurn = 'Player1'

// caching dom element references

const roundCounterElem = document.querySelector('#round-counter-span')
const resetTopElem = document.querySelector('#reset-btn-top')
const nextRoundElem = document.querySelector('.next-round-btn')
const resetPopupElem = document.querySelector('.reset-btn-popup')
const playerTurnElem = document.querySelector('#player-turn-span')
const messageElem = document.querySelector('.message-div')
const boxesElem = document.querySelectorAll('.board-div div')
const playerOneNameElem = document.querySelector('.player1-div')
const playerTwoNameElem = document.querySelector('.player2-div')
const playerOneHeartsElem = document.querySelector('#player1-hearts-span')
const playerTwoHeartsElem = document.querySelector('#player2-hearts-span')

// event listeners

// resetElem.addEventListener('click', handleReset)
for (let boxElem of boxesElem) {
    boxElem.addEventListener('click', handleChoice)
}
nextRoundElem.addEventListener('click', handleNextRound)
resetPopupElem.addEventListener('click', handleReset)
resetTopElem.addEventListener('click', handleReset)

// event handlers

function handleChoice(event) {
    // find out which box did the player chose / clicked
    const choiceElem = event.target
    // console.log(choiceElem);
    const boxNumber = Number(choiceElem.dataset.num)
    // console.log(boxNumber);
    // disable div
    choiceElem.style.pointerEvents = 'none'
    // push date num of box chosen to player1 choices array
    player1ChoicesArr.push(boxNumber)
    // console.log({player1ChoicesArr})
    checkForWinningPattern(player1ChoicesArr)
    console.log(player1ChoicesArr);
}


function handleNextRound() {
    // console.log(player1ChoicesArr);
    resetPopupElem.style.display = 'none'
    nextRoundElem.style.display = 'none'
    roundCounter++
    console.log(roundCounter);
    roundCounterElem.textContent = roundCounter
    player1ChoicesArr.length = 0
    messageElem.style.display = 'none'
    for (let boxElem of boxesElem) {
        boxElem.style.pointerEvents = 'auto'
    }
    handleChoice;
}

function handleReset() {
    resetPopupElem.style.display = 'none'
    nextRoundElem.style.display = 'none'
    // console.log('clicking');
    roundCounter = 1
    player2Hearts = 3
    playerTwoHeartsElem.textContent = player2Hearts
    roundCounterElem.textContent = roundCounter
    player1ChoicesArr.length = 0
    messageElem.style.display = 'none'
    for (let boxElem of boxesElem) {
        boxElem.style.pointerEvents = 'auto'
    }
    handleChoice;
    nextRoundElem.disabled = false
}

// other functions

function checkForWinningPattern (player1ChoicesArr) {
    const winningPatterns = [[1, 2, 3], [4, 5, 6],[7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9],[3, 5 ,7]]

    // check if any of the winning patterns matches player choices
    for (let winningPattern of winningPatterns) {
        // console.log('this is the winning patter', winningPattern)
        // console.log('this is player1ChoicesArr', player1ChoicesArr);
        // count how many numbers matches
        let matchingNumber = 0
        // check each number of one winning pattern matches the player choices
        for (let number of winningPattern) {
            if (player1ChoicesArr.includes(number)) {
                matchingNumber++
                console.log(matchingNumber);
            }
        }

        if (matchingNumber === 3) {
            for (let boxElem of boxesElem) {
                boxElem.style.pointerEvents = 'none'
            }
            messageElem.textContent = 'player1 won'
            messageElem.style.display =
            'block'
            player2Hearts--
            // console.log(player2Hearts);
            playerTwoHeartsElem.textContent = player2Hearts
            resetPopupElem.style.display = 'inline-block'
            nextRoundElem.style.display = 'inline-block'
        }

        if (player2Hearts === 0) {
            messageElem.textContent = 'Player 1 won the game!'
            messageElem.style.display = 'block'
            nextRoundElem.disabled = true
        }
    }

}

function whosTurn(whosPlayerTurn) {
    if ('Player1') {

    }
}