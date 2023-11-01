class Factory {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
    }
    preload() {

    }
    // just a test. Remove it later
    setup() {
        this.base = this.createBase(1000, H/1.5);
        this.smallResource = this.createSmallResource(1000, H/2);
        this.bigResource = this.createBigResource(300, H/4);
        this.ship = this.createShip(800, H/2);
    }

    draw(){

    }

    createBase(x, y){
        let tempBase = new Sprite(x,y);
        tempBase.color = 'RED';
        tempBase.w = 80;
        tempBase.h = 80;
        return tempBase;
    }

    // createResource(x, y){
    //     let tempResource = new Sprite(x, y);
    //     // tempResource.size = size;
    //     return tempResource;
    // }

    createSmallResource(x, y){
        let tempResource = new Sprite(x, y);
        tempResource.color = 'BROWN';
        tempResource.d = 50;
        return tempResource;
    }

    createBigResource(x, y){
        let tempResource = new Sprite(x, y);
        tempResource.color = 'GREEN';
        tempResource.w = 50,
        tempResource.h = 50;
        return tempResource;
    }

    createShip(x, y){
        let tempShip = new Sprite(x, y); 
        tempShip.color = 'YELLOW';
        tempShip.w = 120;
        tempShip.h = 30;
        return tempShip;
    }
}