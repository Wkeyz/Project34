//Create variables here
var dog,happyDog,database,foodS,foodStock;
var image1,image2;
var count=20;
function preload()
{
  //load images here
  image1=loadImage("images/dogImg.png");
  image2=loadImage("images/dogImg1.png");
  
}

function setup() {

  createCanvas(500, 500);
  database = firebase.database();
  dog=createSprite(200,200,50,100);
  dog.addImage(image1);
  dog.scale=0.25;
  foodStock=database.ref('food');
  foodStock.on("value",readStock)
}


function draw() {  
background(46,129,87);
text("Food Left-"+count,270,250);
if(keyWentDown(UP_ARROW)&&count>0){
  writeStock(foodS);
  dog.addImage(image2);
  count--;
}
else if(count==0&&keyWentDown(UP_ARROW)){
  text("RAN OUT OF FOOD!");
}


textSize(25);


text("Note: Press Up Arrow To Feed Draco Milk",10,20);


  drawSprites();
  //add styles here

}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })

}

function readStock(data){
  foodS=data.val();
}
