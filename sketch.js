var player;
var bgrp;
var lgrp;
var edges;
var points = 0;

async function bubble(){
  var s = round(random(0,3));
  if(s === 0){
    var ry = await random(0,600);
    var rx = -31;
  }else if(s === 1){
    var rx = await random(0,600);
    var ry = -31;
  }else if(s === 2){
    var ry = await random(0,600);
    var rx = 631;
  }else if(s > 2){
    var rx = await random(0,600);
    var ry = 631;
  }
  var b = createSprite(rx,ry,0.1,0.1);
  b.debug = true;
  b.setCollider("circle",0,0,20);
  if(b.x > 300){
    b.velocityX = 0 - random(1,20);
  }else{
    b.velocityX = random(1,20);
  }
  if(b.y > 300){
    b.velocityY = 0 - random(1,20);
  }else{
    b.velocityY = random(1,20);
  }
  bgrp.add(b);
  b.lifetime = 400;
}

function setup() {
  var img = createImage(40, 30);
  img.loadPixels();
  for (var i = 0; i < img.width; i++) {
    for (var j = 0; j < img.height; j++) {
      img.set(i, j, color(250-Math.pow(i,1.8), 90, 102));
    }
  }
  img.updatePixels();
  createCanvas(600,600);
  player = createSprite(300,300,30,40);
  player.addImage(img);
  player.rotateToDirection = true;
  player.maxSpeed = 15;
  edges = createEdgeSprites();
  bgrp = createGroup();
  lgrp = createGroup();
}

function draw() {
  background(0,0,0);
  textSize(200);
  textAlign(CENTER);
  text(points,300,375);
  move();
  if(frameCount%12 === 0){
    bubble();
  }
  drawSprites();
}

function move(){
  if(keyDown('A') || keyDown(LEFT_ARROW)){
    player.rotation -= 10;
  }else if(keyDown('D') || keyDown(RIGHT_ARROW)){
    player.rotation += 10;
  }
  if(keyDown('W') || keyDown(UP_ARROW)){
    player.setSpeed(0.1+player.getSpeed()*1.5);
  }else{
    player.setSpeed(player.getSpeed()/1.05);
  }
  player.collide(edges);
  if(player.isTouching(bgrp)){
    points -= 1;
  }
  if(lgrp.isTouching(bgrp)){
    points += 1;
  }
}

function laser(){
  var l = createSprite(player.x,player.y,20,5);
  l.rotation = player.rotation;
  l.rotateToDirection = true;
  l.setSpeed(20);
  lgrp.add(l);
  l.lifetime = 38;
}

function keyTyped(){
  if(key === ' '){
    if(lgrp.length <= 8){
      laser();
    }
  }
}