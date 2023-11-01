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
let screenCredits = new Credits();
let spriteFactory = new Factory();
let spriteLogic = new Logic();

function preload() {
    spriteFactory.preload();
    spriteLogic.preload();
}

function setup() {
    new Canvas(W, H);
    spriteFactory.setup();
    spriteLogic.setup();
}

function draw() {
    spriteFactory.draw();
    spriteLogic.draw(spriteFactory);
    background('lightblue');

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

    mouseXY();
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