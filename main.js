var gameCycle;
var padX = 250;
var padY = 465;
var pad;
var ball;
var ballX;
var ballY;
var ballStartX = 250;
var ballStartY = 350;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballDistanceX = 250;
var ballDistanceY = 350;
var ballRadius = 7;
var screenWidth = 500;
var screenHeight = 500;
var blocksArray = [];

function populate() {
    createBlocks();
    createPad();
    createBall();
    
    init();
}

function init() {
    document.addEventListener("click", startGame);
}

function startGame() {
    document.removeEventListener("click", startGame);
    document.addEventListener("mousemove", mouseMove);
    pad = document.getElementsByClassName("pad")[0];
    ball = document.getElementsByClassName("ball")[0];
    gameCycle = setInterval(gameLoop, 16);
};

function mouseMove(e) {
    padX = e.clientX;
}

function gameLoop() {
    moveBall();
    movePad();
}

function moveBall() {
    //var x = ballStartX + Math.cos(ballDirectionX) * ballDistanceX;
    //var y = ballStartY + Math.sin(ballDirectionY) * ballDistanceY;
    
    ballDistanceX += ballSpeedX;
    ballDistanceY += ballSpeedY;

    ballX = ballDistanceX;
    ballY = ballDistanceY;

    hitTestPad();
    hitTestBlocks();

    if (ballY > screenHeight - ballRadius || ballY < ballRadius) {
         ballSpeedY *= -1;
    }

    if (ballX > screenWidth - ballRadius || ballX < ballRadius) {
        ballSpeedX *= -1;
    }

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function hitTestPad() {
    var leftPoint = padX - 100;
    var rightPoint = padX + 100;

    if (ballY < padY + 10 && ballY + ballRadius > padY && ballX > leftPoint && ballX < rightPoint) {
        ballSpeedY *= -1;
    }
}

function hitTestBlocks() {
    var element;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            element = blocksArray[i][j];
            if (!element) continue;

            if (ballY + ballRadius > element.y && ballY - ballRadius < element.y + element.height && ballX > element.x && ballX < element.x + element.width) {
                ballSpeedY *= -1;
                element.element.remove();
                blocksArray[i][j] = undefined;
            }
        }
    }
}

function movePad() {
    if (padX < 100) {
        padX = 100;
    }
    if (padX > 400) {
        padX = 400;
    }
    pad.style.left = padX + "px";
    
}

function createBlocks() {
    var element;
    var xPos = 25;
    var yPos = 25;
    var content = document.getElementsByClassName("content")[0];
    for (var i = 0; i < 10; i++) {
        xPos = 25;
        blocksArray[i] = [];

        for (var j = 0; j < 10; j++) {
            element = document.createElement("div");
            element.className = "block-element";
            element.style.left = xPos + "px";
            element.id = "bock" + i + j;
            element.style.top = yPos + "px";
            content.appendChild(element);
            blocksArray[i][j] = {
                element: element,
                x: xPos, 
                y: yPos,
                width: 40,
                height: 5
            };
            xPos += 45;
        }
        yPos += 15;
    }
}

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
}

window.onload = populate;