# Poke EDU

Poke EDU is is Tim, Chris, and Rob's Coder Academy hackathon submission.
It is simple 'educational' pokemon game built with HTML, CSS, and vanilla 
JavaScript. Gameplay involves navigating a user selected character avatar 
though a 2D map that has randomly selected Pokemon positioned throughout.
To pass each level, the player is required to successfully complete
a quiz for each Pokemon on the map.

## Target Audience

Anyone who wants to learn more about Pokemon!

## Tech Stack

Poke EDU is a hacky SPA built with HTML, CSS (with some Bootstrap), 
and vanilla JS.

## Runtime Flow

The user can optionally choose their character on the home page/screen,
and when gameplay commences, Pokemon music is initiated!
The app has an object-oriented structure, which is centered around the
classes `Game` and `Map`. When any of the 'start game' links are clicked,
the game 'page' is displayed and the `startGame` function is called.
If the game map has not already been initialised and mounted,
a `Map` object is instantiated and passed into the constructor for
a new `Game` object. If the player attempts to move onto a Pokemon's
tile, a new `Quiz` is created. If the player successfully completes
the quiz, a custom event is triggered. The `Game` object receives this
event and keeps track of how many quizes are left in the current level, 
and, once they are all complete, starts the next level - with help from a 
`LevelState` object. When the first level begins with a `startGame` 
invokation, the `Game` object receives `startGame` as a parameter 
and it is called again in order to start the next level when all
quizes have been completed.