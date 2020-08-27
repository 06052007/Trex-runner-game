//initiate Game STATEs
var jump,die,checkpoint
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstaclesgroup, CloudsGroup
var obstacle1,obstacle2,obstacle3, obstacle4,obstacle5,obstacle6 
var cloudimage
var count
var gameOver,restart,gameoverimage,restartimage
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverimage =  loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(600, 200);
  
  
  count = 0
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  trex.setCollider("circle",0,0,25)
  
  invisibleGround = createSprite(200,185,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup = createGroup()
  obstaclesgroup  = createGroup()
  //place gameOver and restart icon on the screen
gameOver = createSprite(300,100);
restart = createSprite(300,140);
gameOver.addImage(gameoverimage);
gameOver.scale = 0.5;
restart.addImage(restartimage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;

//set text
textSize(18);
textFont("Georgia");
textStyle(BOLD);
}

function draw() {
  background(255);
  text("score " + count,500,50)  
  if(gameState === PLAY){
    
  spawnClouds()
  
  spawnObstacles()
  
  if(count>0 && count%100 === 0){
    checkpoint.play()
  }
    
  
  
  
  if(keyDown("space")&& trex.y>160) {
    trex.velocityY = -10;
    jump.play() 
  }
  
  count = count+ Math.round(getFrameRate()/60)
    
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(obstaclesgroup.isTouching(trex)){
      
      gameState = END;
      die.play()
    }
  }
  else{
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    

    trex.changeAnimation("collided",trex_collided);
    
   
    obstaclesgroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
  }
  
   if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  drawSprites();
}
function reset(){
  gameState = PLAY;
  trex.changeAnimation("running", trex_running);
  gameOver.visible = false;
  restart.visible = false;
  obstaclesgroup.destroyEach();
  CloudsGroup.destroyEach();
  count = 0;
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + count/100);
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
        break;
      case 2:obstacle.addImage(obstacle2);
        break;
      case 3:obstacle.addImage(obstacle3);
        break;
      case 4:obstacle.addImage(obstacle4);
        break;
      case 5:obstacle.addImage(obstacle5);
        break;
      case 6:obstacle.addImage(obstacle6);
        break;
        default: break;
    }
        
   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 150;
    //add each obstacle to the group
    obstaclesgroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
}