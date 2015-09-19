


// -- Enemy Class ----------------------------------------------------------

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.yPos=[70, 125, 200];
    this.x = -100;
    // Randomize which line bug appears on.
    this.y = this.yPos[Math.floor(Math.random() * 3)];
    // Randomize bug speed
    this.speed = Math.floor(Math.random() * 120 + 10);
};

// Update the enemy's position, required method for game. Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply movement by the dt parameter to ensure the game runs at the same speed for all computers.
    this.x = this.x + (this.speed * dt);
    // Reset bug position if off screen.
    if (this.x > 500) {
        this.x = -100;
        // Randomize which line bug appears on.
        this.y = this.yPos[Math.floor(Math.random() * 3)];
    }
    this.checkCollisions();
};




// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function() {
if (Math.abs(this.x - player.x) < 50 &&
           Math.abs(this.y - player.y) < 50) {
                player.reset();
         }
};



// -- Player Class -----------------------------------------------------------

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.initY=400;
    this.x = 200;
    this.y = this.initY;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 101;
    } else if (this.ctlKey === 'right' &&  !(this.x >= 400)) {
        this.x = this.x + 101;
    } else if (this.ctlKey === 'up') {
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && !(this.y >= this.initY)) {
        this.y = this.y + 83;
    }
    // Player made it to water
    if (this.y < 0) {
        this.reset();
    }
    this.ctlKey = null;
};

// Draw the player on the screen, required method for game

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.ctlKey = key;
};

// Reset player to starting position.
Player.prototype.reset = function() {
    player.x = 200;
    player.y = this.initY;
};

/*instantiate objects*/
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var player = new Player();

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