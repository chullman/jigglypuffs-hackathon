class Quiz {
  constructor(pokemonData) {
    this._pokemonData = pokemonData;
    // Create root overlay element:
    this._quizOverlayEl = document.createElement('div');
    this._quizOverlayEl.classList.add('quiz-overlay');
    document.body.appendChild(this._quizOverlayEl);
    // Create quiz element:
    const quizEl = document.createElement('div');
    quizEl.classList.add('quiz');
    this._quizOverlayEl.appendChild(quizEl);
    // Render Pokemon image:
    const pokemonImg = document.createElement('img');
    pokemonImg.classList.add('sprite');
    pokemonImg.src = this._pokemonData.sprites.front_default;
    pokemonImg.alt = 'Pokemon Image';
    quizEl.appendChild(pokemonImg);
    // Create abort button:
    const abortButton = document.createElement('button');
    abortButton.classList.add('abort');
    abortButton.textContent = 'Abort Quiz';
    abortButton.addEventListener('click', () => {
      this._quizOverlayEl.remove();
    });
    quizEl.appendChild(abortButton);
  }

  start() {

  }
}

export default Quiz;