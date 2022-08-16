import levels from './levels.js';
import Quiz from './Quiz.js';
import { getRandomPokemon } from './helpers.js';

class Game {
  constructor(map) {
    this._map = map;
    this._pokemon = null;
    this._quizesRemaining = 0;
  
    document.addEventListener('keydown', this._onKeyDown.bind(this));
    document.addEventListener('quiz-complete', this._onQuizComplete.bind(this));
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

  async start(levelName) {
    let error;
    this._pokemon = await getRandomPokemon(levels[levelName].pokemonCount)
    .catch((err) => {
      error = err;
      console.warn(err.message);
    });
    const h1 = document.querySelector('.game h1');
    if (typeof error === "undefined") {
      h1.textContent = "Play Game";
      this._map.render();
      this._map.draw(levels[levelName].path, this._pokemon);
      const main = document.querySelector('.game');
      main.appendChild(this._map.getMapEl());
      this._map.setPlayerPos(levels[levelName].start.row, levels[levelName].start.col);
      this._quizesRemaining = this._pokemon.length;
    } else {
      // An error fetching from API occurred, so display relevant 'h1' title
      (() => {
        try {
          h1.textContent = (JSON.parse(error.message)).message;
        } catch {
          h1.textContent = "Error: Unable to send request to third-party API";
        }
      })();

    }
  }

  _moveUp() {
    const { row, col } = this._map.getPlayerPos();
    if (row === 0) return;
    if (this._map.isPokemonTile(row - 1, col)) {
      const name = this._getPokemonNameFromTile(row - 1, col);
      const pokemon = this._getPokemonFromName(name);
      this._startQuiz(pokemon);
      return;
    }
    if (!this._map.isPathTile(row - 1, col)) return;
    this._map.updatePlayerPos(row - 1, col);
  }

  _moveDown() {
    const { row, col } = this._map.getPlayerPos();
    const { rows } = this._map.getDimensions();
    if (this._map.isPokemonTile(row + 1, col)) {
      const name = this._getPokemonNameFromTile(row + 1, col);
      const pokemon = this._getPokemonFromName(name);
      this._startQuiz(pokemon);
      return;
    }
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
    if (this._map.isPokemonTile(row, col + 1)) {
      const name = this._getPokemonNameFromTile(row, col + 1);
      const pokemon = this._getPokemonFromName(name);
      this._startQuiz(pokemon);
      return;
    }
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
    if (this._map.isPokemonTile(row, col - 1)) {
      const name = this._getPokemonNameFromTile(row, col - 1);
      const pokemon = this._getPokemonFromName(name);
      this._startQuiz(pokemon);
      return;
    }
    if (!this._map.isPathTile(row, col - 1)) return;
    this._map.updatePlayerPos(row, col - 1);
  }

  _getPokemonNameFromTile(row, col) {
    const tile = this._map.getDivOfTile(row, col);
    return tile.dataset.name;
  }

  _getPokemonFromName(name) {
    return this._pokemon.filter(p => p.name === name)[0];
  }

  _startQuiz(pokemonData) {
    const quiz = new Quiz(pokemonData);
    quiz.start();
  }

  _onQuizComplete() {
    this._quizesRemaining -= 1;
    if (this._quizesRemaining === 0) {
      console.log('level complete!');
    }
  }
}

export default Game;