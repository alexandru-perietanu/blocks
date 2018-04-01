var gameCycle;
var padX = 250;
var pad;
var ball;
var ballDirection;
var ballSpeed;

function populate() {
    createBlocks();
    createPad();
    createBall();
    startGame();
};

function startGame() {
    document.addEventListener("mousemove", mouseMove);
    pad = document.getElementsByClassName("pad")[0];
    ball = document.getElementsByClassName("ball")[0];
    gameCycle = setInterval(gameLoop, 16);
};

function mouseMove(e) {
    padX = e.clientX;
};

function gameLoop() {
    moveBall();
    movePad();
};

function moveBall() {

};

function movePad() {
    if (padX < 100) {
        padX = 100;
    }
    if (padX > 400) {
        padX = 400;
    }
    pad.style.left = padX + "px";
    
};

function createBlocks() {
    var element;
    var xPos = 25;
    var yPos = 25;
    var content = document.getElementsByClassName("content")[0];
    for (var i = 0; i < 10; i++) {
        xPos = 25;

        for (var j = 0; j < 10; j++) {
            element = document.createElement("div");
            element.className = "block-element";
            element.style.left = xPos + "px";
            xPos += 45;
            element.style.top = yPos + "px";
            content.appendChild(element);
        }
        yPos += 15;
    }
};

function createPad() {
    var content = document.getElementsByClassName("content")[0];
    var pad = document.createElement("div");
    pad.className = "pad";
    pad.style.top = (500 - 25 - 10) + "px";
    pad.style.left = (500 / 2) + "px";
    content.appendChild(pad);
}


function createBall() {
    var ball = document.createElement("div");
    ball.className = "ball";
    ball.style.left = 250 + "px";
    ball.style.top = 350 + "px";
    var content = document.getElementsByClassName("content")[0];
    content.appendChild(ball);
};

window.onload = populate;