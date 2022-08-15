class Map {
  constructor(tileSize, rows, columns) {
    this._tileSize = tileSize;
    this._rowCount = rows;
    this._columnCount = columns;
  
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

  draw() {
    this._createTiles();
    this._renderTiles();
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
      for (let tile of row) {
        this._mapEl.appendChild(tile);
      }
    });
  }

  getDivOfTile(rowNum, colNum) {

    // Returns the DIV element (tile) of the map based on row and column
    // For example, getDivOfTile(1, 0), will get and return the 21st tile DIV element

    let divCounter = 0;
    if (rowNum === 0) {
      divCounter = colNum;
    } else if (rowNum > 0) {
      divCounter = (rowNum * this._columnCount) + colNum;
    }

    let foundTile = document.querySelector(`.map :nth-child(${divCounter + 1})`);

    return foundTile;
  }

  setPlayerPos() {
    let playerTile = this.getDivOfTile(1, 10);

    let playerImg = document.createElement("img");
    playerImg.setAttribute("src", "../images/player1.png");
  
    playerImg.setAttribute("width", "20px");
    playerImg.setAttribute("alt", "Player Avatar");

    playerTile.appendChild(playerImg);
  }

}

export default Map;