class Logic {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
        this.resource;

        this.shipAmount = 0;
        this.counterOne = 0;
        this.counterTwo = 0;
        this.amountReduced = 0;

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

    }

    draw(factory) {
        strokeWeight(1);
        this.movementLogic(this.ship);
        // this.selectLogic();
        this.selectLogic('One', '1');
        this.selectLogic('Two', '2');
        this.resourceCollectionLogic();
        // this.spawnShip(factory);
        // this.checkShipAmount();
        // console.log("COUNTER ONE: " + this.counterOne, "COUNTER TWO: " + this.counterTwo, "SHIP AMOUNT: " + this.shipAmount);
        
    }

    selectLogic(type, binding) {
        if (kb.presses(binding)) {
            // console.log("Test")
            this.shipAmount = 0;
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

            if(this.ship[i].selected == true){
                this.ship[i].strokeWeight = 4;
                this.ship[i].stroke = "RED";
                if(this.ship[i].type == 'One'){
                    this.shipAmount++;
                    this.counterOne = this.shipAmount;
                } else if(this.ship[i].type == 'Two') {
                    this.shipAmount++;
                    this.counterTwo = this.shipAmount;
                }
            } else if (this.ship[i].selected == false){
                this.ship[i].strokeWeight = 1;
                this.ship[i].stroke = "BLACK";
            }
        }
    }

    movementLogic() {
        if(mouse.pressing('Right')){
            for(let i = 0; i < this.ship.length; i++){
                if(this.ship[i].selected == true){
                    this.ship[i].moveTo(mouseX, mouseY, 5);
                    this.ship[i].visible = true;
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
        for(let i = 0; i < this.resource.length; i++){
            for(let j = 0; j < this.ship.length; j++){
                // this.ship[j].overlaps(this.resource[i]);
                // this.ship[j].overlaps(this.base);

                // console.log(this.ship[j].collectTimer);

                // COLLECTING RESOURCE FROM RESOURCE NODE
                if(this.ship[j].colliding(this.resource[i])){
                    // console.log("Timer inside the resource: " + this.ship[j].collectTimer);
                    this.ship[j].visible = true;

                    if(this.ship[j].visible == true){ 
                        // console.log("Timer to get resource / collect rate: " + this.ship[j].collectTick);
                        this.amountReduced = (this.ship[j].collectRate * this.shipAmount);
                        if(this.resource[i].resourcePool < this.amountReduced){
                            // console.log("This is a writing");
                            if(frameCount % this.ship[j].collectTick == 0){
                                console.log("REMAINING AMOUNT: " + this.resource[i].remainingAmount);
                                this.resource[i].remainingAmount = this.resource[i].resourcePool;
                                this.resource[i].resourcePool -= this.resource[i].remainingAmount;
                                // this.ship[j].shipBag += this.resource[i].remainingAmount;
                                this.base.baseBag += this.resource[i].remainingAmount;
                            }
                            // this.ship[j].collectTimer = 180;
                            this.ship[j].goldCollected = true;
                            this.ship[j].text = this.ship[j].shipBag;
                        } else {
                            // console.log("This is a writing too")
                            if(frameCount % this.ship[j].collectTick == 0){
                                this.resource[i].resourcePool -= this.amountReduced;
                                this.ship[j].shipBag += this.ship[j].collectRate;
                                this.ship[j].collectTimer--; 
                                this.base.baseBag += this.amountReduced;
                            }
                            // this.ship[j].collectTimer = 180;
                            this.ship[j].goldCollected = true;
                            this.ship[j].text = this.ship[j].shipBag;
                        }
                        // console.log("resource node: " + this.resource[0].resourcePool, "ship inventory: " + this.ship[j].shipBag);
                    }

                    // if(this.ship[j].collectTimer <= 0 || this.resource[i].resourcePool <= 0){
                    //     // console.log("test")
                    //     this.ship[j].moveTo(this.base, 5);
                    //     this.ship[j].visible = true;
                    // }
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
                    // console.log('base inventory: ' + this.base.baseBag);
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
        // console.log("Calling the method")
        this.base.text = this.base.baseBag;
        // console.log("Values before return: ", this.base.text, this.base.baseBag)
        return this.base.baseBag;
    }
}
