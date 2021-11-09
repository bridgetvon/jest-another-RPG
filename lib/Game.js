//think of the dependencies the constructor will have, The game object wont interface directly with potions 

const inquirer= require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');


function Game () {

    //insert properties the game object should have 
    this.roundNumber = 0;
    this.isPlayerTurn = false; 
    this.enemies = [];
    this.currentEnemy;
    this.player;
//initialize the game method 
//this is where we will set up the enemy and Player objects 
Game.prototype.initializeGame = function() {

//keep track of which enemy object is currently fighting player 
this.currentEnemy = this.enemies[0];
//initialize enemy data 
this.enemies.push(new Enemy('goblin', 'sword'));
this.enemies.push(new Enemy ('orc', 'baseball bat'));
this.enemies.push(new Enemy('skeleton', 'axe'));
//prompt player for their name 
inquirer
    .prompt({
        type: 'text', 
        name: 'name',
        message: 'WHat is your name?'
    })
    //destructure name from the prompt object 
    .then(({name}) => {
        this.player = new Player(name);

        //test object creation 
        this.startNewBattle();
    });
}
}

module.exports = Game;