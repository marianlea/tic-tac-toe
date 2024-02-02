#SETUP
// players start with 3 hearts
// player1 left side(x), player2 right side(o)

// ENTER YOUR NAME
// player1 and player2 enter their names to start the game 
//  - start message: 'ENTER YOUR NAMES BELOW'
//  - two input fields under message
//  - once both players entered their names, their names go beside the hearts 
// message changes to 'NOW, PICK YOUR AVATAR'

# PICK AN AVATAR
// player1 picks avatar 
//  - 1 above the sprite
//  - sprite disabled
// player2 picks avatar
//  - 2 above the sprite
//  - sprite disabled
// message changes to 'WHO GOES FIRST?'

# WHO GOES FIRST
// setup 'END GAME' button
// Name1 above avatar VS Name2 Avatar
// once decided who will go first, message changes to 'NAME1 GOES FIRST'
// avatars go above the hearts and names
// the board gets displayed

# GAME BEGINS
// message box goes on top most part
//  - ROUND counter displayed top most element
//  - Name1's turn under round counter
// players take turns, message gets updated every turn
// players individual arrays gets compared to winning combos
// once one player array contains winning combos, message pops up 'NAME2 WON ROUND 1'
// Name1 hearts - 1
// ROUND 2
//  - message popup: loser goes first 'NAME1's TURN'
//game goes on until one player loses all hearts
// message popsup 'NAME1 WON THE GAME'

# GAME ENDS
// under message 'PLAY AGAIN' button
// Name1 avatar goes in the middle of player-section, size of avatar is bigger

# END GAME
// resets game to SETUP