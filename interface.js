export function drawBoard(name) {
    let _name = name;

    initialize()
    function initialize(){
        //initialize opponent board
        let newBoard = document.createElement("div");
        let newDiv = document.createElement("h3");
        newDiv.classList.add("boardTitle")
        newDiv.textContent = "Opponent's Board";
        newBoard.appendChild(newDiv);
        newBoard.classList.add("board")
        newBoard.id = "opponentBoard";
        for(let i = -1; i < 10; i++){
            for(let j = -1; j < 10; j++){//populate l -> r: j:x/ i:y
                newDiv = document.createElement("div");
                if(i < 0) newDiv.textContent = j;
                else if (j < 0) newDiv.textContent = i;
                else newDiv.classList.add("playable")
                newDiv.classList.add("tile")
                newDiv.id = j+" "+i;
                newBoard.appendChild(newDiv);
            }
        }
        document.getElementById("boardContainer").appendChild(newBoard);
        //initialize player board
        newBoard = document.createElement("div");
        newDiv = document.createElement("h3");
        newDiv.classList.add("boardTitle")
        newDiv.textContent = _name+"'s Board";
        newBoard.appendChild(newDiv);
        newBoard.classList.add("board")
        newBoard.id = _name+"Board";
        for(let i = -1; i < 10; i++){
            for(let j = -1; j < 10; j++){//populate l -> r: j:x/ i:y
                newDiv = document.createElement("div");
                if(i < 0) newDiv.textContent = j;
                else if (j < 0) newDiv.textContent = i;
                else newDiv.classList.add("playable")
                newDiv.classList.add("tile")
                newDiv.id = j+" "+i;
                newBoard.appendChild(newDiv);
            }
        }
        document.getElementById("boardContainer").appendChild(newBoard);
    }

}