class Factory {
    constructor() {

    }
    preload() {

    }
    // just a test. Remove it later
    setup() {

    }

    draw() {

    }

    createBase(x, y) {
        let tempBase = new Sprite(x, y);
        tempBase.color = 'RED';
        tempBase.w = 80;
        tempBase.h = 80;
        tempBase.baseBag = 100000;
        tempBase.selected = false;
        tempBase.canBeMoved = false;
        return tempBase;
    }

    createResource(x, y, size) {
        let tempResource = new Sprite(x, y);
        tempResource.size = size;
        tempResource.collider = 's'
        return tempResource;
    }

    createSmallResource(x, y) {
        let tempResource = this.createResource(x, y, "Small");
        tempResource.color = 'GREEN';
        tempResource.d = 50;
        tempResource.remainingAmount = 0;
        tempResource.bounciness = 0;
        tempResource.resourcePool = Math.floor(random(30, 50));

        tempResource.selected = false;
        tempResource.canBeMoved = false;
        return tempResource;
    }

    createBigResource(x, y) {
        let tempResource = this.createResource(x, y, "Big");
        tempResource.color = 'GREEN';
        tempResource.w = 50,
        tempResource.h = 50;
        tempResource.collider = 's';
        tempResource.remainingAmount = 0;
        tempResource.bounciness = 0;
        tempResource.resourcePool = Math.floor(random(30, 50));

        tempResource.selected = false;
        tempResource.canBeMoved = false;
        return tempResource;
    }

    // ADD -> collectTick, collectTimer

    // resourceCollected -> goldCollected (ship)
    // collectedAmount -> remainingAmount (resource)
    // goldTick -> collectTick (ship)
    // collectingTimer -> collectTimer (ship)
    // goCollect -> same (ship)
    // collectRate -> same (ship)
    // baseBag -> same
    // shipBag -> same

    createShip(x, y, type) {
        let tempShip = new Sprite(x, y);
        tempShip.type = type;
        tempShip.collectTick = 60;
        tempShip.collectTimer = 3;
        tempShip.drag = 1.2;
        tempShip.bounciness = 0;
        tempShip.rotationLock = true;
        return tempShip;
    }

    createShipOne(x, y) {
        let tempShip = this.createShip(x, y, "One");
        tempShip.color = 'YELLOW';
        tempShip.w = 20;
        tempShip.h = 20;
        tempShip.collectRate = 2;
        tempShip.cost = 5;
        tempShip.shipBag = 0;

        // BOOLEAN-RELATED
        tempShip.selected = false;
        tempShip.canBeMoved = true;
        tempShip.goCollect = false;
        tempShip.goldCollected = false;
        return tempShip;
    }

    createShipTwo(x, y) {
        let tempShip = this.createShip(x, y, "Two");
        tempShip.color = 'ORANGE';
        tempShip.w = 40;
        tempShip.h = 40;
        tempShip.collectRate = 5;
        tempShip.cost = 8;
        tempShip.shipBag = 0;

        // BOOLEAN-RELATED
        tempShip.selected = false;
        tempShip.canBeMoved = true;
        tempShip.goCollect = false;
        tempShip.goldCollected = false;
        return tempShip;
    }
}