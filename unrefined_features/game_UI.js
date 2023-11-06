class UI {
    constructor() {
        this.backgroundUI;
        this.profilePicture;
        this.statBlock;
        this.buildDisplay;
        this.upgradeDisplay;
        this.upgraded_isplay;
        this.resourceDisplayBackground;
        this.gameFrameTop;
        this.gameFrameBottom;
        this.gameFrameRight;
        this.shipType;
        this.startBuildingShipOne = false;
        this.startBuildingShipTwo = false;
        this.startBuildingShipThree = false;
        this.startBuildingShipFour = false;
        
        this.ship;
        this.factory;
        this.resource;
        this.base;
        this.logic;
    }
    
    preload() {
        this.playerSchooner = loadImage("assets/img/ship_img/schooner_player.png");
        this.playerGalleon = loadImage("assets/img/ship_img/galleon_player.png");
        this.playerFrigate = loadImage("assets/img/ship_img/frigate_player.png");
        this.playerManOWar = loadImage("assets/img/ship_img/manowar_player.png");
        this.goldFrame = loadImage("assets/UI/gold_display_frame.png");
        this.woodenUI = loadImage("assets/UI/UI_background.png");
        this.gameFont = loadFont("assets/font/new_rodin_pro.otf");
    }
    
    setup(factory) {
        this.ship = new Group();
        this.resource = new Group();
        
        this.gameButtons();
        this.UI_Sprites();
        
        this.base = factory.createBase(1000, H / 2 - 50);
        this.resource.push(factory.createSmallResource(1000, H / 2 - 200));
        this.resource.push(factory.createBigResource(300, H / 4));
        
        // For default ship stats
        this.ship.push(factory.createShipOne(10000, 10000));
        this.ship.push(factory.createShipTwo(10000, 10000));
        this.ship.push(factory.createShipThree(10000, 10000));
        this.ship.push(factory.createShipFour(10000, 10000));
        
        //Starting ships
        this.ship.push(factory.createShipOne(800, H/2));
        this.ship.push(factory.createShipTwo(800, H/2 + 100));
        this.ship.push(factory.createShipThree(800, H/2 + 200));
        this.ship.push(factory.createShipFour(800, H/2 + 300));

        //start
        this.trainingTime = 0;
    }
    
    draw() {
        textFont(this.gameFont);
        this.spawnShip();
        this.notificationManager();
    }
    
    UI_Sprites() {
        //Bedrock - may be add this??? to prevent ships to going into the UI or leave the screen
        this.gameFrameTop = new Sprite(W/2,0);
        this.gameFrameTop.w = W;
        this.gameFrameTop.h = 2;
        this.gameFrameTop.draw =()=> {
            noStroke();
            fill('brown');
            rect(0,0,W,2);
        }
        this.gameFrameTop.collider = 's';
        
        this.gameFrameBottom = new Sprite(W/2,H);
        this.gameFrameBottom.w = W;
        this.gameFrameBottom.h = 2;
        this.gameFrameBottom.draw =()=> {
            noStroke();
            fill('brown');
            rect(0,0,W,2);
        }
        this.gameFrameBottom.collider = 's';
        
        this.gameFrameRight = new Sprite(W,H/2);
        this.gameFrameRight.w = 2;
        this.gameFrameRight.h = H;
        this.gameFrameRight.draw =()=> {
            noStroke();
            fill('brown');
            rect(0,0,2,H);
        }
        this.gameFrameRight.collider = 's';


        //UI Background
        this.backgroundUI = new Sprite(105, H/2);
        this.backgroundUI.w = 210;
        this.backgroundUI.h = H;
        this.backgroundUI.draw =()=> {
            noStroke();
            fill(173, 112, 62);
            rect(-52.5, 0, 105, H);
            fill(115, 60, 15);
            rect(52.5, 0, 105, H);

            //UI Background Image
            tint(255,100);
            image(this.woodenUI, 0, 0);
        }
        this.backgroundUI.collider = "s";
        this.backgroundUI.visible = true;
        this.backgroundUI.layer = 101;

        //Upgrade Display
        this.upgradeDisplay = new Sprite(105, 480);
        this.upgradeDisplay.w = 200;
        this.upgradeDisplay.h = 800;
        this.upgradeDisplay.draw = function () {
            //Frame
            noStroke();
            fill(115, 60, 15);
            rect(0, -7.5, 200, 800);

            textAlign(CENTER,CENTER);
            fill('black');
            stroke('black');
            strokeWeight(1);
            textSize(11);
            text("Upgrades coming soon", 0, 0);
        }
        this.upgradeDisplay.collider = 'n';
        this.upgradeDisplay.visible = false;

        //Build Display
        this.buildDisplay = new Sprite(105, 480);
        this.buildDisplay.w = 200;
        this.buildDisplay.h = 800;
        this.buildDisplay.draw =()=> {
            //Frame
            noStroke();
            fill(115, 60, 15);
            rect(0, -7.5, 200, 800);
            
            //Background
            fill(246,238,227);
            rect(0, -300, 195, 195);
            rect(0, -102.5, 195, 195);
            rect(0, 95, 195, 195);
            rect(0, 292.5, 195, 195);
            
            //Ship Type Background
            rectMode(CORNER);
            fill(115, 60, 15);
            rect(-95,-395, 100, 25);
            rect(-95,-197, 100, 25);
            rect(-95, 0, 100, 25);
            rect(-95, 198, 100, 25);

            //Ship Type Display
            textAlign(CENTER, CENTER);
            strokeWeight(1);
            stroke(246,238,227);
            fill(246,238,227);
            textSize(14);
            text("Schooner", -45,-383.5);
            text("Galleon", -45,-185.5);
            text("Frigate", -45,11);
            text("Man-O-war", -45,208.5);
            
            //Stat Display
            strokeWeight(0.5);
            stroke(71, 40, 14);
            fill(71, 40, 14);
            textSize(10.5);
            textAlign(LEFT, CENTER);
            //Ship One
            text("Hit Point : " + this.ship[0].hitPoint, -10, -350);
            text("Attack : " + this.ship[0].attack, -10, -325);
            text("Speed : " + this.ship[0].movementSpeed, -10, -300);
            text("Collect Rate : " + this.ship[0].collectRate + "/s", -10, -275);
            text("Gold Cost : " + this.ship[0].cost, -10, -250);
            text("Build Time : 5s", -10, -225);
            //Ship Two
            text("Hit Point : " + this.ship[1].hitPoint, -10, -152.5);
            text("Attack : " + this.ship[1].attack, -10, -127.5);
            text("Speed : " + this.ship[1].movementSpeed, -10, -102.5);
            text("Collect Rate : " + this.ship[1].collectRate + "/s", -10, -77.5);
            text("Gold Cost : " + this.ship[1].cost, -10, -52.5);
            text("Build Time : 10s" + 's', -10, -27.5);
            //Ship Three
            text("Hit Point : " + this.ship[2].hitPoint, -10, 45);
            text("Attack : " + this.ship[2].attack, -10, 70);
            text("Speed : " + this.ship[2].movementSpeed, -10, 95);
            text("Collect Rate : " + this.ship[2].collectRate + "/s", -10, 120);
            text("Gold Cost : " + this.ship[2].cost, -10, 145);
            text("Build Time : 10s", -10, 170);
            //Ship Four
            text("Hit Point : " + this.ship[3].hitPoint, -10, 242.5);
            text("Attack : "+ this.ship[3].attack, -10, 267.5);
            text("Speed : " + this.ship[3].movementSpeed, -10, 292.5);
            text("Collect Rate : " + this.ship[3].collectRate + "/s", -10, 317.5);
            text("Gold Cost : " + this.ship[3].cost, -10, 342.5);
            text("Build Time : 25s", -10, 367.5);

            //Ship Profile Images
            image(this.playerSchooner,-55,-285);
            image(this.playerGalleon,-55,-80);
            image(this.playerFrigate,-55,110);
            image(this.playerManOWar,-55,310);

            //BuildAnimation
            // if(this.startBuildingShipOne == true){
            //     let width = 190;
            //     let time = (this.ship[0].buildTime/60);
            //     let offset = width/time;
            //     rect(-95,-370,width,10);
            //     if(frameCount %60 == 0){
            //         console.log('yes');
            //         width = width - offset;
            //     }
            // }
            if(this.startBuildingShipOne == true){
                let length = (this.ship[0].buildTime)/(300/190);
                rect(-95,-370,length,10);
            }
            if(this.startBuildingShipTwo == true){
                let length = (this.ship[1].buildTime)/(600/190);
                rect(-95,-172,length,10);
            }
            if(this.startBuildingShipThree == true){
                let length = (this.ship[2].buildTime)/(600/190);
                rect(-95, 25,length,10);
            }
            if(this.startBuildingShipFour == true){
                let length = (this.ship[3].buildTime)/(1500/190);
                rect(-95,223,length,10);
            }
        }
        this.buildDisplay.collider = 'n';
        this.buildDisplay.visible = true;

        //Resource Display Frame
        this.resourceDisplayBackground = new Sprite(105,25);
        this.resourceDisplayBackground.w = 160;
        this.resourceDisplayBackground.h = 40;
        this.resourceDisplayBackground.color = 'white';
        this.resourceDisplayBackground.draw =()=> {
            //Frame
            noStroke();
            // fill('white');
            // rect(0,0,160,40);

            image(this.goldFrame,0,0,200,45);

            textAlign(CENTER, CENTER);
            strokeWeight(1);
            stroke(71, 40, 14);
            fill(71, 40, 14);
            textSize(20);
            text("Gold: " + this.base.baseBag, 0, 0);
        }
        this.resourceDisplayBackground.collider = 'n';
        this.resourceDisplayBackground.layer = 1000;

        //______________________Notification pop-ups_________________________//
        this.noGold = new Sprite(360,50);
        this.noGold.draw = function() {
            noStroke();
            fill(0,0,0, 80);
            rect(0,0, 300, 100);

            strokeWeight(1);
            stroke('red');
            fill('red');
            textSize(25);
            text("You are broke, Bro.", -120 , -10);
            text("Get some Gold!", -100 , 25);
        }
        this.noGold.startCounter = false;
        this.noGold.counter = 0;
        this.noGold.visible = false;
        this.noGold.collider = 'n';
        
        this.shipBuilt = new Sprite(360,50);
        this.shipBuilt.draw = function() {
            noStroke();
            fill(0,0,0, 80);
            rect(0,0, 300, 100);
            
            strokeWeight(1);
            stroke('red');
            fill('red');
            textSize(25);
            text("Congrats", -120 , -10);
            text("You got a ship!", -100 , 25);
        }
        this.shipBuilt.startCounter = false;
        this.shipBuilt.counter = 0;
        this.shipBuilt.visible = false;
        this.shipBuilt.collider = 'n';
    }

    gameButtons() {
        this.buildButton = createButton("Build");
        this.buildButton.position(13, 58);
        this.buildButton.mouseClicked(() => {this.buildMode()});
        this.buildButton.style("width", "101px");
        this.buildButton.style("height", "30px");
        this.buildButton.style("background-color", "#f6eee3");
        this.buildButton.style("border-color", "#f6eee3");
        this.buildButton.style("color", "#47280e");
        this.buildButton.style("font-size", "15px");
        this.buildButton.hide();

        this.upgradeButton = createButton("Upgrade");
        this.upgradeButton.position(110, 58);
        this.upgradeButton.mouseClicked(() => {this.upgradeMode()});
        this.upgradeButton.style("width", "101px");
        this.upgradeButton.style("height", "30px");
        this.upgradeButton.style("background-color", "#f6eee3");
        this.upgradeButton.style("border-color", "#f6eee3");
        this.upgradeButton.style("color", "#47280e");
        this.upgradeButton.style("font-size", "15px");
        this.upgradeButton.show();

        this.buildButtonClone = createButton("Build");
        this.buildButtonClone.position(13, 58);
        //this.buildButtonClone.mouseClicked();
        this.buildButtonClone.style("width", "101px");
        this.buildButtonClone.style("height", "30px");
        this.buildButtonClone.style("background-color", "#733c0f");
        this.buildButtonClone.style("border-color", "#733c0f");
        this.buildButtonClone.style("color", "#f6eee3");
        this.buildButtonClone.style("font-size", "15px");
        this.buildButtonClone.show();
        this.buildButtonClone.attribute("disabled", "");
        
        this.upgradeButtonClone = createButton("Upgrade");
        this.upgradeButtonClone.position(112, 58);
        //this.upgradeButtonClone.mouseClicked();
        this.upgradeButtonClone.style("width", "101px");
        this.upgradeButtonClone.style("height", "30px");
        this.upgradeButtonClone.style("background-color", "#733c0f");
        this.upgradeButtonClone.style("border-color", "#733c0f");
        this.upgradeButtonClone.style("color", "#f6eee3");
        this.upgradeButtonClone.style("font-size", "15px");
        this.upgradeButtonClone.hide();
        this.upgradeButtonClone.attribute("disabled", "");

        this.shipOne = createButton("Build");
        this.shipOne.position(118, 92.5);
        this.shipOne.mouseClicked(() => {this.buildShip('One')});
        // this.shipOne.mouseOver(() => {this.hoverShipOne()});
        this.shipOne.style("width", "90px");
        this.shipOne.style("height", "25px");
        this.shipOne.style("background-color", "#f6eee3");
        this.shipOne.style("border-color", "#733c0f");
        this.shipOne.style("color", "#47280e");
        this.shipOne.style("font-size", "15px");
        // this.shipOne.style("border-radius", "10px");
        this.shipOne.show();
        
        this.shipTwo = createButton("Build");
        this.shipTwo.position(118, 290.5);
        this.shipTwo.mouseClicked(() => {this.buildShip('Two')});
        // this.shipTwo.mouseOver(() => {this.hoverShipTwo()});
        this.shipTwo.style("width", "90px");
        this.shipTwo.style("height", "25px");
        this.shipTwo.style("background-color", "#f6eee3");
        this.shipTwo.style("border-color", "#733c0f");
        this.shipTwo.style("color", "#47280e");
        this.shipTwo.style("font-size", "15px");
        // this.shipTwo.style("border-radius", "10px");
        this.shipTwo.show();
        
        this.shipThree = createButton("Build");
        this.shipThree.position(118, 487.5);
        this.shipThree.mouseClicked(() => {this.buildShip('Three')});
        // this.shipThree.mouseOver(() => {this.hoverShipThree()});
        this.shipThree.style("width", "90px");
        this.shipThree.style("height", "25px");
        this.shipThree.style("background-color", "#f6eee3");
        this.shipThree.style("border-color", "#733c0f");
        this.shipThree.style("color", "#47280e");
        this.shipThree.style("font-size", "15px");
        // this.shipThree.style("border-radius", "10px");
        this.shipThree.show();
        
        this.shipFour = createButton("Build");
        this.shipFour.position(118, 685.5);
        this.shipFour.mouseClicked(() => {this.buildShip('Four')});
        // this.shipFour.mouseOver(() => {this.hoverShipFour()});
        this.shipFour.style("width", "90px");
        this.shipFour.style("height", "25px");
        this.shipFour.style("background-color", "#f6eee3");
        this.shipFour.style("border-color", "#733c0f");
        this.shipFour.style("color", "#47280e");
        this.shipFour.style("font-size", "15px");
        // this.shipFour.style("border-radius", "10px");
        this.shipFour.show();

        //Selection Buttons
        this.selectButtonOne = createButton('1');
        this.selectButtonOne.position(1300, 30);
        this.selectButtonOne.mouseClicked(() => {this.selectShipOne()});
        this.selectButtonOne.style("width", "30px");
        this.selectButtonOne.style("height", "30px");
        this.selectButtonOne.style("background-color", "#f6eee3");
        this.selectButtonOne.style("border-color", "#733c0f");
        this.selectButtonOne.style("color", "#47280e");
        this.selectButtonOne.style("font-size", "15px");
        this.selectButtonOne.show();

        this.selectButtonTwo = createButton('2');
        this.selectButtonTwo.position(1350, 30);
        this.selectButtonTwo.mouseClicked(() => {this.selectShipTwo()});
        this.selectButtonTwo.style("width", "30px");
        this.selectButtonTwo.style("height", "30px");
        this.selectButtonTwo.style("background-color", "#f6eee3");
        this.selectButtonTwo.style("border-color", "#733c0f");
        this.selectButtonTwo.style("color", "#47280e");
        this.selectButtonTwo.style("font-size", "15px");
        this.selectButtonTwo.show();

        this.selectButtonThree = createButton('3');
        this.selectButtonThree.position(1400, 30);
        this.selectButtonThree.mouseClicked(() => {this.selectShipThree()});
        this.selectButtonThree.style("width", "30px");
        this.selectButtonThree.style("height", "30px");
        this.selectButtonThree.style("background-color", "#f6eee3");
        this.selectButtonThree.style("border-color", "#733c0f");
        this.selectButtonThree.style("color", "#47280e");
        this.selectButtonThree.style("font-size", "15px");
        this.selectButtonThree.show();

        this.selectButtonFour = createButton('4');
        this.selectButtonFour.position(1450, 30);
        this.selectButtonFour.mouseClicked(() => {this.selectShipFour()});
        this.selectButtonFour.style("width", "30px");
        this.selectButtonFour.style("height", "30px");
        this.selectButtonFour.style("background-color", "#f6eee3");
        this.selectButtonFour.style("border-color", "#733c0f");
        this.selectButtonFour.style("color", "#47280e");
        this.selectButtonFour.style("font-size", "15px");
        this.selectButtonFour.show();
    }
    
    buildMode() {
        this.buildButton.hide();
        this.buildButtonClone.show();
        this.upgradeButton.show();
        this.upgradeButtonClone.hide();

        this.shipOne.show();
        this.shipTwo.show();
        this.shipThree.show();
        this.shipFour.show();

        this.buildDisplay.visible = true;
        this.upgradeDisplay.visible = false;
    }

    upgradeMode() {
        this.buildButton.show();
        this.buildButtonClone.hide();
        this.upgradeButton.hide();
        this.upgradeButtonClone.show();

        this.shipOne.hide();
        this.shipTwo.hide();
        this.shipThree.hide();
        this.shipFour.hide();

        this.buildDisplay.visible = false;
        this.upgradeDisplay.visible = true;
    }

    buildShip(type) {
        if (type == 'One') {
            this.shipType = 0;
            this.startBuildingShipOne = true;
        } else if (type == 'Two') {
            this.shipType = 1;
            this.startBuildingShipTwo = true;
        } else if (type == 'Three') {
            this.shipType = 2;
            this.startBuildingShipThree = true;
        } else if (type == 'Four') {
            this.shipType = 3;
            this.startBuildingShipFour = true;
        }
        if (this.base.baseBag >= this.ship[this.shipType].cost){
            this.base.baseBag -= this.ship[this.shipType].cost;
        } else {
            //if there's no gold enough to buy ship show the warning
            this.noGold.counter = 100;
            this.noGold.startCounter = true;
        }
    }
    
    // buildShipTwo() {
    //     if (this.base.baseBag >= this.ship[1].cost){ //need to implement the ship.cost from factory class
    //         this.base.baseBag -= this.ship[1].cost;
    //         this.ship.push(this.factory.createShipTwo(500, H / 2 - 200));
    //         this.shipBuilt.counter = 100;
    //         this.shipBuilt.startCounter = true;
    //         this.startBuilding = true;
    //     } else {
    //         //if there's no gold enough to buy ship show the warning
    //         this.noGold.counter = 100;
    //         this.noGold.startCounter = true;
    //     }
    // }
    
    // buildShipThree() {
    //     if (this.base.baseBag >= this.ship[2].cost){ //need to implement the ship.cost from factory class
    //         this.base.baseBag -= this.ship[2].cost;
    //         this.ship.push(this.factory.createShipThree(500, H / 2 - 300));
    //         this.shipBuilt.counter = 100;
    //         this.shipBuilt.startCounter = true;
    //         this.startBuilding = true;
    //     } else {
    //         //if there's no gold enough to buy ship show the warning
    //         this.noGold.counter = 100;
    //         this.noGold.startCounter = true;
    //     }
    // }
    
    // buildShipFour() {
    //     if (this.base.baseBag >= this.ship[3].cost){ //need to implement the ship.cost from factory class
    //         this.base.baseBag -= this.ship[3].cost;
    //         this.ship.push(this.factory.createShipFour(500, H / 2 - 400));
    //         this.shipBuilt.counter = 100;
    //         this.shipBuilt.startCounter = true;
    //         this.startBuilding = true;
    //     } else {
    //         //if there's no gold enough to buy ship show the warning
    //         this.noGold.counter = 100;
    //         this.noGold.startCounter = true;
    //     }
    // }

    selectShipOne() {
        this.logic.checkShip('One');
    }
    selectShipTwo() {
        this.logic.checkShip('Two');
    }
    selectShipThree() {
        this.logic.checkShip('Three');
    }
    selectShipFour() {
        this.logic.checkShip('Four');
    }

    //May be do this????????????????
    hoverShipOne() {
        console.log('this is for hover1');
    }
    hoverShipTwo() {
        console.log('this is for hover2');
    }
    hoverShipThree() {
        console.log('this is for hover3');
    }
    hoverShipFour() {
        console.log('this is for hover4');
    }

    hoverOut(){
        console.log('this is for hoverOut')
    }

    notificationManager() {
        if (this.noGold.startCounter == true) {
            this.noGold.counter--;
            this.noGold.visible = true;
            if(this.noGold.counter <= 0) {
                this.noGold.visible = false;
                this.noGold.startcounter = false;
                this.noGold.counter = 1;
            }
        }

        if(this.shipBuilt.startCounter == true) {
            this.shipBuilt.counter--;
            this.shipBuilt.visible = true;
            if(this.shipBuilt.counter <= 0) {
                this.shipBuilt.visible = false;
                this.shipBuilt.startcounter = false;
                this.shipBuilt.counter = 1;
            }
        }

        if(this.shipBuilt.visible == true){
            this.noGold.visible = false;
        } else if (this.noGold.visible == true) {
            this.shipBuilt.visible = false;
        }
    }

    spawnShip() {
        if(this.startBuildingShipOne == true) {
            this.ship[0].buildTime --;
            //console.log(this.ship[0].buildTime);
            if (this.ship[0].buildTime <= 0) {
                console.log('ship');
                this.ship[0].buildTime = 300;
                this.ship.push(this.factory.createShipOne(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipOne = false;
            }
        }
        if(this.startBuildingShipTwo == true) {
            this.ship[1].buildTime --;
            console.log(this.ship[1].buildTime);
            if (this.ship[1].buildTime <= 0) {
                console.log('ship');
                this.ship[1].buildTime = 600;
                this.ship.push(this.factory.createShipTwo(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipTwo = false;
            }
        }
        if(this.startBuildingShipThree == true) {
            this.ship[2].buildTime --;
            console.log(this.ship[2].buildTime);
            if (this.ship[2].buildTime <= 0) {
                console.log('ship');
                this.ship[2].buildTime = 600;
                this.ship.push(this.factory.createShipThree(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipThree = false;
            }
        }
        if(this.startBuildingShipFour == true) {
            this.ship[3].buildTime --;
            console.log(this.ship[3].buildTime);
            if (this.ship[3].buildTime <= 0) {
                console.log('ship');
                this.ship[3].buildTime = 1500;
                this.ship.push(this.factory.createShipFour(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipFour = false;
            }
        }
    }
}