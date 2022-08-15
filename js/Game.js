class Game {
  constructor(map) {
    this._map = map;
  
    document.addEventListener('keydown', this._onKeyDown.bind(this));
  }

  _onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
        this._moveUp();
        break;
      case 'ArrowDown':
        this._moveDown();
        break;
      case 'ArrowRight':
        this._moveRight();
        break;
      case 'ArrowLeft':
        this._moveLeft();
        break;
    }
  }

  start() {
    this._map.draw();
    const main = document.querySelector('.game');
    main.appendChild(this._map.getMapEl());
    this._map.setPlayerPos();
  }


  _moveUp() {
    console.log('up');
  }

  _moveDown() {
    console.log('down');
  }

  _moveRight() {
    console.log('right');
  }

  _moveLeft() {
    console.log('left');
  }
}

export default Game;