class Logic {
    constructor(){
        this.base;
        this.smallResource;
        this.bigResource;
        this.ships;

        //Collection Logic
        this.goCollect = false;
        this.resourceCollected = false; //For auto collect
        this.collectingCounter = 200; //time ship spend inside the resource for collection
        this.goldTick = 60; //3 gold collect every 60 frames
        //this.collectRate = 3; //3 gold collect every 60 frames
        this.collectedAmount =0;
        this.baseBag = 0;   //base's inventory
        this.shipBag = 0;   //ship's inventory
    }
    preload(){

    }
    setup(factory){
        this.ship = new Group();
        this.base = factory.createBase(1000, H/2-50);
        this.smallResource = factory.createSmallResource(1000, H/2 -200);
        this.bigResource = factory.createBigResource(300, H/4);
        this.ship.push(factory.createShip(800, H/2-100));
    }

    draw(factory){
        this.movementLogic(this.ship);
        this.selectLogic(this.ship);
        this.resourceCollectionLogic();
        this.spawnShip(factory);
    }

    spawnShip(factory){
        if(kb.presses('O')){
            this.ship.push(factory.createShip(500, H/2-100));
        }
    }

    selectLogic(ship){
        if(kb.presses('1')){
            for (let deselectedShips of this.ship){
                if(deselectedShips.type !== ship.type){
                    //need to group them
                    deselectedShips.selected = false;
                    console.log(deselectedShips);
                }
            }
            ship.selected = true;
        }
        if(kb.presses('2')){
            this.base.selected = true;
        }
    }

    movementLogic(ship){        
        if(ship.selected === true && mouse.presses('right')){
            for (let i=0; i<this.ship.length; i++){
                ship.moveTo(mouseX, mouseY, 3);
                ship.visible = true;
            }
            // this.ship.moveTo(mouseX, mouseY, 3);
            // this.ship.visible = true;
            this.goCollect = false;
        }
        if(this.base.selected === true && mouse.presses('right')){
            this.base.moveTo(mouseX,mouseY,1);
        }
        if(ship.selected === true && this.smallResource.mouse.presses('right') && this.smallResource.resourcePool > 0){
            ship.moveTo(this.smallResource);
            this.goCollect = true;
        }
        if(ship.selected === true && this.bigResource.mouse.presses('right')){
            ship.moveTo(this.bigResource);
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
            if (this.collectingCounter < 0 || this.smallResource.resourcePool <= 0) {
                this.ship.moveTo(this.base);
                this.ship.visible = true;
                console.log('resource collected');
            }
            if (this.ship.visible == false) {
                this.goldTick--
                if(this.goldTick<0){
                    if(this.smallResource.resourcePool < this.ship[0].collectRate) {
                        this.collectedAmount = this.smallResource.resourcePool;
                        this.smallResource.resourcePool -= this.collectedAmount;
                        this.shipBag += this.collectedAmount;
                        this.goldTick = 60;
                        this.resourceCollected = true;
                    } else {
                        this.smallResource.resourcePool -= this.ship[0].collectRate;
                        this.shipBag += this.ship[0].collectRate;
                        this.goldTick = 60;
                        this.resourceCollected = true;
                    }
                    console.log("resource node: " + this.smallResource.resourcePool, "ship inventory: " + this.shipBag);
                }
            }
        }
        if(this.ship.overlaps(this.base) && this.resourceCollected == true){
            if (this.smallResource.resourcePool !== 0){
                this.ship.moveTo(this.smallResource);
            }
            this.goCollect = true;
            this.resourceCollected = false;
            this.collectingCounter = 200;
            this.baseBag = this.baseBag + this.shipBag;
            this.shipBag = 0;
            console.log('base inventory: ' + this.baseBag);
        }
        if(this.smallResource.resourcePool == 0){
            this.smallResource.color = "RED";
        }

        this.smallResource.text = this.smallResource.resourcePool;
        this.base.text = this.baseBag;
        this.ship.text = this.shipBag;
    }
}