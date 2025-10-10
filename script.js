import { Ship, Player } from "./shipyard.js";
import { drawBoard, menuOptions } from "./interface.js";
const options = menuOptions();
options.initialize()

document.getElementById('start').addEventListener('click', function(e){
    
});
//initialization phase, this will be updated from DOM later
let name = 'humanNameHere'
let player1 = Player(name)
let interface1 = drawBoard(name)
interface1.initialize()

let player2 = Player()//not including a name identifies a bot


let carrier = Ship(5, 'Carrier');
let battleship = Ship(4, 'Battleship');
let cruiser = Ship(3, 'Cruiser');
let submarine = Ship(3, 'Submarine');
let destroyer = Ship(2, 'Destroyer');

let carrier2 = Ship(5, 'Carrier');
let battleship2 = Ship(4, 'Battleship');
let cruiser2 = Ship(3, 'Cruiser');
let submarine2 = Ship(3, 'Submarine');
let destroyer2 = Ship(2, 'Destroyer');


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
    else {
        interface1.hitOpponent(x, y, result);
        if (player2.getBoard().fleetIsSunk()) endGame(player1.getName());
    }
    document.getElementById(e.target.id).removeEventListener('click', barrage);

    if(options.getDifficulty()) botBarrage();
    //else hide current interface
}

let botShots = [[-1, -1]];
function botBarrage(){
    //fires at random, eventually will implement intelligence
    let target = []
    if (options.getDifficulty() === 1) target = easyBotTargeting();
    if (options.getDifficulty() === 2) target = mediumBotTargeting();
    if (options.getDifficulty() === 3) target = hardBotTargeting();
    
    let result = player1.getBoard().receiveAttack(target[0], target[1]);
    if (result === undefined) interface1.missSelf(target[0], target[1]);
    else {
        interface1.hitSelf(target[0], target[1], result);
        if (player1.getBoard().fleetIsSunk()) endGame(player2.getName());
    }
}

function easyBotTargeting(){
    let x = -1;
    let y = -1;
    while(JSON.stringify(botShots).includes([x, y])){
        x = Math.floor(Math.random()*10);
        y = Math.floor(Math.random()*10);
    }
    botShots.push([x, y]);
    return [x, y];
}
function mediumBotTargeting(){
//finish at the end
}
function hardBotTargeting(){
//finish at the end
}

function endGame(winner){
    document.querySelectorAll(".target").forEach(tile => {
        tile.removeEventListener('click', barrage)
    })
    console.log(winner+" is the Winner!");
}