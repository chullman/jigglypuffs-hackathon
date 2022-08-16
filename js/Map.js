class Map {
  constructor(tileSize, rows, columns) {
    this._tileSize = tileSize;
    this._rowCount = rows;
    this._columnCount = columns;
    this._row = 0;
    this._col = 0;
  
    this._tileMatrix = [];
    for (let i = 0; i < this._rowCount; i++) {
      this._tileMatrix.push([]);
    }

    this._mapEl = document.createElement('div');
    this._mapEl.classList.add('map');
    this._mapEl.style.width = this._columnCount * this._tileSize + 'px';
    this._mapEl.style.height = this._rowCount * this._tileSize + 'px';
    document.body.appendChild(this._mapEl);
  }

  getMapEl() {
    return this._mapEl;
  }

  render() {
    this._createTiles();
    this._renderTiles();
  }

  draw(path, pokemon) {
    let pokemonLeft = pokemon.length;
    for (let i = 0; i < path.length; i++) {
      for (let j = 0; j < path[i].length; j++) {
        const tile = this._tileMatrix[i][j];
        switch (path[i][j]) {
          case 1:
            tile.classList.add('tree');
            break;
          case 2:
            tile.classList.add('pokemon');
            tile.style.backgroundImage = `url('${pokemon[pokemonLeft - 1].sprites.front_default}')`;
            pokemonLeft -= 1;
            break;
          default:
            tile.classList.add('path');
        }
      }
    }
  }

  getDivOfTile(rowNum, colNum) {

    // Returns the DIV element (tile) of the map based on row and column
    // For example, getDivOfTile(1, 0), will get and return the 21st tile DIV element

    // let divCounter = 0;
    // if (rowNum === 0) {
    //   divCounter = colNum;
    // } else if (rowNum > 0) {
    //   divCounter = (rowNum * this._columnCount) + colNum;
    // }

    // let foundTile = document.querySelector(`.map :nth-child(${divCounter + 1})`);

    return this._tileMatrix[rowNum][colNum];
  }

  setPlayerPos(row, col) {
    this._setCurrentTile(row, col);

    let playerTile = this.getDivOfTile(this._row, this._col);

    let playerImg = document.createElement("img");
    playerImg.setAttribute("src", "../images/player1.png");
    playerImg.classList.add('avatar');
    playerImg.setAttribute("width", "50%");
    playerImg.setAttribute("alt", "Player Avatar");

    playerTile.appendChild(playerImg);
  }

  getPlayerPos() {
    return { row: this._row, col: this._col};
  }

  getDimensions() {
    return { rows: this._rowCount, cols: this._columnCount };
  }

  isPathTile(row, col) {
    const tile = this.getDivOfTile(row, col);
    return tile.classList.contains('path')
  }

  updatePlayerPos(newRow, newCol) {
    this._setCurrentTile(newRow, newCol);

    const newPlayerTile = this.getDivOfTile(this._row, this._col);
    const playerImg = document.querySelector('.avatar');
    newPlayerTile.appendChild(playerImg);
  }

  _createTiles() {
    this._tileMatrix.forEach(row => {
      for (let i = 0; i < this._columnCount; i++) {
        row.push(this._createTile());
      }
    });
  }

  _createTile() {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    tile.style.height = this._tileSize + 'px';
    tile.style.width = this._tileSize + 'px';
    
    return tile;
  }

  _renderTiles() {
    this._tileMatrix.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('tile-row');
      this._mapEl.appendChild(rowDiv);
      for (let tile of row) {
        rowDiv.appendChild(tile);
      }
    });
  }

  _setCurrentTile(newRow, newCol) {
    this._row = newRow;
    this._col = newCol;
  }

}

export default Map;