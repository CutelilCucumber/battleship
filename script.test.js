import { Ship, Gameboard } from "./shipyard.js";
let carrier = Ship(5);
let battleship = Ship(4);
let cruiser = Ship(3);
let submarine = Ship(3);
let destroyer = Ship(2);

it ("single hit to be false", () =>
    expect(submarine.hit()).toBeFalsy());

it ("second hit to be false", () =>
    expect(submarine.hit()).toBeFalsy());

it ("3 hits sink", () =>
    expect(submarine.hit()).toBeTruthy());

