import { Ship, Player, decimalHash } from "./shipyard.js";
import { boardDisplay, menuOptions, dragPlace } from "./interface.js";

const options = menuOptions();
const display = boardDisplay();
options.initialize();
// document.getElementById()
let player1 = null;
let player2 = null;
let drag = null;


document.getElementById('start').addEventListener('click', startPlace1);
document.getElementById('resetButton').addEventListener('click', resetPlace1);
document.getElementById('confirmButton').addEventListener('click', startPlace2);

function startPlace1() {
    player1 = Player(options.getPlayerNames()[0]);
    display.startPlacement();
    display.updateText(player1.getName()+', Place your ships.')
    drag = dragPlace();
}
function startPlace2(){
    verifyShips();
    addFleetToBoard(player1);
    player2 = Player(options.getPlayerNames()[1]);
    if (options.getDifficulty() == 0){
        display.updateText(player2.getName()+', Place your ships.')
        display.flipInterface();
        display.resetBoard();
        drag = dragPlace();

        document.getElementById('resetButton').addEventListener('click', resetPlace2);
        document.getElementById('confirmButton').addEventListener('click', () => {
            verifyShips()
            addFleetToBoard(player2)
            beginGame()
        });
    } else if (options.getDifficulty() == 1){


        beginGame();
    } 
}

function resetPlace1() {
    display.resetBoard();
    drag = dragPlace();
    document.getElementById('resetButton').addEventListener('click', resetPlace1);
    document.getElementById('confirmButton').addEventListener('click', startPlace2);
}
function resetPlace2() {
    display.resetBoard();
    drag = dragPlace();
    document.getElementById('resetButton').addEventListener('click', resetPlace2);
        document.getElementById('confirmButton').addEventListener('click', () => {
            verifyShips()
            addFleetToBoard(player2)
            beginGame()
        })
}
function verifyShips(){
    if (drag.getTotalCoordinates().length !== 17){
        display.updateText('Place all available ships.')
        throw new Error('Incorrect fleet size')
    }
}

function beginGame(){
console.log('starting game')
}

function addFleetToBoard(player){
    let places = drag.getTotalCoordinates();
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
                console.log(places[i][0], places[i][1], ship)
            }
        }
    }
}