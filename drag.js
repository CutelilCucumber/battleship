export function drag(){
    let draggables = document.querySelectorAll('.draggable');
    let droppables = document.querySelectorAll('.droppable');

    let lastKnownCoords = null;

    draggables.forEach(draggable => {//start of drag
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('dragging');
        })

        draggable.addEventListener('dragend', (e) => {//end of drag
            const dragging = document.querySelector('.dragging');
            const container = document.querySelector('.droppable').parentElement;
            container.appendChild(dragging);

            let colStart = lastKnownCoords[0]+2;
            let colEnd = lastKnownCoords[0]+2+Number(dragging.dataset.width);
            let rowStart = lastKnownCoords[1]+3;
            let rowEnd = lastKnownCoords[1]+3+Number(dragging.dataset.length);
            if (colEnd > 12){
                let difference = colEnd - 12;
                colEnd = 12;
                colStart = colStart - difference;
            } if (rowEnd > 13){
                let difference = rowEnd - 13;
                rowEnd = 13;
                rowStart = rowStart - difference;
            }


            dragging.style.gridColumnStart = colStart;
            dragging.style.gridColumnEnd = colEnd;
            dragging.style.gridRowStart = rowStart;
            dragging.style.gridRowEnd = rowEnd;

            dragging.removeEventListener('auxclick', rotateShip)
            // dragging.dataset.position = 
            draggable.classList.remove('dragging');
        })
    })

    droppables.forEach(droppable => {//hover over
        droppable.addEventListener('dragover', (e) => {
            e.preventDefault();
            // const dragging = document.querySelector('.dragging');
            // const container = droppable.parentElement;
            // container.appendChild(dragging);
            lastKnownCoords = [Number(droppable.id[0]), Number(droppable.id[1])]
            
        })
    })

    const initRotate = () => {
        draggables.forEach(ship => {
                ship.addEventListener('auxclick', rotateShip)
            })
    }

    function rotateShip(e) {
        if(e.button === 1){
            let ship = e.target;
                    if (ship.src.includes('rotate')){
                        ship.src = ship.src.replace('rotate', 'ship');
                        // ship.style.gridArea = null;
                        ship.style.height = null;
                        ship.style.width = null;
                        ship.dataset.length = ship.dataset.width;
                        ship.dataset.width = '1';
                        
                    } else {
                        ship.src = ship.src.replace('ship', 'rotate');
                        // ship.style.gridRow = 'auto'
                        // ship.style.gridColumnStart = 1;
                        // ship.style.gridColumnEnd = Number(ship.dataset.length)+1;
                        ship.style.width = 34*ship.dataset.length+'px';
                        ship.style.height = '34px';
                        ship.dataset.width = ship.dataset.length;
                        ship.dataset.length = '1';
                    }
                }
    }
    return {
        initRotate
    }

}