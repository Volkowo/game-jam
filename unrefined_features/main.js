// screen size
const W = 1600;
const H = 900;

// for screen states
const LOADING = 0;
const PRESS_ANY_KEY = 1;
const MENU = 2;
const GAME = 3;
const CREDITS = 4;

// what screen is loaded upon launch/refresh
let currentScreen = LOADING;

// classes
let screenLoading = new Loading();
let screenPressAnyKey = new PressAnyKey();
let screenMenu = new Menu();
let screenGame = new Game();
let screenCredits = new Credits();
let createSprite = new Factory();
let spriteLogic = new Logic();

function preload() {
    createSprite.preload();
    spriteLogic.preload();
}

function setup() {
    new Canvas(W, H);
    createSprite.setup();
    spriteLogic.setup(createSprite);
}

function draw() {
    background('lightblue');
    createSprite.draw();
    spriteLogic.draw();
    mouseXY();

    text(spriteLogic.currentX, 500, 100)
    text(spriteLogic.currentY, 600, 100)
    
    // switches screen states
    switch (currentScreen) {
        case LOADING:
            drawLoadingScreen();
            break;
        case PRESS_ANY_KEY:
            drawPressAnyKeyScreen();
            break;
        case MENU:
            drawMenuScreen();
            break;
        case GAME:
            drawGameScreen();
            break;
        case CREDITS:
            drawCreditsScreen();
            break;
    }

    if (frameCount === 150) { // loading screen stops after 150 frames
        currentScreen = PRESS_ANY_KEY;
    }

    // console.log(currentScreen);
}

function keyPressed() { // change from press any key to menu
    if (currentScreen === PRESS_ANY_KEY) {
        currentScreen = MENU;
    }
}

function drawLoadingScreen() {
    // loading screen code
}

function drawPressAnyKeyScreen() {
    // press any key to continue code
}

function drawMenuScreen() {
    // menu screen code
}

function drawGameScreen() {
    // game screen code
}

function drawCreditsScreen() {
    // leaderboard screen code
}

function mouseXY() {
    // mouse x,y display
    fill("white");
    textSize(20);
    text("x" + mouseX + "," + "y" + mouseY, mouseX, mouseY);
}