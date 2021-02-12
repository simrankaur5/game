var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var realPos;

var isLeft;
var isRight;
var isJumping;
var isFalling;

var clouds;
var CloudColour;
var mountains;
var trees;
var houseXs;

var canyons;
var guns;

var score;
var isWon;
var lives;
var isLost;

var enemies;
var r,g,b;  // random colours for the snakes everytime game restarts.

var platforms;
var isOnPlatform;


function setup()
{
	createCanvas(1024, 576);
    
    floorPos_y = height * 3/4;
    
    startGame(); //calling function startGame().

    lives = 3;
}

// Reset everything when game lost/fall into canyon except for the scenery. 
function startGame()
{
    // Variable to control the background scrolling.
	scrollPos = 0;
    
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to store the real position of the gameChar in the game world. Need it for collision detection.
    realPos = gameChar_x - scrollPos;
    
    score = 0;
    
    //random colours for the snake each time game restarts.
    r = random(255);
    g = random(255);
    b = random(255);

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isJumping = false;
	isFalling = false;
    
    isOnPlatform = false;
    
    //Boolean variables to control game scores/start/end.
    isWon = false;
    isLost = false;
    
	
    // Initialise arrays of scenery objects.
    
    houseXs = [];
    for(var i = 0; i < 30; i++)
    {
        var h = random(0,8000);
        houseXs.push(h);
    }
    
    cloudColour = random(150,256);
    clouds = [];
    for(var i =0; i < 75; i++)
    {
        var c = 
        {
            x_pos: random(0,8000), 
            y_pos: random(80,100)
        };
        clouds.push(c);
    }
    
    mountains = [];
    for(var i = 0; i < 30; i++)
    {
        var m = 
        {
            x_pos:random(0,4000),
            height:50
        };
        mountains.push(m);
    }
    
    trees = [];
    for(var i = 0; i < 50; i++)    
    {
        var t = 
        {
            x_pos:random(0,8000),
            height:300
        };
        trees.push(t);
    }

    guns = 
    [
        {x_pos: 450, y_pos: 100, size: 50, isFound: false},  
        {x_pos: 1300, y_pos: 100, size: 50, isFound: false},
        {x_pos: 1750, y_pos: 100, size: 50, isFound: false},
        {x_pos:2110, y_pos: 100, size: 50, isFound: false},
        {x_pos: 2300, y_pos: 100, size: 50, isFound: false},
        {x_pos: 2600, y_pos: 100, size: 50, isFound: false}, 
        {x_pos: 3500, y_pos: 100, size: 50, isFound: false},
        {x_pos: 4070, y_pos: 100, size: 50, isFound: false},
        {x_pos: -400, y_pos: 100, size: 50, isFound: false},
        {x_pos: -600, y_pos: 100, size: 50, isFound: false}
    ]
    
    canyons = 
    [
        {x_pos: 300, width: 100},
        {x_pos: 650, width: 250},
        {x_pos: 940, width: 100},
        {x_pos: 1000, width: 100},
        {x_pos: 1300, width: 250},
        {x_pos: 1900, width: 200},
        {x_pos: 2150, width: 100},
        {x_pos: 2300, width: 100},
        {x_pos: 2900, width: 350},
        {x_pos: -200, width: 240}
    ]
 
    enemies = [];
    enemies.push
    (
        {
            x_pos: 10,
            y_pos: floorPos_y,
            x1: 10,
            x2: 150,
            speed: 1,
            size: 40,
            
            //Draw enemy
            display: function() 
            {
                if(this.speed == -1)
                {
                    //SNAKE FACING LEFT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos - 11, this.y_pos - 10, this.size - 5, this.size - 25);
                  
                    //eyes
                    fill(0);
                    ellipse(this.x_pos - 18, this.y_pos - 11, this.size - 35, this.size - 35);
                }
                else
                {
                    //SNAKE FACING RIGHT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts.
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos + 85, this.y_pos - 12, this.size - 5, this.size - 25);

                    //eyes
                    fill(0);
                    ellipse(this.x_pos + 93, this.y_pos - 13, this.size - 35, this.size - 35);
                }
            },
            
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1  || this.x_pos > this.x2)
                {
                    //move opposite direction(reverse)
                    this.speed *= -1;
                }
            },
        
            checkCharCollision: function()
            {
                if(abs(realPos - (this.x_pos + 70 * this.speed)) < this.size && abs(gameChar_y - this.y_pos) < this.size)
                {
                        playerDied();
                }
            }
                
        },
        
        {
            x_pos: 1800,
            y_pos: floorPos_y,
            x1: 1750,
            x2: 1830,
            speed: 1,
            size: 40,
            
            //Draw enemy
            display: function() 
            {
                if(this.speed == -1)
                {
                    //SNAKE FACING LEFT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos - 11, this.y_pos - 10, this.size - 5, this.size - 25);
                  
                    //eyes
                    fill(0);
                    ellipse(this.x_pos - 18, this.y_pos - 11, this.size - 35, this.size - 35);
                }
                else
                {
                    //SNAKE FACING RIGHT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts.
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos + 85, this.y_pos - 12, this.size - 5, this.size - 25);

                    //eyes
                    fill(0);
                    ellipse(this.x_pos + 93, this.y_pos - 13, this.size - 35, this.size - 35);
                }
            },
            
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1  || this.x_pos > this.x2)
                {
                    //move opposite direction(reverse)
                    this.speed *= -1;
                }
            },
        
            checkCharCollision: function()
            {    
                if(abs(realPos - (this.x_pos - 5 * this.speed)) < this.size && abs(gameChar_y - this.y_pos) < this.size)
                {
                        playerDied();
                }
            }
                
        },
        
        {
            x_pos: 2600,
            y_pos: floorPos_y,
            x1: 2500,
            x2: 2895,
            speed: 1,
            size: 40,
            
            //Draw enemy
            display: function() 
            {
                if(this.speed == -1)
                {
                    //SNAKE FACING LEFT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos - 11, this.y_pos - 10, this.size - 5, this.size - 25);
                  
                    //eyes
                    fill(0);
                    ellipse(this.x_pos - 18, this.y_pos - 11, this.size - 35, this.size - 35);
                }
                else
                {
                    //SNAKE FACING RIGHT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts.
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos + 85, this.y_pos - 12, this.size - 5, this.size - 25);

                    //eyes
                    fill(0);
                    ellipse(this.x_pos + 93, this.y_pos - 13, this.size - 35, this.size - 35);
                }
            },
            
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1  || this.x_pos > this.x2)
                {
                    //move opposite direction(reverse)
                    this.speed *= -1;
                }
            },
        
            checkCharCollision: function()
            {    
                if(abs(realPos - (this.x_pos - 5 * this.speed)) < this.size && abs(gameChar_y - this.y_pos) < this.size)
                {
                        playerDied();
                }
            }
                
        },
        
        {
            x_pos: 3720,
            y_pos: floorPos_y,
            x1: 3700,
            x2: 3880,
            speed: 3,
            size: 40,
            
            //Draw enemy
            display: function() 
            {
                if(this.speed == -3)
                {
                    //SNAKE FACING LEFT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos - 11, this.y_pos - 10, this.size - 5, this.size - 25);
                  
                    //eyes
                    fill(0);
                    ellipse(this.x_pos - 18, this.y_pos - 11, this.size - 35, this.size - 35);
                }
                else
                {
                    //SNAKE FACING RIGHT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts.
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos + 85, this.y_pos - 12, this.size - 5, this.size - 25);

                    //eyes
                    fill(0);
                    ellipse(this.x_pos + 93, this.y_pos - 13, this.size - 35, this.size - 35);
                }
            },
            
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1  || this.x_pos > this.x2)
                {
                    //move opposite direction(reverse)
                    this.speed *= -1;
                }
            },
        
            checkCharCollision: function()
            {    
                if(abs(realPos - (this.x_pos - 5 * this.speed)) < this.size && abs(gameChar_y - this.y_pos) < this.size)
                {
                        playerDied();
                }
            }
                
        },
        
        {
            x_pos: 4300,
            y_pos: floorPos_y,
            x1: 4200,
            x2: 4500,
            speed: 3,
            size: 40,
            
            //Draw enemy
            display: function() 
            {
                if(this.speed == -3)
                {
                    //SNAKE FACING LEFT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos - 11, this.y_pos - 10, this.size - 5, this.size - 25);
                  
                    //eyes
                    fill(0);
                    ellipse(this.x_pos - 18, this.y_pos - 11, this.size - 35, this.size - 35);
                }
                else
                {
                    //SNAKE FACING RIGHT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts.
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos + 85, this.y_pos - 12, this.size - 5, this.size - 25);

                    //eyes
                    fill(0);
                    ellipse(this.x_pos + 93, this.y_pos - 13, this.size - 35, this.size - 35);
                }
            },
            
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1  || this.x_pos > this.x2)
                {
                    //move opposite direction(reverse)
                    this.speed *= -1;
                }
            },
        
            checkCharCollision: function()
            {    
                if(abs(realPos - (this.x_pos + 2 * this.speed)) < this.size && abs(gameChar_y - this.y_pos) < this.size)
                {
                        playerDied();
                }
            }    
        },
        
        {
            x_pos: -300,
            y_pos: floorPos_y,
            x1: -400,
            x2: -5,
            speed: 3,
            size: 40,
            
            //Draw enemy
            display: function() 
            {
                if(this.speed == -3)
                {
                    //SNAKE FACING LEFT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos - 11, this.y_pos - 10, this.size - 5, this.size - 25);
                  
                    //eyes
                    fill(0);
                    ellipse(this.x_pos - 18, this.y_pos - 11, this.size - 35, this.size - 35);
                }
                else
                {
                    //SNAKE FACING RIGHT.
                    
                    fill(r,g,b); //snake has random colours  everytime game restarts.
                    
                    //vertical parts.
                    ellipse(this.x_pos + 2, this.y_pos + 1, this.size - 25, this.size  - 15);
                    ellipse(this.x_pos + 23, this.y_pos + 1, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 50, this.y_pos, this.size - 25 , this.size  - 15);
                    ellipse(this.x_pos + 70, this.y_pos, this.size - 25 , this.size  - 15);

                    //horizontal parts
                    ellipse(this.x_pos + 13, this.y_pos + 10, this.size - 15, this.size - 25);
                    ellipse(this.x_pos + 37, this.y_pos - 9, this.size - 10, this.size - 25);
                    ellipse(this.x_pos + 60, this.y_pos + 10, this.size - 15, this.size - 25);

                    //face
                    ellipse(this.x_pos + 85, this.y_pos - 12, this.size - 5, this.size - 25);

                    //eyes
                    fill(0);
                    ellipse(this.x_pos + 93, this.y_pos - 13, this.size - 35, this.size - 35);
                }
            },
            
            move: function()
            {
                this.x_pos += this.speed;
                if(this.x_pos < this.x1  || this.x_pos > this.x2)
                {
                    //move opposite direction(reverse)
                    this.speed *= -1;
                }
            },
        
            checkCharCollision: function()
            {    
                if(abs(realPos - (this.x_pos + 15 * this.speed)) < this.size && abs(gameChar_y - this.y_pos) < this.size)
                {
                        playerDied();
                }
            }    
        }
    );
    
    
    platforms = [];
    platforms.push 
    (
    
    {
        x_pos: 430,
        y_pos: floorPos_y - 90,
        width: 250,
        height: 15,
        display: function()
        {
            //Draw platform.
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
    
    {
        x_pos: 555,
        y_pos: floorPos_y - 210,
        width: 200,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
        
     {
        x_pos: 1800,
        y_pos: floorPos_y - 90,
        width: 200,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
        
    {
        x_pos: 2555,
        y_pos: floorPos_y - 90,
        width: 200,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
        
    {
        x_pos: 2700,
        y_pos: floorPos_y - 200,
        width: 200,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
        
    {
        x_pos: 3100,
        y_pos: floorPos_y - 90,
        width: 200,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
        
    {
        x_pos: 3400,
        y_pos: floorPos_y - 150,
        width: 250,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
        
    {
        x_pos: 3650,
        y_pos: floorPos_y - 90,
        width: 160,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    },
        
    {
        x_pos: -250,
        y_pos: floorPos_y - 90,
        width: 300,
        height: 15,
        display: function()
        {
            //Draw platform
            fill(255, 255, 0);
            rect
            (
                this.x_pos, 
                this.y_pos, 
                this.width, 
                this.height
            );
            
            line
            (
                 this.x_pos,
                 this.y_pos + this.height / 2,
                 this.x_pos + this.width,
                 this.y_pos + this.height / 2
            );
        },
        
        checkCharOn: function()
        {
            if(realPos >= this.x_pos && realPos <= this.x_pos  + this.width)
            {
                 if(gameChar_y >= this.y_pos && gameChar_y <= this.y_pos  + this.height)
                 {
                    isOnPlatform = true;
                 }
            } 
        }
    }
        
    );
}          


function draw()
{
    // fill the sky blue
	background(100, 155, 255); 

    // draw green ground
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); 

	// Draw clouds.
    push();
    translate(scrollPos * 0.3, 0);
    drawClouds()
    pop();
    

	// Draw mountains.
    push();
    translate(scrollPos * 0.6, 0);
    drawMountains();
    pop();

    
	// Draw trees.
    push();
    translate(scrollPos * 1, 0);
    drawTrees();
    pop();

    
	// Draw houses.
    push();
    translate(scrollPos * 1.1, 0);
    drawHouses();
    pop();

	
    // Draw canyons.
    push();
    translate(scrollPos, 0);
    for(var i = 0; i < canyons.length; i++)
    {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }
    pop();
    

    // Draw pickup items.
    push();
    translate(scrollPos, -25);
    for(var i =0; i < guns.length; i++)
    {
        drawGun(guns[i]);
        checkGun(guns[i]);
    }
    pop();
    
    
    // Draw enemies
    push();
    translate(scrollPos,0);
    for(var i =0; i< enemies.length; i++)
    {
        enemies[i].display();
        enemies[i].move();
        enemies[i].checkCharCollision();
    }
    pop();
    
    
    // Draw platforms
    push();
    translate(scrollPos,0);
    isOnPlatform = false;
    for(var i =0; i< platforms.length; i++)
    {
        platforms[i].display();
        platforms[i].checkCharOn();
    }
    pop();
    

    // Check player has won the game.
    checkPlayerWon();
    
    // Check player died so lives are reduced until 0 and player loses the game!
    checkPlayerDied();
    
    
    // Draw game character.
	drawGameChar();
    
    
    //Score on game screen
    fill(0);
    stroke(0);
    textStyle(BOLD);
    textSize(18);
    text("Score: " + score, 20, 20);
    
    //Lives on game screen & life counter
    fill(0);
    stroke(0);
    textStyle(BOLD);
    textSize(18);
    text("Lives: " + lives, 300,20);
    
    if(isLost == true)
    {
        stroke(255);
        textStyle(BOLD);
        textSize(38);
        text("Game over - YOU LOST! Press space to continue. ", 100, 300);
        
        return;
    }
    
    if(isWon == true)
    {
        stroke(255);
        textStyle(BOLD);
        textSize(38);
        text("Game over - YOU WON! Press space to continue. ", 100, 300);
        
        return;
    }
    
    
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
			if(gameChar_x > width * 0.2)
			{
					gameChar_x -= 5;
			}
			else
			{
					scrollPos += 5;
			}
	}

	if(isRight)
	{
			if(gameChar_x < width * 0.8)
			{
					gameChar_x  += 5;
			}
			else
			{
					scrollPos -= 5; // negative for moving against the background
			}
	}

	// Logic to make the game character rise and fall.
	if(gameChar_y < floorPos_y  && !isOnPlatform)
	{
			gameChar_y += 2;
			isJumping = true;
	}
	else
	{
			isJumping = false;
	}

	if(isFalling)
	{
			gameChar_y += 5;
        
	}

	// Update real position of gameChar for collision detection.
	realPos = gameChar_x - scrollPos;
}




// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
//Only allows space bar to work at the end of the game.
if(isLost || isWon)
{
    if(key == ' ')
    {
        nextLevel();
    }
    return;
}

		// console.log(keyCode);
		// console.log(key);

	if(key == 'A' || keyCode == 37)
	{
			isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
			isRight = true;
	}

	if(key == ' ' || key == 'W')
	{
			if(!isJumping)
			{
				gameChar_y -= 130; //how high character jumps
			}
	}
}

function keyReleased(){

	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.
function drawGameChar()
{
    // jumping-left code
    if(isLeft && isJumping)
    {
         if (gameChar_y > floorPos_y)
            gameChar_y = gameChar_y - 300;
      
    push();
    translate(0, -35);
        
    //shirt     
    fill(189,183,107);
    rect(gameChar_x -10,gameChar_y -4,22,18);

    //buttons
    fill(0);
    ellipse(gameChar_x-9, gameChar_y + 3,2,2);
    ellipse(gameChar_x -9, gameChar_y + 10,2,2);
    
    //face
    fill(255,222,173);
    ellipse(gameChar_x+1, gameChar_y + -13,28,28);
    
    //hat
    fill(222,184,135);
    rect(gameChar_x -15,gameChar_y -25,30,4); 
    quad(gameChar_x -7, gameChar_y -34, gameChar_x -15,gameChar_y -21, gameChar_x +15 , gameChar_y -21, gameChar_x +8, gameChar_y-34 );
   
    //left eye
    fill(255);
    ellipse(gameChar_x-10, gameChar_y -15,8,8);
      
    //left eyeball
    fill(0);
    ellipse(gameChar_x-11, gameChar_y -15,3,4);
        
    //shorts 
    fill(240,230,140);
    quad(gameChar_x -10, gameChar_y +14, gameChar_x -13,gameChar_y +25, gameChar_x+5, gameChar_y +25, gameChar_x +12, gameChar_y +14);
        
    //right hand
    fill(255,222,173);
    ellipse(gameChar_x+5, gameChar_y +10,6,16);
        
    //left leg
    fill(255,222,173);
    quad(gameChar_x -13, gameChar_y +25, gameChar_x -11,gameChar_y +33, gameChar_x -5 , gameChar_y +33, gameChar_x -7, gameChar_y +25 );
        
    //right leg
    fill(255,222,173);
    quad(gameChar_x -1, gameChar_y +25, gameChar_x,gameChar_y +33, gameChar_x+5, gameChar_y +33, gameChar_x +5, gameChar_y +25);
    
    //shoes
    fill(0);
    ellipse(gameChar_x, gameChar_y + 32,10,5); //right shoe
    ellipse(gameChar_x-10, gameChar_y +32,10,5); //left shoe
        
    pop();
    
    }

    //jumping-right code
    else if(isRight && isJumping)
    {
         if (gameChar_y > floorPos_y)
            gameChar_y = gameChar_y - 300;
    
    push();
    translate(0, -35);
        
    //shirt
    fill(189,183,107);
    rect(gameChar_x -14,gameChar_y -4,22,18);
        
    //buttons
    fill(0);
    ellipse(gameChar_x +7, gameChar_y +3,2,2); 
    ellipse(gameChar_x +7, gameChar_y + 10,2,2);
    
    //face
    fill(255,222,173);
    ellipse(gameChar_x -3, gameChar_y -13,28,28);
        
    //hat
    fill(222,184,135);
    rect(gameChar_x -18,gameChar_y -25,30,4);
    quad(gameChar_x -9, gameChar_y -34, gameChar_x -15,gameChar_y -21, gameChar_x +10, gameChar_y -21, gameChar_x +5, gameChar_y -34 );
        
    //left eye
    fill(255);
    ellipse(gameChar_x +7, gameChar_y -15,8,8);
        
    //left eyeball
    fill(0);
    ellipse(gameChar_x +9, gameChar_y -15,3,4);
      
    //shorts
    fill(240,230,140);
    quad(gameChar_x -14.1, gameChar_y +14, gameChar_x -3,gameChar_y +23, gameChar_x +12, gameChar_y +23, gameChar_x +8, gameChar_y +14 );
        
    //right hand
    fill(255,222,173);
    ellipse(gameChar_x -4, gameChar_y + 10,6,15);
 
    //shorts
    fill(255,222,173);
    quad(gameChar_x +6, gameChar_y +23, gameChar_x +4,gameChar_y +30, gameChar_x +10, gameChar_y +30, gameChar_x +11.5, gameChar_y +23 ); //left short
    quad(gameChar_x -2, gameChar_y +23, gameChar_x -5,gameChar_y +30, gameChar_x , gameChar_y +30, gameChar_x +4, gameChar_y +23 ); //right short
        
    //shoes
    fill(0);
    ellipse(gameChar_x, gameChar_y + 30,10,5); //left shoe
    ellipse(gameChar_x +10, gameChar_y + 30,10,5); //right shoe
    
    pop();
        
    }
    
    //  walking left code
    else if(isLeft)
    {   
        
    push();
    translate(0, -35);
        
    //shorts
    fill(240,230,140);
    quad(gameChar_x -8, gameChar_y +13, gameChar_x -7,gameChar_y +28, gameChar_x -2, gameChar_y +28, gameChar_x +4, gameChar_y +13 ); // left short
    fill(240,230,140);
    quad(gameChar_x +2, gameChar_y +13, gameChar_x +8,gameChar_y +28, gameChar_x +13, gameChar_y +28, gameChar_x +14, gameChar_y +13 ); // right short
    
    //shirt
    fill(189,183,107);
    rect(gameChar_x -8,gameChar_y -5,22,18);
        
    //buttons
    fill(0);
    ellipse(gameChar_x -7, gameChar_y + 2,2,2);
    ellipse(gameChar_x -7, gameChar_y + 9,2,2);
    
    //left hand
    fill(255,222,173);
    ellipse(gameChar_x +5, gameChar_y + 8,6,15);
    
    //face
    fill(255,222,173);
    ellipse(gameChar_x +3, gameChar_y -14,28,28);
    
    //hat
    fill(222,184,135);
    rect(gameChar_x -12,gameChar_y -26,30,4);
    quad(gameChar_x -5, gameChar_y -35, gameChar_x -10,gameChar_y -25, gameChar_x +15, gameChar_y -25, gameChar_x +10, gameChar_y -35 );
    
    //left eye
    fill(255);
    ellipse(gameChar_x -10, gameChar_y -16,8,8); 

    //left eyeball
    fill(0);
    ellipse(gameChar_x -9.7, gameChar_y  -16,3,4);

    //legs
    fill(255,222,173);
    rect(gameChar_x -7,gameChar_y +27,5,6); //left leg
    rect(gameChar_x+8,gameChar_y +27,5,5); //right leg
    
    //shoes
    fill(0);
    ellipse(gameChar_x -7, gameChar_y + 32,10,5); //left shoe
    ellipse(gameChar_x +8, gameChar_y + 33,10,5); //right shoe
    
    //shoetop
    fill(0);
    rect(gameChar_x -7,gameChar_y +28,5,4); //left shoe top
    rect(gameChar_x +8,gameChar_y +29.3,5,3); //right shoe top

    pop();
        
    }
    
    // walking right code
    else if(isRight)
    {
     push();
     translate(0,-35);
      
    //shorts
    fill(240,230,140);
    quad(gameChar_x -15, gameChar_y +13, gameChar_x -14,gameChar_y +28, gameChar_x -9, gameChar_y +28, gameChar_x -3, gameChar_y +13 );// left short
    fill(240,230,140);
    quad(gameChar_x -4, gameChar_y +13, gameChar_x +1,gameChar_y +28, gameChar_x +6, gameChar_y +28, gameChar_x +7, gameChar_y +13 ); // right short
        
    //shirt
    fill(189,183,107);
    rect(gameChar_x -15,gameChar_y -5,22,18);
        
    //buttons
    fill(0);
    ellipse(gameChar_x +6, gameChar_y + 2,2,2);
    ellipse(gameChar_x +6, gameChar_y + 9,2,2);
    
    //left hand
    fill(255,222,173);
    ellipse(gameChar_x -8, gameChar_y + 8,6,15);
        
    //face
    fill(255,222,173);
    ellipse(gameChar_x -4, gameChar_y -14,28,28);
    
    //hat
    fill(222,184,135);
    rect(gameChar_x -20,gameChar_y -26,30,4); 
    quad(gameChar_x -13, gameChar_y -35, gameChar_x -18,gameChar_y -25, gameChar_x +8, gameChar_y -25, gameChar_x +1, gameChar_y -35 );
    
    //left eye
    fill(255);
    ellipse(gameChar_x +7, gameChar_y -16,8,8);
        
    //left eyeball
    fill(0);
    ellipse(gameChar_x +8, gameChar_y -16,3,4);
      
    //legs
    fill(255,222,173);
    rect(gameChar_x -14,gameChar_y +27,5,6); //left leg
    rect(gameChar_x +1,gameChar_y +27,5,5); //right leg
    
    //shoes 
    fill(0);
    ellipse(gameChar_x +6, gameChar_y + 32,10,5);  //left shoe
    ellipse(gameChar_x -9, gameChar_y + 33,10,5); //right shoe
    
    //shoetop
    fill(0);
    rect(gameChar_x +1,gameChar_y +28,5,4);  //left shoe top
    rect(gameChar_x -14,gameChar_y +29.3,5,3);  //right shoe top
    
    pop();
        
    }
 
    //jumping facing forwards code
    else if(isJumping || isFalling)
    {
        if(!isFalling)
            {
                if (gameChar_y > floorPos_y)
                gameChar_y = gameChar_y - 300;
            }
    push();
    translate(0,-35);
        
    //shorts
    fill(240,230,140);
    quad(gameChar_x -12, gameChar_y +10, gameChar_x -10,gameChar_y +25, gameChar_x -5, gameChar_y +25, gameChar_x, gameChar_y +8 );  //left short
    fill(240,230,140);
    quad(gameChar_x , gameChar_y +10, gameChar_x + 5,gameChar_y +25, gameChar_x +10, gameChar_y +25, gameChar_x +12, gameChar_y +10 ); //right short
        
    //shirt
    fill(189,183,107);
    rect(gameChar_x -12,gameChar_y -8,24,18);
    
    //hands
    fill(255,222,173);
    ellipse(gameChar_x +12, gameChar_y,6,10); //right hand
    ellipse(gameChar_x -12, gameChar_y ,6,10); //left hand
    
    //buttons
    fill(0);
    ellipse(gameChar_x, gameChar_y +5 ,2,2);
    ellipse(gameChar_x, gameChar_y ,2,2);
    
    //face
    fill(255,222,173);
    ellipse(gameChar_x, gameChar_y -15 ,28,28);
        
    //hat
    fill(222,184,135);
    rect(gameChar_x -15,gameChar_y -25,30,4);
    quad(gameChar_x -9, gameChar_y -33, gameChar_x -12,gameChar_y -25, gameChar_x+12, gameChar_y -25, gameChar_x +8, gameChar_y -33 );  
    
    //eyes
    fill(255);
    ellipse(gameChar_x +7, gameChar_y - 15,8,8);  //left eye
    ellipse(gameChar_x -7, gameChar_y -15,8,8);  //right eye
    
    //eyeballs
    fill(0);
    ellipse(gameChar_x +7, gameChar_y -15,4,5);  //left eyeball
    ellipse(gameChar_x -7, gameChar_y -15 ,4,5); //right eyeball
    
    //nose
    fill(0);
    ellipse(gameChar_x -2, gameChar_y - 9,1,1); //left nose
    ellipse(gameChar_x +1.3, gameChar_y - 9,1,1); //right nose
    
    //open mouth
    fill(255,0,0);  
    ellipse(gameChar_x -0.1, gameChar_y -5, 3,3);

    //legs
    fill(255,222,173);
    rect(gameChar_x +5,gameChar_y +25,5,7); //left leg
    rect(gameChar_x -10,gameChar_y +25,5,7); //right leg
    
    //shoes
    fill(0);
    ellipse(gameChar_x -8, gameChar_y + 29,9,7);  //left shoe
    ellipse(gameChar_x + 8, gameChar_y +29,9,7);  //right shoe
    
    pop();
        
    }
    
    //standing front facing code
    else 
    { 
        push();
        translate(0,-35);
        
        //hands
        fill(255,222,173);
        ellipse(gameChar_x + 13.5, gameChar_y,6,16);  //right hand
        ellipse(gameChar_x - 11.2, gameChar_y,6,16); //left hand

        //shirt
        fill(189,183,107);
        rect(gameChar_x -10.5,gameChar_y  -8,24,18); 

        //shorts
        fill(240,230,140);
        quad(gameChar_x -10.6, gameChar_y +10, gameChar_x -9,gameChar_y + 25, gameChar_x - 4, gameChar_y + 25, gameChar_x + 1, gameChar_y +10 ); // left short
        fill(240,230,140);
        quad(gameChar_x +1, gameChar_y +10, gameChar_x+ 6,gameChar_y + 25, gameChar_x +11, gameChar_y + 25, gameChar_x +13, gameChar_y +10 );// right short

        //buttons
        fill(0);
        ellipse(gameChar_x +1, gameChar_y + 5,2,2); //top button
        ellipse(gameChar_x + 1, gameChar_y,2,2); //bottom button

        //face
        fill(255,222,173);
        ellipse(gameChar_x + 1.5, gameChar_y -15,28,28);

        //hat
        fill(222,184,135);
        rect(gameChar_x - 13.1,gameChar_y -25,30,4);
        quad(gameChar_x -7, gameChar_y -33, gameChar_x - 10,gameChar_y -25, gameChar_x +14, gameChar_y -25, gameChar_x +10, gameChar_y  -33 ); //top of hat

        //eyes
        fill(255);
        ellipse(gameChar_x-5, gameChar_y -15,8,8);//left eye
        ellipse(gameChar_x + 8, gameChar_y -15,8,8); //right eye
        
        //eyeball
        fill(0);
        ellipse(gameChar_x -5, gameChar_y -15,4,5); //left eyeball
        ellipse(gameChar_x + 8, gameChar_y -15,4,5);//right eyeball

        //nose
        fill(0);
        ellipse(gameChar_x , gameChar_y - 9,1,1); //left nose
        ellipse(gameChar_x + 3, gameChar_y - 9,1,1);//right nose

        //legs
        fill(255,222,173);
        rect(gameChar_x - 9,gameChar_y +25,5,8); //left leg
        rect(gameChar_x + 6,gameChar_y +25,5,8);//right leg
        
        //shoes
        fill(0);
        ellipse(gameChar_x - 8.7, gameChar_y +33 ,10,5); //left shoe
        ellipse(gameChar_x +10.6, gameChar_y +33 ,10,5);//right shoe

        //shoetop
        fill(0);
        rect(gameChar_x - 9,gameChar_y +28,5,4); //left shoe top
        rect(gameChar_x +6,gameChar_y +28,5,4); //right shoe top
        
        //lips
        stroke(0); 
        curve(gameChar_x - 20, gameChar_y - 15, gameChar_x - 3, gameChar_y - 6, gameChar_x + 7, gameChar_y - 7, gameChar_x + 20,gameChar_y - 35);
        
        pop();
    }
}



// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
    for(var i = 0; i< clouds.length; i++)
    {
        fill(cloudColour);
        ellipse(clouds[i].x_pos - 100, clouds[i].y_pos-10, 60,60);
        ellipse(clouds[i].x_pos - 60, clouds[i].y_pos +10, 70,60);
        ellipse(clouds[i].x_pos - 50, clouds[i].y_pos-50, 60,70);        
        ellipse(clouds[i].x_pos - 74, clouds[i].y_pos-20, 60,60);
        ellipse(clouds[i].x_pos , clouds[i].y_pos-60, 60,60);
        ellipse(clouds[i].x_pos - 100, clouds[i].y_pos-40, 60,60);
        ellipse(clouds[i].x_pos +60, clouds[i].y_pos +10, 60,60);
        ellipse(clouds[i].x_pos +30, clouds[i].y_pos+40, 60,60);
        ellipse(clouds[i].x_pos - 20, clouds[i].y_pos+30, 50,50);
        ellipse(clouds[i].x_pos+25, clouds[i].y_pos-25, 80,80);
        ellipse(clouds[i].x_pos + 8, clouds[i].y_pos - 15, 100,100); 
    } 
}

// Function to draw mountains objects.
function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
    {
        stroke(119,136,153);
        strokeWeight(0.9);
        fill(176,196,222);
        triangle(mountains[i].x_pos,mountains[i].height+382,mountains[i].x_pos+210,mountains[i].height+382,mountains[i].x_pos+105,mountains[i].height);

        //snow on mountain
        fill(255,255,255,300);
        triangle(mountains[i].x_pos+85,mountains[i].height+70,mountains[i].x_pos+125,mountains[i].height+70,mountains[i].x_pos+105,mountains[i].height);
    }
}

// Function to draw trees objects.
function drawTrees()
{
    for(var i = 0; i < trees.length; i++)
    {
        fill(139,69,19);
        rect(trees[i].x_pos - 20, trees[i].height + 25, 32, 107); 
        noStroke();
        fill(34,139,34); 
        ellipse(trees[i].x_pos - 35, trees[i].height + 32, 55,45);
        ellipse(trees[i].x_pos - 60, trees[i].height + 3, 45,45);
        ellipse(trees[i].x_pos - 70, trees[i].height -  30, 45,45);
        ellipse(trees[i].x_pos  - 50, trees[i].height -55, 45,45);
        ellipse(trees[i].x_pos - 15, trees[i].height - 68, 45,45);
        ellipse(trees[i].x_pos + 20, trees[i].height - 60, 45,45);
        ellipse(trees[i].x_pos + 55, trees[i].height - 45, 50,45);
        ellipse(trees[i].x_pos + 60, trees[i].height - 10, 45,45);
        ellipse(trees[i].x_pos + 55, trees[i].height + 25, 45,45);
        ellipse(trees[i].x_pos + 18, trees[i].height  + 40, 63,45);
        ellipse(trees[i].x_pos - 6, trees[i].height - 6, 110,100);
    }
}

// Function to draw houses objects.
function drawHouses()
{
    for(var i = 0; i<houseXs.length; i++)
    {
        fill(178,34,34);
        rect(houseXs[i] -80, floorPos_y -180, 180,180,15,15,5,5); 

        //Roof
        fill(255,215,0);
        triangle(houseXs[i] -90, floorPos_y -168, houseXs[i] +110, floorPos_y -170, houseXs[i], floorPos_y  -310);

        //windows 
        fill(222,184,135); 
        rect(houseXs[i] -70,floorPos_y -160,50,50);
        rect(houseXs[i] +35,floorPos_y -160,50,50);
       
        //left window curtains
        fill(255);
        arc(houseXs[i] -70, floorPos_y - 160,40,100, 0, HALF_PI); //left side curtain
        arc(houseXs[i] -20, floorPos_y - 160,40,100, HALF_PI,PI); //right side curtain
        
        //right window curtains
        arc(houseXs[i] +36,floorPos_y - 160,35,100,0, HALF_PI);
        arc(houseXs[i] +85, floorPos_y - 160,40,100, HALF_PI,PI);

        //door
        fill(205,133,63); 
        rect(houseXs[i] - 18,floorPos_y-90,60,90);

        //door handle
        fill(0); 
        ellipse(houseXs[i] +30,floorPos_y -50,10,10);
    }
}



// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
function drawCanyon(t_canyon)
{
    fill(50,50,0);
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}


// Function to check character is over a canyon.
function checkCanyon(t_canyon)
{
    //falling in canyon
    if(realPos > t_canyon.x_pos && realPos < t_canyon.x_pos + t_canyon.width)
    {
        if(gameChar_y >= floorPos_y)
        {
            isFalling = true;
        }  
    }
    if(isFalling)
    {
        gameChar_y = gameChar_y + 5;
    } 
}



// ----------------------------------
// Pick-up render and check functions
// ----------------------------------

// Function to draw pick-up objects.
function drawGun(t_gun)
{
    if (t_gun.isFound == false)
        {
            fill(0);
            rect(t_gun.x_pos - 40, 422,45,17) //handle
            rect(t_gun.x_pos - 40,438,17,20);

            ellipse(t_gun.x_pos + 8,428,12,13); //bullet part
            ellipse(t_gun.x_pos + 8,433.5,12,13);

            rect(t_gun.x_pos - 15 ,432,6,17);  //trigger button
            rect(t_gun.x_pos - 23,444,13,6);
        }
}

//Function to check character has picked up an item.
function checkGun(t_gun)
{
    if(realPos > t_gun.x_pos - t_gun.size && realPos < t_gun.x_pos + t_gun.size)
    {
        if(!t_gun.isFound)
        {
            t_gun.isFound = true;
            score += 1;
            console.log(score);
        }
    }
}

// Function to check when player has won(picked all the guns).
function checkPlayerWon()
{
    if(score == guns.length)
    {
        isWon = true;
    }
}

//Checks player has died when falls into canyon so lives are decremented and therefore game lost after zero lives are left.
function checkPlayerDied()
{
    if(gameChar_y > height)
    {
        if(lives > 0)
        {
            lives -= 1;
            startGame();
        }
        else
        {
            isLost = true; 
        }
    }
    
}

// Function to check when player has won(picked all the guns).
function checkPlayerWon()
{
    if(score == guns.length)
    {
        isWon = true;
    }
}


function checkPlayerDie()
{
    if (gameChar_y > height)
    {
        playerDied();
    }
}

// Player dies when colliding with the enemy.
function playerDied()
{
    if(lives > 0)
    {
        lives -= 1;
        startGame();  // Re-start game.
    }
    else
    {
        // Player lost, therefore game over.
        isLost = true;
    }
    
        
}

////Links to next level in the game.
function nextLevel()
{
    // DO NOT CHANGE THIS FUNCTION!
    console.log('next level');
}
