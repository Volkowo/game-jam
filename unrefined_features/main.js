const W = 1200;
const H = 700;

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