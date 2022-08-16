import Map from './Map.js';
import Game from './Game.js';

const startGameLinks = document.getElementsByClassName('start-game-link');
const aboutLink = document.getElementById('about-link');
const introLink = document.getElementById('intro-link');

const intro = document.querySelector('.intro');
const about = document.querySelector('.about');
const game = document.querySelector('.game');

for (let startGameLink of startGameLinks) {
  startGameLink.addEventListener('click', () => {
    intro.style.display = 'none';
    about.style.display = 'none';
    game.style.display = 'flex';
  
    startGame();
  });
}

aboutLink.addEventListener('click', () => {
  intro.style.display = 'none';
  game.style.display = 'none';
  about.style.display = 'flex';
});

introLink.addEventListener('click', () => {
  game.style.display = 'none';
  about.style.display = 'none';
  intro.style.display = 'flex';
});

function startGame() {
  const mapDiv = document.querySelector('.map');
  if (!mapDiv) {
    const map = new Map(80, 10, 10);
    const game = new Game(map);
    game.start("one");
  }
}