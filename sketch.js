var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var restart, restartImage
var gameover,gameoverImage 
var score;




function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
 
  //load images for ground and cloud
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  // load images for obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  // load image for restart and gameover
  restartImage= loadImage("restart.png");
  gameoverImage= loadImage("gameOver.png")
}

function setup() {
  createCanvas(600, 200);
  //create trex and ground,add animation and image for both
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //create InvisibleGround
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  //create groups for obstacles and clouds
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  score = 0;
  // create restart sprite,add image and scale it
  restart= createSprite(300,100)
  restart.addImage("restart",restartImage);
  restart.scale= 0.5
 //create gameover sprite and add image 
  gameover= createSprite(300,50)
  gameover.addImage("gameover",gameoverImage)
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  // give gameStates
  
  if(gameState === PLAY){
       
    ground.velocityX = -4;
   
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
  
    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        trex.addImage("trex_1",trex_collided)
        restart.visible= true
        gameover.visible= true
        
    }
  }
   else if (gameState === END) {
       
      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
   //make trex collide with invisibleGround
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}
// write function spawnObstacles
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}
 //write function  spawnClouds
function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

