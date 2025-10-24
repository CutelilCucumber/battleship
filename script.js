import { Ship, Player } from "./shipyard.js";
import { boardDisplay, menuOptions, dragPlace, decimalHash } from "./interface.js";
import { computer, placementSet } from "./botAim.js"

const options = menuOptions();
const display = boardDisplay();
let bot = computer();
options.initialize();
let player1 = null;
let player2 = null;
let nextPlayer = null;
let drag = null;



document.getElementById('start').addEventListener('click', startPlace1);


function startPlace1() {
    player1 = Player(options.getPlayerNames()[0]);
    player2 = Player(options.getPlayerNames()[1]);
    nextPlayer = player1;
    
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
        display.beginGame(player1.getName(), player2.getName());
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
            display.beginGame(player1.getName(), player2.getName());
            playerTurn(player1);
        };
    });
    document.getElementById('luckyButton').addEventListener('click', () => {
        addFleetToBoard(player, placementSet());
        if(player === player1) startPlace2();
        else {
            display.resetBoard();
            display.beginGame(player1.getName(), player2.getName());
            playerTurn(player1)
        };
    });
}

function playerTurn(player){
    alternateNext();
    display.updateText(player.getName()+'`s turn')
    if (player === player2 && options.getDifficulty() > 0){
        let botAttack = botTarget();
        let result = player1.getBoard().receiveAttack(botAttack[0], botAttack[1]);
        //false if hit, true if sunk, 2 if missed
        display.attackSpot(player1, result, botAttack[0], botAttack[1]);
        bot.rememberResult(result);
        return (playerTurn(player1));
    } else {
        display.paintShips(player);
        initTargets();
    }
}

function initTargets(){
    document.querySelector('.'+nextPlayer.getName()).querySelectorAll('.playable')
        .forEach((target) => {
            target.classList.add('target');
            target.addEventListener('click', attackEvent);
    })
}
function removeTargets(){
    document.querySelector('.'+nextPlayer.getName()).querySelectorAll('.playable')
        .forEach((target) => {
            target.classList.remove('target');
            target.removeEventListener('click', attackEvent);
    })
}

function attackEvent(e){
    let x = e.target.className[0];
    let y = e.target.className[1];
    if (typeof(x) !== 'number') x = decimalHash(x);
    if (typeof(y) !== 'number') y = Number(y);
    
    let result = nextPlayer.getBoard().receiveAttack(x, y);
    display.attackSpot(nextPlayer, result, x, y);
    //false if hit, shipObj if sunk, 2 if missed
    e.target.classList.remove('target'); 
    let delay = 1000;
    if (result !== 2 && result !== false) delay = 2000;
    removeTargets();
    setTimeout(() => {
        display.unpaintShips();
        playerTurn(nextPlayer)
    }, delay);
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

function alternateNext(){
    if (nextPlayer == player1) nextPlayer = player2;
    else if (nextPlayer == player2) nextPlayer = player1;
}

function addFleetToBoard(player, places){
    let fleet = [
        Ship(5, 'Carrier'),
        Ship(4, 'Battleship'),
        Ship(3, 'Cruiser'),
        Ship(3, 'Submarine'),
        Ship(2, 'Destroyer')
    ] 
    for(let i=0; i<places.length; i++){
        for (let ship of fleet){
            if (places[i][2] === ship.getName()){
                player.getBoard().placeShip(places[i][0], places[i][1], ship);
            }
        }
    }
}
function verifyShips(){
    if (drag.getTotalCoordinates().length !== 17){
        display.updateText('Place all available ships.');
        throw new Error('Incorrect fleet size');
    };
}