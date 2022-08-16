import Map from './Map.js';
import Game from './Game.js';

const startGameLinks = document.getElementsByClassName('start-game-link');
const aboutLink = document.getElementById('about-link');
const introLink = document.getElementById('intro-link');

const intro = document.querySelector('.intro');
const about = document.querySelector('.about');
const game = document.querySelector('.game');

let characterImage = "images/Lance.png"


let bla = document.querySelector("main")

let one = document.createElement("img");
one.setAttribute("width", "190");
one.setAttribute("height", "260");
let two = document.createElement("img");
let three = document.createElement("img");
three.style.paddingLeft = "20px";
let four = document.createElement("img");
four.style.paddingLeft = "30px";

let images = ["images/ash.png","images/gary.png", "images/Paul.png", "images/Lance.png" ]
one.src = images[0]
two.src = images[1]
three.src = images[2]
four.src = images[3]


let char = document.createElement("div")
char.setAttribute("id","trainers")


function myFunction(event) {
    characterImage = event.target.src
    
    
}

char.appendChild(one)
char.appendChild(two)
char.appendChild(three)
char.appendChild(four)

// where is the div located in landing page ?


bla.append(char)


let choosing = document.querySelectorAll('img')
.forEach(img => img.addEventListener("click", myFunction, false))


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
    game.start("one", characterImage);
  }
}