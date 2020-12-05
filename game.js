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
        let i = true;
        while (i == true){
        const choice = prompt('Would you chose O or X')
        if (choice == 'O'){
          this.player = 'O'
          this.comp = 'X'
          i=false
        }
        else if (choice == 'X'){
          this.player = 'X'
          this.comp='O'
          i = false
        }
        else{
          alert('Wrong input')
        }
        }
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

document.querySelector('.game').addEventListener('click', (evt) => {
    evt.preventDefault()
    ui.move(evt.target)
})

ui.reset();
