class UI {
    constructor() {
        this.backgroundUI;
        this.profilePicture;
        this.statBlock;
        this.buildDisplay;
        this.upgradeDisplay;
        this.upgraded_isplay;
        this.resourceDisplayBackground;

        this.ship;
        this.factory;
        this.resource;
        this.base;
    }

    preload() {
        this.goldFrame = loadImage("assets/UI/gold_display_frame.png");
    }

    setup(factory) {
        this.ship = new Group();
        this.resource = new Group();

        this.gameButtons();
        this.UI_Sprites();
        
        this.base = factory.createBase(1000, H / 2 - 50);
        this.resource.push(factory.createSmallResource(1000, H / 2 - 200));
        this.resource.push(factory.createBigResource(300, H / 4));
        this.ship.push(factory.createShipOne(800, H / 2 - 100));
        // this.ship.push(factory.createShipTwo(1000, H/2 - 100));
    }
    
    draw(logic) {
        this.spawnShip();
        this.notificationManager();
    }

    spawnShip() {
        if (kb.presses('O')) {
            this.ship.push(this.factory.createShipOne(500, H / 2 - 100));
        }
        
        if(kb.presses('P')){
            this.ship.push(this.factory.createShipTwo(500, H / 2 - 400));
        }
    }
    
    UI_Sprites() {
        //Bedrock - may be add this??? to prevent ships to going into the UI

        //UI Background
        this.backgroundUI = new Sprite(85, H/2); //change color
        this.backgroundUI.w = 170;
        this.backgroundUI.h = H;
        this.backgroundUI.draw =()=> {
            noStroke();
            fill(60, 74, 107);
            rect(-42.5, 0, 85, H);
            fill(44, 62, 80);
            rect(42.5, 0, 85, H);

            //UI Background Image

        }
        this.backgroundUI.collider = "s";
        this.backgroundUI.visible = true;
        this.backgroundUI.layer = 101;

        //Upgrade Display
        this.upgradeDisplay = new Sprite(85, 480);
        this.upgradeDisplay.w = 160;
        this.upgradeDisplay.h = 800;
        this.upgradeDisplay.draw = function () {
            //Frame
            noStroke();
            fill(154, 244, 252);
            rect(0, -7.5, 160, 800);

            fill('black');
            text("Upgrades coming soon", -60, 0);
        }
        this.upgradeDisplay.collider = 'n';
        this.upgradeDisplay.visible = false;

        //Build Display
        this.buildDisplay = new Sprite(85, 480);
        this.buildDisplay.w = 160;
        this.buildDisplay.h = 800;
        this.buildDisplay.draw =()=> {
            //Frame
            noStroke();
            fill(154, 244, 252);
            rect(0, -7.5, 160, 800);

            //Background
            fill(9, 76, 82);
            rect(0, -300, 155, 195);
            rect(0, -102.5, 155, 195);
            rect(0, 95, 155, 195);
            rect(0, 292.5, 155, 195);

            //Ship Type Display
            textAlign(CENTER, CENTER);
            fill('white');
            textSize(20);
            text("Schooner", 0,-380);
            text("Galleon", 0,-182.5);
            text("Frigate", 0,15);
            text("Man-O-war", 0,212.5);


            //Stat Display
            textSize(13);
            textAlign(LEFT, CENTER);
            //Ship One
            text("Hit Point: ", -70, -350);
            text("Attack: ", -70, -320);
            text("Speed: ", -70, -290);
            text("Collect Rate: " + this.ship[0].collectRate, -70, -260);
            //Ship Two
            text("Hit Point: ", -70, -152.5);
            text("Attack: ", -70, -122.5);
            text("Speed: ", -70, -92.5);
            text("Collect Rate: ", -70, -62.5);
            //Ship Three
            text("Hit Point: ", -70, 45);
            text("Attack: ", -70, 75);
            text("Speed: ", -70, 105);
            text("Collect Rate: ", -70, 135);
            //Ship Four
            text("Hit Point: ", -70, 242.5);
            text("Attack: ", -70, 272.5);
            text("Speed: ", -70, 302.5);
            text("Collect Rate: ", -70, 332.5);
        }
        this.buildDisplay.collider = 'n';
        this.buildDisplay.visible = true;

        //Resource Display Frame
        this.resourceDisplayBackground = new Sprite(85,25);
        this.resourceDisplayBackground.w = 160;
        this.resourceDisplayBackground.h = 40;
        this.resourceDisplayBackground.color = 'white';
        this.resourceDisplayBackground.draw =()=> {
            //Frame
            noStroke();
            // fill('white');
            // rect(0,0,160,40);

            image(this.goldFrame,0,0,170,45);

            textAlign(CENTER, CENTER);
            fill('white');
            textSize(20);
            text("Gold: " + this.base.baseBag, 0, 2);
        }
        this.resourceDisplayBackground.collider = 'n';
        this.resourceDisplayBackground.layer = 1000;

        //______________________Notification pop-ups_________________________//
        this.noGold = new Sprite(320,50);
        this.noGold.draw = function() {
            noStroke();
            fill(0,0,0, 80);
            rect(0,0, 300, 100);

            fill('red');
            textSize(25);
            text("You are broke, Bro.", -120 , -10);
            text("Get some Gold!", -100 , 25);
        }
        this.noGold.startCounter = false;
        this.noGold.counter = 0;
        this.noGold.visible = false;
        this.noGold.collider = 'n';
        
        this.shipBuilt = new Sprite(320,50);
        this.shipBuilt.draw = function() {
            noStroke();
            fill(0,0,0, 80);
            rect(0,0, 300, 100);
            
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
        this.buildButton.style("width", "80px");
        this.buildButton.style("height", "30px");
        this.buildButton.style("background-color", "#094c52");
        this.buildButton.style("border-color", "#094c52");
        this.buildButton.style("color", "white");
        this.buildButton.style("font-size", "15px");
        this.buildButton.hide();

        this.upgradeButton = createButton("Upgrade");
        this.upgradeButton.position(93, 58);
        this.upgradeButton.mouseClicked(() => {this.upgradeMode()});
        this.upgradeButton.style("width", "80px");
        this.upgradeButton.style("height", "30px");
        this.upgradeButton.style("background-color", "#094c52");
        this.upgradeButton.style("border-color", "#094c52");
        this.upgradeButton.style("color", "white");
        this.upgradeButton.style("font-size", "15px");
        //this.upgradeButton.hide();

        this.buildButtonClone = createButton("Build");
        this.buildButtonClone.position(13, 58);
        //this.buildButtonClone.mouseClicked();
        this.buildButtonClone.style("width", "80px");
        this.buildButtonClone.style("height", "30px");
        this.buildButtonClone.style("background-color", "#9af4fc");
        this.buildButtonClone.style("border-color", "#9af4fc");
        this.buildButtonClone.style("color", "Black");
        this.buildButtonClone.style("font-size", "15px");
        this.buildButtonClone.show();
        this.buildButtonClone.attribute("disabled", "");
        
        this.upgradeButtonClone = createButton("Upgrade");
        this.upgradeButtonClone.position(93, 58);
        //this.upgradeButtonClone.mouseClicked();
        this.upgradeButtonClone.style("width", "80px");
        this.upgradeButtonClone.style("height", "30px");
        this.upgradeButtonClone.style("background-color", "#9af4fc");
        this.upgradeButtonClone.style("border-color", "#9af4fc");
        this.upgradeButtonClone.style("color", "Black");
        this.upgradeButtonClone.style("font-size", "15px");
        this.upgradeButtonClone.hide();
        this.upgradeButtonClone.attribute("disabled", "");

        this.shipOne = createButton("Build");
        this.shipOne.position(42, 257.5);
        this.shipOne.mouseClicked(() => {this.buildShipOne()});
        this.shipOne.style("width", "100px");
        this.shipOne.style("height", "25px");
        this.shipOne.style("background-color", "#062d30");
        this.shipOne.style("border-color", "white");
        this.shipOne.style("color", "white");
        this.shipOne.style("font-size", "15px");
        this.shipOne.style("border-radius", "10px");
        this.shipOne.show();
        
        this.shipTwo = createButton("Build");
        this.shipTwo.position(42, 455);
        this.shipTwo.mouseClicked(() => {this.buildShipTwo()});
        this.shipTwo.style("width", "100px");
        this.shipTwo.style("height", "25px");
        this.shipTwo.style("background-color", "#062d30");
        this.shipTwo.style("border-color", "white");
        this.shipTwo.style("color", "white");
        this.shipTwo.style("font-size", "15px");
        this.shipTwo.style("border-radius", "10px");
        this.shipTwo.show();
        
        this.shipThree = createButton("Build");
        this.shipThree.position(42, 652.5);
        this.shipThree.mouseClicked(() => {this.buildShipThree()});
        this.shipThree.style("width", "100px");
        this.shipThree.style("height", "25px");
        this.shipThree.style("background-color", "#062d30");
        this.shipThree.style("border-color", "white");
        this.shipThree.style("color", "white");
        this.shipThree.style("font-size", "15px");
        this.shipThree.style("border-radius", "10px");
        this.shipThree.show();
        
        this.shipFour = createButton("Build");
        this.shipFour.position(42, 850);
        this.shipFour.mouseClicked(() => {this.buildShipFour()});
        this.shipFour.style("width", "100px");
        this.shipFour.style("height", "25px");
        this.shipFour.style("background-color", "#062d30");
        this.shipFour.style("border-color", "white");
        this.shipFour.style("color", "white");
        this.shipFour.style("font-size", "15px");
        this.shipFour.style("border-radius", "10px");
        this.shipFour.show();
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

    buildShipOne() {
        if (this.base.baseBag >= 10){
            this.base.baseBag -= 10;
            this.ship.push(this.factory.createShipOne(500, H / 2 - 100));
            this.shipBuilt.counter = 100;
            this.shipBuilt.startCounter = true;
        } else {
            //if there's no gold enough to buy ship show the warning
            this.noGold.counter = 100;
            this.noGold.startCounter = true;
        }
    }
    
    buildShipTwo() {
        if (this.base.baseBag >= 20){
            this.base.baseBag -= 20;
            this.ship.push(this.factory.createShipTwo(500, H / 2 - 400));
            this.shipBuilt.counter = 100;
            this.shipBuilt.startCounter = true;
        } else {
            //if there's no gold enough to buy ship show the warning
            this.noGold.counter = 100;
            this.noGold.startCounter = true;
        }
    }
    
    buildShipThree() {
        console.log('nothing here use other buttons');
    }
    
    buildShipFour() {
        console.log('nothing here use other buttons');
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
}