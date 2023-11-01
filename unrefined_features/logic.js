class Logic {
    constructor(){
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
    }
    preload(){

    }
    setup(factory){
        this.base = factory.createBase(1000, H/1.5);
        this.smallResource = factory.createSmallResource(1000, H/2);
        this.bigResource = factory.createBigResource(300, H/4);
        this.ship = factory.createShip(800, H/2);
    }
    draw(){
        // this.base.x += 1;
    }
}