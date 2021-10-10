var spaceShip , spaceshipImage , gameOver , gameOverImg;
var spaceImage ;
var bulletImg, enemyImg , enemy2Img;
var shootSound;
var bg , explosion , Gameover ;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
function preload(){
    spaceImage= loadImage("images/space.jpg");
    spaceshipImage = loadImage("images/spaceship.png");
   // move1 = loadAnimation("images/move1.png");
    bulletImg = loadImage("images/fireball.png");
    shootSound = loadSound("shoot.wav");
    enemyImg = loadImage("images/enemy.png");
    enemy2Img = loadImage("images/enemy 2.png");
    gameOverImg = loadImage("images/gameover.png");
    explosion = loadSound("explosion.wav");
    Gameover = loadSound("Gameover.wav");
   
}
function setup(){
    createCanvas(windowWidth,windowHeight);
    bg = createSprite(width/2,200);
    bg.shapeColor = "white";
    bg.addImage(spaceImage);
    bg.velocityY = 5;
    bg.scale = 4;

    spaceShip = createSprite(650,550,50,50);
    spaceShip.addImage(spaceshipImage);
    spaceShip.scale = 0.4;

    gameOver = createSprite(650,350,20,20);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;

   
    enemyGroup = new Group();
    bulletGroup = new Group();
    
}
function draw(){
    if(keyDown("r")){
        Restart();
    }
   
    if(gameState === PLAY){   brn
    
   // text("Press Left and Right arrow to control the spaceship And Press Space to shoot",100,100);
    if(bg.y > height){
        bg.y = bg.height/2;
    }
   // spaceShip.x = mouseX;
    if(keyDown("space")){
        shootSound.play();

        createBullet();
        
    }
    if(bulletGroup.isTouching(enemyGroup)){
        bulletGroup.destroyEach();
        enemyGroup.destroyEach();
        score = score+100;
        explosion.play();
    }
    if(score > 500){
       enemyGroup.setVelocityYEach(6);
       bg.velocityY = 6;
    }
    if(score > 1000){
        enemyGroup.setVelocityYEach(7);
        bg.velocityY = 7;
     }
     if(score > 1500){
        enemyGroup.setVelocityYEach(8);
        bg.velocityY = 8;
     }
     if(score > 2000){
        enemyGroup.setVelocityYEach(9);
        bg.velocityY = 9;
     }
     if(score > 2500){
        enemyGroup.setVelocityYEach(10);
        bg.velocityY = 10;
     }

    if(spaceShip.isTouching(enemyGroup)){
       gameState = END;
       Gameover.play();
    }

    if(keyDown(LEFT_ARROW)){
        if(spaceShip.x > 70){
        spaceShip.x = spaceShip.x-20;
        }
    }
    if(keyDown(RIGHT_ARROW)){
        if(spaceShip.x < 1300){
        spaceShip.x = spaceShip.x+20;
        }
    }
    gameOver.visible = false;
    };
    createEnemy();
    if(gameState === END){
        bg.velocityY = 0;
        spaceShip.visible = false;
        bulletGroup.setVelocityYEach(0);
        enemyGroup.setVelocityYEach(0);
        enemyGroup.destroyEach();
        gameOver.visible = true;
        bulletGroup.destroyEach();
        
        
    }
    drawSprites();
    textSize(45);
    fill("white");
    text("Score :"+ score,1100,50);
}
function createBullet(){
    var bullet = createSprite(650,450,20,20);
    bullet.addImage(bulletImg);
    bullet.x = spaceShip.x;
    bullet.velocityY = -10;
    bullet.lifetime = 150;
    bullet.scale = 0.1;
    bulletGroup.add(bullet);
    return bullet;

}
function createEnemy(){
    if(World.frameCount % 200 == 0 ){
        var enemy = createSprite(180,-100,20,20);
     
      enemy.scale = 0.3;
      //obstacle.lifetime = 500;
      enemy.velocityY = 5;
      enemyGroup.add(enemy);
        
       o = Math.round(random(1,2));
       if(o == 1){
         enemy.addImage(enemy2Img);
       } else{
         enemy.addImage(enemyImg);
       } 
       
        enemy.x = Math.round(random(50,1300));
      }
       
      
}
function Restart(){
    gameState = PLAY;
    score = 0;
    gameOver.visible = false;
    spaceShip.visible = true;
    bg.velocityY = 5;

}

