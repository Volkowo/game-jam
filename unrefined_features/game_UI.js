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
        this.ship.push(factory.createShipOne(10000, 10000));
        this.ship.push(factory.createShipTwo(10000, 10000));
        this.ship.push(factory.createShipOne(800, H/2));
    }
    
    draw() {
        textFont(this.gameFont);
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
            strokeWeight(1);
            stroke('white');
            fill('white');
            textSize(15);
            text("Schooner", 0,-385);
            text("Galleon", 0,-187.5);
            text("Frigate", 0,10);
            text("Man-O-war", 0,207.5);
            
            //Stat Display              //need to implement the ship.stats from factory class
            strokeWeight(0.5);
            stroke('white');
            textSize(10);
            textAlign(LEFT, CENTER);
            //Ship One
            text("Hit Point : 20", -70, -315);
            text("Attack : 5", -70, -300);
            text("Speed : 5", -70, -285);
            text("Collect Rate : " + this.ship[0].collectRate + "/s", -70, -270); //ideal code
            text("Gold Cost : 10", -70, -255);
            text("Build Time : 5s", -70, -240);
            //Ship Two
            text("Hit Point : 30", -70, -117.5);
            text("Attack : 8", -70, -102.5);
            text("Speed : 4", -70, -87.5);
            text("Collect Rate : 5/s", -70, -72.5);
            text("Gold Cost : 20", -70, -57.5);
            text("Build Time : 10s", -70, -42.5);
            //Ship Three
            text("Hit Point : 50", -70, 80);
            text("Attack : 5", -70, 95);
            text("Speed : 3", -70, 110);
            text("Collect Rate : 5/s", -70, 125);
            text("Gold Cost : 25", -70, 140);
            text("Build Time : 10s", -70, 155);
            //Ship Four
            text("Hit Point : 80", -70, 277.5);
            text("Attack : 10", -70, 292.5);
            text("Speed : 2", -70, 307.5);
            text("Collect Rate : 1/s", -70, 322.5);
            text("Gold Cost : ", -70, 337.5);
            text("Build Time : 30s", -70, 352.5);

            //Also add pictures for ships??????
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
            strokeWeight(1);
            stroke('white');
            fill('white');
            textSize(20);
            text("Gold: " + this.base.baseBag, 0, 0);
        }
        this.resourceDisplayBackground.collider = 'n';
        this.resourceDisplayBackground.layer = 1000;

        //______________________Notification pop-ups_________________________//
        this.noGold = new Sprite(320,50);
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
        
        this.shipBuilt = new Sprite(320,50);
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
        // this.shipOne.mouseOver(() => {this.hoverShipOne()});
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
        // this.shipTwo.mouseOver(() => {this.hoverShipTwo()});
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
        // this.shipThree.mouseOver(() => {this.hoverShipThree()});
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
        this.shipFour.mouseOver(() => {this.hoverShipFour()});
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
        if (this.base.baseBag >= 10){ //need to implement the ship.cost from factory class
            this.base.baseBag -= 10;
            // console.log(this.factory.createShipOne(500, H / 2 - 100))
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
        if (this.base.baseBag >= 20){ //need to implement the ship.cost from factory class
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

    hoverShipOne() {
        console.log('this is for hover1')
    }
    hoverShipTwo() {
        console.log('this is for hover2')
    }
    hoverShipThree() {
        console.log('this is for hover3')
    }
    hoverShipFour() {
        console.log('this is for hover4')
    }

    hoverOut(){
        console.log('this is for hhoverOut')
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