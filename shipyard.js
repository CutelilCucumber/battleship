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
        if (x > 9 || y > 9) throw new Error("Target is out of bounds.")
        if (!Object.hasOwn(ship, 'isSunk')) throw new Error("ship must be Ship object.")
        if (_board[x][y] === "ocean"){
            _board[x][y] = ship;
            _fleet.push(ship);
        } 
        else throw new Error("Location already has a ship.")
    }

    const receiveAttack = (x, y) => {
        if (x > 9 || y > 9) throw new Error("Target is out of bounds.")
        if (_board[x][y] === "miss" || _board[x][y] === "hit") throw new Error("Location has already been targeted.")
        if (_board[x][y] === "ocean") _board[x][y] = "miss";
        else{
            let hitShip = _board[x][y]
            _board[x][y] = "hit"
            return hitShip.hit()
        }//false if hit, true if sunk
    }

    const fleetIsSunk = () => {
        for(let i = 0; i < _fleet.length; i++){
            if (_fleet[i].isSunk() === false) return false;
        }
        return true;
    }

    return {
        placeShip,
        receiveAttack,
        fleetIsSunk
    }
}

export function Ship(length, name){
    let _length = length;
    let _name = name;
    let _hits = 0;
    let _sunk = false;

    const hit = () => {
        _hits++;
        return isSunk();
    }

    function isSunk(){
        if (_hits >= _length){
            _sunk = true;
            return _name;
        }
        else return false;
    }

    return {
        hit,
        isSunk
    }
}

export function Player(playerName){
    let _playerName = playerName ?? 'Computer'; //if false, player is considered a bot
    let _gameBoard = Gameboard();

    const getName = () => {
        return _playerName;
    }

    const getBoard = () => {
        return _gameBoard;
    }

    return {
        getName,
        getBoard
    }
}