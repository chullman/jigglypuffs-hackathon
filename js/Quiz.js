import { getRandomPokemon } from './helpers.js';

class Quiz {
  constructor(pokemonData) {
    this._pokemonData = pokemonData;
    // Create root overlay element:
    this._quizOverlayEl = this._generateRootOverlay();
    // Create quiz element:
    this._quizEl = this._generateQuizElement();
    // Render Pokemon image:
    this._renderPokemonImage();
    // Create question paragraph:
    this._generateQuestionElement();
    // Create choices container:
    this._generateChoicesContainer();
    // Create finish button:
    this._generateFinishButton();
    // Create try again button:
    this._generateYesButton();
    // Create abort button:
    this._generateAbortButton();
  }

  async start() {
    const choices = await this._getRandomPokemonNames(5);
    if (choices) {
      const p = this._quizEl.querySelector('.question');
      p.textContent = 'What\'s my name?';
      if (!choices.includes(this._pokemonData.name)) {
        const randomIndex = Math.floor(Math.random() * 5);
        choices[randomIndex] = this._pokemonData.name;
      }
      this._renderChoices(choices);
    }
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

  _generateQuestionElement() {
    const questionPara = document.createElement('p');
    questionPara.classList.add('question');
    this._quizEl.appendChild(questionPara);
  }

  _generateChoicesContainer() {
    const choicesContainer = document.createElement('div');
    choicesContainer.classList.add('choices');
    this._quizEl.appendChild(choicesContainer);
  }

  _generateFinishButton() {
    const finishButton = document.createElement('button');
    finishButton.classList.add('finish');
    finishButton.textContent = 'Finish';
    finishButton.addEventListener('click', () => {
      const customEvent = new CustomEvent('quiz-complete', { bubbles: true });
      this._quizEl.dispatchEvent(customEvent);
      this._quizOverlayEl.remove();
    });
    this._quizEl.appendChild(finishButton);
  }

  _generateYesButton() {
    const yesButton = document.createElement('button');
    yesButton.classList.add('yes');
    yesButton.textContent = 'Yes';
    yesButton.addEventListener('click', () => {
      this._hideTryAgain();
      this._hideYes();
      this._showChoices();
    });
    this._quizEl.appendChild(yesButton);
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

  async _getRandomPokemonNames(count) {
    let error;
    const results = await getRandomPokemon(count)
      .catch(err => {
        error = err;
        console.warn(err.message);
      });
    const p = this._quizEl.querySelector('.question');
    if (typeof error === 'undefined') {
      return results.map(r => r.name);
    } else {
      try {
        p.textContent = error.message;
      } catch {
        p.textContent = 'Error: Unable to send request to third-party API';
      }
    }
  }

  _renderChoices(choices) {
    const choicesContainer = this._quizEl.querySelector('.choices');
    choices.forEach(choice => {
      const choiceEl = document.createElement('div');
      choiceEl.classList.add('choice');
      choiceEl.textContent = choice;
      choiceEl.addEventListener('click', () => {
        if (choice === this._pokemonData.name) {
          this._showSuccess(choice);
        } else {
          this._showTryAgain();
        }
      });
      choicesContainer.appendChild(choiceEl);
    }); 
  }

  _hideChoices() {
    this._quizEl.querySelector('.choices').style.display = 'none';
  }

  _showChoices() {
    this._quizEl.querySelector('.choices').style.display = 'block';
  }

  _hideQuestion() {
    this._quizEl.querySelector('.question').style.display = 'none';
  }

  _showQuestion() {
    this._quizEl.querySelector('.question').style.display = 'block';
  }

  _hideAbort() {
    this._quizEl.querySelector('.abort').style.display = 'none';
  }

  _showAbort() {
    this._quizEl.querySelector('.abort').style.display = 'block';
  }

  _showFinish() {
    this._quizEl.querySelector('.finish').style.display = 'block';
  }

  _showYes() {
    this._quizEl.querySelector('.yes').style.display = 'block';
  }

  _hideYes() {
    this._quizEl.querySelector('.yes').style.display = 'none';
  }

  _showSuccess(name) {
    const successEl = document.createElement('div');
    successEl.classList.add('success');
    successEl.textContent = `Correct! My name is ${name}`;
    this._hideQuestion();
    this._hideChoices();
    this._hideAbort();
    this._showFinish();
    this._quizEl.insertBefore(successEl, this._quizEl.querySelector('.finish'));
  }

  _showTryAgain() {
    const tryAgainEl = document.createElement('div');
    tryAgainEl.classList.add('try-again');
    tryAgainEl.textContent = 'Incorrect. Try again?';
    this._hideQuestion();
    this._hideChoices();
    this._showYes();
    const yesButton = this._quizEl.querySelector('.yes');
    this._quizEl.insertBefore(tryAgainEl, yesButton);
  }

  _hideTryAgain() {
    const tryAgainEl = this._quizEl.querySelector('.try-again');
    tryAgainEl.remove();
  }
}

export default Quiz;