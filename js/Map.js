class Map {
  constructor(tileSize, rows, columns) {
    this._tileSize = tileSize;
    this._rowCount = rows;
    this._columnCount = columns;
  
    this._tileMatrix = [];
    
    for (let i = 0; i < this._rowCount; i++) {
      this._tileMatrix.push([]);
    }

    this.el = document.createElement('div');
    this.el.classList.add('map');
    this.el.style.width = this._columnCount * this._tileSize + 'px';
    this.el.style.height = this._rowCount * this._tileSize + 'px';
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
        this.el.appendChild(tile);
      }
    });
  }
}

export default Map;