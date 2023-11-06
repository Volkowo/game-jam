class Factory {
    constructor() {
        
    }
    preload() {
        this.shipOne = loadImage("assets/img/ship_img/schooner_player.png");
        this.shipTwo = loadImage("assets/img/ship_img/galleon_player.png");
        this.shipThree = loadImage("assets/img/ship_img/frigate_player.png");
        this.shipFour = loadImage("assets/img/ship_img/manowar_player.png");
    }

    setup() {

    }

    draw() {

    }

    createBase(x, y) {
        let tempBase = new Sprite(x, y);
        tempBase.color = 'RED';
        tempBase.w = 80;
        tempBase.h = 80;
        tempBase.baseBag = 500;
        tempBase.collider = 'k'
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
        tempResource.resourcePool = Math.floor(random(100, 150));
        tempResource.resourceCap = 500;

        tempResource.selected = false;
        tempResource.canBeMoved = false;
        return tempResource;
    }

    createShip(x, y, type) {
        let tempShip = new Sprite(x, y);
        tempShip.type = type;
        tempShip.collectTick = 60;
        tempShip.collectTimer = 3;
        tempShip.drag = 0.5;
        tempShip.bounciness = 0;
        tempShip.direction = 90;
        tempShip.rotationLock = true;
        tempShip.layer = 2;
        return tempShip;
    }
    
    createShipOne(x, y) {
        let tempShip = this.createShip(x, y, "One");
        tempShip.color = 'YELLOW';
        tempShip.w = 20;
        tempShip.h = 35;
        tempShip.scale = 0.7;
        tempShip.img = this.shipOne;
        
        // STATS
        tempShip.hitPoint = 20;
        tempShip.attack = 5;
        tempShip.movementSpeed = 5;
        tempShip.collectRate = 2;
        tempShip.cost = 5;
        tempShip.buildTime = 10;
        tempShip.shipBag = 0;
        tempShip.shootingTimer = 50;
        tempShip.rotation = tempShip.direction;
        
        // BOOLEAN-RELATED
        tempShip.selected = false;
        tempShip.canBeMoved = true;
        tempShip.goCollect = false;
        tempShip.goldCollected = false;
        tempShip.singleShot = true;
        tempShip.burstFire = false;
        tempShip.shoot = false;
        return tempShip;
    }

    createShipTwo(x, y) {
        let tempShip = this.createShip(x, y, "Two");
        tempShip.color = 'ORANGE';
        tempShip.w = 33;
        tempShip.h = 63;
        tempShip.scale = 0.7;
        tempShip.img = this.shipTwo;
        
        // STATS
        tempShip.hitPoint = 30;
        tempShip.attack = 8;
        tempShip.movementSpeed = 4;
        tempShip.collectRate = 5;
        tempShip.cost = 10;
        tempShip.buildTime = 10;
        tempShip.shipBag = 0;
        tempShip.shootingTimer = 50;
        
        // BOOLEAN-RELATED
        tempShip.selected = false;
        tempShip.canBeMoved = true;
        tempShip.goCollect = false;
        tempShip.goldCollected = false;
        tempShip.singleShot = true;
        tempShip.burstFire = false;
        tempShip.shoot = false;
        return tempShip;
    }
    
    createShipThree(x, y) {
        let tempShip = this.createShip(x, y, "Three");
        tempShip.color = 'BROWN';
        tempShip.w = 43;
        tempShip.h = 63;
        tempShip.scale = 0.7;
        tempShip.img = this.shipThree;
        
        // STATS
        tempShip.hitPoint = 50;
        tempShip.attack = 5;
        tempShip.movementSpeed = 3;
        tempShip.collectRate = 5;
        tempShip.cost = 25;
        tempShip.buildTime = 10;
        tempShip.shipBag = 0;
        tempShip.shootingTimer = 50;
        
        // BOOLEAN-RELATED
        tempShip.selected = false;
        tempShip.canBeMoved = true;
        tempShip.goCollect = false;
        tempShip.goldCollected = false;
        tempShip.singleShot = true;
        tempShip.burstFire = false;
        tempShip.shoot = false;
        return tempShip;
    }
    
    createShipFour(x, y) {
        let tempShip = this.createShip(x, y, "Four");
        tempShip.color = 'BROWN';
        tempShip.w = 60;
        tempShip.h = 85;
        tempShip.scale = 0.7;
        tempShip.img = this.shipFour;

        // STATS
        tempShip.hitPoint = 80;
        tempShip.attack = 10;
        tempShip.movementSpeed = 2;
        tempShip.collectRate = 1;
        tempShip.cost = 35;
        tempShip.buildTime = 30;
        tempShip.shipBag = 0;
        tempShip.shootingTimer = 50;

        // BOOLEAN-RELATED
        tempShip.selected = false;
        tempShip.canBeMoved = true;
        tempShip.goCollect = false;
        tempShip.goldCollected = false;
        tempShip.singleShot = true;
        tempShip.burstFire = false;
        tempShip.shoot = true;
        return tempShip;
    }

    createSelection(x, y, d){
        let selection = new Sprite(x, y);
        selection.d = d;
        selection.visible = true;
        selection.collider = 'n'
        selection.color = ""
        selection.strokeWeight = 3;
        selection.stroke = "RED"
        selection.layer = 1;
        return selection;
    }   
}