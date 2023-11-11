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
let currentScreen = GAME;

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
let loadingLink = 1;

let gameMusic, menuMusic;

function preload() {
    screenMenu.preload();
    screenLoading.preload();
    screenPressAnyKey.preload();
    screenCredits.preload();
    createSprite.preload();
    gameUI.preload();
    spriteLogic.preload();
    
    //Sound
    menuMusic = loadSound("assets/songs/main_Game.mp3");
    gameMusic = loadSound("assets/songs/game.mp3");
    buildSound = loadSound("assets/sound/build_sound.mp3");
    buttonClickFx = loadSound("assets/sound/button_pressed.wav");
    game_soundFx = loadSound("assets/sound/oceansfx.mp3");
    error_soundFx = loadSound("assets/sound/error.wav");

    //Video
    creditVideo = createVideo("assets/video/credit.mp4");
}

function setup() {
    new Canvas(W, H);
    screenMenu.setup();
    screenLoading.setup();
    screenPressAnyKey.setup();
    screenCredits.setup();
    creditVideo.hide();
    setVolume();
}

function draw() {
    background('lightblue');

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
            // screenCredits.draw();
            image(creditVideo, 0, 0, W, H);
            break;
    }
}

function keyPressed() { // change from press any key to menu
    if (currentScreen === PRESS_ANY_KEY) {
        if (loadingLink == 1) {
            currentScreen = MENU;
            screenMenu.enableMenuButtons();
            menuMusic.play();
            menuMusic.loop();
            gameMusic.stop();
        } else if (loadingLink == 2) {
            currentScreen = GAME;
            menuMusic.stop();
            gameMusic.play();
            gameMusic.loop();
            game_soundFx.play();
        }
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

function setVolume() {
    creditVideo.volume(screenMenu.musicSlider.value());
    gameMusic.setVolume(screenMenu.musicSlider.value());
    menuMusic.setVolume(screenMenu.musicSlider.value());
    buildSound.setVolume(screenMenu.soundSlider.value());
    buttonClickFx.setVolume(screenMenu.soundSlider.value());
    game_soundFx.setVolume(screenMenu.soundSlider.value());
    error_soundFx.setVolume(screenMenu.soundSlider.value());
}