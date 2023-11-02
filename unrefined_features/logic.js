class Logic {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
        this.resource;

        // resourceCollected -> goldCollected
        // collectedAmount -> remainingAmount
        // goldTick -> collectTick
        // collectingCounter -> collectTimer
        // goCollect -> same
        // collectRate -> same
        // baseBag -> same
        // shipBag -> same

        //Collection Logic
        // this.goCollect = false;
        // this.resourceCollected = false; //For auto collect
        // this.collectingCounter = 200; //time ship spend inside the resource for collection
        // this.goldTick = 60; //3 gold collect every 60 frames
        // //this.collectRate = 3; //3 gold collect every 60 frames
        // this.collectedAmount = 0;
        // this.baseBag = 0;   //base's inventory
        // this.shipBag = 0;   //ship's inventory
    }
    preload() {

    }
    setup(factory) {
        this.ship = new Group();
        this.resource = new Group();

        this.base = factory.createBase(1000, H / 2 - 50);
        this.resource.push(factory.createSmallResource(1000, H / 2 - 200));
        this.resource.push(factory.createBigResource(300, H / 4));
        this.ship.push(factory.createShipOne(800, H / 2 - 100));
        this.ship.push(factory.createShipTwo(1000, H/2 - 100));
    }

    draw(factory) {
        strokeWeight(1);
        this.movementLogic(this.ship);
        this.selectLogic(this.ship);
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

    selectLogic() {
        if (kb.presses('1')) {
            this.checkShip("One");
        }

        if (kb.presses('2')) {
            this.checkShip("Two");
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

            if(this.ship[i].selected == true){
                this.ship[i].strokeWeight = 4;
                this.ship[i].stroke = "RED";
            } else if (this.ship[i].selected == false){
                this.ship[i].strokeWeight = 1;
                this.ship[i].stroke = "BLACK";
            }
        }
    }

    movementLogic(ship) {
        if(mouse.presses('Right')){
            for(let i = 0; i < this.ship.length; i++){
                if(this.ship[i].selected == true){
                    this.ship[i].moveTo(mouseX, mouseY, 3);
                    ship.visible = true;
                    this.ship[i].goCollect = false;
                }
                
            }
        }

        for(let i = 0; i < this.resource.length; i++){
            if(this.resource[i].mouse.presses("Right") && this.resource[i].resourcePool > 0){
                for(let j = 0; j < this.ship.length; j++){
                    if(this.ship[j].selected == true){
                        this.ship[j].moveTo(this.resource[i], 3);
                        this.ship[j].goCollect = true;
                    }
                }
            }
        }
    }

    resourceCollectionLogic(factory) {
        for(let i = 0; i < 1; i++){

            for(let j = 0; j < this.ship.length; j++){
                this.ship[j].overlaps(this.resource[i]);
                this.ship[j].overlaps(this.base);

                // COLLECTING RESOURCE FROM RESOURCE NODE
                if(this.ship[j].overlapping(this.resource[i]) && this.ship[j].selected == true && this.ship[j].goCollect == true){
                    this.ship[j].collectingTimer--
                    console.log("Timer inside the resource: " + this.ship[j].collectingTimer);
                    this.ship[j].visible = false;
                    if(this.ship[j].collectingTimer < 0 || this.resource[i].resourcePool <= 0){
                        this.ship[j].moveTo(this.base);
                        this.ship[j].visible = true;
                    }
                    if(this.ship[j].visible == false){ 
                        this.ship[j].collectTick--;
                        // console.log("Timer to get resource / collect rate: " + this.ship[j].collectTick);
                        if(this.ship[j].collectTick < 0 && this.resource[i].resourcePool < this.ship[j].collectRate){

                            this.resource[i].remainingAmount = this.resource[i].resourcePool;
                            this.resource[i].resourcePool -= this.resource[i].remainingAmount;
                            this.ship[j].shipBag += this.resource[i].remainingAmount;
                            this.ship[j].collectTick = 60;
                            this.ship[j].goldCollected = true;
                        } else {
                            this.resource[i].resourcePool -= this.ship[j].collectRate;
                            this.ship[j].shipBag += this.ship[j].collectRate;
                            this.ship[j].collectTick = 60;
                            this.ship[j].goldCollected = true;
                        }
                        // console.log("resource node: " + this.resource[0].resourcePool, "ship inventory: " + this.ship[j].shipBag);
                    }
                }

                // RETURN TO BASE AFTER RESOURCE COLLECTION
                if (this.ship[j].overlaps(this.base) && this.ship[j].goldCollected == true) {
                    if (this.resource[i].resourcePool !== 0) {
                        this.ship[j].moveTo(this.resource[i]);
                    }
                    this.ship[j].goCollect = true;
                    this.ship[j].goldCollected = false;
                    this.ship[j].collectingTimer = 200;
                    this.base.baseBag = this.base.baseBag + this.ship[j].shipBag;
                    this.ship[j].shipBag = 0;
                    console.log('base inventory: ' + this.base.baseBag);
                }
                if (this.resource[i].resourcePool <= 0) {
                    this.resource[i].color = "RED";
                }
        
                this.resource[i].text = this.resource[i].resourcePool;
                this.base.text = this.base.baseBag;
                this.ship[j].text = this.ship[j].shipBag;
            }
        }
    }
}
