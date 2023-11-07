class Logic {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
        this.resource;
        this.selection;
        this.enemy;
        // this.distance = new Array ();

        this.enemyX = 0;
        this.enemyY = 0;
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

        this.rotate = true;
        this.move = false;

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
        this.enemyBulletGroup = new Group();
        this.selection = new Group();
        this.enemy = new Group();

        this.enemy.push(factory.createEnemyOne(450, 240));
        this.enemy.push(factory.createEnemyOne(580, 280));
        // this.enemyRandomSequence();
    }

    draw(factory) {
        strokeWeight(1);
        this.displayCoordinates();
        this.movementLogic(this.ship);
        this.shipRotate();
        this.selectLogic('One', '1');
        this.selectLogic('Two', '2');
        this.selectLogic('Three', '3');
        this.selectLogic('Four', '4');
        this.resourceCollectionLogic();
        this.shootingLogic();
        // this.enemyShootingLogic();
        this.selectionCircle(factory);

        this.randomEnemyBehavior();
        this.assignEnemyBehavior();

        this.detectionLogic();

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
    checkShip(type) {
        for (let i = 4; i < this.ship.length; i++) {
            if (this.ship[i].type == type) {
                this.ship[i].selected = true;
            } else {
                this.ship[i].selected = false;
            }

            if (this.ship[i].selected == true) {
                // console.log("ship selected")
                // this.ship[i].strokeWeight = 4;
                // this.ship[i].stroke = "RED";
                if (this.ship[i].type == 'One') {
                    this.shipAmount++;
                    this.counterOne = this.shipAmount;
                } else if (this.ship[i].type == 'Two') {
                    this.shipAmount++;
                    this.counterTwo = this.shipAmount;
                } else if (this.ship[i].type == 'Three') {
                    this.shipAmount++;
                    this.counterThree = this.shipAmount;
                } else if (this.ship[i].type == 'Four') {
                    this.shipAmount++;
                    this.counterFour = this.shipAmount;
                }
            } else if (this.ship[i].selected == false) {
                this.ship[i].strokeWeight = 1;
                this.ship[i].stroke = "BLACK";
            }
        }
    }

    selectionCircle(factory) {
        for (let i = 4; i < this.ship.length; i++) {
            if (this.ship[i].selected == true) {
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
        if (mouse.pressing('Right')) {
            for (let i = 4; i < this.ship.length; i++) {
                if (this.ship[i].selected == true) {
                    this.ship[i].moveTo(mouseX, mouseY, 5);
                    this.ship[i].visible = true;
                    this.ship[i].goCollect = false;
                }
            }
        }

        for (let i = 0; i < this.resource.length; i++) {
            if (this.resource[i].mouse.presses("Right") && this.resource[i].resourcePool > 0) {
                for (let j = 0; j < this.ship.length; j++) {
                    if (this.ship[j].selected == true) {
                        this.ship[j].moveTo(this.resource[i]);
                        this.ship[j].goCollect = true;
                    }
                }
            }
        }
    }

    resourceCollectionLogic() {
        for (let i = 0; i < this.resource.length; i++) {
            for (let j = 4; j < this.ship.length; j++) {
                // this.ship[j].overlaps(this.resource[i]);
                // this.ship[j].overlaps(this.base);

                // console.log(this.ship[j].collectTimer);

                // COLLECTING RESOURCE FROM RESOURCE NODE
                // console.log("------------------------");
                if (this.ship[j].colliding(this.resource[i])) {
                    // console.log("COLLECT RESOURCE");
                    this.ship[j].visible = true;

                    if (this.ship[j].visible == true) {
                        // console.log("Timer to get resource / collect rate: " + this.ship[j].collectTick);
                        this.amountReduced = (this.ship[j].collectRate * this.shipAmount);
                        if (this.resource[i].resourcePool < this.amountReduced) {
                            if (frameCount % this.ship[j].collectTick == 0) {
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
                            if (frameCount % this.ship[j].collectTick == 0) {
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
                // this.ship[j].text = this.ship[j].shipBag;
            }
        }
    }

    resourceRegeneration() {
        for (let i = 0; i < this.resource.length; i++) {
            if (this.resource[i].size == "Big") {
                if (this.resource[i].resourcePool < this.resource[i].resourceCap) {
                    this.regenTimer = Math.floor(random(20, 60));
                    this.regenValue = Math.floor(random(0, 10));
                    if (frameCount % this.regenTimer == 0) {
                        // console.log("REGEN ON")
                        this.resource[i].resourcePool += this.regenValue;
                    }
                }
            }
        }
    }

    displayCoordinates() {
        text("X: " + mouseX + " Y: " + mouseY, mouseX - 40, mouseY - 5)
    }

    displayText() {
        // console.log("Calling the method")
        this.base.text = this.base.baseBag;
        // console.log("Values before return: ", this.base.text, this.base.baseBag)
        return this.base.baseBag;
    }

    enemyRandomType() {
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemyX = random(250, 1500);
            this.enemyY = random(240, 820);
            this.enemy[i].rotation = this.enemy[i].direction;
            if (frameCount % 25 == 0 && this.enemy[i].behavior == "Random" && this.enemy[i].detectShip == false) {
                this.enemy[i].rotateTo(this.enemyX, this.enemyY, 5);
            } else if (frameCount % 40 == 0 && this.enemy[i].behavior == "Random" && this.enemy[i].detectShip == false) {
                this.enemy[i].moveTo(this.enemyX, this.enemyY, 3);
            }
        }
    }

    enemyHuntBase() {
        for (let i = 0; i < this.enemy.length; i++) {
            if (this.enemy[i].behavior == "Hunting" && this.enemy[i].detectShip == false) {
                this.enemy[i].rotateTo(this.base.x, this.base.y, 5);
                this.enemy[i].moveTo(this.base.x, this.base.y, 3);
            }
        }
    }


    enemySurroundResource() {
        for (let i = 0; i < this.enemy.length; i++) {
            for (let k = 0; k < this.resource.length; k++) {
                if (this.resource[k].size == "Big") {
                    this.enemyX = random(this.resource[k].x - 80, this.resource[k].x + 80);
                    this.enemyY = random(this.resource[k].y - 80, this.resource[k].y + 80);

                    if (this.enemyX > this.resource[k].x - 20 && this.enemyX < this.resource[k].x + this.resource[k].w + 20) {
                        // console.log("X was between the values " + "X Values: " + this.enemyX);
                        this.enemyX = random(this.resource[k].x - 80, this.resource[k].x + 80);
                    }

                    if (this.enemyY > this.resource[k].y - 20 && this.enemyY < this.resource[k].y + this.resource[k].h + 20) {
                        // console.log("Y was between the values")
                        this.enemyY = random(this.resource[k].y - 80, this.resource[k].y + 80);
                    }

                    this.enemy[i].rotation = this.enemy[i].direction;
                    if (frameCount % 25 == 0 && this.enemy[i].behavior == "Guard" && this.enemy[i].detectShip == false) {
                        this.enemy[i].rotateTo(this.enemyX, this.enemyY, 5);
                    } else if (frameCount % 30 == 0 && this.enemy[i].behavior == "Guard" && this.enemy[i].detectShip == false) {
                        this.enemy[i].moveTo(this.enemyX, this.enemyY, 3);
                    }
                }
            }
        }
    }

    enemySurroundResourceNew() {
        for (let i = 0; i < this.enemy.length; i++) {
            for (let k = 0; k < this.resource.length; k++) {
                if (this.resource[k].size == "Big" && this.enemy[i].behavior == "Guard") {

                    this.enemy[i].attractTo(this.resource[k], 5)
                }
            }
        }
    }

    enemyAttackShip() {

    }

    randomEnemyBehavior() {
        for (let i = 0; i < this.enemy.length; i++) {
            // console.log(i)
            if (i % 2 == 0) {
                this.enemy[i].behavior = "Random";
            } else {
                this.enemy[i].behavior = "Guard";
            }
        }
    }

    assignEnemyBehavior() {
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemyRandomType();
            this.enemyHuntBase();
            this.enemySurroundResource();


        }
    }

    checkDistance(shipType, distance, detect) {
        for (let i = 4; i < this.ship.length; i++) {
            for (let k = 0; k < this.enemy.length; k++) {
                if (this.ship[i].type == shipType) {
                    distance = dist(this.ship[i].x, this.ship[i].y, this.enemy[k].x, this.enemy[k].y);
                    if (distance <= 200) {
                        detect = true;
                    } else if (distance >= 220) {
                        detect = false;
                    }

                    if (detect == true) {
                        this.enemy[k].moveTo(this.enemy[k].x, this.enemy[k].y, 0);
                        this.enemyShootingLogic();
                    }
                }
            }
        }
    }

    detectionLogic() {
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].shootingTimer--;
            this.checkDistance("One", this.enemy[i].distanceOne, this.enemy[i].detectShipOne);
            // this.checkDistance("Two", this.enemy[i].distanceTwo, this.enemy[i].detectShipTwo);
            // this.checkDistance("Three", this.enemy[i].distanceThree, this.enemy[i].detectShipThree);
            // this.checkDistance("Four", this.enemy[i].distanceFour, this.enemy[i].detectShipFour);


        }
        // console.log(this.enemy[0].detectShipOne, this.enemy[1].detectShipOne)


    }

    enemyShootingLogic() {
        for (let i = 0; i < this.enemy.length; i++) {
            this.enemy[i].shootingTimer--;
            if (this.enemy[i].shootingTimer <= 0) {
                for (let k = 0; k < this.ship.length; k++) { // for distance check below
                    console.log(this.enemy[i].shootingTimer)
                    this.distance = dist(this.ship[k].x, this.ship[k].y, this.enemy[i].x, this.enemy[i].y);
                    if (this.distance <= 200) { // create enemy bullet sprites)
                        this.enemyBulletGroup.push(this.enemyBullets(this.enemy[i].x, this.enemy[i].y, this.ship[k]));
                        if (this.enemy[i].type == "One") { // sets shooting cooldown timer for each enemy type
                            this.enemy[i].shootingTimer = 50;
                        } else if (this.enemy[i].type == "Two") {
                            this.enemy[i].shootingTimer = 100;
                        } else if (this.enemy[i].type == "Three") {
                            this.enemy[i].shootingTimer = 150;
                        } else if (this.enemy[i].type == "Four") {
                            this.enemy[i].shootingTimer = 200;
                        }
                    }
                    for (let s = 0; s < this.enemyBulletGroup.length; s++) { // collision for enemy single shot (needs to be outisde of the if statement so its always active)
                        if (this.enemyBulletGroup[s].overlaps(this.ship[k])) {
                            this.enemyBulletGroup[s].remove();
                            // console.log('i got hit');
                        }
                    }
                }
            }
        }
    }

    enemyBullets(x, y, angle) {
        let tempBullet = new Sprite(x, y);
        tempBullet.diameter = 20;
        tempBullet.color = 'purple';
        tempBullet.life = 60;
        tempBullet.overlaps(this.enemy);
        tempBullet.overlaps(this.singleBulletGroup);
        tempBullet.overlaps(this.burstBulletGroup);
        tempBullet.overlaps(this.enemyBulletGroup);
        tempBullet.direction = tempBullet.angleTo(angle);
        tempBullet.speed = 4;
        return tempBullet;
    }

    // ------- PLAYER SHOOTING
    shootingLogic() {
        if (kb.presses('q')) { // firing mode (single)
            this.singleShot = true;
            this.burstFire = false;
        } else if (kb.presses('w')) { // burst mode
            this.singleShot = false;
            this.burstFire = true;
        }

        for (let i = 4; i < this.ship.length; i++) {
            this.ship[i].shootingTimer--
            if (this.ship[i].shootingTimer <= 0) {
                for (let k = 0; k < this.enemy.length; k++) { // for distance check below
                    this.distance = dist(this.enemy[k].x, this.enemy[k].y, this.ship[i].x, this.ship[i].y);
                    if (this.distance <= 200) { // create player bullet sprites
                        if (this.singleShot === true) { // for above boolean if statement (toggled after 'q' key press)
                            this.singleBulletGroup.push(this.createSingleShot(this.ship[i].x, this.ship[i].y, this.enemy[k]));
                        } else if (this.burstFire === true) { // creates three sprites spread out toggle after a 'w' key press
                            this.burstBulletGroup.push(this.createBurstBullet(this.ship[i].x, this.ship[i].y - 15, this.enemy[k]));
                            this.burstBulletGroup.push(this.createBurstBullet(this.ship[i].x, this.ship[i].y, this.enemy[k]));
                            this.burstBulletGroup.push(this.createBurstBullet(this.ship[i].x, this.ship[i].y + 15, this.enemy[k]));
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
                    for (let s = 0; s < this.singleBulletGroup.length; s++) { // collision for player single shot (needs to be outisde of the if statement so its always active)
                        if (this.singleBulletGroup[s].overlaps(this.enemy[k])) {
                            this.singleBulletGroup[s].remove();
                        }
                    }
                    for (let a = 0; a < this.burstBulletGroup.length; a++) { // same collision detection for player burst shot
                        if (this.burstBulletGroup[a].overlaps(this.enemy[k])) {
                            this.burstBulletGroup[a].remove();
                        }
                    }
                }
            }
        }
    }

    createSingleShot(x, y, angle) { // single boolets
        let tempBullet = new Sprite(x, y);
        tempBullet.diameter = 10;
        tempBullet.color = 'yellow';
        tempBullet.life = 60;
        // tempBullet.overlaps(allSprites);

        // tempBullet.collider = "k"
        tempBullet.direction = tempBullet.angleTo(angle);
        tempBullet.speed = 4;
        return tempBullet;
    }

    createBurstBullet(x, y, angle) { // burst ones
        let tempBurst = new Sprite(x, y);
        tempBurst.diameter = 5;
        tempBurst.color = 'orange';
        tempBurst.life = 60;
        // tempBurst.collider = "k"
        // tempBurst.overlaps(allSprites);
        tempBurst.direction = tempBurst.angleTo(angle);
        tempBurst.speed = 4;
        return tempBurst;
    }

    rotateDirection(object) {
        object.rotation = object.direction;
    }

    shipRotate() {
        for (let i = 4; i < this.ship.length; i++) {
            this.rotateDirection(this.ship[i]);
        }
    }
}