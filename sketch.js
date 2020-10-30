var ball,database;
var dbPosition;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    var checkPosition = database.ref('ball/position');
    checkPosition.on("value",ballPosition,problem);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    database.ref('ball/position').set({
        'x': dbPosition.x + x,
        'y': dbPosition.y + y, 
    })
    
}
function ballPosition(data){
    dbPosition = data.val();

    ball.x = dbPosition.x;
    ball.y = dbPosition.y;
}
function problem(){
    console.log("Problem with database");
}