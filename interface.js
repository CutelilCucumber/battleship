import { ranUnhashedCoords } from "./shipyard.js";

export function boardDisplay() {
    let p1Board = document.querySelector('.gameBoard');
    let p2Board = p1Board.cloneNode(true);
    let _activeBoard = p1Board;//reference to working board
    let _inactiveBoard = p2Board;

    const _cloneBoard = document.querySelector('.gameBoard').cloneNode(true);
    const _cloneDock = document.querySelector('.dock').cloneNode(true);
    
    function cloneBoard() {
        return _cloneBoard.cloneNode(true);
    }
    function cloneDock() {
        return _cloneDock.cloneNode(true);
    }

    const startPlacement = () => {
        document.querySelector('main').style.display = 'flex';
    }

    const flipPlacement = () => {
        [_activeBoard, _inactiveBoard] = [_inactiveBoard, _activeBoard];
        _inactiveBoard.classList.remove('visible');
        document.querySelector('.gameBoard').replaceWith(_activeBoard)
        _activeBoard.classList.add('visible');

    }

    const resetBoard = (init) => {
        const newBoard = cloneBoard();
        const newDock = cloneDock();

        document.querySelector('.gameBoard').replaceWith(newBoard);
        document.querySelector('.dock').replaceWith(newDock);

        _activeBoard = newBoard;
    }

    const updateText = (str) => {
        document.querySelector('.mainDisplay').textContent = str;
    }

    const beginGame = () => {

    }

    return {
        startPlacement,
        flipPlacement,
        resetBoard,
        updateText
    }
}

export function menuOptions(){
    let _difficulty = 1;
    let _player1Input = document.querySelector('.p1Name');
    let _player2Input = document.querySelector('.p2Name');
    document.getElementById('singleOption').style.backgroundColor = 'lightgreen';
    document.getElementById('easy').style.backgroundColor = 'lightgreen';


    const initialize = () =>{
        document.getElementById('singleOption').addEventListener('click', function(e){
            _difficulty = 1;
            e.target.style.backgroundColor = "lightgreen";
            _player1Input.style.display = 'none';
            _player2Input.style.display = 'none';
            document.getElementById('multiOption')
                .style.backgroundColor = null;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.display = 'block';
                option.style.backgroundColor = null;
            })
            document.getElementById('easy').style.backgroundColor = 'lightgreen';
        });
        document.getElementById('easy').addEventListener('click', function(e){
            _difficulty = 1;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.backgroundColor = null;
            })
            e.target.style.backgroundColor = 'lightgreen';
        })
        document.getElementById('medium').addEventListener('click', function(e){
            _difficulty = 2;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.backgroundColor = null;
            })
            e.target.style.backgroundColor = 'lightgreen';
        })
        document.getElementById('hard').addEventListener('click', function(e){
            _difficulty = 3;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.backgroundColor = null;
            })
            e.target.style.backgroundColor = 'lightgreen'
        })
        document.getElementById('multiOption').addEventListener('click', function(e){
            _difficulty = 0;
            e.target.style.backgroundColor = "lightgreen";
            _player1Input.style.display = 'block';
            _player2Input.style.display = 'block';
            document.getElementById('singleOption')
                .style.backgroundColor = null;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.display = 'none';
            })
        });
        document.getElementById('start').addEventListener('click', function(){
             
                document.querySelector('nav').style.display = 'none';
                if (_player1Input.value === '') _player1Input.value = 'Player';
                if (_difficulty === 0){
                    if (_player2Input.value === '') {
                        if (_player1Input.value === '') _player1Input.value = 'Player1';
                        _player2Input.value = 'Player2';
                    }
                } else _player2Input.value = 'Computer';
                
            });
        
    } 

    const getDifficulty = () => {
        return _difficulty;
    }

    const getPlayerNames = () => {
        return [_player1Input.value, _player2Input.value]
    }

    return {
        initialize,
        getDifficulty,
        getPlayerNames
    }
}

export function dragPlace(){
    let _draggables = document.querySelectorAll('.draggable');
    let _droppables = document.querySelectorAll('.playable');
    let _orientation = 'horizontal';
    let _dropOrigin = null;
    let _shipName = null;
    let _totalCoordinates = [];

    _draggables.forEach(draggable => {//start of drag
        draggable.addEventListener('dragstart', dragStart)

        draggable.addEventListener('dragend', dropShip)
    })
    _droppables.forEach(droppable => {//hover over
        droppable.addEventListener('dragover', (e) => {
            e.preventDefault();
            _dropOrigin = [decimalHash(droppable.className[0]), Number(droppable.className[1])];
        })
    })
    _draggables.forEach(ship => {
            ship.addEventListener('auxclick', rotateShip)
        })

    function dropShip(){//end of drag
            const dragging = document.querySelector('.dragging');
            try {
                _shipName = dragging.classList[0];
            } catch (error) {
                throw new Error ('Ship does not exist');
            };
            

            let width = dragging.dataset.width;
            let height = dragging.dataset.height;
            let shipTiles = [];
            
            let j = 1;
            if (width > 1){
                _orientation = 'horizontal';
                for (let i = 0; i < width; i++){
                    if(_dropOrigin[0]+i < 10){
                        shipTiles.push([_dropOrigin[0]+i, _dropOrigin[1]]);
                    } else {
                        shipTiles.unshift([_dropOrigin[0]-j, _dropOrigin[1]]);
                        j++;
                    }
                }
            } else {
                _orientation = 'vertical';
                for (let i = 0; i < height; i++){
                    if(_dropOrigin[1]+i < 10){
                        shipTiles.push([_dropOrigin[0], _dropOrigin[1]+i]);
                    } else {
                        shipTiles.unshift([_dropOrigin[0], _dropOrigin[1]-j]);
                        j++;
                    }
                }
            }

            if(checkAvailability(shipTiles) === false) {
                dragging.classList.remove('dragging');
                throw new Error('Ship location is occupied');
            }
            else(displayPosition(shipTiles));
            
            for (let tile of shipTiles){
                tile.push(_shipName);
                _totalCoordinates.push(tile);
            };

            dragging.removeEventListener('dragstart', dragStart)
            dragging.removeEventListener('auxclick', rotateShip)
            dragging.classList.add('dropped');
            dragging.classList.remove('draggable');
            dragging.classList.remove('dragging');
        }

    function rotateShip(e) {
        if (e.button === 1) {
            let ship = e.target;
            
            if (ship.dataset.width > 1){
                 _orientation = 'vertical';
                 ship.classList.add('preVertical');
                 ship.dataset.height = ship.dataset.width;
                 ship.dataset.width = 1;
                }
            else {
                _orientation = 'horizontal';
                ship.classList.remove('preVertical');
                ship.dataset.width = ship.dataset.height;
                 ship.dataset.height = 1;
            }
        }
    }

    function dragStart(e) {
        let draggable = e.target;
        draggable.classList.add('dragging');
        }

    function checkAvailability(coordArr){
        for (let coord of coordArr) {
            let x = decimalHash(coord[0]);
            let y = coord[1];

            if(document.querySelector('.'+x+y).textContent !== '') return false;
        };
        return true;
    }

    function displayPosition(coordArr){
        coordArr.forEach((coord, index, arr) => {
            let x = decimalHash(coord[0]);
            let y = coord[1];
            let tileNode = document.querySelector('.'+x+y);
            
            tileNode.textContent = '◉';
            
            tileNode.classList.add(_shipName);
            if (index === arr.length -1){
                tileNode.classList.add('stern')
            } else tileNode.classList.add(_orientation);

        });
    }
    const getTotalCoordinates = () => {
        return _totalCoordinates;
    }
    document.getElementById('randomButton').addEventListener('click', randomPlacement);

    function randomPlacement(){
        document.querySelectorAll('.draggable').forEach(ship => {
            if (Math.floor(Math.random()*2) === 1){
                rotateShip({
                    target: ship,
                    button: 1
                })
            }
            randomAttempt(ship);
            _orientation = 'horizontal';
        })
    }
    function randomAttempt(ship){
        let attempts = 0;
        let maxAttempts = 10;
            while(attempts < maxAttempts){
                ship.classList.add('dragging')
                _dropOrigin = ranUnhashedCoords();
                try {
                    return dropShip();
                } catch (error) {
                    attempts++;
                    console.warn(_dropOrigin+' '+error);
                }
            }
            throw new Error(`Function failed after ${maxAttempts} attempts`);
    }
    return {
        getTotalCoordinates
    };

}

function decimalHash(num){
    const map = {
        0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e',
        5: 'f', 6: 'g', 7: 'h', 8: 'i', 9: 'j',
        a: 0, b: 1, c: 2, d: 3, e: 4,
        f: 5, g: 6, h: 7, i: 8, j: 9,
    };
    if (map[num] === undefined) throw new Error('Enter a letter a-j or number 0-9');

    return map[num];
}