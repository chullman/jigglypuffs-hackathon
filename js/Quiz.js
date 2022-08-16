class Quiz {
  constructor(pokemonData) {
    this._pokemonData = pokemonData;
    // Create root overlay element:
    this._quizOverlayEl = this._generateRootOverlay();
    // Create quiz element:
    this._quizEl = this._generateQuizElement();
    // Render Pokemon image:
    this._renderPokemonImage();
    // Create abort button:
    this._generateAbortButton();
  }

  start() {

  }

  _generateRootOverlay() {
    const _quizOverlayEl = document.createElement('div');
    _quizOverlayEl.classList.add('quiz-overlay');
    document.body.appendChild(_quizOverlayEl);
    return _quizOverlayEl;
  }
  
  _generateQuizElement() {
    const quizEl = document.createElement('div');
    quizEl.classList.add('quiz');
    this._quizOverlayEl.appendChild(quizEl);
    return quizEl;
  }

  _renderPokemonImage() {
    const pokemonImg = document.createElement('img');
    pokemonImg.classList.add('sprite');
    pokemonImg.src = this._pokemonData.sprites.front_default;
    pokemonImg.alt = 'Pokemon Image';
    this._quizEl.appendChild(pokemonImg);
  }

  _generateAbortButton() {
    const abortButton = document.createElement('button');
    abortButton.classList.add('abort');
    abortButton.textContent = 'Abort Quiz';
    abortButton.addEventListener('click', () => {
      this._quizOverlayEl.remove();
    });
    this._quizEl.appendChild(abortButton);
  }
}

export default Quiz;