let ship, resourceNodes, base;
let destination = {
    current: 3,
    node0: 0,
    node1: 1,
    node2: 2
};
let resourceCollected = false;
let returnToBase = false;
let resourcePoints = [5, 5, 5];
let resourcePool = 0;
let activate = false;
let goCollect = false;

function preload() {
    baseImg = loadImage("assets/img/battleship.png");
    shipImg = loadImage("assets/img/cruiser.png");
}

function setup() {
    new Canvas(800, 800);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    gameSprites();
}

function draw() {
    background(125);
    //resourceCollection();
    resourceCollection0();
    resourceCollection1();
    resourceCollection2();

    console.log(identifyNode(), activate);

    nodeDepletion();
}

function gameSprites() {
    base = new Sprite(width / 2, height / 2);
    base.img = baseImg;
    base.scale = 2;
    base.w = 100;
    base.h = 60;
    base.debug = true;
    base.collider = 's';

    resourceNodes = new Group();
    resourceNodes.color = 'green';
    resourceNodes.y = 30;
    resourceNodes.collider = 's';
    while (resourceNodes.length < 3) {
        let resourceNode = new resourceNodes.Sprite();
        resourceNode.x = resourceNodes.length * 100;
    }

    ship = new Group();
    ship.img = shipImg;
    ship.w = 50;
    ship.h = 30;
    ship.speed = 4;
    ship.debug = true;
    ship.rotationLock = true;
    ship.overlaps(resourceNodes);
    //ship.overlaps(base);

    resourceDisplay = new Sprite(750, 25);
    resourceDisplay.draw = function () {
        noStroke();
        fill(0, 0, 0);
        rect(0, 0, 100, 50);

        fill('white');
        textSize(25);
        text(resourcePool, 0, 0);
    }
}

function identifyNode() {
    for (let i = 0; i < resourceNodes.length; i++) {
        if (resourceNodes[i].mouse.pressing()) {
            return i;
        }
        if (resourceNodes[i].mouse.presses()) {
            activate = true;
        }
    }
}

function resourceCollection() {
    let returnNode = identifyNode();
    if (activate === true && resourceCollected == false && resourcePoints[returnNode] > 0) {
        new ship.Sprite(width / 2, height / 2 - 50);
        destination.current = nodeID;
        ship.life = 3000;
        goCollect = true;
        activate = false;
        nodeID = returnNode;
        console.log(nodeID);
    }

    if (goCollect == true && destination.current == nodeID) {
        ship.moveTo(resourceNodes[nodeID]);
    }
    if (goCollect == true && ship.overlaps(resourceNodes[nodeID])) {
        resourceCollected = true;
        returnToBase = true;
        resourcePoints[nodeID] -= 1;
    }

    if (returnToBase == true) {
        ship.moveTo(base);
    }
    if (ship.collides(base) && resourceCollected == true) {
        resourceCollected = false;
        returnToBase = false;
        ship.life = 1;
        resourcePool = resourcePool + 1;
    }
}

function resourceCollection0() {
    if (resourceNodes[0].mouse.presses() && resourceCollected == false && resourcePoints[0] > 0) {
        new ship.Sprite(width / 2, height / 2 - 50);
        destination.current = 0;
        ship.life = 3000;
    }

    if (destination.current == 0) {
        ship.moveTo(resourceNodes[0]);
    }
    if (ship.overlaps(resourceNodes[0])) {
        resourceCollected = true;
        returnToBase = true;
        resourcePoints[0] -= 1;
    }

    if (returnToBase == true) {
        ship.moveTo(base);
    }
    if (ship.collides(base) && resourceCollected == true) {
        resourceCollected = false;
        returnToBase = false;
        ship.life = 1;
        resourcePool = resourcePool + 1;
    }
}

function resourceCollection1() {
    if (resourceNodes[1].mouse.presses() && resourceCollected == false && resourcePoints[1] > 0) {
        new ship.Sprite(width / 2, height / 2 - 50);
        destination.current = 1;
        ship.life = 3000;
    }

    if (destination.current == 1) {
        ship.moveTo(resourceNodes[1]);
    }
    if (ship.overlaps(resourceNodes[1])) {
        resourceCollected = true;
        returnToBase = true;
        resourcePoints[1] -= 1;
    }

    if (returnToBase == true) {
        ship.moveTo(base);
    }
    if (ship.collides(base) && resourceCollected == true) {
        resourceCollected = false;
        returnToBase = false;
        ship.life = 1;
        resourcePool = resourcePool + 1;
    }
}

function resourceCollection2() {
    if (resourceNodes[2].mouse.presses() && resourceCollected == false && resourcePoints[2] > 0) {
        new ship.Sprite(width / 2, height / 2 - 50);
        destination.current = 2;
        ship.life = 3000;
    }

    if (destination.current == 2) {
        ship.moveTo(resourceNodes[2]);
    }
    if (ship.overlaps(resourceNodes[2])) {
        resourceCollected = true;
        returnToBase = true;
        resourcePoints[2] -= 1;
    }

    if (returnToBase == true) {
        ship.moveTo(base);
    }
    if (ship.collides(base) && resourceCollected == true) {
        resourceCollected = false;
        returnToBase = false;
        ship.life = 1;
        resourcePool = resourcePool + 1;
    }
}

function nodeDepletion() {
    if (resourcePoints[0] == 0 || resourcePoints[0] < 0) {
        resourceNodes[0].color = 'red';
        resourcePoints[0] = 0;
    } else {
        fill('black');
        textSize(25);
        text(resourcePoints[0], 100, 100);
    }

    if (resourcePoints[1] == 0 || resourcePoints[1] < 0) {
        resourceNodes[1].color = 'red';
        resourcePoints[1] = 0;
    } else {
        fill('black');
        textSize(25);
        text(resourcePoints[1], 200, 100);
    }

    if (resourcePoints[2] == 0 || resourcePoints[2] < 0) {
        resourceNodes[2].color = 'red';
        resourcePoints[2] = 0;
    } else {
        fill('black');
        textSize(25);
        text(resourcePoints[2], 300, 100);
    }
}