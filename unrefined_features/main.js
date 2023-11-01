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
    new Canvas(W,H);
    createSprite.setup();
    spriteLogic.setup();
}

function draw() {
    createSprite.draw();
    spriteLogic.draw(createSprite);
    background('lightblue');

    mouseXY();
}

function mouseXY() {
    // mouse x,y display
    fill("white");
    textSize(20);
    text("x" + mouseX + "," + "y" + mouseY, mouseX, mouseY);
}