export function computer(){
    
    let ranChoice = [-1, -1];
    let _shotHistory = [ranChoice];

    const easyShot = () => {
        while(!checkAvailability(ranChoice)){
            ranChoice = [Math.floor(Math.random()*9), Math.floor(Math.random()*9)]
        }
        _shotHistory.push(ranChoice);
        return ranChoice;
    }

    const medShot = () => {

    }

    const hardShot = () => {

    }

    const rememberResult = (result) => {//false if hit, shipObject if sunk, 2 if missed
        
    }

    function checkAvailability(possible){
        for (let shot of _shotHistory) {
            
            if(JSON.stringify(shot) === JSON.stringify(possible)) return false;
        };
        return true;
    }
    return {
        easyShot,
        medShot,
        hardShot,
        rememberResult
    }
}




export function placementSet(choice){ //pre-built placement sets
    let num = choice ?? Math.floor(Math.random()*20);
    const map = {
        0: [
            [1, 1, 'Carrier'], [1, 2, 'Carrier'], [1, 3, 'Carrier'], [1, 4, 'Carrier'], [1, 5, 'Carrier'],
            [5, 1, 'Battleship'], [6, 1, 'Battleship'], [7, 1, 'Battleship'], [8, 1, 'Battleship'],
            [7, 6, 'Cruiser'], [7, 7, 'Cruiser'], [7, 8, 'Cruiser'],
            [3, 4, 'Submarine'], [4, 4, 'Submarine'], [5, 4, 'Submarine'],
            [3, 7, 'Destroyer'], [3, 8, 'Destroyer']
        ],
        1: [
             [2,7,'Carrier'], [2,8,'Carrier'], [2,9,'Carrier'], [2,6,'Carrier'], [2,5,'Carrier'],
             [4,3,'Battleship'], [5,3,'Battleship'], [6,3,'Battleship'], [7,3,'Battleship'],
             [8,8,'Cruiser'], [9,8,'Cruiser'], [8,9,'Cruiser'],
             [5,6,'Submarine'], [5,7,'Submarine'], [5,5,'Submarine'],
             [9,2,'Destroyer'], [9,3,'Destroyer']
            ],
        2: [
    [7,2,'Carrier'], [7,3,'Carrier'], [7,4,'Carrier'], [7,5,'Carrier'], [7,6,'Carrier'],
    [1,1,'Battleship'], [1,2,'Battleship'], [1,3,'Battleship'], [1,4,'Battleship'],
    [4,9,'Cruiser'], [5,9,'Cruiser'], [6,9,'Cruiser'],
    [3,5,'Submarine'], [4,5,'Submarine'], [5,5,'Submarine'],
    [9,7,'Destroyer'], [9,8,'Destroyer']
  ],
        3: [
    [5,3,'Carrier'], [5,4,'Carrier'], [5,5,'Carrier'], [5,6,'Carrier'], [5,7,'Carrier'],
    [2,9,'Battleship'], [3,9,'Battleship'], [4,9,'Battleship'], [5,9,'Battleship'],
    [8,4,'Cruiser'], [8,5,'Cruiser'], [8,6,'Cruiser'],
    [1,7,'Submarine'], [2,7,'Submarine'], [3,7,'Submarine'],
    [6,1,'Destroyer'], [7,1,'Destroyer']
  ],
        4: [
    [9,5,'Carrier'], [8,5,'Carrier'], [7,5,'Carrier'], [6,5,'Carrier'], [5,5,'Carrier'],
    [3,2,'Battleship'], [3,3,'Battleship'], [3,4,'Battleship'], [3,1,'Battleship'],
    [1,9,'Cruiser'], [1,8,'Cruiser'], [1,7,'Cruiser'],
    [6,2,'Submarine'], [6,3,'Submarine'], [6,4,'Submarine'],
    [4,8,'Destroyer'], [5,8,'Destroyer']
  ],
        5: [
    [4,1,'Carrier'], [4,2,'Carrier'], [4,3,'Carrier'], [4,4,'Carrier'], [4,5,'Carrier'],
    [9,1,'Battleship'], [8,1,'Battleship'], [7,1,'Battleship'], [6,1,'Battleship'],
    [2,6,'Cruiser'], [3,6,'Cruiser'], [4,6,'Cruiser'],
    [7,7,'Submarine'], [7,8,'Submarine'], [7,9,'Submarine'],
    [1,4,'Destroyer'], [1,5,'Destroyer']
  ],
        6: [
    [1,8,'Carrier'], [2,8,'Carrier'], [3,8,'Carrier'], [4,8,'Carrier'], [5,8,'Carrier'],
    [6,4,'Battleship'], [7,4,'Battleship'], [8,4,'Battleship'], [9,4,'Battleship'],
    [3,1,'Cruiser'], [3,2,'Cruiser'], [3,3,'Cruiser'],
    [8,7,'Submarine'], [9,7,'Submarine'], [7,7,'Submarine'],
    [2,3,'Destroyer'], [2,4,'Destroyer']
  ],
        7: [
    [6,9,'Carrier'], [6,8,'Carrier'], [6,7,'Carrier'], [6,6,'Carrier'], [6,5,'Carrier'],
    [4,1,'Battleship'], [5,1,'Battleship'], [6,1,'Battleship'], [7,1,'Battleship'],
    [8,2,'Cruiser'], [8,3,'Cruiser'], [8,4,'Cruiser'],
    [1,2,'Submarine'], [2,2,'Submarine'], [3,2,'Submarine'],
    [9,9,'Destroyer'], [9,8,'Destroyer']
  ],
        8: [
    [2,2,'Carrier'], [2,3,'Carrier'], [2,4,'Carrier'], [2,5,'Carrier'], [2,6,'Carrier'],
    [5,9,'Battleship'], [5,8,'Battleship'], [5,7,'Battleship'], [5,6,'Battleship'],
    [9,3,'Cruiser'], [9,4,'Cruiser'], [9,5,'Cruiser'],
    [3,9,'Submarine'], [3,8,'Submarine'], [3,7,'Submarine'],
    [1,1,'Destroyer'], [1,2,'Destroyer']
  ],
        9: [
    [1,3,'Carrier'], [2,3,'Carrier'], [3,3,'Carrier'], [4,3,'Carrier'], [5,3,'Carrier'],
    [8,7,'Battleship'], [8,8,'Battleship'], [8,9,'Battleship'], [7,9,'Battleship'],
    [6,5,'Cruiser'], [7,5,'Cruiser'], [8,5,'Cruiser'],
    [3,7,'Submarine'], [4,7,'Submarine'], [5,7,'Submarine'],
    [9,1,'Destroyer'], [9,2,'Destroyer']
  ],
        10: [
    [9,4,'Carrier'], [9,5,'Carrier'], [9,6,'Carrier'], [9,7,'Carrier'], [9,8,'Carrier'],
    [2,1,'Battleship'], [3,1,'Battleship'], [4,1,'Battleship'], [5,1,'Battleship'],
    [1,8,'Cruiser'], [1,7,'Cruiser'], [1,6,'Cruiser'],
    [4,5,'Submarine'], [4,6,'Submarine'], [4,7,'Submarine'],
    [6,9,'Destroyer'], [7,9,'Destroyer']
  ],

        11: [
    [7,2,'Carrier'], [7,3,'Carrier'], [7,4,'Carrier'], [7,5,'Carrier'], [7,6,'Carrier'],
    [2,8,'Battleship'], [3,8,'Battleship'], [4,8,'Battleship'], [5,8,'Battleship'],
    [9,1,'Cruiser'], [8,1,'Cruiser'], [7,1,'Cruiser'],
    [4,3,'Submarine'], [4,4,'Submarine'], [4,5,'Submarine'],
    [1,9,'Destroyer'], [2,9,'Destroyer']
  ],

  12 : [
    [3,5,'Carrier'], [3,6,'Carrier'], [3,7,'Carrier'], [3,8,'Carrier'], [3,9,'Carrier'],
    [8,2,'Battleship'], [7,2,'Battleship'], [6,2,'Battleship'], [5,2,'Battleship'],
    [5,7,'Cruiser'], [6,7,'Cruiser'], [7,7,'Cruiser'],
    [9,9,'Submarine'], [8,9,'Submarine'], [7,9,'Submarine'],
    [1,3,'Destroyer'], [2,3,'Destroyer']
  ],

  13 : [
    [5,9,'Carrier'], [5,8,'Carrier'], [5,7,'Carrier'], [5,6,'Carrier'], [5,5,'Carrier'],
    [2,1,'Battleship'], [3,1,'Battleship'], [4,1,'Battleship'], [5,1,'Battleship'],
    [9,3,'Cruiser'], [9,4,'Cruiser'], [9,5,'Cruiser'],
    [6,2,'Submarine'], [6,3,'Submarine'], [6,4,'Submarine'],
    [8,8,'Destroyer'], [8,9,'Destroyer']
  ],

  14 : [
    [4,4,'Carrier'], [5,4,'Carrier'], [6,4,'Carrier'], [7,4,'Carrier'], [8,4,'Carrier'],
    [9,7,'Battleship'], [9,8,'Battleship'], [9,9,'Battleship'], [8,9,'Battleship'],
    [3,1,'Cruiser'], [3,2,'Cruiser'], [3,3,'Cruiser'],
    [6,7,'Submarine'], [6,8,'Submarine'], [6,9,'Submarine'],
    [1,6,'Destroyer'], [2,6,'Destroyer']
  ],

  15 : [
    [1,1,'Carrier'], [1,2,'Carrier'], [1,3,'Carrier'], [1,4,'Carrier'], [1,5,'Carrier'],
    [7,9,'Battleship'], [6,9,'Battleship'], [5,9,'Battleship'], [4,9,'Battleship'],
    [9,2,'Cruiser'], [8,2,'Cruiser'], [7,2,'Cruiser'],
    [3,5,'Submarine'], [4,5,'Submarine'], [5,5,'Submarine'],
    [9,7,'Destroyer'], [8,7,'Destroyer']
  ],

  16 : [
    [9,9,'Carrier'], [8,9,'Carrier'], [7,9,'Carrier'], [6,9,'Carrier'], [5,9,'Carrier'],
    [2,3,'Battleship'], [3,3,'Battleship'], [4,3,'Battleship'], [5,3,'Battleship'],
    [1,8,'Cruiser'], [2,8,'Cruiser'], [3,8,'Cruiser'],
    [7,2,'Submarine'], [8,2,'Submarine'], [9,2,'Submarine'],
    [4,6,'Destroyer'], [4,7,'Destroyer']
  ],

  17 : [
    [2,6,'Carrier'], [3,6,'Carrier'], [4,6,'Carrier'], [5,6,'Carrier'], [6,6,'Carrier'],
    [9,1,'Battleship'], [9,2,'Battleship'], [9,3,'Battleship'], [9,4,'Battleship'],
    [5,9,'Cruiser'], [6,9,'Cruiser'], [7,9,'Cruiser'],
    [1,3,'Submarine'], [2,3,'Submarine'], [3,3,'Submarine'],
    [8,8,'Destroyer'], [8,7,'Destroyer']
  ],

  18 : [
    [8,1,'Carrier'], [8,2,'Carrier'], [8,3,'Carrier'], [8,4,'Carrier'], [8,5,'Carrier'],
    [3,9,'Battleship'], [4,9,'Battleship'], [5,9,'Battleship'], [6,9,'Battleship'],
    [1,5,'Cruiser'], [2,5,'Cruiser'], [3,5,'Cruiser'],
    [5,2,'Submarine'], [6,2,'Submarine'], [7,2,'Submarine'],
    [9,7,'Destroyer'], [9,8,'Destroyer']
  ],

  19 : [
    [4,7,'Carrier'], [5,7,'Carrier'], [6,7,'Carrier'], [7,7,'Carrier'], [8,7,'Carrier'],
    [1,9,'Battleship'], [2,9,'Battleship'], [3,9,'Battleship'], [4,9,'Battleship'],
    [7,2,'Cruiser'], [8,2,'Cruiser'], [9,2,'Cruiser'],
    [2,4,'Submarine'], [3,4,'Submarine'], [4,4,'Submarine'],
    [5,1,'Destroyer'], [6,1,'Destroyer']
  ]
    };
    
    if (map[num] === undefined) throw new Error('Enter a number 0-19');

    return map[num];
}