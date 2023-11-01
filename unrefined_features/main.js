const W = 1200;
const H = 700;

let spriteFactory = new Factory();
let spriteLogic = new Logic();

function preload() {
    spriteFactory.preload();
    spriteLogic.preload();
}

function setup() {
    new Canvas(W,H);
    spriteFactory.setup();
    spriteLogic.setup();
}

function draw() {
    spriteFactory.draw();
    spriteLogic.draw(spriteFactory);
    background('lightblue');

    mouseXY();
}

function mouseXY() {
    // mouse x,y display
    fill("white");
    textSize(20);
    text("x" + mouseX + "," + "y" + mouseY, mouseX, mouseY);
}