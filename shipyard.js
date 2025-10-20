export function Gameboard(){
    const _board = initBoard();
    let _fleet = [];

    function initBoard() {
        let arr = [];
        for(let i = 0; i < 10; i++) {
            arr[i] = []
            for(let j = 0; j < 10; j++) {
                arr[i][j] = i+''+j+'Ocean';
            }
        }
        
        return arr;
    }

    const fleetSize = () => {
        return _fleet.length;
    }

    const clearBoard = () => {
        _board = initBoard();
        _fleet = [];
    }

    const placeShip = (x, y, ship) => {
        //ship placing phase is before targeting, board spot will never be "miss"
        if (x > 9 || y > 9) throw new Error("Target is out of bounds.")
        if (!Object.hasOwn(ship, 'isSunk')) throw new Error("ship must be Ship object.")
        if (_board[x][y].includes('Ocean')){
            _board[x][y] = _board[x][y].replace('Ocean', ship.getName());
            addShipToFleet(ship);
        } 
        else throw new Error("Location already has a ship.")
    }

    const receiveAttack = (x, y) => {
        if (x > 9 || y > 9) throw new Error("Target is out of bounds.")
        if (_board[x][y].includes('Miss') || _board[x][y].includes('Hit')) throw new Error("Location has already been targeted.")
        if (_board[x][y].includes('Ocean')){
            _board[x][y].replace('Ocean', 'Miss');
            return 2;
        }
        else{
            let hitShip = _board[x][y]
            _board[x][y] = x+''+y+"Hit"
            return hitShip.hit()
        }//false if hit, true if sunk, 2 if missed
    }

    const fleetIsSunk = () => {
        for(let i = 0; i < _fleet.length; i++){
            if (_fleet[i].isSunk() === false) return false;
        }
        return true;
    }

    function addShipToFleet(ship){
        if (!_fleet.includes(ship)) _fleet.push(ship);
    }

    return {
        clearBoard,
        placeShip,
        receiveAttack,
        fleetIsSunk,
        fleetSize
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

    const getLength = () => {
        return _length;
    }

    const getName = () => {
        return _name;
    }

    return {
        hit,
        isSunk,
        getLength,
        getName
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

export function decimalHash(num){
    const map = {
        0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e',
        5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j',
        a: 0, b: 1, c: 2, d: 3, e: 4,
        f: 5, g: 6, h: 7, i: 8, j: 9,
    };
    if (map[num] === undefined) throw new Error('Enter a letter a-j or number 0-9');

    return map[num];
}

export function ranUnhashedCoords(){
    const x = Math.floor(Math.random()*10);
    const y = Math.floor(Math.random()*10);
    return [x, y];
}