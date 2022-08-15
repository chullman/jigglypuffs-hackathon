import levels from './levels.js';

const TOTAL_POKEMON = 915;

function randomPokemonID(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Game {
  constructor(map) {
    this._map = map;
    this._pokemon = null;
  
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

  async start() {
    this._pokemon = await this._getPokemon(levels.one.pokemonCount);
    this._map.render();
    this._map.draw(levels.one.path, this._pokemon);
    const main = document.querySelector('.game');
    main.appendChild(this._map.getMapEl());
    this._map.setPlayerPos(levels.one.start.row, levels.one.start.col);
  }

  async _getPokemon(count) {
    const results = [];
    let i = 1;
    while (i <= count) {
      const randomID = randomPokemonID(1, TOTAL_POKEMON);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`);
      const json = await response.json();
      results.push(json);
      i++;
    }
    return results;
  }

  _moveUp() {
    const { row, col } = this._map.getPlayerPos();
    if (row === 0) return;
    if (!this._map.isPathTile(row -1, col)) return;
    this._map.updatePlayerPos(row - 1, col);
  }

  _moveDown() {
    const { row, col } = this._map.getPlayerPos();
    const { rows } = this._map.getDimensions();
    // Return if equal to row count
    // (not greater than) because row 
    // is is zero based:
    if (row + 1 === rows) return;
    if (!this._map.isPathTile(row + 1, col)) return;
    this._map.updatePlayerPos(row + 1, col);
  }

  _moveRight() {
    const { row, col } = this._map.getPlayerPos();
    const { cols } = this._map.getDimensions();
    // Return if equal to column count
    // (not greater than) because col
    // is zero based:
    if (col + 1 === cols) return;
    if (!this._map.isPathTile(row, col + 1)) return;
    this._map.updatePlayerPos(row, col + 1);
  }

  _moveLeft() {
    const { row, col } = this._map.getPlayerPos();
    if (col === 0) return;
    if (!this._map.isPathTile(row, col - 1)) return;
    this._map.updatePlayerPos(row, col - 1);
  }
}

export default Game;