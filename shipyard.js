export function Gameboard(){
    let _board = initBoard();

    function initBoard() {
        let arr = [];
        for(let i = 0; i < 10; i++) {
            arr[i] = [];
            for(let j = 0; j < 10; j++) {
                arr[i][j] = Tile();
            }
        }
        return arr;
    }

    const placeShip = (x, y, ship) => {
        _board[x][y].setShip(ship);
    }

    const receiveAttack = (x, y) => {
        return _board[x][y].target();
    }

    return {
        placeShip,
        receiveAttack
    }
}

export function Ship(length){
    let _length = length;
    let _hits = 0;
    let _sunk = false;

    const hit = () => {
        _hits++;
        return isSunk();
    }

    function isSunk(){
        if (_hits >= _length) _sunk = true;
        return _sunk;
    }

    return {
        hit
    }
}

function Tile(){
    let _hit = false;
    let _ship = null;

    const setShip = (ship) => {
        if (_ship) throw new Error("Ship already exists at specified location.")
        _ship = ship;
    }

    const target = () => {//returns true if sunk, false if hit, 'miss' if miss
        if (_hit) throw new Error("Location has already been targeted.")
        _hit = true;

        if (_ship) return _ship.hit();
        else return("miss");
    }

    return {
        setShip,
        target
    }
}