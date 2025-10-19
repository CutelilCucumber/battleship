import { decimalHash } from "./shipyard.js";

export function boardDisplay() {
    const emptyBoardRef = document.querySelector('.gameBoard').cloneNode(true);

    let _unconfirmedShips = []

    const startPlacement = (board) => {
        document.querySelector('main').classList.add('visible');
        document.querySelector('main').style.display = 'flex';
        document.querySelector('.gameBoard').classList.add('board1');
        fixGrid(document.querySelector('.gameBoard'))

    }

    function fixGrid(board){//input parent board
        document.querySelectorAll('.playable').forEach(tile => {
            let x = Number(decimalHash(tile.className[0]));
            let y = Number(tile.className[1]);

            let colStart = x+2;
            let colEnd = x+3;
            let rowStart = y+2;
            let rowEnd = y+3;

            tile.style.gridColumnStart = colStart;
            tile.style.gridColumnEnd = colEnd;
            tile.style.gridRowStart = rowStart;
            tile.style.gridRowEnd = rowEnd;
        });
    }


    const finishPlacement = () => {
        document.querySelectorAll('droppable').forEach(tile => {
            tile.classList.remove('droppable');
        });
        document.getElementById("opponentBoard").style.display = "grid";
        document.getElementById(_name+"Shipyard").style.display = "none";
    }

    const hitOpponent = (x, y, sunkShip) => {
        let targetTile = document.getElementById(x+''+y+'opponent');
        targetTile.textContent = "X";
        targetTile.style.color = "red";
        targetTile.classList.remove("target");

        if (sunkShip){
            document.getElementById('boardTitleOpponent')
                .textContent = "Enemy "+sunkShip+" sunk!";
        }
    }

    const missOpponent = (x, y) => {
        let targetTile = document.getElementById(x+''+y+'opponent');
        targetTile.textContent = "X";
        targetTile.style.color = "white";
        targetTile.classList.remove("target");
    }

    const hitSelf = (x, y, sunkShip) => {
        let targetTile = document.getElementById(x+''+y+_name);
        targetTile.textContent = "X";
        targetTile.style.color = "red";

        if (sunkShip){
            document.getElementById('boardTitle'+_name)
                .textContent = "Your "+sunkShip+" was sunk!";
        }
    }

    const missSelf = (x, y) => {
        let targetTile = document.getElementById(x+''+y+_name);
        targetTile.textContent = "X";
        targetTile.style.color = "white";
    }

    const clearLetters = () => {
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                let tile = document.getElementById(j+""+i+_name)
                tile.textContent = '';
            }
        }
    }

    const resetShipyard = () => {
        document.querySelectorAll('.ship').forEach(ship => {
            document.getElementById(_name+'ShipContainer').appendChild(ship);
            ship.classList.remove('dragging');
            ship.style.gridArea = null;
            ship.style.height = null;
            ship.style.width = null;
            if (ship.src.includes('rotate')){
                ship.src = ship.src.replace('rotate', 'ship');
                ship.dataset.length = ship.dataset.width;
                ship.dataset.width = 1;
            }
        })
    } 

    return {
        startPlacement,
        finishPlacement,
        hitOpponent,
        missOpponent,
        hitSelf,
        missSelf,
        clearLetters,
        resetShipyard
        //showboard
        //hideboard
    }
}

export function menuOptions(){
    let _difficulty = 1;
    let _player1Name = document.querySelector('.p1Name');
    let _player2Name = document.querySelector('.p2Name');
    document.getElementById('singleOption').style.backgroundColor = 'lightgreen';
    document.getElementById('easy').style.backgroundColor = 'lightgreen';


    const initialize = () =>{
        document.getElementById('singleOption').addEventListener('click', function(e){
            _difficulty = 1;
            e.target.style.backgroundColor = "lightgreen";
            _player1Name.style.display = 'none';
            _player2Name.style.display = 'none';
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
            _player1Name.style.display = 'block';
            _player2Name.style.display = 'block';
            document.getElementById('singleOption')
                .style.backgroundColor = null;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.display = 'none';
            })
        });
        document.getElementById('start').addEventListener('click', function(){
                document.querySelector('nav').style.display = 'none';
                if (_player1Name.value === '') _player1Name = 'Player1'
                else _player1Name = _player1Name.value;
                if (_difficulty === 0){
                    if (_player2Name.value === '') _player2Name = 'Player2';
                    else _player2Name = _player2Name.value;
                } else _player2Name = 'Computer';
            });
        
    } 

    const getDifficulty = () => {
        return _difficulty;
    }

    const getPlayerNames = () => {
        return [_player1Name, _player2Name]
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

        draggable.addEventListener('dragend', (e) => {//end of drag
            const dragging = document.querySelector('.dragging');
            _shipName = dragging.classList[0];

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
            console.log(shipTiles)

            if(checkAvailability(shipTiles) === false) {
                dragging.classList.remove('dragging');
                throw new Error('Ship location is occupied');
            }
            else(displayPosition(shipTiles));
            
            for (let tile of shipTiles){
                tile.push(_shipName);
                _totalCoordinates.push(tile);
            };
            console.log(_totalCoordinates);

            dragging.removeEventListener('click', rotateShip)
            dragging.removeEventListener('auxclick', rotateShip)
            dragging.classList.add('dropped');
            dragging.classList.remove('draggable');
            dragging.classList.remove('dragging');
        })
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
    

    function rotateShip(e) {
        if (e.button === 1) {
            let ship = e.target;
            

            if (_orientation === 'horizontal'){
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
            console.log('.'+x+y)

            if(document.querySelector('.'+x+y).textContent !== '') return false;
        };
        return true
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
}