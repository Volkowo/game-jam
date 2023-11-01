class Logic {
    constructor(){
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;

        //Collection Logic
        this.goCollect = false;
        this.resourceCollected = false; //For auto collect
        this.collectingCounter = 200; //time ship spend inside the resource for collection
        this.goldTick = 60; //3 gold collect every 60 frames
        this.collectRate = 3; //3 gold collect every 60 frames
        this.collectedAmount =0;
        this.resourcePool = 19; //small resource pool
        this.baseBag = 0;   //base's inventory
        this.shipBag = 0;   //ship's inventory
    }
    preload(){

    }
    setup(factory){
        this.base = factory.createBase(1000, H/2-50);
        this.smallResource = factory.createSmallResource(1000, H/2 -200);
        this.bigResource = factory.createBigResource(300, H/4);
        this.ship = factory.createShip(800, H/2-100);
    }

    draw(){
        this.movementLogic();
        this.selectLogic();
        this.resourceCollectionLogic();
    }

    selectLogic(){
        //Select Sprite directly with Left Click
        if(this.ship.mouse.presses('left') || kb.presses('1')){
            this.ship.selected = true;
            this.bigResource.selected = false;
            this.smallResource.selected = false;
            this.base.selected = false;
        }
        if(this.base.mouse.presses('left')){
            this.base.selected = true;
            this.bigResource.selected = false;
            this.smallResource.selected = false;
            this.ship.selected = false;
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

        //Deselect the selected Sprites
        if(kb.presses('space')){
            this.bigResource.selected = false;
            this.smallResource.selected = false;
            this.ship.selected = false;
            this.base.selected = false;
        }

        //Drag and Select box
        if(mouse.presses('left')){
            //console.log(mouseX,mouseY);
        }
        if(mouse.releases()){
            //if mouse is released select evey sprites that is overlaping with the selection box
        }

    }

    movementLogic(){        
        if(this.ship.selected === true && mouse.presses('right')){
            this.ship.moveTo(mouseX, mouseY, 3);
            this.ship.visible = true;
            this.goCollect = false;
        }
        if(this.base.selected === true && mouse.presses('right')){
            this.base.moveTo(mouseX, mouseY, 3);
        }
        if(this.ship.selected === true && this.smallResource.mouse.presses('right') && this.resourcePool > 0){
            this.ship.moveTo(this.smallResource);
            this.goCollect = true;
        }
        if(this.ship.selected === true && this.bigResource.mouse.presses('right')){
            this.ship.moveTo(this.bigResource);
        }
    }

    resourceCollectionLogic(){
        this.ship.overlaps(this.smallResource);
        this.ship.overlaps(this.base);

        //if(this.smallResource.mouse.presses('left')){
        //   this.ship.moveTo(this.smallResource);
        //}
        if(this.ship.overlapping(this.smallResource) && this.goCollect == true){
            this.collectingCounter--
            this.ship.visible = false;
            if (this.collectingCounter < 0 || this.resourcePool <= 0) {
                this.ship.moveTo(this.base);
                //this.resourceCollected = true;
                this.ship.visible = true;
                console.log('resource collected');
            }
            if (this.ship.visible == false) {
                this.goldTick--
                if(this.goldTick<0){
                    if(this.resourcePool < this.collectRate) {
                        this.collectedAmount = this.resourcePool;
                        this.resourcePool -= this.collectedAmount;
                        this.shipBag += this.collectedAmount;
                        this.goldTick = 60;
                        this.resourceCollected = true;
                    } else {
                        this.resourcePool -= this.collectRate;
                        this.shipBag += this.collectRate;
                        this.goldTick = 60;
                        this.resourceCollected = true;
                    }
                    console.log("resource node: " + this.resourcePool, "ship inventory: " + this.shipBag);
                }
            }
        }
        if(this.ship.overlaps(this.base) && this.resourceCollected == true){
            if (this.resourcePool !== 0){
                this.ship.moveTo(this.smallResource);
            }
            this.goCollect = true;
            this.resourceCollected = false;
            this.collectingCounter = 200;
            this.baseBag = this.baseBag + this.shipBag;
            this.shipBag = 0;
            console.log('base inventory: ' + this.baseBag);
        }
        if(this.resourcePool == 0){
            this.smallResource.color = "RED";
        }

        this.smallResource.text = this.resourcePool;
        this.base.text = this.baseBag;
        this.ship.text = this.shipBag;
    }
}