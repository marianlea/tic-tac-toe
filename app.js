console.log('Ghibli Tic-Tac-Toe');

// game state or globals
let playerOne = {
    name : '',
    hearts : 0,
    choicesArr : [],
    avatar : '',
}

let playerTwo = {
    name : '',
    hearts : 0,
    choicesArr : [],
    moveSign : 'o',
    avatar : '',
}

let whosTurn = null
let roundCounter = 1


// chache dom element references

// player names, avatars, hp
const playerOneNameElem = document.querySelector('#player1-name-input')
const playerTwoNameElem = document.querySelector('#player2-name-input')
const playerOneAvatarElem = document.querySelector('#player1-avatar-img')
const playerTwoAvatarElem = document.querySelector('#player2-avatar-img')
const playerOneHearts = document.querySelectorAll('#player1-active-heart')
const playerTwoHearts = document.querySelectorAll('#player2-active-heart')

// avatar choices
const chihiroElem = document.querySelector('#chihiro-img')
const kikiElem = document.querySelector('#kiki-img')
const ponyoElem = document.querySelector('#ponyo-img')
const sophieElem = document.querySelector('#sophie-img')
const avatarsContainerElem = document.querySelector('.avatars-div')
const avatarArray = [chihiroElem, kikiElem, ponyoElem, sophieElem];
// popup message
const popupElem = document.querySelector('.popup-div')
const popupMessageElem = document.querySelector('.message-popup')
const playerOneTurnImgElem = document.querySelector('#player1-turn-img')
const playerTwoTurnImgElem = document.querySelector('#player2-turn-img')
const winnerElem = document.querySelector('.winner-img')
// board / game
const boxesElems = document.querySelectorAll('.board-div div')
const roundCounterElem = document.querySelector('.round-counter-span')
// buttons
const resetElem = document.querySelector('.reset-btn')
const nextRoundElem = document.querySelector('.next-round-btn')
// event listeners
// avatars
chihiroElem.addEventListener('click', handleSetPlayerAvatar)
kikiElem.addEventListener('click', handleSetPlayerAvatar)
ponyoElem.addEventListener('click', handleSetPlayerAvatar)
sophieElem.addEventListener('click', handleSetPlayerAvatar)
playerOneNameElem.addEventListener("blur", isPlayerOneNameFilled);
playerTwoNameElem.addEventListener('blur', isPlayerTwoNameFilled)
for (let boxElem of boxesElems) {
    boxElem.addEventListener('click', handleChoice)
}
playerOneTurnImgElem.addEventListener('click', handleWhoGoesFirst)
playerTwoTurnImgElem.addEventListener('click', handleWhoGoesFirst)
resetElem.addEventListener('click', handleReset)
nextRoundElem.addEventListener('click', handleNextRound)


chihiroElem.style.pointerEvents = 'none'
kikiElem.style.pointerEvents = 'none'
ponyoElem.style.pointerEvents = 'none'
sophieElem.style.pointerEvents = 'none'


// event handlers
function handleSetPlayerAvatar(event) {
    if (!playerOne.avatar){
        playerOneAvatarElem.setAttribute("src", event.target.src)
        playerOne.avatar = event.target.src
        playerOneAvatarElem.style.display = 'block'
    } else if (!playerTwo.avatar) {
        playerTwoAvatarElem.setAttribute("src", event.target.src)
        playerTwo.avatar = event.target.src
        playerTwoAvatarElem.style.display = 'block'
    } else {
        return;
    }
    event.target.style.display = 'none'
    if (playerTwo.name.length > 0) {
        chihiroElem.style.display = 'none'
        kikiElem.style.display = 'none'
        ponyoElem.style.display = 'none'
        sophieElem.style.display = 'none'
        popupMessageElem.textContent = 'Who will go first?'
        playerOneTurnImgElem.setAttribute('src', playerOne.avatar)
        playerTwoTurnImgElem.setAttribute('src', playerTwo.avatar)
        playerOneTurnImgElem.style.display = 'inline'
        playerTwoTurnImgElem.style.display = 'inline'
    } else { 
        popupMessageElem.textContent = 'Enter player 2 name';
    }
}

function isPlayerOneNameFilled() {
    if (!playerOneNameElem.value){
        return
    }
    playerOne.name = playerOneNameElem.value;
    playerOneNameElem.setAttribute('disabled', true)
    popupMessageElem.textContent = `Select your avatar ${playerOneNameElem.value}`;
    chihiroElem.style.pointerEvents = 'auto'
    kikiElem.style.pointerEvents = 'auto'
    ponyoElem.style.pointerEvents = 'auto'
    sophieElem.style.pointerEvents = 'auto'
}

function isPlayerTwoNameFilled() {
    if (!playerTwoNameElem.value){
        return
    }
    playerTwo.name = playerTwoNameElem.value;
    playerTwoNameElem.setAttribute('disabled', true)
    popupMessageElem.textContent = `Select your avatar ${playerTwoNameElem.value}`;
    chihiroElem.style.pointerEvents = 'auto'
    kikiElem.style.pointerEvents = 'auto'
    ponyoElem.style.pointerEvents = 'auto'
    sophieElem.style.pointerEvents = 'auto'
}

function handleWhoGoesFirst(event) {
    let pickedPlayer = event.target.src
    if (pickedPlayer === playerOne.avatar) {
        whosTurn = playerOne
        playerTwoTurnImgElem.style.display = 'none'
        popupMessageElem.textContent = `${playerOne.name} will go first`
        // console.log(whosTurn);
        setTimeout(startGame, 1000)
    } else {
        whosTurn = playerTwo
        playerOneTurnImgElem.style.display = 'none'
        popupMessageElem.textContent = `${playerTwo.name} will go first`
        // console.log(whosTurn)
        setTimeout(startGame, 1000)
    }
}

function handleChoice(event) {
    const choiceElem = event.target
    const boxImgElem = document.createElement('img')
    boxImgElem.setAttribute('src', whosTurn.avatar)
    boxImgElem.className = 'box-player-img'
    choiceElem.appendChild(boxImgElem)
    const boxNumber = Number(choiceElem.dataset.num)

    choiceElem.style.pointerEvents = 'none'
    whosTurn.choicesArr.push(boxNumber)
    checkForWinningPattern(whosTurn.choicesArr)
    pickNextPlayer()
}

function handleNextRound() {
    console.log('next round');
    roundCounter++
    roundCounterElem.textContent = roundCounter
    popupElem.style.display = 'none'
    popupMessageElem.textContent = ''
    const boxTokensElems = document.querySelectorAll('.box-player-img')
    const roundWinnerElem = document.querySelector('.round-winner-img')
    for (let boxTokenElem of boxTokensElems) {
        boxTokenElem.remove()
    }
    for (let boxElem of boxesElems) {
        boxElem.style.pointerEvents = 'auto'
    }
    playerOne.choicesArr.length = 0
    playerTwo.choicesArr.length = 0
    if (roundWinnerElem === null) {
        return
    } else {
        roundWinnerElem.remove()
    }
    handleChoice()
}

function handleReset() {
    console.log('restarting....');
    roundCounter = 1
    roundCounterElem.textContent = roundCounter
    popupElem.style.display = 'block'
    popupMessageElem.textContent = 'Enter player 1 name'
    nextRoundElem.style.display = 'none'
    resetElem.style.display = 'none'
    chihiroElem.style.display = 'inline'
    kikiElem.style.display = 'inline'
    ponyoElem.style.display = 'inline'
    sophieElem.style.display = 'inline'
    const boxTokensElems = document.querySelectorAll('.box-player-img')
    winnerElem.style.display = 'none'
    for (let boxTokenElem of boxTokensElems) {
        boxTokenElem.remove()
    }
    for (let boxElem of boxesElems) {
        boxElem.style.pointerEvents = 'auto'
    }
    for (let heart of playerOneHearts) {
        heart.style.display = 'inline'
    }
    for (let heart of playerTwoHearts) {
        heart.style.display = 'inline'
    }
    playerOne.name = ''
    playerTwo.name = ''
    playerOne.avatar = ''
    playerTwo.avatar = ''
    playerOne.choicesArr.length = 0
    playerTwo.choicesArr.length = 0
    playerOneAvatarElem.setAttribute('src','')
    playerTwoAvatarElem.setAttribute('src','')
    playerOneAvatarElem.style.display = 'none'
    playerTwoAvatarElem.style.display = 'none'
    playerOneNameElem.removeAttribute('disabled')
    playerTwoNameElem.removeAttribute('disabled')
    playerOneNameElem.value = null
    playerTwoNameElem.value = null

    isPlayerOneNameFilled()
}

function startGame() {
    playerOne.hearts = playerOneHearts.length
    playerTwo.hearts = playerTwoHearts.length
    popupElem.style.display = 'none'
    popupMessageElem.style.display = 'none'
    playerOneTurnImgElem.style.display = 'none'
    playerTwoTurnImgElem.style.display = 'none'
    console.log('finally! start the game');
}

function pickNextPlayer() {
    if (whosTurn === playerOne) {
        whosTurn = playerTwo
    } else {
        whosTurn = playerOne
    }
}

function checkForWinningPattern(playerChoicesArr) {
    const winningPatterns = [
        [1, 2, 3], 
        [4, 5, 6],
        [7, 8, 9], 
        [1, 4, 7], 
        [2, 5, 8], 
        [3, 6, 9], 
        [1, 5, 9],
        [3, 5 ,7]
    ]

    for (let winningPattern of winningPatterns) {
        let matchingNumber = 0
        let totalBoxNumber = 9
        let totalBoxesFilled = playerOne.choicesArr.length + playerTwo.choicesArr.length

        for (let number of winningPattern) {
            if (playerChoicesArr.includes(number)) {
                matchingNumber++
            }
        }

        if (matchingNumber === 3) {
            for (let boxElem of boxesElems) {
                boxElem.style.pointerEvents = 'none'
            }
            if (whosTurn === playerOne) {
                playerTwo.hearts--
                playerTwoHearts[playerTwo.hearts].style.display = 'none'
            } else {
                playerOne.hearts--
                playerOneHearts[playerOne.hearts].style.display = 'none'  
            }

            if (playerOne.hearts > 0 && playerTwo.hearts > 0) {
                winnerElem.setAttribute('src', whosTurn.avatar)
                winnerElem.style.display = 'block'
                popupMessageElem.textContent = `${whosTurn.name} won round ${roundCounter}`
                resetElem.style.display = 'block'
                nextRoundElem.style.display = 'block'
                popupElem.style.display = 'block'
                popupMessageElem.style.display = 'block'
                console.log(playerOne.hearts);
                console.log(playerTwo.hearts);
            } else {
                const winnerElem = document.createElement('img')
                winnerElem.className = 'winner-img'
                winnerElem.setAttribute('src', whosTurn.avatar)
                popupElem.appendChild(winnerElem)
                resetElem.style.display = 'block'
                nextRoundElem.style.display = 'none'
                popupMessageElem.textContent = `${whosTurn.name} won the game!`
                popupElem.style.display = 'block'
                popupMessageElem.style.display = 'block'
            }

        } else if (totalBoxesFilled === totalBoxNumber) {
            popupMessageElem.textContent = 'DRAW!'
            resetElem.style.display = 'block'
            nextRoundElem.style.display = 'block'
            popupElem.style.display = 'block'
            popupMessageElem.style.display = 'block'
        }
    }
}
