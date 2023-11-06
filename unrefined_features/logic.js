class Logic {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
        this.resource;
        this.selection;
        // this.distance = new Array ();

        this.shipAmount = 0;
        this.counterOne = 0;
        this.counterTwo = 0;
        this.counterThree = 0;
        this.counterFour = 0;
        this.amountReduced = 0;

        this.regenTimer = 0;
        this.regenValue = 0;

        this.singleShot = true;
        this.burstFire = false;

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
        this.singleBulletGroup = new Group();
        this.burstBulletGroup = new Group();
        this.selection = new Group();
    }

    draw(factory) {
        strokeWeight(1);
        this.movementLogic(this.ship);
        this.shipRotate();
        this.selectLogic('One', '1');
        this.selectLogic('Two', '2');
        this.selectLogic('Three', '3');
        this.selectLogic('Four', '4');
        this.resourceCollectionLogic();
        this.shootingLogic();
        this.selectionCircle(factory);

        this.resourceRegeneration();
        // console.log(this.selection.length);
        // allSprites.debug = true;
        // console.log("REGEN TIMER: " + this.regenTimer, "REGEN VALUE: " + this.regenValue)
        // console.log("COUNTER ONE: " + this.counterOne, "COUNTER TWO: " + this.counterTwo, 
        // "COUNTER Three: " + this.counterThree, "COUNTER FOUR: " + this.counterFour, "SHIP AMOUNT: " + this.shipAmount);

        
        
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
        for(let i = 4; i < this.ship.length; i++){
            if(this.ship[i].type == type){
                this.ship[i].selected = true;
            } else {
                this.ship[i].selected = false;
            }

            if(this.ship[i].selected == true){
                // console.log("ship selected")
                // this.ship[i].strokeWeight = 4;
                // this.ship[i].stroke = "RED";
                if(this.ship[i].type == 'One'){
                    this.shipAmount++;
                    this.counterOne = this.shipAmount;
                } else if(this.ship[i].type == 'Two') {
                    this.shipAmount++;
                    this.counterTwo = this.shipAmount;
                } else if(this.ship[i].type == 'Three'){
                    this.shipAmount++;
                    this.counterThree = this.shipAmount;
                } else if(this.ship[i].type == 'Four'){
                    this.shipAmount++;
                    this.counterFour = this.shipAmount;
                }
            } else if (this.ship[i].selected == false){
                this.ship[i].strokeWeight = 1;
                this.ship[i].stroke = "BLACK";
            }
        }
    }

    selectionCircle(factory){
        for(let i = 4; i < this.ship.length; i++){
            if(this.ship[i].selected == true){
                // this.selection.push(factory.createSelection(this.ship[i].x, this.ship[i].y, this.ship[i].w + 30));
                noFill();
                strokeWeight(4);
                stroke("WHITE");
                ellipse(this.ship[i].x, this.ship[i].y, this.ship[i].w + 30, this.ship[i].h + 20);
            }

            // if(this.selection.length > 1){
            //     this.selection.shift();
            // }
        }
    }

    movementLogic() {
        if(mouse.pressing('Right')){
            for(let i = 4; i < this.ship.length; i++){
                if(this.ship[i].selected == true){
                    this.ship[i].moveTo(mouseX, mouseY, 5);
                    this.ship[i].direction = this.ship[i].angleTo(mouse);
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
            for(let j = 4; j < this.ship.length; j++){
                // this.ship[j].overlaps(this.resource[i]);
                // this.ship[j].overlaps(this.base);

                // console.log(this.ship[j].collectTimer);

                // COLLECTING RESOURCE FROM RESOURCE NODE
                // console.log("------------------------");
                if(this.ship[j].colliding(this.resource[i])){
                    // console.log("COLLECT RESOURCE");
                    this.ship[j].visible = true;

                    if(this.ship[j].visible == true){ 
                        // console.log("Timer to get resource / collect rate: " + this.ship[j].collectTick);
                        this.amountReduced = (this.ship[j].collectRate * this.shipAmount);
                        if(this.resource[i].resourcePool < this.amountReduced){
                            if(frameCount % this.ship[j].collectTick == 0){
                                // console.log("REMAINING AMOUNT: " + this.resource[i].remainingAmount);
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
                                // console.log(this.amountReduced);
                                // console.log("SHIP IS COLLECTING");
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
                }
        
                this.displayText();
                this.resource[i].text = this.resource[i].resourcePool;
                this.ship[j].text = this.ship[j].shipBag;
            }
        }
    }

    resourceRegeneration(){
        for(let i = 0; i < this.resource.length; i++){
            if(this.resource[i].size == "Big"){
                if(this.resource[i].resourcePool < this.resource[i].resourceCap){
                    this.regenTimer = Math.floor(random(20, 60));
                    this.regenValue = Math.floor(random(0, 10));
                    if(frameCount % this.regenTimer == 0){
                        // console.log("REGEN ON")
                        this.resource[i].resourcePool += this.regenValue;
                    }
                }
            }
        }
    }

    displayText(){
        // console.log("Calling the method")
        this.base.text = this.base.baseBag;
        // console.log("Values before return: ", this.base.text, this.base.baseBag)
        return this.base.baseBag;
    }

    // ------- SHOOTING

    shootingLogic() {      
        if (kb.presses('q')) { // firing mode (single)
            this.singleShot = true;
            this.burstFire = false;
        } else if (kb.presses('w')) { // burst mode
            this.singleShot = false;
            this.burstFire = true;
        }

        for (let i = 4; i < this.ship.length; i++) {
            this.ship[i].shootingTimer--;
            // console.log(this.ship[i].shootingTimer)
            for (let k = 0; k < this.resource.length; k++) { // for distance check below
                strokeWeight(5);
                this.distance = dist(this.resource[k].x, this.resource[k].y, this.ship[i].x, this.ship[i].y);
                line(this.resource[k].x, this.resource[k].y, this.ship[i].x, this.ship[i].y)
                if (this.distance <= 200) { // create player bullet sprites (change this.resource to this.enemy or whatever when it gets added)
                    if (this.ship[i].shootingTimer <= 0) {
                        if (this.singleShot === true) { // for above boolean if statement (toggled after 'q' key press)
                            this.singleBulletGroup.push(this.createSingleShot(this.ship[i].x, this.ship[i].y));
                            for (let s = 0; s < this.singleBulletGroup.length; s++) { // direction and collision for the current bullet
                                console.log("PEW PEW PEW")
                                this.singleBulletGroup.direction = this.singleBulletGroup[s].angleTo(this.resource[k]);
                                this.singleBulletGroup.speed = 20;
                                this.singleBulletGroup.overlaps(this.ship[i]);
                            }
                        } else if (this.burstFire === true) { // creates three sprites spread out toggle after a 'w' key press
                            this.burstBulletGroup.push(this.createBurstBullet(this.ship[i].x, this.ship[i].y - 15));
                            this.burstBulletGroup.push(this.createBurstBullet(this.ship[i].x, this.ship[i].y));
                            this.burstBulletGroup.push(this.createBurstBullet(this.ship[i].x, this.ship[i].y + 15));
                            for (let a = 0; a < this.burstBulletGroup.length; a++) { // parameters for player burst shot
                                this.burstBulletGroup.direction = this.burstBulletGroup[a].angleTo(this.resource[k]);
                                this.burstBulletGroup.speed = 20;
                                this.burstBulletGroup.overlaps(this.ship[i]);
                            }
                        }
                        if (this.ship[i].type == "One") { // sets shooting cooldown timer for each ship type
                            this.ship[i].shootingTimer = 50;
                        } else if (this.ship[i].type == "Two") {
                            this.ship[i].shootingTimer = 100;
                        } else if (this.ship[i].type == "Three") {
                            this.ship[i].shootingTimer = 150;
                        } else if (this.ship[i].type == "Four") {
                            this.ship[i].shootingTimer = 200;
                        }
                    }      
                }
                for (let s = 0; s < this.singleBulletGroup.length; s++) { // collision for player single shot (needs to be outisde of the if statement so its always active)
                    if (this.singleBulletGroup[s].collides(this.resource[k])) {
                        this.singleBulletGroup[s].remove();
                    }
                }
                for (let a = 0; a < this.burstBulletGroup.length; a++) { // same collision detection for player burst shot
                    if (this.burstBulletGroup[a].collides(this.resource[k])) {
                        this.burstBulletGroup[a].remove();
                    }
                }
            }
        }
    }

    createSingleShot(x, y) { // single boolets
        let tempBullet = new Sprite(x, y);
        tempBullet.diameter = 10;
        tempBullet.color = 'yellow';
        tempBullet.life = 60;
        tempBullet.shoot = false;
        return tempBullet;
    }
    
    createBurstBullet(x, y) { // burst ones
        let tempBurst = new Sprite(x, y);
        tempBurst.diameter = 5;
        tempBurst.color = 'orange';
        tempBurst.life = 60;
        tempBurst.shoot = false;
        return tempBurst;
    }

    rotateDirection(object) {
        object.rotation = object.direction;
    }

    shipRotate(){
        for(let i = 4; i < this.ship.length; i++){
            this.rotateDirection(this.ship[i]);
        }
    }
}


                // this.distance.push(dist(this.resource[k].x, this.resource[k].y, this.ship[i].x, this.ship[i].y));

                // if(this.distance.length > this.resource.length){
                //     this.distance.shift();
                // }

                // for(let z = 0; z < this.distance.length; z++){
                //     console.log(this.distance)
                // }