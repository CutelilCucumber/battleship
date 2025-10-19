import { Ship, Player, decimalHash } from "./shipyard.js";
import { boardDisplay, menuOptions, dragPlace } from "./interface.js";

const options = menuOptions();
const display = boardDisplay();
options.initialize();
// document.getElementById()
document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    display.startPlacement();
    dragPlace()
}
