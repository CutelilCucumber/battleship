import { Ship, Player } from "./shipyard.js";
import { boardDisplay, menuOptions, dragPlace } from "./interface.js";
import { computer, placementSet } from "./botAim.js"

const options = menuOptions();
const display = boardDisplay();
options.initialize();
// document.getElementById()
let player1 = null;
let player2 = null;
let drag = null;
let bot = null;



document.getElementById('start').addEventListener('click', startPlace1);


function startPlace1() {

    document.getElementById('resetButton').addEventListener('click', () => {
        resetPlacement(player1)
    });
    document.getElementById('confirmButton').addEventListener('click', () => {
        verifyShips();
        addFleetToBoard(player1, drag.getTotalCoordinates());
        startPlace2();
    });
    document.getElementById('luckyButton').addEventListener('click', () => {
        addFleetToBoard(player1, placementSet());
        startPlace2();
    });
    player1 = Player(options.getPlayerNames()[0]);
    display.startPlacement();
    display.updateText(player1.getName()+', Place your ships.')
    drag = dragPlace();
}
function startPlace2(){
    
    player2 = Player(options.getPlayerNames()[1]);
    if (options.getDifficulty() == 0){
        display.updateText(player2.getName()+', Place your ships.')
        display.flipPlacement();
        display.resetBoard();
        drag = dragPlace();

        document.getElementById('resetButton').addEventListener('click', resetPlacement(player2));
        document.getElementById('confirmButton').addEventListener('click', () => {
            verifyShips();
            addFleetToBoard(player2, drag.getTotalCoordinates())
            beginGame();
        });
        document.getElementById('luckyButton').addEventListener('click', () => {
            addFleetToBoard(player2, placementSet());
            beginGame();
        });
    } else {
        bot = computer();
        addFleetToBoard(player2, placementSet());
        beginGame();
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
        else beginGame();
    });
    document.getElementById('luckyButton').addEventListener('click', () => {
        addFleetToBoard(player, placementSet());
        if(player === player1) startPlace2();
        else beginGame();
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
        let result = player1.getBoard().receiveAttack(botTarget());
        return (playerTurn(player1))
    }
}
function botTarget(){
    let shot = []
    switch (options.getDifficulty()) {
        case 1:
            shot = bot.easyShot();
            break;
        case 2:
            shot = bot.medShot();
            break;
        case 3:
            shot = bot.hardShot();
            break;
    }
    return shot;
}

function addFleetToBoard(player, places){
    console.log(places);
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