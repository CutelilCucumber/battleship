import { Ship, Player } from "./shipyard.js";
import { boardDisplay, menuOptions, dragPlace } from "./interface.js";
import { computer, placementSet } from "./botAim.js"

const options = menuOptions();
const display = boardDisplay();
options.initialize();
let player1 = null;
let player2 = null;
let nextPlayer = player1;
let drag = null;
let bot = null;



document.getElementById('start').addEventListener('click', startPlace1);


function startPlace1() {
    player1 = Player(options.getPlayerNames()[0]);
    player2 = Player(options.getPlayerNames()[1]);
    if (options.getDifficulty > 0) bot = computer();
    
    display.startPlacement();
    resetPlacement(player1);
    display.updateText(player1.getName()+', Place your ships.')
    
}

function startPlace2(){
    if (options.getDifficulty() == 0){
        display.updateText(player2.getName()+', Place your ships.')
        display.resetBoard();
        resetPlacement(player2);
    } else {
        addFleetToBoard(player2, placementSet());
        display.resetBoard();
        display.beginGame();
        playerTurn(player1);
    }
}

function resetPlacement(player) {
    display.resetBoard();
    drag = dragPlace();
    document.getElementById('resetButton').addEventListener('click', () => {
        resetPlacement(player)
    });
    document.getElementById('confirmButton').addEventListener('click', () => {
        verifyShips();
        addFleetToBoard(player, drag.getTotalCoordinates());
        if(player === player1) startPlace2();
        else {
            display.resetBoard();
            display.beginGame();
            playerTurn(player1)
        };
    });
    document.getElementById('luckyButton').addEventListener('click', () => {
        addFleetToBoard(player, placementSet());
        if(player === player1) startPlace2();
        else {
            display.resetBoard();
            display.beginGame();
            playerTurn(player1)
        };
    });
}
function verifyShips(){
    if (drag.getTotalCoordinates().length !== 17){
        display.updateText('Place all available ships.')
        throw new Error('Incorrect fleet size')
    }
}
function playerTurn(player){
    if (player === player2 && options.getDifficulty() > 0){
        let botAttack = botTarget();
        let result = player1.getBoard().receiveAttack(botAttack[0], botAttack[1]);
        bot.rememberResult(result)
        return (playerTurn(player1))
    } else if (player){

    }
}

function initTargets(player){

}

function attackEvent(){

}

function switchPlayer(){
    if (nextPlayer === player1) nextPlayer = player2;
    else if (nextPlayer === player2) nextPlayer = player2;
    else throw new Error('players unable to switch')
}

function botTarget(){
    switch (options.getDifficulty()) {
        case 1:
            return(bot.easyShot());
        case 2:
            return(bot.medShot());
        case 3:
            return(bot.hardShot());
    }
}

function addFleetToBoard(player, places){
    console.log(places, player.getName());
    let fleet = [
        Ship(5, 'Carrier'),
        Ship(5, 'Battleship'),
        Ship(5, 'Cruiser'),
        Ship(5, 'Submarine'),
        Ship(5, 'Destroyer')
    ] 
    for(let i=0; i<places.length; i++){
        for (let ship of fleet){
            if (places[i][2] === ship.getName()){
                player.getBoard().placeShip(places[i][0], places[i][1], ship);
            }
        }
    }
}