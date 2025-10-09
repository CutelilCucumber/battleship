import { Ship, Player } from "./shipyard.js";
import { drawBoard } from "./interface.js";
//initialization will include single or multiplayer game
//initialization phase, this will be updated from DOM later
let name = 'humanNameHere'
let player1 = Player(name)
let interface1 = drawBoard(name)

let player2 = Player()//not including a name identifies a bot

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
player1.getBoard().placeShip(2, 1, carrier)
player1.getBoard().placeShip(3, 1, carrier)
player1.getBoard().placeShip(4, 1, carrier)
player1.getBoard().placeShip(5, 1, carrier)

player1.getBoard().placeShip(8, 1, battleship)
player1.getBoard().placeShip(8, 2, battleship)
player1.getBoard().placeShip(8, 3, battleship)
player1.getBoard().placeShip(8, 4, battleship)

player1.getBoard().placeShip(3, 3, cruiser)
player1.getBoard().placeShip(4, 3, cruiser)
player1.getBoard().placeShip(5, 3, cruiser)

player1.getBoard().placeShip(2, 5, submarine)
player1.getBoard().placeShip(2, 6, submarine)
player1.getBoard().placeShip(2, 7, submarine)

player1.getBoard().placeShip(6, 7, destroyer)
player1.getBoard().placeShip(7, 7, destroyer)
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

//update interface only when logical state changes, not in logic
//save input
//place ship or target location with input
//update interface with input. if targeting use results from target return value
//destroy event listener on interface change