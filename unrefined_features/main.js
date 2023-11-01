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

// button variables
let playButton;
let quitButton;
let creditsButton;
let backToMenuButton;

// classes
let screenLoading = new Loading();
let screenPressAnyKey = new PressAnyKey();
let screenMenu = new Menu();
let screenCredits = new Credits();
let createSprite = new Factory();
let spriteLogic = new Logic();

// other variables
let isGameActive = false;

function preload() {
    createSprite.preload();
    spriteLogic.preload();
}

function setup() {
    new Canvas(W, H);
    buttonCreation();
}

function draw() {
    background('lightblue');

    // text(spriteLogic.currentX, 500, 100)
    // text(spriteLogic.currentY, 600, 100)
    
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
}

function keyPressed() { // change from press any key to menu
    if (currentScreen === PRESS_ANY_KEY) {
        currentScreen = MENU;
        playButton.show();
        creditsButton.show();
    }
}

function drawLoadingScreen() { // loading screen code
    screenLoading.draw();
}

function drawPressAnyKeyScreen() { // press any key to continue code
    screenPressAnyKey.draw();
}

function drawMenuScreen() { // menu screen code
    screenMenu.draw();
}

function establishGame() { // class set up code here
    createSprite.setup();
    spriteLogic.setup(createSprite);
}

function drawGameScreen() { // game screen code
    if (isGameActive === false) {
        establishGame();
        isGameActive = true;
    }
    
    // class draw code here
    createSprite.draw();
    spriteLogic.draw(createSprite);
}

function drawCreditsScreen() { // leaderboard screen code
    screenCredits.draw();
}

function buttonCreation() {
    playButton = createButton('Start Game');
    playButton.mouseClicked(playButtonClicked);
    playButton.size(100, 50);
    playButton.position(width / 2 - playButton.size().width / 2, height / 2);
    playButton.hide();

    quitButton = createButton('Quit Game');
    quitButton.mouseClicked(quitButtonClicked);
    quitButton.size(100, 50);
    quitButton.position(100, 100);
    quitButton.hide();

    creditsButton = createButton('Credits');
    creditsButton.mouseClicked(creditsButtonClicked);
    creditsButton.size(100, 50);
    creditsButton.position(width / 2 - creditsButton.size().width / 2, (height / 2) + 100);
    creditsButton.hide();

    backToMenuButton = createButton('Back to Main Menu');
    backToMenuButton.mouseClicked(backToMenuButtonClicked);
    backToMenuButton.size(100, 50);
    backToMenuButton.position(100, 100);
    backToMenuButton.hide();
}

function playButtonClicked() {
    currentScreen = GAME;
    playButton.hide();
    quitButton.show();
    creditsButton.hide();
}

function quitButtonClicked() { // reset game parameters here (needs to be added)
    currentScreen = MENU;
    playButton.show();
    quitButton.hide();
    creditsButton.show();

    isGameActive = false;
    allSprites.remove();
}

function creditsButtonClicked() {
    currentScreen = CREDITS;
    playButton.hide();
    creditsButton.hide();
    backToMenuButton.show();
}

function backToMenuButtonClicked() {
    currentScreen = MENU;
    playButton.show();
    creditsButton.show();
    backToMenuButton.hide();
}