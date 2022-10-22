var PLAY=1; var END=0; var gameState=PLAY;
var score;
var obstacle, obstacleImg;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var obstacle1Img,obstacle2Img,obstacle3Img,obstacle4Img,obstacle5Img;
var polvo, polvoImg, sea, seaImg;
var jumpSound, dieSound, ground,groundImg;
var gameOver, restart, gameOverImg, restartImg;

function preload(){
    seaImg=loadImage("sea.png");
  polvoImg=loadImage("sprite_0.png");
obstacle1Img=loadImage("sprite_1.png");
obstacle2Img=loadImage("sprite_2.png");
obstacle3Img=loadImage("sprite_3.png");
obstacle4Img=loadImage("sprite_4.png");
obstacle5Img=loadImage("sprite_5.png");
groundImg=loadImage("ground_1.png")

gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");

jumpSound=loadSound("jump.mp3");
dieSound=loadSound("die.mp3");
}

function setup() {
createCanvas(400,400);
 sea=createSprite(200,200);
sea.addImage(seaImg);

 polvo=createSprite(100,200,20,20);
 polvo.addImage(polvoImg);
// polvo.x=50;
 polvo.scale=0.3;



 ground=createSprite(300,380,1200,10);
 ground.addImage(groundImg);
 

 obstaclesGroup = new Group();
 
 polvo.debug=false;
polvo.setCollider("circle",0,0,20);
score=0

gameOver= createSprite(200,200,30,30);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;

restart=createSprite(200,207,20,20);
restart.addImage(restartImg);
restart.scale=0.5;
}

function draw() {
 background(0);
 text ("pontuação: "+score,20,30);
 edges=createEdgeSprites();
 polvo.collide(edges);

if (gameState === PLAY){
    gameOver.visible=false;
    restart.visible=false;
    //ground.velocityX=-(4+3*score/100);
    score=score+ Math.round(getFrameRate()/60);

    if (keyDown(UP_ARROW)){
        polvo.velocityY=-10;
        jumpSound.play();
    }

    if (keyDown(DOWN_ARROW)){
        polvo.velocityY=10;
        jumpSound.play();
    }

    if (keyDown(RIGHT_ARROW)){
        polvo.velocityX=10;
        jumpSound.play();
    }

    if (keyDown(LEFT_ARROW)){
        polvo.velocityX=-10;
        jumpSound.play();
    }



//polvo.velocityY=polvo.velocityY+0.5;
spawnObstacles();

if(obstaclesGroup.isTouching(polvo)){
dieSound.play();
gameState=END;
}

else if (gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    polvo.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)){
reset();
    }
}

drawSprites();
}

function reset(){
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    obstaclesGroup.destroyEach();
    score=0;
}

function spawnObstacles(){
    if(frameCount%60===0){
        obstacle=createSprite(300,350,10,40);
        // obstacle1.addImage(obstacle1Img);
        //  obstacle1.y=Math.round(random(30,100));
        //  obstacle2=createSprite(300,350,10,40);
        // obstacle2.addImage(obstacle2Img);
        // obstacle2.y=Math.round(random(120,200));
    


    // obstacle.addImage(obstacle2);
        // obstacle.y=Math.round(random(30,350));
        // obstacle.addImage(obstacle3);
        // obstacle.y=Math.round(random(30,350));
        // obstacle.addImage(obstacle4);
        // obstacle.y=Math.round(random(30,350));
        obstacle.velocityX=-(6+score/100);
        // obstacle2.velocityX=-(6+score/100);
    
        var rand=Math.round(random(30,350));
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
            default: break;
       }
        obstacle.scale=0.3;
        //obstacle2.scale=0.2;
        //obstacle2.lifetime=300;
        obstacle.lifetime=300;

       // obstaclesGroup.add(obstacle);
    }
}
}