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

//initialize enemy data 
this.enemies.push(new Enemy('goblin', 'sword'));
this.enemies.push(new Enemy ('orc', 'baseball bat'));
this.enemies.push(new Enemy('skeleton', 'axe'));

//keep track of which enemy object is currently fighting player 
this.currentEnemy = this.enemies[0];

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

Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPLayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    this.battle();
    //battle method is the main event 
};
/* battle method 
if player turn, prompt user to attack or use potion 
if potion, display potion objects and apply picked potion to effect the player 
if attacking, subtract health on enemy based on players attack value 
if enemy turn subtract health from player based on enemy attack value */
Game.prototype.battle = function() {
    if (this.isPLayerTurn) {
        inquirer
          .prompt({
              type: 'list', 
              message: 'What would you like to do?',
              name: 'action',
              choices: ['Attack', 'Use potion']
          })
          .then(({action}) => {
              if (action === 'Use potion') {
                  if(!this.player.getInventory()) {
                  console.log('You dont have any potions!');
                  return this.checkEndOfBattle();
              }
        inquirer
              .prompt ({
                  type: 'list',
                  message: 'Which potion would you like to use?',
                  name: 'action',
                  choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
              })
          .then(({action}) => {
              const potionDetails = action.split(': ');

              this.player.usePotion(potionDetails[0] -1);
              console.log(`Ypu used a ${potionDetails[1]} potion`);
              this.checkEndOfBattle();
          });
        } else {
            const damage = this.player.getAttackValue();
            this.currentEnemy.reduceHealth(damage);
  
            console.log(`You attacked the ${this.currentEnemy.name}`);
            console.log(this.currentEnemy.getHealth());
  
            this.checkEndOfBattle();
          }
        });
    } else {
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {
    if(this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);

        this.roundNumber++;

        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log("you win!");
        }
        }  else {
            console.log("you've been defeated!");
        }
    }
};

    

module.exports = Game;