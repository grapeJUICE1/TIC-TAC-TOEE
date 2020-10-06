Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}

Array.prototype.arrayContains = function(sub) {
    const self = this;
    const check = sub.every((el) => {
        return self.indexOf(el) !== -1;
    });
    return check
}



class UI {
    constructor() {

        this.board1 = document.querySelector('.board-1');
        this.player = 'O';

        this.comp = 'X';

        this.win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        this.board2 = document.querySelector('.board-2');
        this.board3 = document.querySelector('.board-3');
        this.board4 = document.querySelector('.board-4');
        this.board5 = document.querySelector('.board-5');
        this.board6 = document.querySelector('.board-6');
        this.board7 = document.querySelector('.board-7');
        this.board8 = document.querySelector('.board-8');
        this.board9 = document.querySelector('.board-9');

    }
    getBoard() {
        this.board = [this.board1.dataset.val, this.board2.dataset.val, this.board3.dataset.val, this.board4.dataset.val, this.board5.dataset.val, this.board6.dataset.val, this.board7.dataset.val, this.board8.dataset.val, this.board9.dataset.val];
        return this.board

    }
    compMove() {
        const places = Object.keys(this).filter(el => el.startsWith('board'))
        places.splice(places.indexOf('board'), 1)
        const availPlaces = places.filter(el => this[el].dataset.val == ' ')
        if (availPlaces) {
            let place = this[availPlaces.random()]
            if (place) {
                place.textContent = this.comp;
                place.classList.add('show');
                place.dataset.val = this.comp;
            }
        }
    }
    reset() {
        for (const prp in this) {
            if (this[prp].dataset) {
                this[prp].dataset.val = ' '
                this[prp].classList.remove('show')
            }
        }
    }
    move(obj) {
        if (obj.dataset.val != ' ') {
            alert('not allowed')
        } else {

            obj.textContent = this.player;
            obj.dataset.val = this.player;
            obj.classList.add('show');
            if (this.checkWin() == false) {
                this.compMove()
                this.checkWin(true)
                if(this.getBoard().includes(' ') != true){
                  setTimeout(()=>
                  {
                    alert('tie.....')
                    this.reset()
                    },300)
                  
                }
            }
        }

    }


    checkWin(comp) {
        const chosen = this.getBoard().reduce((a, e, i) => {
            if (e === (comp ? this.comp : this.player))
                a.push(i);
            return a;
        }, []);
        for (let i of this.win) {
            if (chosen.arrayContains(i)) {
                for (const j of i) {
                    let cutPlaces = Object.keys(this).filter(el => el.startsWith('board') && el != 'board')
                    this[cutPlaces[j]].classList.add('cut')
                    setTimeout(() =>
                        this[cutPlaces[j]].classList.remove('cut'), 700)
                }
                setTimeout(() => {
                    comp ? alert('You lose!!!!!') : alert('You Won !!!!!');

                    this.reset()

                }, 400)

                return true
            }
        }
        return false
    }
}

const ui = new UI()


document.querySelector('.click').addEventListener('click', (evt) => {
    const btn = document.querySelector('.game')
    btn.classList.remove('click')
    evt.preventDefault()
    ui.move(evt.target)

    btn.classList.add('click')
})












/*

function minimax(newBoard, player){
  
    //available spots
    var availSpots = emptyIndexies(newBoard);
      if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot 
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    /*collect the score resulted from calling minimax 
      on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    // reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the moves array
  return moves[bestMove];
}

*/