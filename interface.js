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
        newDiv.textContent = _name+"'s Board";
        newBoard.appendChild(newDiv);
        newBoard.classList.add("board");
        newBoard.id = _name+"Board";
        for(let i = -1; i < 10; i++){
            for(let j = -1; j < 10; j++){//populate l -> r: j:x/ i:y
                newDiv = document.createElement("div");
                if(i < 0) newDiv.textContent = j;
                else if (j < 0) newDiv.textContent = i;
                else newDiv.classList.add("placeable");
                newDiv.classList.add("tile");
                newDiv.id = j+""+i+_name;
                newBoard.appendChild(newDiv);
            }
        }
        newContainer.appendChild(newBoard);
    }

    const addShip = (x, y, shipID) => {
        let targetTile = document.getElementById(x+''+y+_name);
        targetTile.classList.remove("placeable");
        targetTile.textContent = shipID;
    }

    const finishPlacement = () => {
        document.querySelectorAll('placeable').forEach(tile => {
            tile.classList.remove('placeable');
        });
        document.getElementById("opponentBoard").style.display = "grid";
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

    return {
        initialize,
        addShip,
        finishPlacement,
        hitOpponent,
        missOpponent,
        hitSelf,
        missSelf
        //showboard
        //hideboard
    }
}