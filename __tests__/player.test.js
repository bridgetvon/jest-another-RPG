const Player = require('../lib/Player');
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');

console.log(new Potion());


test('creates a player object', () => {
    const player = new Player('Dave');
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
});

test("gets players health value", () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test("gets players stats as an object", () => {
    const player = new Player('Dave');
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory=[];

    expect(player.getInventory()).toEqual(false);
});


test('check if player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

//it is important to create a new object of the instance we are testing in every test 
//IE why we have created a new Player instance in each test 
//this ensures we are trsting in isolation 

test('subtracts from players health', () => {
    const player = new Player('dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});

//confirm the players attack value is within a range
test('gets players attack value', () => {
    const player = new Player('Dave');
    player.strength = 10; 
    
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('add a potion to inventory', () => {
    const player = new Player('dave');
    const oldCount = player.inventory.length; 

    player.addPotion(new Potion());
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion (), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});