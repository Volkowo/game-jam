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