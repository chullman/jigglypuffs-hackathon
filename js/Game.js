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

  async start(levelName) {
    let error = undefined;
    this._pokemon = await this._getPokemon(levels[levelName].pokemonCount)
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


  async _getPokemon(count) {
    const results = [];
    let i = 1;
    let errorThrown = false;
    let errorObj = new Error();
    while (i <= count && !errorThrown) {
      const randomID = randomPokemonID(1, TOTAL_POKEMON);

      await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(JSON.stringify({
            code: response.status,
            message: `Error: HTTP Error Code ${response.status} returned from PokeAPI`
          }))
        }
        return response;
      })
      .then((response) => {
        const json = response.json();
        return json;
      })
      .then((json) => {
        results.push(json);
      })
      .catch((error) => {
        errorObj = error;
        errorThrown = true; // To break out of the while loop
      })

      i++;
    }
    if (results.length > 0 && !errorThrown) {
      return results;
    } else {
      throw errorObj;
    }

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