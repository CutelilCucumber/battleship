export function drag(){
    let draggables = document.querySelectorAll('.draggable');
    let droppables = document.querySelectorAll('.droppable');

    let lastKnownCoords = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('dragging');
        })

        draggable.addEventListener('dragend', (e) => {
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

            // dragging.dataset.position = 
            draggable.classList.remove('dragging');
        })
    })

    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', (e) => {
            e.preventDefault();
            // const dragging = document.querySelector('.dragging');
            // const container = droppable.parentElement;
            // container.appendChild(dragging);
            lastKnownCoords = [Number(droppable.id[0]), Number(droppable.id[1])]
            
        })
    })

    function getDragAfterElement(container, x, y){

    }

}