class UI {
    constructor() {
        this.backgroundUI;
        this.profilePicture;
        this.statBlock;
        this.buildDisplay;
        this.upgradeDisplay;
        this.upgraded_isplay;
        this.resourceDisplay;

        this.ship;
        this.factory;
        this.resource;
        this.base;
    }

    preload() {
        
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
    
    draw() {
        this.spawnShip();
        this.resourceDisplay.text = this.base.baseBag;
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
        //this.base.text = this.resourceAmount;
        //Bedrock - may be add this??? to prevent ships to going into the UI

        //UI Background
        this.backgroundUI = new Sprite(W / 2, 820); //change color
        this.backgroundUI.draw = function () {
            noStroke();
            fill(60, 74, 107);
            rect(0, -40, W, 80);
            fill(44, 62, 80);
            rect(0, 40, W, 80);

            //UI Background Image
            tint(255, 50);
            //image(backgroundUI, 0, 0, width, 150);
        }
        this.backgroundUI.w = W;
        this.backgroundUI.h = 160;
        this.backgroundUI.collider = "s";
        this.backgroundUI.visible = true;
        this.backgroundUI.layer = 101;

        //Profile Picture of the Ships
        this.profilePicture = new Sprite(80, 820);
        this.profilePicture.draw = function () {
            //Frame
            noStroke();
            tint(255, 255);
            fill('white'); // change color
            rect(0, 0, 140, 140);

            //Profile Picture
            //image();

            fill('black');
            text("Profile Display", -65, 0);
        }
        this.profilePicture.collider = 'n';

        //Stat Block of selected object
        this.statBlock = new Sprite(350, 820);
        this.statBlock.draw = function () {
            //Frame
            noStroke();
            fill('white');
            rect(0, 0, 380, 140);

            fill('black');
            text("Stat Display", -50, 0);
        }
        this.statBlock.collider = 'n';

        //Upgrade Display
        this.upgradeDisplay = new Sprite(1020, 820);
        this.upgradeDisplay.draw = function () {
            //Frame
            noStroke();
            fill('white');
            rect(0, 0, 600, 140);

            fill('black');
            text("Upgrades coming soon", -120, 0);
        }
        this.upgradeDisplay.collider = 'n';
        this.upgradeDisplay.visible = false;

        //Build Display
        this.buildDisplay = new Sprite(1020, 820);
        this.buildDisplay.draw = function () {
            //Frame
            noStroke();
            fill('white');
            rect(-228, 0, 142.5, 140);
            rect(-76, 0, 142.5, 140);
            rect(76, 0, 142.5, 140);
            rect(228, 0, 142.5, 140);

            //Background
            fill(99, 70, 138);
            rect(-228, 0, 140, 137.5);
            rect(-76, 0, 140, 137.5);
            rect(76, 0, 140, 137.5);
            rect(228, 0, 140, 137.5);
        }
        this.buildDisplay.collider = 'n';
        this.buildDisplay.visible = true;


        //this is to display upgrades that have already been bought
        this.upgraded_display = new Sprite(1460, 820);
        this.upgraded_display.draw = function () {
            //Frame
            noStroke();
            fill('white');
            rect(0, 0, 260, 140);

            fill('black');
            text("Already Bought Upgrades", -110, 0);
        }
        this.upgraded_display.collider = 'n';

        //Top Bar display resource hold by the base
        this.resourceDisplay = new Sprite(300, 25);
        this.resourceDisplay.w = 600;
        this.resourceDisplay.h = 50;
        this.resourceDisplay.color = 'white';
        this.resourceDisplay.draw = function () {
            //Frame
            noStroke();
            fill(60, 74, 107);
            rect(0, 0, 600, 50);
            fill('white');
            rect(-5, -5, 600, 50);

            fill('black');
            //text("Resource Display" + this.base.baseBag, -50, 0);
        }
        this.resourceDisplay.collider = 'n';
    }

    gameButtons() {
        this.buildButton = createButton("Build");
        this.buildButton.position(558, 760);
        this.buildButton.mouseClicked(() => {this.buildMode()});
        this.buildButton.style("width", "160px");
        this.buildButton.style("height", "60px");
        this.buildButton.style("background-color", "#21408a");
        this.buildButton.style("border-color", "white");
        this.buildButton.style("color", "white");
        this.buildButton.style("font-size", "15px");
        this.buildButton.style("border-radius", "10px");
        this.buildButton.hide();

        this.upgradeButton = createButton("Upgrade");
        this.upgradeButton.position(558, 838);
        this.upgradeButton.mouseClicked(() => {this.upgradeMode()});
        this.upgradeButton.style("width", "160px");
        this.upgradeButton.style("height", "60px");
        this.upgradeButton.style("background-color", "#21408a");
        this.upgradeButton.style("border-color", "white");
        this.upgradeButton.style("color", "white");
        this.upgradeButton.style("font-size", "15px");
        this.upgradeButton.style("border-radius", "10px");
        //this.upgradeButton.hide();

        this.buildButtonClone = createButton("Build");
        this.buildButtonClone.position(558, 760);
        //this.buildButtonClone.mouseClicked();
        this.buildButtonClone.style("width", "160px");
        this.buildButtonClone.style("height", "60px");
        this.buildButtonClone.style("background-color", "#3c5080");
        this.buildButtonClone.style("border-color", "white");
        this.buildButtonClone.style("color", "white");
        this.buildButtonClone.style("font-size", "15px");
        this.buildButtonClone.style("border-radius", "10px");
        this.buildButtonClone.show();

        this.upgradeButtonClone = createButton("Upgrade");
        this.upgradeButtonClone.position(558, 838);
        //this.upgradeButtonClone.mouseClicked();
        this.upgradeButtonClone.style("width", "160px");
        this.upgradeButtonClone.style("height", "60px");
        this.upgradeButtonClone.style("background-color", "#3c5080");
        this.upgradeButtonClone.style("border-color", "white");
        this.upgradeButtonClone.style("color", "white");
        this.upgradeButtonClone.style("font-size", "15px");
        this.upgradeButtonClone.style("border-radius", "10px");
        this.upgradeButtonClone.hide();

        this.shipOne = createButton("Build");
        this.shipOne.position(735, 861);
        this.shipOne.mouseClicked(() => {this.buildShipOne()});
        this.shipOne.style("width", "130px");
        this.shipOne.style("height", "30px");
        this.shipOne.style("background-color", "#21408a");
        this.shipOne.style("border-color", "white");
        this.shipOne.style("color", "white");
        this.shipOne.style("font-size", "15px");
        this.shipOne.show();

        this.shipTwo = createButton("Build");
        this.shipTwo.position(886, 861);
        this.shipTwo.mouseClicked(() => {this.buildShipTwo()});
        this.shipTwo.style("width", "130px");
        this.shipTwo.style("height", "30px");
        this.shipTwo.style("background-color", "#21408a");
        this.shipTwo.style("border-color", "white");
        this.shipTwo.style("color", "white");
        this.shipTwo.style("font-size", "15px");
        this.shipTwo.show();

        this.shipThree = createButton("Build");
        this.shipThree.position(1039, 861);
        this.shipThree.mouseClicked(() => {this.buildShipThree()});
        this.shipThree.style("width", "130px");
        this.shipThree.style("height", "30px");
        this.shipThree.style("background-color", "#21408a");
        this.shipThree.style("border-color", "white");
        this.shipThree.style("color", "white");
        this.shipThree.style("font-size", "15px");
        this.shipThree.show();

        this.shipFour = createButton("Build");
        this.shipFour.position(1190, 861);
        this.shipFour.mouseClicked(() => {this.buildShipFour()});
        this.shipFour.style("width", "130px");
        this.shipFour.style("height", "30px");
        this.shipFour.style("background-color", "#21408a");
        this.shipFour.style("border-color", "white");
        this.shipFour.style("color", "white");
        this.shipFour.style("font-size", "15px");
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
        this.ship.push(this.factory.createShipOne(500, H / 2 - 100));
    }

    buildShipTwo() {
        this.ship.push(this.factory.createShipTwo(500, H / 2 - 400));
    }

    buildShipThree() {

    }

    buildShipFour() {

    }
}