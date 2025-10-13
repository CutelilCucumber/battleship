import { Ship, Player } from "./shipyard.js";
import { drawBoard, menuOptions } from "./interface.js";
const options = menuOptions();
options.initialize()
let illegalSpots = [[-1, -1]];

let name1 = 'Player';
let name2 = 'Player2';
let fleet1 = [Ship(5, 'Carrier'), Ship(4, 'Battleship'), Ship(3, 'Destroyer'), Ship(3, 'Submarine'), Ship(2, 'Patrol Boat')];
let fleet2 = [Ship(5, 'Carrier'), Ship(4, 'Battleship'), Ship(3, 'Destroyer'), Ship(3, 'Submarine'), Ship(2, 'Patrol Boat')];
let player1 = null;
let player2 = null;
let interface1 = null;
let interface2 = null;

document.getElementById('start').addEventListener('click', startPlacement);

function startPlacement(){
    player1 = Player(name1)
    interface1 = drawBoard(name1)

    if(options.getDifficulty() > 0){
        player2 = Player() //not including a name tells the game its bot
        randomPlaceAll(player2, fleet2);
    } else {
        //some code here that collects player 2 name and initializes
    }
    
    interface1.initialize()

    document.getElementById(name1+'ranButton').addEventListener('click', () => {
        player1.getBoard().clearBoard();
        resetIllegals();
        interface1.clearLetters();

        randomPlaceAll(player1, fleet1, interface1)
    });
    document.getElementById(name1+'confButton').addEventListener('click', endPlacement);
}

function endPlacement(){
    if (player1.getBoard().fleetSize() !== 17) throw new Error("all ships must be placed: "+player1.getBoard().fleetSize())
    resetIllegals();
    interface1.finishPlacement();
    initTargets();
}

function randomPlaceAll(player, fleet, inter){
    
    randomPlacement(player, fleet[0], inter)
    randomPlacement(player, fleet[1], inter)
    randomPlacement(player, fleet[2], inter)
    randomPlacement(player, fleet[3], inter)
    randomPlacement(player, fleet[4], inter)

}

function randomPlacement(player, ship, inter){
    let shipSpots = []

    while (!allLegal(shipSpots) || shipSpots.length === 0){
        let placeDir = Math.floor(Math.random()*4);
        shipSpots[0] = randomLegal()
        

        if (placeDir === 0){
            for(let i = 1; i < ship.getLength(); i++){
                shipSpots[i] = [shipSpots[0][0]+i, shipSpots[0][1]];
            }
        } else if (placeDir === 1) {
            for(let i = 1; i < ship.getLength(); i++){
                shipSpots[i] = [shipSpots[0][0], shipSpots[0][1]+i];
            }
        } else if (placeDir === 2){
            for(let i = 1; i < ship.getLength(); i++){
                shipSpots[i] = [shipSpots[0][0]-i, shipSpots[0][1]];
            }
        } else{
            for(let i = 1; i < ship.getLength(); i++){
                shipSpots[i] = [shipSpots[0][0], shipSpots[0][1]-i];
            }
        }
        
    }
    for (let i = 0; i < shipSpots.length; i++){
        player.getBoard().placeShip(shipSpots[i][0], shipSpots[i][1], ship);
        illegalSpots.push(shipSpots[i]);
        if (inter) inter.addShip(shipSpots[i][0], shipSpots[i][1], ship.getName()[0])
    }
}


//after placement phase

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


function botBarrage(){
    //fires at random, eventually will implement intelligence
    let target = []
    if (options.getDifficulty() === 1) target = randomLegal();
    if (options.getDifficulty() === 2) target = mediumBotTargeting();
    if (options.getDifficulty() === 3) target = hardBotTargeting();
    illegalSpots.push(target);

    let result = player1.getBoard().receiveAttack(target[0], target[1]);
    if (result === undefined) interface1.missSelf(target[0], target[1]);
    else {
        interface1.hitSelf(target[0], target[1], result);
        if (player1.getBoard().fleetIsSunk()) endGame(player2.getName());
    }
}

// function randomPossibleHorizontal(coord){
//     let possibleX1 = coord[0]+1;
//     let possibleX2 = coord[0]-1;

//     if(possibleX1 >= 0 && possibleX1 < 10 
//         && !JSON.stringify(illegalSpots).includes([possibleX1, coord[1]])
//         && possibleX2 >= 0 && possibleX2 < 10 
//         && !JSON.stringify(illegalSpots).includes([possibleX2, coord[1]])){
//             if (Math.floor(Math.random()*2) === 0) return [possibleX1, coord[1]];
//             else return [possibleX2, coord[1]]
//         }
// // }

function resetIllegals() {
    illegalSpots = [[-1, -1]];
} 

function isLegal(spot){
    if (JSON.stringify(illegalSpots).includes([spot[0], spot[1]])) return false;
    else if (spot[0] < 0 || spot[0] > 9 || spot[1] < 0 || spot[1] > 9) return false;
    else return true;
}

function allLegal(spots){
    for(let i = 0; i<spots.length; i++){
        if (!isLegal(spots[i])) return false;
    }
    return true;
}

function randomLegal(){
    let x = -1;
    let y = -1;
    while(JSON.stringify(illegalSpots).includes([x, y])){
        x = Math.floor(Math.random()*10);
        y = Math.floor(Math.random()*10);
    }
    return [x, y];
}
function mediumBotTargeting(){
//finish at the end
//update targeting use results from target return value
}
function hardBotTargeting(){
//finish at the end
//use possible heatmap for board
}

function endGame(winner){
    document.querySelectorAll(".target").forEach(tile => {
        tile.removeEventListener('click', barrage)
    })
    console.log(winner+" is the Winner!");
}