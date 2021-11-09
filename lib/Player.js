//write a cosntrucotr function to keep player object 

const Potion = require('../lib/Potion');

function Player(name = '') {
    this.name = name; 

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
   //new creates a new object and modifies to this 
    this.inventory = [new Potion('health'), new Potion()];

    //returns am object with various player properties using this 
    // this.getStats = function() {
    //     return {
    //         potions: this.inventory.length,
    //         health: this.health,
    //         strength: this.strength,
    //         agility: this.agility
    //     };
    // };
    // //returns inventory array or false if empty 
    // this.getInventory = function() {
    //     if (this.inventory.length) {
    //         return this.inventory;
    //     }
    //     return false;
    // };

    //write same functions using PROTOTYPE
    //when using prototype, you only crerate the method once and new player objects inherit the method from the constructor
    //inheretence helps with data usage less code needed and less overhead
    //arrow functions do not work with prototypes because they change the scope of this 

    Player.prototype.getStats = function () {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    };

    Player.prototype.getInventory = function() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    };

    Player.prototype.getHealth = function () {
        return `${this.name}'s health is now ${this.health}!`;
    };

    Player.prototype.isAlive = function () {
        if (this.health === 0 ) {
            return false;
        }
        return true;
    };

    Player.prototype.reduceHealth = function(health) {
        this.health -= health; 
        //dont let the health go negative
        if (this.health < 0 ) {
            this.health = 0;
        }
    };

    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max-min) + min);
    };

    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    Player.prototype.usePotion = function(index) {
        //the splice method removes an item from an aray and returns the removed item(s) as a new array
        //original inventory array has a single potion removed at the specified index value and put into 
        //a new removed items array, then the potion at index[0] is saved in a potion variable
        const potion = this.getInventory().splice(index, 1)[0];

        switch (potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;
            case 'health': 
                this.health += potion.value;
                break;
            case 'strength':
                this.strength += potion.value;
                break;
        }
    };
};

module.exports = Player; 