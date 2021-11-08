// use a constructor function the function firs tletter is cap
// these cannot be arrow functions because they allow you to assign values to objects using "this"
function Potion(name) {
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if(this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        this.value = Math.floor(Math.random() *5 + 7);
    }
}

module.exports = Potion; 