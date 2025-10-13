export function drawBoard(name) {
    let _name = name;

    const initialize = () => {
        let newContainer = document.createElement("div");
        newContainer.id = _name+"Container"
        newContainer.classList.add("boardContainer")
        document.body.appendChild(newContainer)
        //initialize opponent board
        let newBoard = document.createElement("div");
        let newDiv = document.createElement("h3");
        newDiv.classList.add("boardTitle")
        newDiv.id = "boardTitleOpponent";
        newDiv.textContent = "Opponent's Board";
        newBoard.appendChild(newDiv);
        newBoard.classList.add("board")
        newBoard.id = "opponentBoard";
        for(let i = -1; i < 10; i++){
            for(let j = -1; j < 10; j++){//populate l -> r: j:x/ i:y
                newDiv = document.createElement("div");
                if(i < 0) newDiv.textContent = j;
                else if (j < 0) newDiv.textContent = i;
                else newDiv.classList.add("target")
                newDiv.classList.add("tile")
                newDiv.id = j+""+i+"opponent";
                newBoard.appendChild(newDiv);
            }
        }
        newContainer.appendChild(newBoard);
        //initialize player board
        newBoard = document.createElement("div");
        newDiv = document.createElement("h3");
        newDiv.classList.add("boardTitle")
        newDiv.id = "boardTitle"+_name;
        newDiv.textContent = "Your Board";
        newBoard.appendChild(newDiv);
        newBoard.classList.add("board");
        newBoard.id = _name+"Board";
        for(let i = -1; i < 10; i++){
            for(let j = -1; j < 10; j++){//populate l -> r: j:x/ i:y
                newDiv = document.createElement("div");
                if(i < 0) newDiv.textContent = j;
                else if (j < 0) newDiv.textContent = i;
                else newDiv.classList.add("droppable");
                newDiv.classList.add("tile");
                newDiv.id = j+""+i+_name;
                newBoard.appendChild(newDiv);
                newDiv.style.gridColumnStart = j+2;
                newDiv.style.gridColumnEnd = j+3;
                newDiv.style.gridRowStart = i+3;
                newDiv.style.gridRowEnd = i+4;
            }
        }
        newContainer.appendChild(newBoard);
        //initialize ship placement
        let shipContainer = document.createElement("div");
        shipContainer.id = _name+"Shipyard";
        shipContainer.classList.add("shipyard");
        newContainer.appendChild(shipContainer);
        newDiv = document.createElement("h3");
        newDiv.classList.add('shipsTitle')
        newDiv.textContent = "Available Ships";
        shipContainer.appendChild(newDiv);

        //add ships to shipyard
        let newShip = document.createElement('img');
        newShip.id = _name+"Carrier";
        newShip.classList.add("carrier");
        newShip.classList.add("ship");
        newShip.classList.add("draggable");
        newShip.draggable = 'true';
        newShip.dataset.width = 1;
        newShip.dataset.length = 5;
        newShip.src = "assets/shipCarrier.png";
        shipContainer.appendChild(newShip);

        newShip = document.createElement('img');
        newShip.id = _name+"Battleship";
        newShip.classList.add("battleship");
        newShip.classList.add("ship");
        newShip.classList.add("draggable");
        newShip.draggable = 'true';
        newShip.dataset.width = 1;
        newShip.dataset.length = 4;
        newShip.src = "assets/shipBattleship.png";
        shipContainer.appendChild(newShip);

        newShip = document.createElement('img');
        newShip.id = _name+"Destroyer";
        newShip.classList.add("destroyer");
        newShip.classList.add("ship");
        newShip.classList.add("draggable");
        newShip.draggable = 'true';
        newShip.dataset.width = 1;
        newShip.dataset.length = 3;
        newShip.src = "assets/shipDestroyer.png";
        shipContainer.appendChild(newShip);

        newShip = document.createElement('img');
        newShip.id = _name+"Submarine";
        newShip.classList.add("submarine");
        newShip.classList.add("ship");
        newShip.classList.add("draggable");
        newShip.draggable = 'true';
        newShip.dataset.width = 1;
        newShip.dataset.length = 3;
        newShip.src = "assets/shipSub.png";
        shipContainer.appendChild(newShip);

        newShip = document.createElement('img');
        newShip.id = _name+"PatrolBoat";
        newShip.classList.add("patrolBoat");
        newShip.classList.add("ship");
        newShip.classList.add("draggable");
        newShip.draggable = 'true';
        newShip.dataset.width = 1;
        newShip.dataset.length = 2;
        newShip.src = "assets/shipPatrol.png";
        shipContainer.appendChild(newShip);

        //create bottons for shipyard
        let buttContainer = document.createElement('span')
        buttContainer.classList.add('shipButtons')
        shipContainer.appendChild(buttContainer)

        let newButton = document.createElement('button');
        newButton.id = _name+"ranButton";
        newButton.classList.add("ranButton")
        newButton.textContent = "Random"
        buttContainer.appendChild(newButton)

        newButton = document.createElement('button');
        newButton.id = _name+"clearButton";
        newButton.classList.add("clearButton")
        newButton.textContent = "Clear"
        buttContainer.appendChild(newButton)

        newButton = document.createElement('button');
        newButton.id = _name+"confButton";
        newButton.classList.add("confButton")
        newButton.textContent = "Confirm"
        buttContainer.appendChild(newButton)

        document.querySelectorAll('.draggable').forEach(ship => {
            ship.addEventListener('auxclick', (e) => {
                if(e.button === 1){
                    if (ship.src.includes('rotate')){
                        ship.src = ship.src.replace('rotate', 'ship');
                        ship.style.height = null;
                        ship.style.width = null;
                        ship.dataset.length = ship.dataset.width;
                        ship.dataset.width = '1';
                        
                    } else {
                        ship.src = ship.src.replace('ship', 'rotate');
                        ship.style.width = 34*ship.dataset.length+'px';
                        ship.style.height = '34px';
                        ship.dataset.width = ship.dataset.length;
                        ship.dataset.length = '1';
                    }
                }
            })
        })
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
            document.getElementById(_name+'Shipyard').appendChild(ship);
            ship.style.gridArea = null;
            ship.style.height = null;
            ship.style.width = null;
            ship.src = ship.src.replace('rotate', 'ship')
        })
    } 

    return {
        initialize,
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
    let _difficulty = 1
    document.getElementById('singleOption').style.backgroundColor = 'lightblue';
    document.getElementById('easy').style.backgroundColor = 'lightblue';


    const initialize = () =>{
        document.getElementById('singleOption').addEventListener('click', function(e){
            _difficulty = 1;
            e.target.style.backgroundColor = "lightblue";
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
            document.getElementById('singleOption')
                .style.backgroundColor = null;
            document.querySelectorAll(".difficulty").forEach(option => {
                option.style.display = 'none';
            })
        });
        document.getElementById('start').addEventListener('click', function(e){
                document.querySelectorAll(".option").forEach(option => {
                    option.style.display = 'none';
            })
        });
    } 

    const getDifficulty = () => {
        return _difficulty;
    }
    return {
        initialize,
        getDifficulty
    }
}