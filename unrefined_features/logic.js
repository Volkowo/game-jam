class Logic {
    constructor() {
        this.base;
        this.smallResource;
        this.bigResource;
        this.ship;
        this.resource;
        this.selection;
        this.enemy;
        this.time = 0;
        // this.distance = new Array ();

        this.enemyX = 0;
        this.enemyY = 0;
        this.shipAmount = 0;
        this.counterOne = 0;
        this.counterTwo = 0;
        this.counterThree = 0;
        this.counterFour = 0;
        this.amountReduced = 0;

        this.amountReducedOne = 0;
        this.amountReducedTwo = 0;
        this.amountReducedThree = 0;
        this.amountReducedFour = 0;

        this.regenTimer = 0;
        this.regenValue = 0;

        this.singleShot = true;
        this.burstFire = false;

        this.rotate = true;
        this.move = false;

        this.dragSelect;
        this.startingX;
        this.startingY;
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
        this.dragSelection();

        this.enemy.push(factory.createEnemyOne(450, 240));
        this.enemy.push(factory.createEnemyOne(580, 280));
        this.enemy.push(factory.createEnemyOne(780, 280));
        // this.enemyRandomSequence();
    }

    draw(factory) {
        strokeWeight(1);
        this.gameTimer();
        this.displayCoordinates();

        this.resourceCollectionLogic();
        this.checkShipAmount();
        this.clickDrag();

        for (let i = 4; i < this.ship.length; i++) {
            this.movementLogic(this.ship[i]);
            this.selectionCircle(this.ship[i]);
            this.shipRotate(this.ship[i]);
            this.shootingLogic(this.ship[i]);
            this.selectLogic('One', '1', this.ship[i]);
            this.selectLogic('Two', '2', this.ship[i]);
            this.selectLogic('Three', '3', this.ship[i]);
            this.selectLogic('Four', '4', this.ship[i]);
        }

        for (let j = 0; j < this.enemy.length; j++) {
            this.randomEnemyBehavior(this.enemy[j], j);
            this.assignEnemyBehavior(this.enemy[j]);
            this.detectionLogic(this.enemy[j]);
        }

        for (let k = 0; k < this.resource.length; k++) {
            this.resourceRegeneration(this.resource[k]);
            this.spawnEnemyAtResource(factory, this.resource[k]);
        }


        // console.log(allSprites)
        // console.log(this.amountReduced);
        // allSprites.debug = true;
        // console.log("REGEN TIMER: " + this.regenTimer, "REGEN VALUE: " + this.regenValue)
        // console.log("COUNTER ONE: " + this.counterOne, "COUNTER TWO: " + this.counterTwo,
        //     "COUNTER Three: " + this.counterThree, "COUNTER FOUR: " + this.counterFour, "SHIP AMOUNT: " + this.shipAmount);
    }

    gameTimer() {
        if (frameCount % 60 == 0) {
            this.time++;
        }
    }

    selectLogic(type, binding, ship) {
        if (kb.presses(binding)) {
            // console.log("Test")
            this.checkShip(type, ship);
        }
    }

    // Check's which ship is currently being selected through the keyboard input
    checkShip(type, ship) {
        if (ship.type == type) {
            ship.selected = true;
        } else {
            ship.selected = false;
        }
    }

    checkShipAmount() {
        this.counterOne = 0;
        this.counterTwo = 0;
        this.counterThree = 0;
        this.counterFour = 0;

        for (let i = 4; i < this.ship.length; i++) {
            if (this.ship[i].selected == true && this.shipAmount < this.ship.length) {
                if (this.ship[i].type == 'One') {
                    this.shipAmount++;
                    this.counterOne++;
                } if (this.ship[i].type == 'Two') {
                    this.shipAmount++;
                    this.counterTwo++;
                } if (this.ship[i].type == 'Three') {
                    this.shipAmount++;
                    this.counterThree++;
                } if (this.ship[i].type == 'Four') {
                    this.shipAmount++;
                    this.counterFour++;
                } else {
                    this.shipAmount = 0;
                }
            }
        }

    }

    selectionCircle(ship) {
        if (ship.selected == true) {
            // this.selection.push(factory.createSelection(ship.x, ship.y, ship.w + 30));
            noFill();
            strokeWeight(2);
            stroke("green");
            ellipse(ship.x, ship.y, 50);
        }
        // if(this.selection.length > 1){
        //     this.selection.shift();
        // }
    }

    movementLogic(ship) {
        if (mouse.pressing('Right')) {

            if (ship.selected == true) {
                ship.moveTo(mouseX, mouseY, 4.5);
                ship.visible = true;
                ship.goCollect = false;
            }

        }
    }

    resourceCollectionLogic() {
        this.amountReducedOne = 0;
        this.amountReducedTwo = 0;
        this.amountReducedThree = 0;
        this.amountReducedFour = 0;

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

                        if (this.ship[j].type == 'One') {
                            this.amountReducedOne = this.ship[j].collectRate * this.counterOne;
                            // console.log(this.amountReducedOne);
                        }
                        else if (this.ship[j].type == 'Two') {
                            this.amountReducedTwo = this.ship[j].collectRate * this.counterTwo;
                            // console.log(this.amountReducedTwo);
                        }
                        else if (this.ship[j].type == 'Three') {
                            this.amountReducedThree = this.ship[j].collectRate * this.counterThree;
                            // console.log(this.amountReducedThree);
                        }
                        else if (this.ship[j].type == 'Four') {
                            this.amountReducedFour = this.ship[j].collectRate * this.counterFour;
                            // console.log(this.amountReducedFour);
                        }

                        // console.log(this.amountReducedOne, this.amountReducedTwo, this.amountReducedThree, this.amountReducedFour)
                        this.amountReduced = this.amountReducedOne + this.amountReducedTwo + this.amountReducedThree + this.amountReducedFour;
                        // this.amountReduced = this.ship[j].collectRate * this.shipAmount;
                        if (this.resource[i].resourcePool < this.amountReduced) {
                            if (frameCount % this.ship[j].collectTick == 0) {
                                console.log("Amount Reduced > resource pool")
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


    // --------- RESOURCE
    resourceRegeneration(resource) {

        if (resource.size == "Big") {
            if (resource.resourcePool < resource.resourceCap) {
                this.regenTimer = Math.floor(random(20, 60));
                this.regenValue = Math.floor(random(0, 10));
                if (frameCount % this.regenTimer == 0) {
                    // console.log("REGEN ON")
                    resource.resourcePool += this.regenValue;
                }
            }
        }

    }

    displayCoordinates() {
        text("X: " + mouseX + " Y: " + mouseY, mouseX - 40, mouseY - 5)
    }

    // this is for the big resource. It will change spawnEnemy to true when said resource reaches the cap.
    // this will allow the big resource to spawn enemies
    checkSpawnEnemy(resource) {

        // console.log("BEFORE: " + this.resource[5].spawnEnemy, this.resource[6].spawnEnemy);
        if (resource.resourcePool >= resource.resourceCap && resource.size == "Big") {
            resource.spawnEnemy = true;
        } else {
            resource.spawnEnemy = false;
        }
        // console.log("AFTER: " + this.resource[5].spawnEnemy, this.resource[6].spawnEnemy);

    }

    spawnEnemyAtResource(factory, resource) {
        this.checkSpawnEnemy(resource);
        if (resource.spawnEnemy == true) {
            if (resource.cooldown > 0) {
                resource.cooldown--;
            } else {
                this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
                this.enemy.push(factory.createEnemyOne(resource.x + 50, resource.y + 50));

                resource.cooldown = Math.floor(random(480, 600));
            }
        }
    }

    displayText() {
        // console.log("Calling the method")
        this.base.text = this.base.baseBag;
        // console.log("Values before return: ", this.base.text, this.base.baseBag)
        return this.base.baseBag;
    }


    // -------- ENEMY-RELATED STUFF
    enemyRandomType(enemy) {
        this.enemyX = random(250, 1500);
        this.enemyY = random(240, 820);
        enemy.rotation = enemy.direction;
        if (frameCount % 25 == 0 && enemy.behavior == "Random" && enemy.detectShip == false) {
            enemy.rotateTo(this.enemyX, this.enemyY, 5);
        } else if (frameCount % 40 == 0 && enemy.behavior == "Random" && enemy.detectShip == false) {
            enemy.moveTo(this.enemyX, this.enemyY, 1);
        }
    }

    enemyHuntBase(enemy) {
        if (enemy.behavior == "Hunting" && enemy.detectShip == false) {
            enemy.rotateTo(this.base.x, this.base.y, 5);
            enemy.moveTo(this.base.x, this.base.y, 1);
        }
    }


    enemySurroundResource(enemy) {
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

                enemy.rotation = enemy.direction;
                if (frameCount % 25 == 0 && enemy.behavior == "Guard" && enemy.detectShip == false) {
                    enemy.rotateTo(this.enemyX, this.enemyY, 5);
                } else if (frameCount % 30 == 0 && enemy.behavior == "Guard" && enemy.detectShip == false) {
                    enemy.moveTo(this.enemyX, this.enemyY, 1);
                }
            }
        }
    }

    randomEnemyBehavior(enemy, j) {
        // console.log(i)
        if (j % 2 == 0) {
            enemy.behavior = "Random";
        } else {
            enemy.behavior = "Guard";
        }
    }

    assignEnemyBehavior(enemy) {
        console.log(enemy);
        this.enemyRandomType(enemy);
        this.enemyHuntBase(enemy);
        this.enemySurroundResource(enemy);
    }

    // Checks the distance between the enemy ship and each type of player's ship. 
    // shipType is, well, the ship type of the player ship
    // i = 4 because there are 4 ships that are spawned off-screen to get the stats for the UI board.
    checkDistance(shipType, enemy) {

        for (let k = 4; k < this.ship.length; k++) {
            if (this.ship[k].type == shipType) {
                this.distance = dist(this.ship[k].x, this.ship[k].y, enemy.x, enemy.y);
                if (this.distance < 200) {
                    enemy.moveTo(enemy.x, enemy.y, 0);
                    if (enemy.shootingTimer <= 0) {
                        this.enemyBulletGroup.push(this.enemyBullets(enemy.x, enemy.y, this.ship[k]));
                        enemy.shootingTimer = enemy.reloadTimer;
                    }
                    // return true;
                } else if (this.distance > 201) {
                    // console.log("else")
                    this.assignEnemyBehavior(enemy);
                    // return false;
                }
            }
            for (let s = 0; s < this.enemyBulletGroup.length; s++) { // collision for enemy single shot (needs to be outisde of the if statement so its always active)
                console.log(this.enemyBulletGroup[s], this.ship[k])
                if (this.enemyBulletGroup[s].collides(this.ship[k])) {
                    this.enemyBulletGroup[s].remove();
                    if (this.ship[k].type == "One") { // damage when hitting ship type 1
                        this.ship[k].hitPoint -= 10;
                        if (this.ship[k].hitPoint <= 0) {
                            this.ship[k].remove();
                        }
                    } else if (this.ship[k].type == "Two") { // damage when hitting ship type 2
                        this.ship[k].hitPoint -= 10;
                        if (this.ship[k].hitPoint <= 0) {
                            this.ship[k].remove();
                        }
                    } else if (this.ship[k].type == "Three") { // damage when hitting ship type 3 
                        this.ship[k].hitPoint -= 10;
                        if (this.ship[k].hitPoint <= 0) {
                            this.ship[k].remove();
                        }
                    } else if (this.ship[k].type == "Four") { // damage when hitting ship type 4
                        this.ship[k].hitPoint -= 10;
                        if (this.ship[k].hitPoint <= 0) {
                            this.ship[k].remove();
                        }
                    }
                }
            }
        }

    }

    // does the actual detection
    detectionLogic(enemy) {

        enemy.shootingTimer--;
        // console.log(this.enemy[1].shootingTimer)
        // enemy.shootingTimer--;
        this.checkDistance("One", enemy);
        this.checkDistance("Two", enemy);
        this.checkDistance("Three", enemy);
        this.checkDistance("Four", enemy);

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
    shootingLogic(ship) {
        if (kb.presses('q')) { // firing mode (single)
            this.singleShot = true;
            this.burstFire = false;
        } else if (kb.presses('w')) { // burst mode
            this.singleShot = false;
            this.burstFire = true;
        }


        ship.shootingTimer--
        if (ship.shootingTimer <= 0) {
            for (let k = 0; k < this.enemy.length; k++) { // for distance check below
                this.distance = dist(this.enemy[k].x, this.enemy[k].y, ship.x, ship.y);
                if (this.distance <= 200) { // create player bullet sprites
                    if (this.singleShot === true) { // for above boolean if statement (toggled after 'q' key press)
                        this.singleBulletGroup.push(this.createSingleShot(ship.x, ship.y, this.enemy[k]));
                    } else if (this.burstFire === true) { // creates three sprites spread out toggle after a 'w' key press
                        this.burstBulletGroup.push(this.createBurstBullet(ship.x, ship.y - 15, this.enemy[k]));
                        this.burstBulletGroup.push(this.createBurstBullet(ship.x, ship.y, this.enemy[k]));
                        this.burstBulletGroup.push(this.createBurstBullet(ship.x, ship.y + 15, this.enemy[k]));
                    }
                    ship.shootingTimer = ship.reloadTimer;
                }
                for (let s = 0; s < this.singleBulletGroup.length; s++) { // collision for player single shot (needs to be outisde of the if statement so its always active)
                    console.log(this.singleBulletGroup[s], this.enemy[k]);
                    if (this.singleBulletGroup[s].collides(this.enemy[k])) {
                        this.singleBulletGroup[s].remove();
                        if (this.enemy[k].type == "One") { // damage when hitting enemy type 1
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
                        } else if (this.enemy[k].type == "Two") { // damage when hitting enemy type 2
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
                        } else if (this.enemy[k].type == "Three") { // damage when hitting enemy type 3 
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
                        } else if (this.enemy[k].type == "Four") { // damage when hitting enemy type 4
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
                        }
                    }
                }
                for (let a = 0; a < this.burstBulletGroup.length; a++) { // same collision detection for player burst shot
                    if (this.burstBulletGroup[a].collides(this.enemy[k])) {
                        this.burstBulletGroup[a].remove();
                        if (this.enemy[k].type == "One") { // damage when hitting enemy type 1 with burst
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
                        } else if (this.enemy[k].type == "Two") { // damage when hitting enemy type 2 with burst
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
                        } else if (this.enemy[k].type == "Three") { // damage when hitting enemy type 3 with burst
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
                        } else if (this.enemy[k].type == "Four") { // damage when hitting enemy type 4 with burst
                            this.enemy[k].hitPoint -= 10;
                            if (this.enemy[k].hitPoint <= 0) {
                                this.enemy[k].remove();
                            }
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
        tempBullet.mass = 0.1;
        tempBullet.overlaps(this.ship);
        tempBullet.overlaps(this.burstBulletGroup);
        tempBullet.overlaps(this.singleBulletGroup);

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
        tempBurst.mass = 0.1;
        tempBurst.overlaps(this.ship);
        tempBurst.overlaps(this.burstBulletGroup);
        tempBurst.overlaps(this.singleBulletGroup);

        // tempBurst.collider = "k"
        // tempBurst.overlaps(allSprites);
        tempBurst.direction = tempBurst.angleTo(angle);
        tempBurst.speed = 4;
        return tempBurst;
    }

    shipRotate(ship) {
        ship.rotation = ship.direction;
    }



    // ------------ SELECTION WITH MOUSE
    dragSelection() { // select box sprite
        this.dragSelect = new Sprite();
        this.dragSelect.stroke = 'green';
        this.dragSelect.strokeWeight = 3;
        this.dragSelect.color.setAlpha(0.6);
        this.dragSelect.overlapping(allSprites);
    }

    clickDrag() {
        if (mouse.presses('left')) {
            //set the startingX and startingY on mouse presses
            this.startingX = mouseX;
            this.startingY = mouseY;
        }
        if (mouse.pressing('left')) {
            if (mouseX > this.startingX) {
                // +1 cuz it doesnt work if the w is 0
                this.dragSelect.w = (mouseX - this.startingX) + 1;
                //get average between startingX and mouseX cuz the sprites.x exist in the middle of the sprite
                this.dragSelect.x = (this.startingX + mouseX) / 2;
            }
            if (mouseY > this.startingY) {
                // +1 cuz it doesnt work if the h is 0
                this.dragSelect.h = (mouseY - this.startingY) + 1;
                //get average between startingY and mouseY cuz the sprites.y exist in the middle of the sprite
                this.dragSelect.y = (this.startingY + mouseY) / 2;
            }

            //For reverse select box
            if (mouseX < this.startingX) {
                // +1 cuz it doesnt work if the w is 0
                this.dragSelect.w = (this.startingX - mouseX) + 1;
                //get average then add mouseX
                this.dragSelect.x = ((this.startingX - mouseX) / 2) + mouseX;
            }
            if (mouseY < this.startingY) {
                // +1 cuz it doesnt work if the h is 0
                this.dragSelect.h = (this.startingY - mouseY) + 1;
                //get average then add mouseY
                this.dragSelect.y = ((this.startingY - mouseY) / 2) + mouseY;
            }
        } else {
            //dont know why but adding this here preventing glitching
            this.startingX = mouseX;
            this.startingY = mouseY;

            //put the select box offscreen if not pressing
            this.dragSelect.w = 1;
            this.dragSelect.h = 1;
            this.dragSelect.x = -100;
            this.dragSelect.y = -100;
        }
        if (mouse.released('left') && mouseX > 200 && mouseY > 50) {
            for (let i = 4; i < this.ship.length; i++) {
                let shipToSelect = this.ship[i];
                if (this.dragSelect.overlapping(shipToSelect)) {
                    shipToSelect.selected = true;
                } else {
                    shipToSelect.selected = false;
                }
            }
        }

        this.shipAmount = 0;
        this.checkShipAmount();
    }
}