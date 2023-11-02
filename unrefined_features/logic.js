class Logic {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
        this.resource;

        //Collection Logic
        this.goCollect = false;
        this.resourceCollected = false; //For auto collect
        this.collectingCounter = 200; //time ship spend inside the resource for collection
        this.goldTick = 60; //3 gold collect every 60 frames
        //this.collectRate = 3; //3 gold collect every 60 frames
        this.collectedAmount = 0;
        this.baseBag = 0;   //base's inventory
        this.shipBag = 0;   //ship's inventory
    }
    preload() {

    }
    setup(factory) {
        this.ship = new Group();
        this.resource = new Group();

        this.base = factory.createBase(1000, H / 2 - 50);
        this.resource.push(factory.createSmallResource(1000, H / 2 - 200));
        this.resource.push(factory.createBigResource(300, H / 4));
        //this.ship.push(factory.createShipOne(800, H / 2 - 100));
        //this.ship.push(factory.createShipTwo(1000, H/2 - 100));
    }

    draw(factory) {
        this.movementLogic(this.ship);
        this.selectLogic('One', '1');
        this.selectLogic('Two', '2');
        this.resourceCollectionLogic();
        this.spawnShip(factory);
    }

    spawnShip(factory) {
        if (kb.presses('O')) {
            this.ship.push(factory.createShipOne(500, H / 2 - 100));
        }

        if(kb.presses('P')){
            this.ship.push(factory.createShipTwo(500, H / 2 - 400));
        }
    }

    selectLogic(type, binding) {
        if (kb.presses(binding)) {
            this.checkShip(type);
        }
    }

    // Check's which ship is currently being selected through the keyboard input
    checkShip(type){
        for(let i = 0; i < this.ship.length; i++){
            if(this.ship[i].type == type){
                this.ship[i].selected = true;
            } else {
                this.ship[i].selected = false;
            }
        }
    }

    movementLogic(ship) {
        if(mouse.presses('Right')){
            for(let i = 0; i < ship.length; i++){
                if(ship[i].selected == true){
                    ship[i].moveTo(mouseX, mouseY, 3);
                    ship.visible = true;
                }
                this.goCollect = true;
            }
        }

        // if(mouse.presses("right")){
        //     for(let i = 0; i < this.ship.length; i++){
        //         if(this.ship[i].selected == true){

        //         }
        //     }
        // }

        // if (ship.selected === true && mouse.presses('right')) {
        //     for (let i = 0; i < this.ship.length; i++) {
        //         ship.moveTo(mouseX, mouseY, 3);
        //         ship.visible = true;
        //     }
        //     // this.ship.moveTo(mouseX, mouseY, 3);
        //     // this.ship.visible = true;
        //     this.goCollect = false;
        // }

        // if (this.base.selected === true && mouse.presses('right')) {
        //     this.base.moveTo(mouseX, mouseY, 1);
        // }

        if (ship.selected === true && this.resource[0].mouse.presses('right') && this.resource[0].resourcePool > 0) {
            ship.moveTo(this.resource[0]);
            this.goCollect = true;
            console.log('yes');
        }
        if (ship.selected === true && this.resource[1].mouse.presses('right')) {
            ship.moveTo(this.resource[1]);
        }
    }

    resourceCollectionLogic(factory) {
        this.ship.overlaps(this.resource[0]);
        this.ship.overlaps(this.base);

        //if(this.resource[0].mouse.presses('left')){
        //   this.ship.moveTo(this.resource[0]);
        //}
        if (this.ship.overlapping(this.resource[0]) && this.goCollect == true) {
            this.collectingCounter--
            this.ship.visible = false;
            if (this.collectingCounter < 0 || this.resource[0].resourcePool <= 0) {
                this.ship.moveTo(this.base);
                this.ship.visible = true;
                console.log('resource collected');
            }
            if (this.ship.visible == false) {
                this.goldTick--
                if (this.goldTick < 0) {
                    if (this.resource[0].resourcePool < this.ship[0].collectRate) {
                        this.collectedAmount = this.resource[0].resourcePool;
                        this.resource[0].resourcePool -= this.collectedAmount;
                        this.shipBag += this.collectedAmount;
                        this.goldTick = 60;
                        this.resourceCollected = true;
                    } else {
                        this.resource[0].resourcePool -= this.ship[0].collectRate;
                        this.shipBag += this.ship[0].collectRate;
                        this.goldTick = 60;
                        this.resourceCollected = true;
                    }
                    console.log("resource node: " + this.resource[0].resourcePool, "ship inventory: " + this.shipBag);
                }
            }
        }
        if (this.ship.overlaps(this.base) && this.resourceCollected == true) {
            if (this.resource[0].resourcePool !== 0) {
                this.ship.moveTo(this.resource[0]);
            }
            this.goCollect = true;
            this.resourceCollected = false;
            this.collectingCounter = 200;
            this.baseBag = this.baseBag + this.shipBag;
            this.shipBag = 0;
            console.log('base inventory: ' + this.baseBag);
        }
        if (this.resource[0].resourcePool == 0) {
            this.resource[0].color = "RED";
        }

        this.resource[0].text = this.resource[0].resourcePool;
        this.base.text = this.baseBag;
        this.ship.text = this.shipBag;
    }
}
