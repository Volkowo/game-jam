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
        this.selectLogic();
        this.movementLogic();
    }
    selectLogic(){
        if(this.ship.mouse.presses('left')){
            this.ship.selected = true;
            this.base.selected = false;
            this.bigResource.selected = false;
            this.smallResource.selected = false;
        }
        if(this.base.mouse.presses('left')){
            this.base.selected = true;
            this.ship.selected = false;
            this.bigResource.selected = false;
            this.smallResource.selected = false;
        }
        if(this.smallResource.mouse.presses('left')){
            this.smallResource.selected = true;
            this.bigResource.selected = false;
            this.ship.selected = false;
            this.base.selected = false;
        }
        if(this.bigResource.mouse.presses('left')){
            this.bigResource.selected = true;
            this.smallResource.selected = false;
            this.ship.selected = false;
            this.base.selected = false;
        }
    }
    movementLogic(){        
        if(this.ship.selected === true && mouse.presses('right')){
            this.ship.moveTo(mouseX, mouseY, 3);
        }
        if(this.base.selected === true && mouse.presses('right')){
            this.base.moveTo(mouseX, mouseY, 3);
        }
        if(this.smallResource.selected === true && mouse.presses('right')){
            this.smallResource.moveTo(mouseX, mouseY, 3);
        }
        if(this.bigResource.selected === true && mouse.presses('right')){
            this.bigResource.moveTo(mouseX, mouseY, 3);
        }
    }
}