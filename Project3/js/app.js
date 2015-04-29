// Enemies our player must avoid
var Enemy = function(position) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = position * 85 + 65;
    this.sprite = 'images/enemy-bug.png';
    this.speed = this.getspeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * 25 * dt;
    if (this.x > 505) {
        this.x = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// every time player hits enemy,enemies also get reset
Enemy.prototype.reset = function() {
    this.x = 20;
    this.y = this.y;
};

// give enemy speed.
Enemy.prototype.getspeed = function() {
    var random = Math.random() + 0.5;
    if (Math.floor(random) < 1) {
        this.speed = 3;
    } else {
        this.speed = 6;
    }
    return this.speed;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method
var Player = function() {
    this.x = 200;
    this.y = 420;
    this.sprite = 'images/char-boy.png';
};

// player is updated.
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < 20) {
        this.y = 20;
    } else if (this.y > 400) {
        this.y = 400;
    }
};

// When player reaches water then it 'wins' the game.
// Every time reaching the water player gets a 'chance' in addition.
// After every win player gets back to the given position.
Player.prototype.win = function() {
    if (this.y < 30) {
        this.y = 420;
        this.x = 200;
        chance++;
    }
};

// Draw the player on the screen, required method for game.
// Draw the chance on the screen. 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20pt Impact";
    ctx.fillStyle = "Red";
    ctx.fillText("chance : " + chance, 60, 90);
};

// when a player hits the enemy, the game resets. 
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 420;
    score = 0;
};

// observe keystrokes.
Player.prototype.handleInput = function(key) {
    switch (key) {

        case 'left':
            this.x = this.x - 101;
            break;

        case 'right':
            this.x = this.x + 101;
            break;

        case 'up':
            this.y = this.y - 83;
            break;

        case 'down':
            this.y = this.y + 83;
            break;

        default:
            break;
    }
};

// Make a life following the same method as in player and enemy.
var Life = function() {
    // add the image.
    this.sprite = 'images/Heart.png';
};

// update the life randomly.
Life.prototype.update = function() {

    this.x = Math.floor((Math.random() * 404) + 1);
    this.y = Math.floor((Math.random() * 4) + 1) * 83;
};

//Draw the image.
//draw the score board,
//draw the name of the game 'Frogger'.
Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "20pt Impact";
    ctx.fillStyle = "Red";
    ctx.fillText("score : " + score, 370, 90);
    ctx.font = "30pt Impact";
    ctx.fillStyle = "Blue";
    ctx.fillText("!! Frogger !!", 160, 40);
    ctx.strokeStyle = "Black";
    ctx.strokeText("!! Frogger !!", 160, 40);
};

// every time life gets reset randomly when player hits.
Life.prototype.reset = function() {
    this.x = Math.floor((Math.random() * 404) + 1);
    this.y = Math.floor((Math.random() * 4) + 1) * 83;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyCount = 4;
var allEnemies = [];

for (var i = 0; i < enemyCount; i++) {
    allEnemies.push(new Enemy(i));
}

// make different variables.
var score = 0;
var player = new Player();
var life = new Life();
var chance = 2;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

