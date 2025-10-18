export function boardDisplay() {
    const emptyBoardRef = document.querySelector('.gameBoard').cloneNode(true);
    const fullDockRef = document.querySelector('.dock').cloneNode(true);

    const startPlacement = () => {
        document.querySelector('main').classList.add('visible');
        document.querySelector('main').style.display = 'flex';
        document.querySelector('.gameBoard').classList.add('board1');

    }

    const addShip = (x, y, shipID) => {
        let targetTile = document.getElementById(x+''+y+_name);
        targetTile.classList.remove("droppable");
        targetTile.textContent = shipID;
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
        addShip,
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
    document.getElementById('singleOption').style.backgroundColor = 'lightblue';
    document.getElementById('easy').style.backgroundColor = 'lightblue';


    const initialize = () =>{
        document.getElementById('singleOption').addEventListener('click', function(e){
            _difficulty = 1;
            e.target.style.backgroundColor = "lightblue";
            _player1Name.style.display = 'none';
            _player2Name.style.display = 'none';
            document.getElementById('multiOption')
                .style.backgroundColor = null;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.display = 'block';
                option.style.backgroundColor = null;
            })
            document.getElementById('easy').style.backgroundColor = 'lightblue';
        });
        document.getElementById('easy').addEventListener('click', function(e){
            _difficulty = 1;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.backgroundColor = null;
            })
            e.target.style.backgroundColor = 'lightBlue'
        })
        document.getElementById('medium').addEventListener('click', function(e){
            _difficulty = 2;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.backgroundColor = null;
            })
            e.target.style.backgroundColor = 'lightBlue'
        })
        document.getElementById('hard').addEventListener('click', function(e){
            _difficulty = 3;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.backgroundColor = null;
            })
            e.target.style.backgroundColor = 'lightBlue'
        })
        document.getElementById('multiOption').addEventListener('click', function(e){
            _difficulty = 0;
            e.target.style.backgroundColor = "lightblue";
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