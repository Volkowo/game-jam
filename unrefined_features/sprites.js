class Factory {
    constructor() {
        
    }
    preload() {
        this.shipOne = loadImage("assets/img/ship_sprites/schooner_player.png");
        this.shipTwo = loadImage("assets/img/ship_sprites/galleon_player.png");
        this.shipThree = loadImage("assets/img/ship_sprites/frigate_player.png");
        this.shipFour = loadImage("assets/img/ship_sprites/manowar_player.png");

        this.enemyOne = loadImage("assets/img/ship_sprites/schooner_enemy.png");
        this.enemyTwo = loadImage("assets/img/ship_sprites/galleon_enemy.png");
        this.enemyThree = loadImage("assets/img/ship_sprites/frigate_enemy.png");
        this.enemyFour = loadImage("assets/img/ship_sprites/manowar_enemy.png");

        this.baseImg = loadImage("assets/img/islands/base.png");
        this.bigResourceImg = loadImage("assets/img/islands/big_resource.png");
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
        tempBase.hitPoint = 100;
        tempBase.collider = 'k'
        tempBase.selected = false;
        tempBase.canBeMoved = false;
        tempBase.fiction = 0;
        // tempBase.img = this.baseImg;
        // tempBase.scale = 0.08;
        tempBase.layer = 1;
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
        tempResource.resourcePool = Math.floor(random(60, 100));
        
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
        tempResource.resourcePool = Math.floor(random(450, 480));
        tempResource.resourceCap = 500;
        tempResource.cooldown = Math.floor(random(300, 360));
        // tempResource.img = this.bigResourceImg;
        // tempResource.scale = 0.08;
        
        tempResource.selected = false;
        tempResource.canBeMoved = false;
        tempResource.spawnEnemy = false;
        return tempResource;
    }

    createShip(x, y, type) {
        let tempShip = new Sprite(x, y);
        tempShip.type = type;
        tempShip.collectTick = 60;
        tempShip.collectTimer = 3;
        tempShip.drag = 0.5;
        tempShip.mass = 100;
        // tempShip.collider = 'k'
        tempShip.bounciness = 0;
        tempShip.direction = 90;
        tempShip.rotationLock = true;
        tempShip.layer = 3;
        tempShip.fiction =0;
        return tempShip;
    }
    
    createShipOne(x, y) {
        let tempShip = this.createShip(x, y, "One");
        tempShip.color = 'YELLOW';
        tempShip.w = 30;
        tempShip.h = 20;
        tempShip.scale = 0.7;
        tempShip.img = this.shipOne;
        // tempShip.debug = true;
        
        // STATS
        tempShip.hitPoint = 20;
        tempShip.attack = 5;
        tempShip.movementSpeed = 5;
        tempShip.collectRate = 2;
        tempShip.cost = 5;
        tempShip.buildTime = 300;
        tempShip.shipBag = 0;
        tempShip.reloadTimer = 50;
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
        tempShip.w = 53;
        tempShip.h = 33;
        tempShip.scale = 0.7;
        tempShip.img = this.shipTwo;
        // tempShip.debug = true;
        
        // STATS
        tempShip.hitPoint = 30;
        tempShip.attack = 8;
        tempShip.movementSpeed = 4;
        tempShip.collectRate = 5;
        tempShip.cost = 10;
        tempShip.buildTime = 600;
        tempShip.shipBag = 0;
        tempShip.reloadTimer = 100;
        tempShip.shootingTimer = 100;
        
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
        tempShip.w = 63;
        tempShip.h = 33;
        tempShip.scale = 0.7;
        tempShip.img = this.shipThree;
        // tempShip.debug = true;
        
        // STATS
        tempShip.hitPoint = 50;
        tempShip.attack = 5;
        tempShip.movementSpeed = 3;
        tempShip.collectRate = 5;
        tempShip.cost = 25;
        tempShip.buildTime = 600;
        tempShip.shipBag = 0;
        tempShip.reloadTimer = 150;
        tempShip.shootingTimer = 150;
        
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
        tempShip.w = 85;
        tempShip.h = 40;
        tempShip.scale = 0.7;
        tempShip.img = this.shipFour;
        // tempShip.debug = true;
        
        // STATS
        tempShip.hitPoint = 80;
        tempShip.attack = 10;
        tempShip.movementSpeed = 2;
        tempShip.collectRate = 1;
        tempShip.cost = 35;
        tempShip.buildTime = 1500;
        tempShip.shipBag = 0;
        tempShip.reloadTimer = 200;
        tempShip.shootingTimer = 200;

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

    createEnemy(x, y, type, behavior) {
        let tempEnemy = new Sprite(x, y);
        tempEnemy.type = type;
        tempEnemy.behavior = behavior;
        tempEnemy.angle = 0;
        tempEnemy.detectShip = false;
        // tempEnemy.collider = 'k'

        tempEnemy.distanceOne = 0;
        tempEnemy.detectShipOne = false;
        tempEnemy.distanceTwo = 0;
        tempEnemy.detectShipTwo = false;
        tempEnemy.distanceThree = 0;
        tempEnemy.detectShipThree = false;
        tempEnemy.distanceFour = 0;
        tempEnemy.detectShipFour = false;

        tempEnemy.mass = 100;
        tempEnemy.collectTick = 60;
        tempEnemy.collectTimer = 3;
        tempEnemy.drag = 0.5;
        tempEnemy.bounciness = 0;
        tempEnemy.direction = 90;
        tempEnemy.rotationLock = true;
        tempEnemy.layer = 2;
        return tempEnemy;
    }
    
    createEnemyOne(x, y) {
        let tempEnemy = this.createEnemy(x, y, "One", "");
        tempEnemy.color = 'YELLOW';
        tempEnemy.w = 20;
        tempEnemy.h = 35;
        tempEnemy.scale = 0.7;
        tempEnemy.img = this.enemyOne;
        
        // STATS
        tempEnemy.hitPoint = 20;
        tempEnemy.attack = 5;
        tempEnemy.movementSpeed = 5;
        tempEnemy.reloadTimer = 200;
        tempEnemy.shootingTimer = 200;
        tempEnemy.rotation = tempEnemy.direction;
        
        // BOOLEAN-RELATED
        tempEnemy.selected = false;
        tempEnemy.canBeMoved = true;
        tempEnemy.goCollect = false;
        tempEnemy.goldCollected = false;
        tempEnemy.singleShot = true;
        tempEnemy.burstFire = false;
        tempEnemy.shoot = false;
        return tempEnemy;
    }

    createEnemyTwo(x, y) {
        let tempEnemy = this.createEnemy(x, y, "Two", "");
        tempEnemy.color = 'ORANGE';
        tempEnemy.w = 33;
        tempEnemy.h = 63;
        tempEnemy.scale = 0.7;
        tempEnemy.img = this.enemyTwo;
        tempEnemy.rotation = tempEnemy.direction;
        
        // STATS
        tempEnemy.hitPoint = 30;
        tempEnemy.attack = 8;
        tempEnemy.movementSpeed = 4;
        tempEnemy.reloadTimer = 250;
        tempEnemy.shootingTimer = 250;
        
        // BOOLEAN-RELATED
        tempEnemy.selected = false;
        tempEnemy.canBeMoved = true;
        tempEnemy.goCollect = false;
        tempEnemy.goldCollected = false;
        tempEnemy.singleShot = true;
        tempEnemy.burstFire = false;
        tempEnemy.shoot = false;
        return tempEnemy;
    }
    
    createEnemyThree(x, y) {
        let tempEnemy = this.createEnemy(x, y, "Three", "");
        tempEnemy.color = 'BROWN';
        tempEnemy.w = 43;
        tempEnemy.h = 63;
        tempEnemy.scale = 0.7;
        tempEnemy.img = this.enemyThree;
        tempEnemy.rotation = tempEnemy.direction;
        
        // STATS
        tempEnemy.hitPoint = 50;
        tempEnemy.attack = 5;
        tempEnemy.movementSpeed = 3;
        tempEnemy.reloadTimer = 300;
        tempEnemy.shootingTimer = 300;
        
        // BOOLEAN-RELATED
        tempEnemy.selected = false;
        tempEnemy.canBeMoved = true;
        tempEnemy.goCollect = false;
        tempEnemy.goldCollected = false;
        tempEnemy.singleShot = true;
        tempEnemy.burstFire = false;
        tempEnemy.shoot = false;
        return tempEnemy;
    }
    
    createEnemyFour(x, y) {
        let tempEnemy = this.createEnemy(x, y, "Four", "");
        tempEnemy.color = 'BROWN';
        tempEnemy.w = 60;
        tempEnemy.h = 85;
        tempEnemy.scale = 0.7;
        tempEnemy.img = this.enemyFour;
        tempEnemy.rotation = tempEnemy.direction;

        // STATS
        tempEnemy.hitPoint = 80;
        tempEnemy.attack = 10;
        tempEnemy.movementSpeed = 2;
        tempEnemy.reloadTimer = 350;
        tempEnemy.shootingTimer = 350;

        // BOOLEAN-RELATED
        tempEnemy.selected = false;
        tempEnemy.canBeMoved = true;
        tempEnemy.goCollect = false;
        tempEnemy.goldCollected = false;
        tempEnemy.singleShot = true;
        tempEnemy.burstFire = false;
        tempEnemy.shoot = true;
        return tempEnemy;
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