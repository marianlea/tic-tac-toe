console.log('Ghibli Tic-Tac-Toe');


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

const playerOneNameElem = document.querySelector('#player1-name-input')
const playerTwoNameElem = document.querySelector('#player2-name-input')
const playerOneAvatarElem = document.querySelector('#player1-avatar-img')
const playerTwoAvatarElem = document.querySelector('#player2-avatar-img')
const playerOneHearts = document.querySelectorAll('#player1-active-heart')
const playerTwoHearts = document.querySelectorAll('#player2-active-heart')
const playerOneTurnTrackerElem = document.querySelectorAll('.player1-turn-tracker-span')
const playerTwoTurnTrackerElem = document.querySelectorAll('.player2-turn-tracker-span')
const chihiroElem = document.querySelector('#chihiro-img')
const kikiElem = document.querySelector('#kiki-img')
const ponyoElem = document.querySelector('#ponyo-img')
const sophieElem = document.querySelector('#sophie-img')
const avatarsContainerElem = document.querySelector('.avatars-div')
const avatarArray = [chihiroElem, kikiElem, ponyoElem, sophieElem];
const popupElem = document.querySelector('.popup-div')
const popupMessageElem = document.querySelector('.message-popup')
const playerOneTurnImgElem = document.querySelector('#player1-turn-img')
const playerTwoTurnImgElem = document.querySelector('#player2-turn-img')
const winnerElem = document.querySelector('.winner-img')
const boxesElems = document.querySelectorAll('.board-div div')
const roundCounterElem = document.querySelector('.round-counter-span')
const resetElem = document.querySelector('.reset-btn')
const nextRoundElem = document.querySelector('.next-round-btn')
const backgroundMusicElem = document.querySelector('#background-music')
const playMusicElem = document.querySelector('#play-music-img')
const muteMusicElem = document.querySelector('#mute-music-img')



chihiroElem.addEventListener('click', handleSetPlayerAvatar)
kikiElem.addEventListener('click', handleSetPlayerAvatar)
ponyoElem.addEventListener('click', handleSetPlayerAvatar)
sophieElem.addEventListener('click', handleSetPlayerAvatar)
playerOneNameElem.addEventListener('blur', isPlayerOneNameFilled);
playerOneNameElem.addEventListener('focus', handleBackgroundMusic)
playerTwoNameElem.addEventListener('blur', isPlayerTwoNameFilled)
for (let boxElem of boxesElems) {
    boxElem.addEventListener('click', handleChoice)
}
playerOneTurnImgElem.addEventListener('click', handleWhoGoesFirst)
playerTwoTurnImgElem.addEventListener('click', handleWhoGoesFirst)
resetElem.addEventListener('click', handleReset)
nextRoundElem.addEventListener('click', handleNextRound)
playMusicElem.addEventListener('click', handleBackgroundMusic)
muteMusicElem.addEventListener('click', handleMuteMusic)


chihiroElem.style.pointerEvents = 'none'
kikiElem.style.pointerEvents = 'none'
ponyoElem.style.pointerEvents = 'none'
sophieElem.style.pointerEvents = 'none'
playerTwoNameElem.setAttribute('disabled', true)


function handleMuteMusic() {
    backgroundMusicElem.muted = true
}

function handleBackgroundMusic() {
    backgroundMusicElem.play()
    backgroundMusicElem.muted = false
    backgroundMusicElem.volume = 0.05
}

function handleSetPlayerAvatar(event) {
    if (!playerOne.avatar){
        playerOneAvatarElem.setAttribute("src", event.target.src)
        playerOne.avatar = event.target.src
        playerOneAvatarElem.style.display = 'block'
        playerTwoNameElem.removeAttribute('disabled')
        chihiroElem.style.pointerEvents = 'none'
        kikiElem.style.pointerEvents = 'none'
        ponyoElem.style.pointerEvents = 'none'
        sophieElem.style.pointerEvents = 'none'
    } else if (!playerTwo.avatar) {
        playerTwoAvatarElem.setAttribute("src", event.target.src)
        playerTwo.avatar = event.target.src
        playerTwoAvatarElem.style.display = 'inline'
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
    let pickedPlayer = event.target
    if (pickedPlayer.src === playerOne.avatar) {
        whosTurn = playerOne
        playerTwoTurnImgElem.style.display = 'none'
        popupMessageElem.textContent = `${playerOne.name} will go first`
        setTimeout(startGame, 2000)
    } else {
        whosTurn = playerTwo
        playerOneTurnImgElem.style.display = 'none'
        popupMessageElem.textContent = `${playerTwo.name} will go first`
        setTimeout(startGame, 2000)
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
    winnerElem.src = ''
    roundCounter++
    roundCounterElem.textContent = roundCounter
    popupElem.style.display = 'none'
    popupMessageElem.textContent = ''
    const boxTokensElems = document.querySelectorAll('.box-player-img')
    for (let boxTokenElem of boxTokensElems) {
        boxTokenElem.remove()
    }
    for (let boxElem of boxesElems) {
        boxElem.style.pointerEvents = 'auto'
    }
    playerOne.choicesArr.length = 0
    playerTwo.choicesArr.length = 0
    handleChoice
}

function handleReset() {
    roundCounter = 1
    roundCounterElem.textContent = roundCounter
    popupElem.style.display = 'inline'
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
    chihiroElem.style.pointerEvents = 'none'
    kikiElem.style.pointerEvents = 'none'
    ponyoElem.style.pointerEvents = 'none'
    sophieElem.style.pointerEvents = 'none'
    playerTwoNameElem.setAttribute('disabled', true)
    isPlayerOneNameFilled()
}

function startGame() {
    playerOne.hearts = playerOneHearts.length
    playerTwo.hearts = playerTwoHearts.length
    popupElem.style.display = 'none'
    popupMessageElem.style.display = 'none'
    playerOneTurnImgElem.style.display = 'none'
    playerTwoTurnImgElem.style.display = 'none'
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
                winnerElem.style.display = 'inline'
                popupMessageElem.textContent = `${whosTurn.name} won round ${roundCounter}`
                resetElem.style.display = 'inline'
                nextRoundElem.style.display = 'inline'
                popupElem.style.display = 'inline'
                popupMessageElem.style.display = 'block'
            } else if (playerOne.hearts === 0 || playerTwo.hearts === 0) {
                if (playerOne.hearts === 0) {
                    popupMessageElem.textContent = `${playerTwo.name} won the game!` 
                    winnerElem.setAttribute('src', playerTwo.avatar)
                } else if (playerTwo.hearts === 0) {
                    popupMessageElem.textContent = `${playerOne.name} won the game!` 
                    winnerElem.setAttribute('src', playerOne.avatar)
                }
                winnerElem.style.display = 'inline'
                resetElem.style.display = 'inline'
                nextRoundElem.style.display = 'none'
                popupElem.style.display = 'inline'
                popupMessageElem.style.display = 'block'
            }
        } 
        
        if (totalBoxesFilled === totalBoxNumber && matchingNumber < 3) {
            winnerElem.setAttribute('src', '')
            popupMessageElem.textContent = 'DRAW!'
            resetElem.style.display = 'inline'
            nextRoundElem.style.display = 'inline'
            popupElem.style.display = 'inline'
            popupMessageElem.style.display = 'block'
        } 
    }
}
