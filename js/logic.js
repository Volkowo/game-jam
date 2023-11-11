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

        this.thingsToRemove;
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
        this.thingsToRemove = new Group();
        this.singleBulletGroup = new Group();
        this.burstBulletGroup = new Group();
        this.enemyBulletGroup = new Group();
        this.selection = new Group();
        this.enemy = new Group();
        this.dragSelection();

        this.enemy.push(factory.createEnemyOne(random(300, 400), random(100, 200)));
        this.enemy.push(factory.createEnemyOne(random(1200, 1300), random(200, 300)));
        // this.enemyRandomSequence();
    }

    draw(factory) {
        strokeWeight(1);
        this.gameTimer();

        this.checkShipAmount();
        this.clickDrag();

        for (let i = 4; i < this.ship.length; i++) {
            this.movementLogic(this.ship[i]);
            this.selectionCircle(this.ship[i]);
            this.shipRotate(this.ship[i]);
            this.selectLogic('One', '1', this.ship[i]);
            this.selectLogic('Two', '2', this.ship[i]);
            this.selectLogic('Three', '3', this.ship[i]);
            this.selectLogic('Four', '4', this.ship[i]);
        }

        for (let j = 0; j < this.enemy.length; j++) {
            this.randomEnemyBehavior(this.enemy[j], j);
            this.assignEnemyBehavior(this.enemy[j]);
            this.enemyAttackBase(this.enemy[j]);
            for (let z = 4; z < this.ship.length; z++) {
                if (this.enemy[j] == undefined) {
                    return
                }
                this.detectionLogic(this.enemy[j], this.ship[z]);
                if (this.ship[z] == undefined) {
                    return
                }
                this.shootingLogic(this.enemy[j], this.ship[z]);
            }
        }

        for (let k = 0; k < this.resource.length; k++) {
            this.resourceRegeneration(this.resource[k]);
            this.spawnEnemyAtResource(factory, this.resource[k]);
            for (let j = 4; j < this.ship.length; j++) {
                this.resourceCollectionLogic(this.resource[k], this.ship[j]);
            }
        }

        this.shipAmount = 0;
        this.checkShipAmount();
    }

    gameTimer() {
        if (frameCount % 60 == 0) {
            this.time++;
        }
    }

    selectLogic(type, binding, ship) {
        if (kb.presses(binding)) {
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
            if (this.ship[i].moving == true && this.shipAmount < this.ship.length) {
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
            noFill();
            strokeWeight(2);
            stroke("green");
            ellipse(ship.x, ship.y, 50);

            strokeWeight(0.3);
            stroke("red");
            ellipse(ship.x, ship.y, ship.range * 2 - 30);
        }
    }

    movementLogic(ship) {
        // if (mouse.pressing('Right')) {
        //     if (ship.selected == true) {
        //         ship.moveTo(mouseX, mouseY, ship.movementSpeed);
        //         ship.visible = true;
        //         ship.goCollect = false;
        //     }
        // }

        if (mouse.pressing('right')) {
            if (ship.selected == true) {
                ship.moving = true;
                ship.locationX = mouseX;
                ship.locationY = mouseY;
            }
        }
        if (dist(ship.locationX, ship.locationY, ship.x, ship.y) < 0) {
            ship.moving = false;
        }
        if (ship.moving == true) {
            ship.moveTo(ship.locationX, ship.locationY, ship.movementSpeed);
            strokeWeight(0.5);
            stroke('green');
            line(ship.x, ship.y, ship.locationX, ship.locationY);
        }
    }

    resourceCollectionLogic(resource, ship) {
        this.amountReducedOne = 0;
        this.amountReducedTwo = 0;
        this.amountReducedThree = 0;
        this.amountReducedFour = 0;
        // COLLECTING RESOURCE FROM RESOURCE NODE
        if (ship.type == 'One') {
            this.amountReducedOne = ship.collectRate * this.counterOne;
        }
        else if (ship.type == 'Two') {
            this.amountReducedTwo = ship.collectRate * this.counterTwo;
        }
        else if (ship.type == 'Three') {
            this.amountReducedThree = ship.collectRate * this.counterThree;
        }
        else if (ship.type == 'Four') {
            this.amountReducedFour = ship.collectRate * this.counterFour;
        }
        if (ship.colliding(resource)) {
            this.amountReduced = this.amountReducedOne + this.amountReducedTwo + this.amountReducedThree;
            if (resource.resourcePool < this.amountReduced && ship.selected == true) {
                if (frameCount % ship.collectTick == 0) {
                    resource.remainingAmount = resource.resourcePool;
                    resource.resourcePool -= resource.remainingAmount;
                    this.base.baseBag += resource.remainingAmount;
                    if(resource.size == "Small"){
                        resource.visible = false;
                        resource.collider = 'n';
                    }
                }
            } else {
                if (frameCount % ship.collectTick == 0) {
                    resource.resourcePool -= this.amountReduced;
                    ship.shipBag += ship.collectRate;
                    ship.collectTimer--;
                    this.base.baseBag += this.amountReduced;
                }
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
                    resource.resourcePool += this.regenValue;
                }
            }
        }

    }

    // this is for the big resource. It will change spawnEnemy to true when said resource reaches the cap.
    // this will allow the big resource to spawn enemies

    displayText() {
        this.base.text = this.base.baseBag;
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
            enemy.moveTo(this.enemyX, this.enemyY, enemy.movementSpeed);
        }
    }

    enemyHuntBase(enemy) {
        if (enemy.behavior == "Hunting" && enemy.detectShip == false) {
            enemy.rotateTo(this.base.x, this.base.y, 5);
            enemy.moveTo(this.base.x, this.base.y, enemy.movementSpeed);
        }
    }


    enemySurroundResource(enemy) {
        for (let k = 0; k < this.resource.length; k++) {
            if (this.resource[k].size == "Big") {
                this.enemyX = random(this.resource[k].x - 80, this.resource[k].x + 80);
                this.enemyY = random(this.resource[k].y - 80, this.resource[k].y + 80);

                if (this.enemyX > this.resource[k].x - 20 && this.enemyX < this.resource[k].x + this.resource[k].w + 20) {
                    this.enemyX = random(this.resource[k].x - 80, this.resource[k].x + 80);
                }

                if (this.enemyY > this.resource[k].y - 20 && this.enemyY < this.resource[k].y + this.resource[k].h + 20) {
                    this.enemyY = random(this.resource[k].y - 80, this.resource[k].y + 80);
                }

                enemy.rotation = enemy.direction;
                if (frameCount % 25 == 0 && enemy.behavior == "Guard" && enemy.detectShip == false) {
                    enemy.rotateTo(this.enemyX, this.enemyY, 5);
                } else if (frameCount % 30 == 0 && enemy.behavior == "Guard" && enemy.detectShip == false) {
                    enemy.moveTo(this.enemyX, this.enemyY, enemy.movementSpeed);
                }
            }
        }
    }

    checkSpawnEnemy(resource) {
        if (resource.size == "Big" && this.enemy.length < 25) {
            resource.spawnEnemy = true;
        } else {
            resource.spawnEnemy = false;
        }
    }

    spawnEnemyAtResource(factory, resource) {
        this.checkSpawnEnemy(resource);
        if (resource.spawnEnemy == true) {
            if (resource.cooldown > 0) {
                resource.cooldown--;
            } else {
                this.enemyProgression(factory, resource);
            }
        }
    }

    enemyProgression(factory, resource) {
        if (this.time < 60) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyOne(resource.x + 50, resource.y + 50));
            resource.cooldown = Math.floor(random(1700, 1800)); // 60 SECs
            // resource.cooldown = Math.floor(random(30, 60));

        }

        if (this.time > 60 && this.time < 120) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyOne(resource.x + 50, resource.y + 50));
            resource.cooldown = Math.floor(random(1200, 1400));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 120 && this.time < 180) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyOne(resource.x + 50, resource.y + 50));
            this.enemy.push(factory.createEnemyOne(resource.x + 150, resource.y + 50));
            resource.cooldown = Math.floor(random(900, 1000));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 180 && this.time < 240) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyOne(resource.x + 50, resource.y + 50));;
            this.enemy.push(factory.createEnemyTwo(resource.x + 50, resource.y + 50));
            resource.cooldown = Math.floor(random(1000, 1200));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 240 && this.time < 300) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyTwo(resource.x + 50, resource.y + 50));
            this.enemy.push(factory.createEnemyTwo(resource.x + 100, resource.y + 50));
            resource.cooldown = Math.floor(random(1000, 1200));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 300 && this.time < 360) {
            this.enemy.push(factory.createEnemyTwo(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyTwo(resource.x + 50, resource.y + 50));
            this.enemy.push(factory.createEnemyThree(resource.x + 100, resource.y + 50));
            resource.cooldown = Math.floor(random(1700, 1800));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 360 && this.time < 420) {
            this.enemy.push(factory.createEnemyTwo(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyThree(resource.x + 50, resource.y + 50));
            this.enemy.push(factory.createEnemyThree(resource.x + 100, resource.y + 50));
            resource.cooldown = Math.floor(random(1700, 1800));
            // resource.cooldown = Math.floor(random(30, 60));

        }

        if (this.time > 420 && this.time < 480) {
            this.enemy.push(factory.createEnemyTwo(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyOne(resource.x + 50, resource.y + 50));
            this.enemy.push(factory.createEnemyThree(resource.x + 100, resource.y + 50));
            this.enemy.push(factory.createEnemyThree(resource.x + 150, resource.y + 50));
            resource.cooldown = Math.floor(random(1700, 1800));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 480 && this.time < 540) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyFour(resource.x + 100, resource.y + 50));
            resource.cooldown = Math.floor(random(1700, 1800));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 540 && this.time < 600) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyThree(resource.x + 50, resource.y + 50));
            this.enemy.push(factory.createEnemyFour(resource.x + 100, resource.y + 50));
            this.enemy.push(factory.createEnemyTwo(resource.x + 150, resource.y + 50));
            resource.cooldown = Math.floor(random(1800, 2000));
            // resource.cooldown = Math.floor(random(30, 60));
        }

        if (this.time > 600) {
            this.enemy.push(factory.createEnemyOne(resource.x, resource.y + 50));
            this.enemy.push(factory.createEnemyOne(resource.x + 50, resource.y + 50));
            this.enemy.push(factory.createEnemyThree(resource.x + 150, resource.y + 50));
            this.enemy.push(factory.createEnemyFour(resource.x + 200, resource.y + 50));
            this.enemy.push(factory.createEnemyTwo(resource.x + 250, resource.y + 50));
            resource.cooldown = Math.floor(random(1800, 2000));
            // resource.cooldown = Math.floor(random(30, 60));
        }
    }

    randomEnemyBehavior(enemy, j) {
        if (this.time <= 30) {
            enemy.behavior = "Random"
        }

        if (this.time > 60) {
            if (j % 5 == 0) {
                enemy.behavior = "Hunting"
            } else if (j % 3) {
                enemy.behavior = "Random"
            } else {
                enemy.behavior = "Guard"
            }
        }
    }

    assignEnemyBehavior(enemy) {
        this.enemyRandomType(enemy);
        this.enemyHuntBase(enemy);
        this.enemySurroundResource(enemy);
    }

    // Checks the distance between the enemy ship and each type of player's ship. 
    // shipType is, well, the ship type of the player ship
    // i = 4 because there are 4 ships that are spawned off-screen to get the stats for the UI board.
    checkDistance(shipType, enemy, ship) {
        if (ship.type == shipType) {
            this.distance = dist(ship.x, ship.y, enemy.x, enemy.y);
            if (this.distance < enemy.range) {
                enemy.moveTo(enemy.x, enemy.y, 0);
                if (enemy.shootingTimer <= 0) {
                    this.enemyBulletGroup.push(this.enemyBullets(enemy.x, enemy.y, ship));
                    enemy.shootingTimer = enemy.reloadTimer;
                }
            } else if (this.distance > enemy.range + 1) {
                this.assignEnemyBehavior(enemy);
            }
        }

        for (let s = 0; s < this.enemyBulletGroup.length; s++) { // collision for enemy single shot (needs to be outisde of the if statement so its always active)
            if (this.enemyBulletGroup[s].collides(ship)) {
                this.thingsToRemove.push(this.enemyBulletGroup[s]);
                if (ship.type == "One") { // damage when hitting ship type 1
                    ship.hitPoint -= 5;
                } else if (ship.type == "Two") { // damage when hitting ship type 2
                    ship.hitPoint -= 8;
                } else if (ship.type == "Three") { // damage when hitting ship type 3 
                    ship.hitPoint -= 5;
                } else if (ship.type == "Four") { // damage when hitting ship type 4
                    ship.hitPoint -= 10;
                }
                if (ship.hitPoint <= 0) {
                    this.thingsToRemove.push(ship)
                }
            }
        }
        this.thingsToRemove.removeAll();
    }

    // does the actual detection
    detectionLogic(enemy, ship) {
        enemy.shootingTimer--;
        if (ship.type === "One") {
            this.checkDistance("One", enemy, ship);
        }
        if (ship.type === "Two") {
            this.checkDistance("Two", enemy, ship);
        }
        if (ship.type === "Three") {
            this.checkDistance("Three", enemy, ship);
        }
        if (ship.type === "Four") {
            this.checkDistance("Four", enemy, ship);
        }
    }

    enemyAttackBase(enemy) {
        this.attackBase = dist(this.base.x, this.base.y, enemy.x, enemy.y);
        if (this.attackBase < enemy.range) {
            enemy.moveTo(enemy.x, enemy.y, 0);
            if (enemy.shootingTimer <= 0) {
                this.enemyBulletGroup.push(this.enemyBullets(enemy.x, enemy.y, this.base));
                enemy.shootingTimer = enemy.reloadTimer;
            }
        } else if (this.distance > enemy.range + 1) {
            this.assignEnemyBehavior(enemy);
        }
        for (let s = 0; s < this.enemyBulletGroup.length; s++) {
            if (this.enemyBulletGroup[s].collides(this.base)) {
                this.thingsToRemove.push(this.enemyBulletGroup[s]);
                if (enemy.type == "One") { // damage when hitting the base type 1
                    this.base.hitPoint -= 5 / 2;
                } else if (enemy.type == "Two") { // damage when hitting the base type 2
                    this.base.hitPoint -= 8 / 2;
                } else if (enemy.type == "Three") { // damage when hitting the base type 3 
                    this.base.hitPoint -= 5 / 2;
                } else if (enemy.type == "Four") { // damage when hitting the base type 4
                    this.base.hitPoint -= 10 / 2;
                }
                if (this.base.hitPoint <= 0) {
                    // this.thingsToRemove.push(this.base)
                    // Game Over
                }
            }
        }
    }

    enemyBullets(x, y, angle) {
        let tempBullet = new Sprite(x, y);
        tempBullet.diameter = 20;
        tempBullet.color = 'purple';
        tempBullet.life = 60;
        tempBullet.overlaps(allSprites);
        tempBullet.direction = tempBullet.angleTo(angle);
        tempBullet.speed = 4;
        return tempBullet;
    }

    // ------- PLAYER SHOOTING
    shootingLogic(enemy, ship) {
        ship.shootingTimer--;

        this.distance = dist(enemy.x, enemy.y, ship.x, ship.y);
        if (this.distance < ship.range) {
            if (ship.shootingTimer <= 0) {
                this.singleBulletGroup.push(this.createSingleShot(ship.x, ship.y, enemy));
                ship.shootingTimer = ship.reloadTimer;
            }
        }
        for (let s = 0; s < this.singleBulletGroup.length; s++) {
            if (this.singleBulletGroup[s].collides(enemy)) {
                this.thingsToRemove.push(this.singleBulletGroup[s]);
                if (enemy.type == "One") {
                    enemy.hitPoint -= this.ship[0].attack;
                    if (enemy.hitPoint <= 0) {
                        this.thingsToRemove.push(enemy);
                    }
                } else if (enemy.type == "Two") {
                    enemy.hitPoint -= this.ship[1].attack;
                    if (enemy.hitPoint <= 0) {
                        this.thingsToRemove.push(enemy);
                    }
                } else if (enemy.type == "Three") {
                    enemy.hitPoint -= this.ship[2].attack;
                    if (enemy.hitPoint <= 0) {
                        this.thingsToRemove.push(enemy);
                    }
                } else if (enemy.type == "Four") {
                    enemy.hitPoint -= this.ship[3].attack;
                    if (enemy.hitPoint <= 0) {
                        this.thingsToRemove.push(enemy);
                    }
                }
            }
        }
        this.thingsToRemove.removeAll();
    }

    createSingleShot(x, y, angle) { // single boolets
        let tempBullet = new Sprite(x, y);
        tempBullet.diameter = 10;
        tempBullet.color = 'yellow';
        tempBullet.life = 60;
        tempBullet.mass = 0.1;
        tempBullet.overlaps(allSprites);

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
        tempBurst.overlaps(allSprites);

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
    }
}