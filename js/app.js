import Map from './Map.js';
import Game from './Game.js';
import LevelState from './LevelState.js'

const startGameLinks = document.getElementsByClassName('start-game-link');
const aboutLink = document.getElementById('about-link');
const introLink = document.getElementById('intro-link');
const nextLevelLink = document.getElementById('next-level-link');

const introMain = document.querySelector('.intro');
const aboutMain = document.querySelector('.about');
const gameMain = document.querySelector('.game');

const levelState = new LevelState(1);

for (let startGameLink of startGameLinks) {
  startGameLink.addEventListener('click', () => {
    introMain.style.display = 'none';
    aboutMain.style.display = 'none';
    gameMain.style.display = 'flex';
  
    startGame(levelState.getCurrentLevelName(), false, startGame);
  });
}

aboutLink.addEventListener('click', () => {
  introMain.style.display = 'none';
  gameMain.style.display = 'none';
  aboutMain.style.display = 'flex';
});

introLink.addEventListener('click', () => {
  gameMain.style.display = 'none';
  aboutMain.style.display = 'none';
  introMain.style.display = 'flex';
});

function startGame(levelName, rebuildMap) {
  const mapDiv = document.querySelector('.map');
  if (!mapDiv || rebuildMap) {
    if (rebuildMap) {
      mapDiv.remove();
    }
    const map = new Map(80, 10, 10);
    const game = new Game(map, levelState, startGame);
    game.start(levelName);
  }
}