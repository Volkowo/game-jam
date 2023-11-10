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
// let playButton;
// let quitButton;
// let creditsButton;
// let backToMenuButton;

// classes
let screenLoading = new Loading();
let screenPressAnyKey = new PressAnyKey();
let screenMenu = new Menu();
let screenCredits = new Credits();
let createSprite = new Factory();
let gameUI = new UI();
let spriteLogic = new Logic();

// other variables
let isGameActive = false;
let movingAni = 500;
let startMenuAni = false;
let openSetting = false;
let activateSetting = false;

function preload() {
    screenMenu.preload();
    screenLoading.preload();
    screenPressAnyKey.preload();
    screenCredits.preload();
    createSprite.preload();
    gameUI.preload();
    spriteLogic.preload();
}

function setup() {
    new Canvas(W, H);
    screenMenu.setup();
    screenLoading.setup();
    screenPressAnyKey.setup();
    screenCredits.setup();
}

function draw() {
    background('lightblue');

    // text(spriteLogic.currentX, 500, 100)
    // text(spriteLogic.currentY, 600, 100)

    // switches screen states
    switch (currentScreen) {
        case LOADING:
            screenLoading.draw();
            break;
        case PRESS_ANY_KEY:
            screenPressAnyKey.draw();
            break;
        case MENU:
            screenMenu.draw();
            break;
        case GAME:
            drawGameScreen();
            break;
        case CREDITS:
            screenCredits.draw();
            break;
    }
}

function keyPressed() { // change from press any key to menu
    if (currentScreen === PRESS_ANY_KEY) {
        currentScreen = MENU;
        screenMenu.enableMenuButtons();
    }
}

function drawGameScreen() { // game screen code
    if (isGameActive === false) {
        createSprite.setup();
        gameUI.setup(createSprite);
        spriteLogic.setup(createSprite);
        isGameActive = true;
    }

    // class draw code here
    createSprite.draw();

    //connecting the gameUI to createSprite
    gameUI.factory = createSprite;
    gameUI.logic = spriteLogic;


    //to make sure the logic is using the same groups and sprites from gameUI
    spriteLogic.resource = gameUI.resource;
    // spriteLogic.selection = gameUI.selection;
    spriteLogic.ship = gameUI.ship;
    spriteLogic.base = gameUI.base;
    // spriteLogic.enemy = gameUI.enemy;

    spriteLogic.draw(createSprite);

    gameUI.draw(createSprite);
}