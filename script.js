import { Ship, Player } from "./shipyard.js";
import { drawBoard } from "./interface.js";
//initialization will include single or multiplayer game
//initialization phase, this will be updated from DOM later
let name = 'humanNameHere'
let player1 = Player(name)
let interface1 = drawBoard(name)
interface1.initialize()

let player2 = Player()//not including a name identifies a bot
let botGame = true;

let carrier = Ship(5);
let battleship = Ship(4);
let cruiser = Ship(3);
let submarine = Ship(3);
let destroyer = Ship(2);

let carrier2 = Ship(5);
let battleship2 = Ship(4);
let cruiser2 = Ship(3);
let submarine2 = Ship(3);
let destroyer2 = Ship(2);

//manually input ship coordinates (handled by DOM later)
player1.getBoard().placeShip(1, 1, carrier)
interface1.addShip(1, 1, 'c')
player1.getBoard().placeShip(2, 1, carrier)
interface1.addShip(2, 1, 'c')
player1.getBoard().placeShip(3, 1, carrier)
interface1.addShip(3, 1, 'c')
player1.getBoard().placeShip(4, 1, carrier)
interface1.addShip(4, 1, 'c')
player1.getBoard().placeShip(5, 1, carrier)
interface1.addShip(5, 1, 'c')

player1.getBoard().placeShip(8, 1, battleship)
interface1.addShip(8, 1, 'b')
player1.getBoard().placeShip(8, 2, battleship)
interface1.addShip(8, 2, 'b')
player1.getBoard().placeShip(8, 3, battleship)
interface1.addShip(8, 3, 'b')
player1.getBoard().placeShip(8, 4, battleship)
interface1.addShip(8, 4, 'b')

player1.getBoard().placeShip(3, 3, cruiser)
interface1.addShip(3, 3, 'r')
player1.getBoard().placeShip(4, 3, cruiser)
interface1.addShip(4, 3, 'r')
player1.getBoard().placeShip(5, 3, cruiser)
interface1.addShip(5, 3, 'r')

player1.getBoard().placeShip(2, 5, submarine)
interface1.addShip(2, 5, 's')
player1.getBoard().placeShip(2, 6, submarine)
interface1.addShip(2, 6, 's')
player1.getBoard().placeShip(2, 7, submarine)
interface1.addShip(2, 7, 's')

player1.getBoard().placeShip(6, 7, destroyer)
interface1.addShip(6, 7, 'd')
player1.getBoard().placeShip(7, 7, destroyer)
interface1.addShip(7, 7, 'd')
//player2 now
player2.getBoard().placeShip(1, 1, carrier2)
player2.getBoard().placeShip(2, 1, carrier2)
player2.getBoard().placeShip(3, 1, carrier2)
player2.getBoard().placeShip(4, 1, carrier2)
player2.getBoard().placeShip(5, 1, carrier2)

player2.getBoard().placeShip(8, 1, battleship2)
player2.getBoard().placeShip(8, 2, battleship2)
player2.getBoard().placeShip(8, 3, battleship2)
player2.getBoard().placeShip(8, 4, battleship2)

player2.getBoard().placeShip(3, 3, cruiser2)
player2.getBoard().placeShip(4, 3, cruiser2)
player2.getBoard().placeShip(5, 3, cruiser2)

player2.getBoard().placeShip(2, 5, submarine2)
player2.getBoard().placeShip(2, 6, submarine2)
player2.getBoard().placeShip(2, 7, submarine2)

player2.getBoard().placeShip(6, 7, destroyer2)
player2.getBoard().placeShip(7, 7, destroyer2)

interface1.finishPlacement();
initTargets();
//update interface only when logical state changes, not in logic
//place ship or target location with input
//update targeting use results from target return value
//destroy event listener on interface change

//after placement phase

//combat phase
// while(!player1.getBoard().fleetIsSunk() && !player2.getBoard().fleetIsSunk()){

// }
function initTargets(){
    document.querySelectorAll(".target").forEach(tile => {
        tile.addEventListener('click', barrage)
    })
}

function barrage(e){
    let targetID = e.target.id;
    let x = targetID[0];
    let y = targetID[1];

    let result = player2.getBoard().receiveAttack(x, y);
    if (result === undefined) interface1.missOpponent(x, y);
    if (result === false || result === true) interface1.hitOpponent(x, y);
    document.getElementById(e.target.id).removeEventListener('click', barrage);

    if(botGame) botBarrage();
    //else hide current interface
}

let botShots = [];
function botBarrage(){
    //fires at random, eventually will implement intelligence
    let x = Math.floor(Math.random()*10);
    let y = Math.floor(Math.random()*10);
}