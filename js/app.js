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



// Trainers - code start
let characterImage = "images/ash.png"

let hero = document.querySelector("main")

let one = document.createElement("img");
one.setAttribute("width", "190");
one.setAttribute("height", "260");
one.setAttribute("class","image")
let two = document.createElement("img");
two.setAttribute("class","image")
let three = document.createElement("img");
three.setAttribute("class","image")
let four = document.createElement("img");
four.setAttribute("class","image")



let images = ["images/ash.png","images/gary.png", "images/Paul.png", "images/Lance.png" ]
one.src = images[0]
two.src = images[1]
three.src = images[2]
four.src = images[3]

let div1 = document.createElement("div");
div1.setAttribute("class","trainers")

let div2 = document.createElement("div");
div2.setAttribute("class","trainers")

let div3 = document.createElement("div");
div3.setAttribute("class","trainers")

let div4 = document.createElement("div");
div4.setAttribute("class","trainers")

let char = document.createElement("div")
char.setAttribute("id","trainersDiv")


function myFunction(event) {
  characterImage = event.target.src 
  console.log(event.target.src);
}

let middle1 = document.createElement("div")
middle1.setAttribute("class","middle")

let middle2 = document.createElement("div")
middle2.setAttribute("class","middle")

let middle3 = document.createElement("div")
middle3.setAttribute("class","middle")

let middle4 = document.createElement("div")
middle4.setAttribute("class","middle")


let textDiv1 = document.createElement("div")
textDiv1.setAttribute("class","text")
textDiv1.textContent = "Ash"

let textDiv2 = document.createElement("div")
textDiv2.setAttribute("class","text")
textDiv2.textContent = "Gary"

let textDiv3= document.createElement("div")
textDiv3.setAttribute("class","text")
textDiv3.textContent = "Paul"

let textDiv4 = document.createElement("div")
textDiv4.setAttribute("class","text")
textDiv4.textContent = "Lance"

middle1.appendChild(textDiv1)
div1.appendChild(middle1)

middle2.appendChild(textDiv2)
div2.appendChild(middle2)

middle3.appendChild(textDiv3)
div3.appendChild(middle3)

middle4.appendChild(textDiv4)
div4.appendChild(middle4)

div1.appendChild(one)
div2.appendChild(two)
div3.appendChild(three)
div4.appendChild(four)


char.appendChild(div1)
char.appendChild(div2)
char.appendChild(div3)
char.appendChild(div4)


hero.append(char)

let choosing = document.querySelectorAll('img')
.forEach(img => img.addEventListener("click", myFunction, false))
// Trainers - code end
//========================




// Audio - code start

let pattern = []
pattern.push(Math.floor(Math.random() * 6));

let audio = new Array()
audio[0] =  new Audio('music/vermillion.mp3');
audio[1] =  new Audio('music/guidepost.mp3');
audio[2] =  new Audio('music/cerulean.mp3');
audio[3] =  new Audio('music/palette.mp3');
audio[4] =  new Audio('music/lavendertown.mp3');
audio[5] =  new Audio('music/origin.mp3');
// Audio - code end
//========================




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
  audio[pattern].pause();
  audio[pattern].currentTime = 0;
  
});

introLink.addEventListener('click', () => {
  gameMain.style.display = 'none';
  aboutMain.style.display = 'none';
  introMain.style.display = 'flex';
  audio[pattern].pause();
  audio[pattern].currentTime = 0;
});


function startGame(levelName, rebuildMap) {
  const mapDiv = document.querySelector('.map');
  if (!mapDiv || rebuildMap) {
    if (rebuildMap) {
      mapDiv.remove();
      
      audio[pattern].pause();
      audio[pattern].currentTime = 0;
      
      audio[pattern].play();
    }
    const map = new Map(80, 10, 10);
    const game = new Game(map, levelState, startGame);
    game.start(levelName, characterImage);
    audio[pattern].play();
    console.log(pattern)
  }
}