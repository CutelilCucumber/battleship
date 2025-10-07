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

export function Gameboard(){
    let _gameboard = [9][9];
    
    const receiveAttack = (x, y) => {
        
    }

}