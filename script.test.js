import { Ship, Gameboard } from "./shipyard.js";
let carrier = Ship(5);
let battleship = Ship(4);
let cruiser = Ship(3);
let submarine = Ship(3);
let destroyer = Ship(2);

let playerBoard = Gameboard()

it ("single hit to be false", () =>
    expect(submarine.hit()).toBeFalsy());

it ("second hit to be false", () =>
    expect(submarine.hit()).toBeFalsy());

it ("3 hits sink", () =>
    expect(submarine.hit()).toBeTruthy());

it ("board place not ship", () =>
    expect(() => playerBoard.placeShip(5, 3, "sub")).toThrow());

it ("placement out of bounds", () =>
    expect(() => playerBoard.placeShip(10, 1, destroyer)).toThrow());

it ("target out of bounds", () =>
    expect(() => playerBoard.receiveAttack(10, 1)).toThrow());

playerBoard.placeShip(5, 5, destroyer)

it ("ship already at spot", () =>
    expect(() => playerBoard.placeShip(5, 5, submarine)).toThrow());

playerBoard.placeShip(5, 6, destroyer)

it ("ship is hit", () =>
    expect(playerBoard.receiveAttack(5, 5)).toBeFalsy());

it ("location already targeted", () =>
    expect(() => playerBoard.receiveAttack(5, 5)).toThrow());

it ("fleet is not destroyed", () =>
    expect(playerBoard.fleetIsSunk()).toBeFalsy());

it ("ship is destroyed", () =>
    expect(playerBoard.receiveAttack(5, 6)).toBeTruthy());

it ("fleet is destroyed", () =>
    expect(playerBoard.fleetIsSunk()).toBeTruthy());