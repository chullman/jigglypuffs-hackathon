import Map from './Map';

const startGameLink = document.getElementById('start-game-link');
const aboutLink = document.getElementById('about-link')

startGameLink.addEventListener('click', startGame);
aboutLink.addEventListener('about', about);

function startGame() {
  
  const map = new Map(40, 20, 20);

}

function about() {

}