var monkey , monkey_running,bg,bgImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup,obstacleGroup;
var score;
var ground;
var gameState = "play";
var banana,bananaImage;
var obstacle,obstacleImage;


function preload(){ 
monkey_running=loadAnimation("r1.png","r2.png","r3.png",
"r4.png","r5.png","r6.png","r7.png","r8.png","r9.png")
 
obstacleImage = loadImage("obstacle.png");  
bananaImage = loadImage("banana.png");
obstaceImage = loadImage("obstacle.png");
bgImage = loadImage("jungle.jpg"); 
bananaImage = loadImage("banana.png");
}

function setup() {
createCanvas(400,400);
  
bg = createSprite(200,215,400,400);
bg.addImage(bgImage);
bg.depth = 0.1;
bg.scale = 0.5;

  
monkey = createSprite(50,350,20,20); 
monkey.addAnimation("r1.png","r2.png","r3.png",
"r4.png","r5.png","r6.png","r7.png","r8.png","r9.png");
monkey.scale = 0.14;

ground = createSprite(200,390,900,10);
ground.visible = false;
ground.velocityX = -4;
ground.x = ground.width/2;
  
obstacleGroup = createGroup();
foodGroup = createGroup();

score = 0;
}

function draw() {
background("black")
stroke("white");
textSize(20);
fill("white");

text("Score:"+score,15,20);
if(ground.x<0){
ground.x = ground.width/2;  
}
if(monkey.x<0){
monkey.x = 50;  
}
if(monkey.collide(obstacleGroup)){
  gameState = "end"
}
  
if(gameState === "play"){
spawnBananas();
spawnObstacles();
if(keyDown("space") && monkey.y >= 325){
monkey.velocityY = -15;  
}
if(foodGroup.isTouching(monkey)){
score = score+1;
  monkey.scale = monkey.scale+0.001
}
}
else if(gameState ==="end"){
monkey.velocityX = 0;
obstacle.velocityX = 0;
banana.velocityX = 0;
survivalTime = createSprite(307,10,163,25)
survivalTime.shapeColor = 'black'
var monkeySize = monkey.scale;
stroke("white");
textSize(15);
fill("white");
text('Monkey Size = '+ monkeySize,85 ,20)
  monkey.visible = false;
}
  
monkey.velocityY = monkey.velocityY + 0.8;
  
monkey.collide(ground);    
drawSprites();  
}
function spawnObstacles(){
if(frameCount%100===0){
obstacle = createSprite(400,350,10,10);  
obstacle.velocityX = -8;
obstacle.addImage(obstacleImage);
obstacle.scale = 0.2; 
obstacle.debug = false;
obstacle.setCollider("rectangle",0,0,300,300);
obstacleGroup.add(obstacle);

}  
}

function spawnBananas(){
if(frameCount%61===0){
banana = createSprite(400,300,10,10);  
banana.y = Math.round(random(200,300));
banana.velocityX = -8;
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.debug = false;
banana.setCollider("rectangle",0,0,400,400);
foodGroup.add(banana);
}
}
function reset(){
score = 0;
}

