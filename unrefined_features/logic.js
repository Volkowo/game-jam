class Logic {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
        this.resource;

        /*
            1. Spawn ships with resources
            2. Cooldown(?)
            3. Make enemies
            :D basic done :POGGIES:
        */
    }

    preload() {

    }
    
    setup(factory) {
        //this.ship = new Group();
        //this.resource = new Group();

        // this.base = factory.createBase(1000, H / 2 - 50);
        // this.resource.push(factory.createSmallResource(1000, H / 2 - 200));
        // this.resource.push(factory.createBigResource(300, H / 4));
        // this.ship.push(factory.createShipOne(800, H / 2 - 100));
        // this.ship.push(factory.createShipTwo(1000, H/2 - 100));
    }

    draw(factory) {
        strokeWeight(1);
        this.movementLogic(this.ship);
        // this.selectLogic();
        this.selectLogic('One', '1');
        this.selectLogic('Two', '2');
        this.resourceCollectionLogic();
        // this.spawnShip(factory);
    }

    // spawnShip(factory) {
    //     if (kb.presses('O')) {
    //         this.ship.push(factory.createShipOne(500, H / 2 - 100));
    //     }

    //     if(kb.presses('P')){
    //         this.ship.push(factory.createShipTwo(500, H / 2 - 400));
    //     }
    // }

    selectLogic(type, binding) {
        if (kb.presses(binding)) {
            this.checkShip(type);
        }
    }

    // selectLogic() {
    //     if (kb.presses('1')) {
    //         this.checkShip("One");
    //     }

    //     if (kb.presses('2')) {
    //         this.checkShip("Two");
    //     }
    // }

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
                    ship[i].visible = true;
                    this.ship[i].goCollect = false;
                } 
            }
        }

        for(let i = 0; i < this.resource.length; i++){
            if(this.resource[i].mouse.presses("Right") && this.resource[i].resourcePool > 0){
                for(let j = 0; j < this.ship.length; j++){
                    if(this.ship[j].selected == true){
                        this.ship[j].moveTo(this.resource[i]);
                        this.ship[j].goCollect = true;
                    }
                }
            }
        }
    }

    resourceCollectionLogic() {
        for(let i = 0; i < 1; i++){
            for(let j = 0; j < this.ship.length; j++){
                this.ship[j].overlaps(this.resource[i]);
                this.ship[j].overlaps(this.base);

                console.log(this.ship[j].collectTimer);

                // COLLECTING RESOURCE FROM RESOURCE NODE
                if(this.ship[j].overlapping(this.resource[i]) && this.ship[j].goCollect == true){
                    // console.log("Timer inside the resource: " + this.ship[j].collectTimer);
                    this.ship[j].visible = false;

                    if(this.ship[j].visible == false){ 
                        // console.log("Timer to get resource / collect rate: " + this.ship[j].collectTick);
                        if(this.ship[j].collectTick < 0 && this.resource[i].resourcePool < this.ship[j].collectRate){
                            // console.log("This is a writing");
                            if(frameCount % this.ship[j].collectTick == 0){
                                this.resource[i].remainingAmount = this.resource[i].resourcePool;
                                this.resource[i].resourcePool -= this.resource[i].remainingAmount;
                                this.ship[j].shipBag += this.resource[i].remainingAmount;
                            }
                            // this.ship[j].collectTimer = 180;
                            this.ship[j].goldCollected = true;
                            this.ship[j].text = this.ship[j].shipBag;
                        } else {
                            // console.log("This is a writing too")
                            if(frameCount % this.ship[j].collectTick == 0){
                                this.resource[i].resourcePool -= this.ship[j].collectRate;
                                this.ship[j].shipBag += this.ship[j].collectRate;
                                this.ship[j].collectTimer--; 
                            }
                            // this.ship[j].collectTimer = 180;
                            this.ship[j].goldCollected = true;
                            this.ship[j].text = this.ship[j].shipBag;
                        }
                        // console.log("resource node: " + this.resource[0].resourcePool, "ship inventory: " + this.ship[j].shipBag);
                    }

                    if(this.ship[j].collectTimer <= 0 || this.resource[i].resourcePool <= 0){
                        // console.log("test")
                        this.ship[j].moveTo(this.base);
                        this.ship[j].visible = true;
                    }
                }

                // RETURN TO BASE AFTER RESOURCE COLLECTION
                if (this.ship[j].overlaps(this.base) && this.ship[j].goldCollected == true) {
                    if (this.resource[i].resourcePool !== 0) {
                        this.ship[j].moveTo(this.resource[i]);
                    }
                    this.ship[j].goCollect = true;
                    this.ship[j].goldCollected = false;
                    this.ship[j].collectTimer = 3;
                    this.base.baseBag = this.base.baseBag + this.ship[j].shipBag;
                    this.ship[j].shipBag = 0;
                    console.log('base inventory: ' + this.base.baseBag);
                }
                if (this.resource[i].resourcePool <= 0) {
                    this.resource[i].color = "RED";
                }
        
                this.displayText();
                this.resource[i].text = this.resource[i].resourcePool;
                this.ship[j].text = this.ship[j].shipBag;
            }
        }
    }

    displayText(){
        console.log("Calling the method")
        this.base.text = this.base.baseBag;
        console.log("Values before return: ", this.base.text, this.base.baseBag)
        return this.base.baseBag;
    }
}
