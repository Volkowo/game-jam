class Factory {
    constructor() {

    }
    preload() {

    }
    // just a test. Remove it later
    setup() {

    }

    draw(){

    }

    createBase(x, y){
        let tempBase = new Sprite(x,y);
        tempBase.color = 'RED';
        tempBase.w = 80;
        tempBase.h = 80;
        tempBase.selected = false;
        tempBase.canBeMoved = false;
        return tempBase;
    }

    createResource(x, y, size){
        let tempResource = new Sprite(x, y);
        tempResource.size = size;
        return tempResource;
    }

    createSmallResource(x, y){
        let tempResource = this.createResource(x, y, "Small");
        tempResource.color = 'GREEN';
        tempResource.d = 50;
        tempResource.selected = false;
        tempResource.canBeMoved = false;
        tempResource.resourcePool = Math.floor(random(30, 50));
        tempResource.text = tempResource.resourcePool
        return tempResource;
    }
    
    createBigResource(x, y){
        let tempResource = this.createResource(x, y, "Big");
        tempResource.color = 'GREEN';
        tempResource.w = 50,
        tempResource.h = 50;
        tempResource.selected = false;
        tempResource.canBeMoved = false;
        tempResource.resourcePool = Math.floor(random(30, 50));
        tempResource.text = tempResource.resourcePool
        return tempResource;
    }

    createShip(x, y, type){
        let tempShip = new Sprite(x, y);
        tempShip.type = type;
        return tempShip;
    }
    
    createShipOne(x, y){
        let tempShip = new Sprite(x, y, "One"); 
        tempShip.color = 'YELLOW';
        tempShip.w = 20;
        tempShip.h = 20;
        tempShip.collectRate = 2;
        tempShip.cost = 5;
        tempShip.selected = false;
        tempShip.canBeMoved = true;
        return tempShip;
    }

    createShipTwo(x, y){
        let tempShip = new Sprite(x, y, "Two"); 
        tempShip.color = 'ORANGE';
        tempShip.w = 40;
        tempShip.h = 40;
        tempShip.collectRate = 5;
        tempShip.cost = 8;
        tempShip.selected = false;
        tempShip.collectRate = 3;
        tempShip.canBeMoved = true;
        return tempShip;
    }
}