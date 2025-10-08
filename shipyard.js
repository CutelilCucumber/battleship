export function Gameboard(){
    let _board = initBoard();
    let _fleet = [];

    function initBoard() {
        let arr = [];
        for(let i = 0; i < 10; i++) {
            arr[i] = [];
            for(let j = 0; j < 10; j++) {
                arr[i][j] = "ocean";
            }
        }
        return arr;
    }

    const placeShip = (x, y, ship) => {
        //ship placing phase is before targeting, board spot will never be "miss"
        if (ship.isSunk() !== false) throw new Error("ship must be Ship object.")
        if (_board[x][y] === "ocean"){
            _board[x][y] = ship;
            _fleet.push(ship);
        } 
        else throw new Error("Location already has a ship.")
    }

    const receiveAttack = (x, y) => {
        if (_board[x][y] === "miss") throw new Error("Location has already been targeted.")
        if (_board[x][y] === "ocean") _board[x][y] = "miss";
        else return _board[x][y].hit()//false if hit, true if sunk
    }

    const fleetIsSunk = () => {
        for(let ship in _fleet){
            if (ship.isSunk() === false) return false;
        }
        return true;
    }

    return {
        placeShip,
        receiveAttack,
        fleetIsSunk
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
        hit,
        isSunk
    }
}