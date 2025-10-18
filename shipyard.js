export function Gameboard(){
    const _board = initBoard();
    let _fleet = [];
    let _shipSpots = [];
    let _interfaceRef = null;

    function initBoard() {
        let arr = [];
        for(let i = 0; i < 10; i++) {
            arr[i] = []
            for(let j = 0; j < 10; j++) {
                arr[i][j] = i+decimalHash(j)+'Ocean';
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
        if (typeof(y) !== 'number') y = decimalHash(y);
        //ship placing phase is before targeting, board spot will never be "miss"
        if (x > 9 || y > 9) throw new Error("Target is out of bounds.")
        if (!Object.hasOwn(ship, 'isSunk')) throw new Error("ship must be Ship object.")
        if (_board[x][y].includes('Ocean')){
            _board[x][y] = _board[x][y].replace('Ocean', ship.getName());
            _shipSpots.push([x, decimalHash(y)]);
            addShipToFleet(ship);
        } 
        else throw new Error("Location already has a ship.")
    }

    const receiveAttack = (x, y) => {
        if (typeof(y) !== 'number') y = decimalHash(y);
        if (x > 9 || y > 9) throw new Error("Target is out of bounds.")
        if (_board[x][y].includes('Miss') || _board[x][y].includes('Hit')) throw new Error("Location has already been targeted.")
        if (_board[x][y].includes('Ocean')){
            _board[x][y].replace('Ocean', 'Miss');
            return 2;
        }
        else{
            let hitShip = _board[x][y]
            _board[x][y] = x+decimalHash(y)+"hit"
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

    const setInterfaceRef = (ref) => {
        _interfaceRef = ref;
    }

    const getInterfaceRef = () => {
        return _interfaceRef;
    }

    return {
        clearBoard,
        placeShip,
        receiveAttack,
        fleetIsSunk,
        fleetSize,
        getInterfaceRef,
        setInterfaceRef
    }
}

export function Ship(length, name){
    let _length = length;
    let _name = name;
    let _hits = 0;
    let _sunk = false;
    let _interfaceRef = null;

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

    const setInterfaceRef = (ref) => {
        _interfaceRef = ref;
    }

    const getInterfaceRef = () => {
        return _interfaceRef;
    }

    return {
        hit,
        isSunk,
        getLength,
        getName,
        setInterfaceRef,
        getInterfaceRef
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
        switch (num) {
            case 0: return 'a';
            case 1: return 'b';
            case 2: return 'c';
            case 3: return 'd';
            case 4: return 'e';
            case 5: return 'f';
            case 6: return 'g';
            case 7: return 'h';
            case 8: return 'i';
            case 9: return 'k';

            case 'a': return 0;
            case 'b': return 1;
            case 'c': return 2;
            case 'd': return 3;
            case 'e': return 4;
            case 'f': return 5;
            case 'g': return 6;
            case 'h': return 7;
            case 'i': return 8;
            case 'k': return 9;
            default: throw new Error('Enter a letter a-k or number 1-9');
        }
    }