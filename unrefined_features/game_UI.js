class UI {
    constructor() {
        this.backgroundUI;
        this.baseHealthDisplay;
        this.profilePicture;
        this.statBlock;
        this.buildDisplay;
        this.upgradeDisplay;
        this.upgraded_isplay;
        this.resourceDisplay;
        this.gameFrameTop;
        this.gameFrameBottom;
        this.gameFrameRight;
        this.shipType;
        this.startBuildingShipOne = false;
        this.startBuildingShipTwo = false;
        this.startBuildingShipThree = false;
        this.startBuildingShipFour = false;

        this.enemy;
        this.ship;
        this.factory;
        this.resource;
        this.base;
        this.logic;
    }

    preload() {
        //Ship Profile Pictures
        this.playerSchooner = loadImage("assets/img/ship_img/schooner_player.png");
        this.playerGalleon = loadImage("assets/img/ship_img/galleon_player.png");
        this.playerFrigate = loadImage("assets/img/ship_img/frigate_player.png");
        this.playerManOWar = loadImage("assets/img/ship_img/manowar_player.png");

        //Icons
        this.upgradeOneIcon = loadImage("assets/upgrade_icons/50.png");
        this.upgradeTwoIcon = loadImage("assets/upgrade_icons/44.png");
        this.upgradeThreeIcon = loadImage("assets/upgrade_icons/39.png");
        this.upgradeFourIcon = loadImage("assets/upgrade_icons/21.png");
        this.upgradeFiveIcon = loadImage("assets/upgrade_icons/6.png");

        //UI Images
        this.goldFrame = loadImage("assets/UI/gold_display_frame.png");
        this.woodenUI = loadImage("assets/UI/UI_background.png");
        this.selectButtonImg = loadImage("assets/UI/select_button_bg.png");
        this.menuButtonImg = loadImage("assets/UI/menu_button.png");
        this.ropeImg1 = loadImage("assets/UI/rope1.png");
        this.ropeImg2 = loadImage("assets/UI/rope2.png");

        //UI Font
        this.gameFont = loadFont("assets/font/new_rodin_pro.otf");

        //UI Animations
        this.goldCoin_Ani = loadAnimation("assets/UI/gold/Gold_1.png", 10);
        this.heart_Ani = loadAnimation("assets/UI/heart/Heart_1.png", 6);
    }

    setup(factory) {
        this.ship = new Group();
        this.resource = new Group();
        this.enemy = new Group();

        this.gameButtons();
        this.UI_Sprites();

        this.base = factory.createBase(1300, 660);
        this.resource.push(factory.createSmallResource(random(800, 1200), random(40, 120))); // 0
        this.resource.push(factory.createSmallResource(random(540, 750), random(120, 300))); // 1
        this.resource.push(factory.createSmallResource(random(1200, 1400), random(450, 500))); // 2
        this.resource.push(factory.createSmallResource(random(300, 500), random(600, 820))); // 3
        this.resource.push(factory.createSmallResource(random(850, 1100), random(760, 820))); // 4

        this.resource.push(factory.createBigResource(random(300, 400), random(100, 200))); // 5
        this.resource.push(factory.createBigResource(random(1200, 1300), random(200, 300))); // 6

        // For default ship stats
        this.ship.push(factory.createShipOne(10000, 10000));
        this.ship.push(factory.createShipTwo(10000, 10000));
        this.ship.push(factory.createShipThree(10000, 10000));
        this.ship.push(factory.createShipFour(10000, 10000));
        
        //Starting ships
        this.ship.push(factory.createShipOne(this.base.x - 25, this.base.y - 50));
        // this.ship.push(factory.createShipOne(this.base.x + 25, this.base.y - 50));
        this.ship.push(factory.createShipTwo(this.base.x + 25, this.base.y - 50));
        // this.ship.push(factory.createShipThree(this.base.x + 25, this.base.y - 50));
        // this.ship.push(factory.createShipFour(this.base.x + 25, this.base.y - 50));
        
        // ENEMY TESTING
    }

    draw() {
        textFont(this.gameFont);
        this.spawnShip();
        this.notificationManager();
        this.animationControls();

        if(kb.presses('n')) {
            this.base.hitPoint -= 10;
        } else if (kb.presses('m')) {
            this.base.hitPoint += 10;
        }
    }

    UI_Sprites() {
        //Bedrock - may be add this??? to prevent ships to going into the UI or leave the screen
        this.gameFrameTop = new Sprite(W / 2, 0);
        this.gameFrameTop.w = W;
        this.gameFrameTop.h = 2;
        this.gameFrameTop.draw = () => {
            noStroke();
            fill('brown');
            rect(0, 0, W, 2);
        }
        this.gameFrameTop.collider = 's';

        this.gameFrameBottom = new Sprite(W / 2, H);
        this.gameFrameBottom.w = W;
        this.gameFrameBottom.h = 2;
        this.gameFrameBottom.draw = () => {
            noStroke();
            fill('brown');
            rect(0, 0, W, 2);
        }
        this.gameFrameBottom.collider = 's';

        this.gameFrameRight = new Sprite(W, H / 2);
        this.gameFrameRight.w = 2;
        this.gameFrameRight.h = H;
        this.gameFrameRight.draw = () => {
            noStroke();
            fill('brown');
            rect(0, 0, 2, H);
        }
        this.gameFrameRight.collider = 's';


        //UI Background
        this.backgroundUI = new Sprite(105, H / 2);
        this.backgroundUI.w = 210;
        this.backgroundUI.h = H;
        this.backgroundUI.draw = () => {
            noStroke();
            fill(173, 112, 62);
            rect(-52.5, 0, 105, H);
            fill(115, 60, 15);
            rect(52.5, 0, 105, H);

            //UI Background Image
            tint(255, 100);
            image(this.woodenUI, 0, 0);
        }
        this.backgroundUI.collider = "s";
        this.backgroundUI.visible = true;
        this.backgroundUI.layer = 101;

        //Base Health Display
        this.baseHealthDisplay = new Sprite(110,17.5);
        this.baseHealthDisplay.w = 150;
        this.baseHealthDisplay.h = 50;
        this.baseHealthDisplay.color = 'white';
        this.baseHealthDisplay.draw = () => {
            rectMode(CORNER);
            //Frame
            strokeWeight(2);
            stroke('black');
            fill('gray');
            rect(-62,-5,130,10);
            noStroke();

            //Actual heath display;
            let hp = this.base.hitPoint / (100/130);
            if(this.base.hitPoint < 70 && this.base.hitPoint >=30) {
                fill('yellow')
            } else if (this.base.hitPoint < 30) {
                fill('red');
            } else {
                fill('green');
            }
            rect(-62,-5,hp,9);

            animation(this.heart_Ani, -65, 0)
        }
        this.baseHealthDisplay.collider = 's';
        
        //Resource Display
        this.resourceDisplay = new Sprite(104.5, 51);
        this.resourceDisplay.w = 160;
        this.resourceDisplay.h = 40;
        this.resourceDisplay.color = 'white';
        this.resourceDisplay.draw = () => {
            //Frame
            noStroke();
            // fill('white');
            // rect(0,0,160,40);
            
            image(this.goldFrame, 0, 0, 200, 40);

            textAlign(LEFT, CENTER);
            strokeWeight(1);
            stroke(71, 40, 14);
            fill(71, 40, 14);
            textSize(17);
            //animation(this.goldCoin_Ani, -65, 0);
            text("Gold: " + this.base.baseBag, -50, 0);
        }
        this.resourceDisplay.collider = 'n';
        this.resourceDisplay.layer = 1000;

        //Upgrade Display
        this.upgradeDisplay = new Sprite(105, 502.5);
        this.upgradeDisplay.w = 200;
        this.upgradeDisplay.h = 800;
        this.upgradeDisplay.draw = () => {
            //Frame
            noStroke();
            fill(115, 60, 15);
            rect(0, -7.5, 200, 800);
            
            //Background
            fill(246, 238, 227);
            rect(0, -320, 195, 155);
            rect(0, -162.5, 195, 155);
            rect(0, -5, 195, 155);
            rect(0, 152.5, 195, 155);
            rect(0, 310.5, 195, 155);
            
            //Icon Background
            fill(115, 60, 15);
            rect(-50,-352.5,60,60);
            rect(-50,-195,60,60);
            rect(-50,-37.5,60,60);
            rect(-50,120,60,60);
            rect(-50,277.5,60,60);
            
            //Icons
            image(this.upgradeOneIcon, -50, -352.5, 55,55);
            image(this.upgradeTwoIcon, -50, -195, 55,55);
            image(this.upgradeThreeIcon, -50, -37.5, 55,55);
            image(this.upgradeFourIcon, -50, 120, 55,55);
            image(this.upgradeFiveIcon, -50, 278, 55,55);
            
            //Upgrade Names
            rect(31,-367.5, 100, 30);
            rect(31,-210, 100, 30);
            rect(31,-52.5, 100, 30);
            rect(31,105, 100, 30);
            rect(31,263, 100, 30);
            
            textAlign(CENTER, CENTER);
            textSize(12);
            strokeWeight(0.5);
            stroke(246, 238, 227);
            fill(246, 238, 227);
            text("MultiShot", 31, -367.5);
            text("MultiShot", 31, -210);
            text("MultiShot", 31, -52.5);
            text("MultiShot", 31, 105);
            text("MultiShot", 31, 263);
            
            //Upgrade Costs
            textSize(12);
            stroke(71, 40, 14);
            fill(71, 40, 14);
            text("Gold Cost : 200", -25, -307.5);
            text("Gold Cost : 200", -25, -150);
            text("Gold Cost : 200", -25, 7.5);
            text("Gold Cost : 200", -25, 165);
            text("Gold Cost : 200", -25, 323);
            
            //Upgrade Descriptions
            textAlign(LEFT, CENTER);
            textSize(10);
            //UpgradeOne
            text("Allow ships to do multishot", -65, -287.5);
            text("attacks. Apply to all ally ships.", -77.5, -272.5);
            //UpgradeTwo
            text("Descriptions 2", -65, -130);
            //UpgradeThree
            text("Descriptions 3", -65, 27.5);
            //UpgradeFour
            text("Descriptions 4", -65, 185);
            //UpgradeFive
            text("Descriptions 5", -65, 343);

        }
        this.upgradeDisplay.collider = 'n';
        this.upgradeDisplay.visible = false;

        //Build Display
        this.buildDisplay = new Sprite(105, 502.5);
        this.buildDisplay.w = 200;
        this.buildDisplay.h = 800;
        this.buildDisplay.draw = () => {
            //Frame
            noStroke();
            fill(115, 60, 15);
            rect(0, -7.5, 200, 800);

            //Background
            fill(246, 238, 227);
            rect(0, -300, 195, 195);
            rect(0, -102.5, 195, 195);
            rect(0, 95, 195, 195);
            rect(0, 292.5, 195, 195);

            //Ship Type Background
            rectMode(CORNER);
            fill(115, 60, 15);
            rect(-95, -395, 100, 25);
            rect(-95, -197, 100, 25);
            rect(-95, 0, 100, 25);
            rect(-95, 198, 100, 25);

            //Ship Type Display
            textAlign(CENTER, CENTER);
            strokeWeight(1);
            stroke(246, 238, 227);
            fill(246, 238, 227);
            textSize(14);
            text("Schooner", -45, -383.5);
            text("Galleon", -45, -185.5);
            text("Frigate", -45, 11);
            text("Man-O-war", -45, 208.5);

            //Stat Display
            strokeWeight(0.5);
            stroke(71, 40, 14);
            fill(71, 40, 14);
            textSize(10.5);
            textAlign(LEFT, CENTER);
            //Ship One
            text("Hit Point : " + this.ship[0].hitPoint, -10, -350);
            text("Atk Speed: " + this.ship[0].reloadTimer/60 + "/s", -10, -325);
            text("Speed : " + this.ship[0].movementSpeed, -10, -300);
            text("Collect Rate : " + this.ship[0].collectRate + "/s", -10, -275);
            text("Gold Cost : " + this.ship[0].cost, -10, -250);
            text("Build Time : 5s", -10, -225);
            //Ship Two
            text("Hit Point : " + this.ship[1].hitPoint, -10, -152.5);
            text("Atk Speed: " + this.ship[1].reloadTimer/60 + "/s", -10, -127.5);
            text("Speed : " + this.ship[1].movementSpeed, -10, -102.5);
            text("Collect Rate : " + this.ship[1].collectRate + "/s", -10, -77.5);
            text("Gold Cost : " + this.ship[1].cost, -10, -52.5);
            text("Build Time : 10s", -10, -27.5);
            //Ship Three
            text("Hit Point : " + this.ship[2].hitPoint, -10, 45);
            text("Atk Speed: " + this.ship[2].reloadTimer/60 + "/s", -10, 70);
            text("Speed : " + this.ship[2].movementSpeed, -10, 95);
            text("Collect Rate : " + this.ship[2].collectRate + "/s", -10, 120);
            text("Gold Cost : " + this.ship[2].cost, -10, 145);
            text("Build Time : 10s", -10, 170);
            //Ship Four
            text("Hit Point : " + this.ship[3].hitPoint, -10, 242.5);
            text("Atk Speed: " + this.ship[3].reloadTimer/60 + "/s", -10, 267.5);
            text("Speed : " + this.ship[3].movementSpeed, -10, 292.5);
            text("Collect Rate : " + this.ship[3].collectRate + "/s", -10, 317.5);
            text("Gold Cost : " + this.ship[3].cost, -10, 342.5);
            text("Build Time : 25s", -10, 367.5);

            //Ship Profile Images
            image(this.playerSchooner, -55, -285);
            image(this.playerGalleon, -55, -80);
            image(this.playerFrigate, -55, 110);
            image(this.playerManOWar, -55, 310);

            //Build Time Bar
            if (this.startBuildingShipOne == true) {
                let length = (this.ship[0].buildTime) / (300 / 190);
                rect(-94.5, -370, length, 10);
            }
            if (this.startBuildingShipTwo == true) {
                let length = (this.ship[1].buildTime) / (600 / 190);
                rect(-94.5, -172, length, 10);
            }
            if (this.startBuildingShipThree == true) {
                let length = (this.ship[2].buildTime) / (600 / 190);
                rect(-94.5, 25, length, 10);
            }
            if (this.startBuildingShipFour == true) {
                let length = (this.ship[3].buildTime) / (1500 / 190);
                rect(-94.5, 223, length, 10);
            }
        }
        this.buildDisplay.collider = 'n';
        this.buildDisplay.visible = true;

        this.selectBar = new Sprite(330,20);
        this.selectBar.w = 330;
        this.selectBar.h = 50;
        this.selectBar.draw = () => {
            stroke(115, 60, 15);
            strokeWeight(7);
            fill(246, 238, 227);
            quad(-200, -25, 200, -25, 160, 25, -200, 25);

            image(this.selectButtonImg,-15,0,45,45);
            image(this.selectButtonImg,35,0,45,45);
            image(this.selectButtonImg,85,0,45,45);
            image(this.selectButtonImg,135,0,45,45);
            // image(this.menuButtonImg,-80,0,50,50);
        }
        this.selectBar.collider = 's';
        this.selectBar.layer = 100;

        //______________________Notification pop-ups_________________________//
        this.noGold = new Sprite(350, 98);
        this.noGold.draw = () => {
            noStroke();
            fill(115, 60, 15, 100);
            rect(0, 0, 250, 100);

            image(this.ropeImg1, 125, 12.5, 18,125);
            image(this.ropeImg2, -125, 12.5, 18,125);

            textAlign(CENTER,CENTER);
            strokeWeight(1);
            stroke(71, 40, 14);
            fill(71, 40, 14);
            textSize(20);
            text("You are broke, Bro.", 0, -15);
            text("Get some Gold!", 0, 15);

        }
        this.noGold.startCounter = false;
        this.noGold.counter = 0;
        this.noGold.visible = false;
        this.noGold.collider = 'n';
        
        this.shipBuilt = new Sprite(350, 98);
        this.shipBuilt.draw = () => {
            noStroke();
            fill(115, 60, 15, 100);
            rect(0, 0, 250, 100);
            
            image(this.ropeImg1, 125, 12.5, 18,125);
            image(this.ropeImg2, -125, 12.5, 18,125);

            textAlign(CENTER,CENTER);
            strokeWeight(1);
            stroke(71, 40, 14);
            fill(71, 40, 14);
            textSize(20);
            text("Congrats", 0, -15);
            text("You got a ship!", 0, 15);
        }
        this.shipBuilt.startCounter = false;
        this.shipBuilt.counter = 0;
        this.shipBuilt.visible = false;
        this.shipBuilt.collider = 'n';
    }

    gameButtons() {
        this.buildButton = createButton("Build");
        this.buildButton.position(5, 72);
        this.buildButton.mouseClicked(() => { this.buildMode() });
        this.buildButton.style("width", "101px");
        this.buildButton.style("height", "30px");
        this.buildButton.style("background-color", "#f6eee3");
        this.buildButton.style("border-color", "#f6eee3");
        this.buildButton.style("color", "#47280e");
        this.buildButton.style("font-size", "15px");
        this.buildButton.hide();

        this.upgradeButton = createButton("Upgrade");
        this.upgradeButton.position(102, 72);
        this.upgradeButton.mouseClicked(() => { this.upgradeMode() });
        this.upgradeButton.style("width", "101px");
        this.upgradeButton.style("height", "30px");
        this.upgradeButton.style("background-color", "#f6eee3");
        this.upgradeButton.style("border-color", "#f6eee3");
        this.upgradeButton.style("color", "#47280e");
        this.upgradeButton.style("font-size", "15px");
        this.upgradeButton.show();

        this.buildButtonClone = createButton("Build");
        this.buildButtonClone.position(5, 72);
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
        this.upgradeButtonClone.position(103, 72);
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
        this.shipOne.position(110, 107.5);
        this.shipOne.mouseClicked(() => { this.buildShip('One') });
        // this.shipOne.mouseOver(() => {this.hoverShipOne()});
        this.shipOne.style("width", "90px");
        this.shipOne.style("height", "25px");
        this.shipOne.style("background-color", "#f6eee3");
        this.shipOne.style("border-color", "#733c0f");
        this.shipOne.style("color", "#47280e");
        this.shipOne.style("font-size", "15px");
        this.shipOne.show();

        this.shipTwo = createButton("Build");
        this.shipTwo.position(110, 305.5);
        this.shipTwo.mouseClicked(() => { this.buildShip('Two') });
        // this.shipTwo.mouseOver(() => {this.hoverShipTwo()});
        this.shipTwo.style("width", "90px");
        this.shipTwo.style("height", "25px");
        this.shipTwo.style("background-color", "#f6eee3");
        this.shipTwo.style("border-color", "#733c0f");
        this.shipTwo.style("color", "#47280e");
        this.shipTwo.style("font-size", "15px");
        this.shipTwo.show();

        this.shipThree = createButton("Build");
        this.shipThree.position(110, 502.5);
        this.shipThree.mouseClicked(() => { this.buildShip('Three') });
        // this.shipThree.mouseOver(() => {this.hoverShipThree()});
        this.shipThree.style("width", "90px");
        this.shipThree.style("height", "25px");
        this.shipThree.style("background-color", "#f6eee3");
        this.shipThree.style("border-color", "#733c0f");
        this.shipThree.style("color", "#47280e");
        this.shipThree.style("font-size", "15px");
        this.shipThree.show();

        this.shipFour = createButton("Build");
        this.shipFour.position(110, 700.5);
        this.shipFour.mouseClicked(() => { this.buildShip('Four') });
        // this.shipFour.mouseOver(() => {this.hoverShipFour()});
        this.shipFour.style("width", "90px");
        this.shipFour.style("height", "25px");
        this.shipFour.style("background-color", "#f6eee3");
        this.shipFour.style("border-color", "#733c0f");
        this.shipFour.style("color", "#47280e");
        this.shipFour.style("font-size", "15px");
        this.shipFour.show();

        //Selection Buttons
        this.selectButtonOne = createButton('1');
        this.selectButtonOne.position(301, 6);
        this.selectButtonOne.mouseClicked(() => { this.selectShipOne() });
        this.selectButtonOne.style("width", "28px");
        this.selectButtonOne.style("height", "28px");
        this.selectButtonOne.style("background-color", "#f6eee3");
        this.selectButtonOne.style("border-color", "#733c0f");
        this.selectButtonOne.style("color", "#47280e");
        this.selectButtonOne.style("font-size", "18px");
        this.selectButtonOne.style("border-radius", "20px");
        this.selectButtonOne.show();
        
        this.selectButtonTwo = createButton('2');
        this.selectButtonTwo.position(351, 6);
        this.selectButtonTwo.mouseClicked(() => { this.selectShipTwo() });
        this.selectButtonTwo.style("width", "28px");
        this.selectButtonTwo.style("height", "28px");
        this.selectButtonTwo.style("background-color", "#f6eee3");
        this.selectButtonTwo.style("border-color", "#733c0f");
        this.selectButtonTwo.style("color", "#47280e");
        this.selectButtonTwo.style("font-size", "18px");
        this.selectButtonTwo.style("border-radius", "20px");
        this.selectButtonTwo.show();
        
        this.selectButtonThree = createButton('3');
        this.selectButtonThree.position(401, 6);
        this.selectButtonThree.mouseClicked(() => { this.selectShipThree() });
        this.selectButtonThree.style("width", "28px");
        this.selectButtonThree.style("height", "28px");
        this.selectButtonThree.style("background-color", "#f6eee3");
        this.selectButtonThree.style("border-color", "#733c0f");
        this.selectButtonThree.style("color", "#47280e");
        this.selectButtonThree.style("font-size", "18px");
        this.selectButtonThree.style("border-radius", "20px");
        this.selectButtonThree.show();
        
        this.selectButtonFour = createButton('4');
        this.selectButtonFour.position(451, 6);
        this.selectButtonFour.mouseClicked(() => { this.selectShipFour() });
        this.selectButtonFour.style("width", "28px");
        this.selectButtonFour.style("height", "28px");
        this.selectButtonFour.style("background-color", "#f6eee3");
        this.selectButtonFour.style("border-color", "#733c0f");
        this.selectButtonFour.style("color", "#47280e");
        this.selectButtonFour.style("font-size", "18px");
        this.selectButtonFour.style("border-radius", "20px");
        this.selectButtonFour.show();
        
        //Upgrades Buttons              // Neeed to add functionalities on these buttons
        this.upgradeOne = createButton('Buy');
        this.upgradeOne.position(86,150); //157.5
        this.upgradeOne.style("width", "100px");
        this.upgradeOne.style("height", "30px");
        this.upgradeOne.style("background-color", "#f6eee3");
        this.upgradeOne.style("border-color", "#733c0f");
        this.upgradeOne.style("color", "#47280e");
        this.upgradeOne.style("font-size", "15px");
        this.upgradeOne.hide();
        
        this.upgradeTwo = createButton('Buy');
        this.upgradeTwo.position(86,307);
        this.upgradeTwo.style("width", "100px");
        this.upgradeTwo.style("height", "30px");
        this.upgradeTwo.style("background-color", "#f6eee3");
        this.upgradeTwo.style("border-color", "#733c0f");
        this.upgradeTwo.style("color", "#47280e");
        this.upgradeTwo.style("font-size", "15px");
        this.upgradeTwo.hide();

        this.upgradeThree = createButton('Buy');
        this.upgradeThree.position(86,465);
        this.upgradeThree.style("width", "100px");
        this.upgradeThree.style("height", "30px");
        this.upgradeThree.style("background-color", "#f6eee3");
        this.upgradeThree.style("border-color", "#733c0f");
        this.upgradeThree.style("color", "#47280e");
        this.upgradeThree.style("font-size", "15px");
        this.upgradeThree.hide();

        this.upgradeFour = createButton('Buy');
        this.upgradeFour.position(86,622);
        this.upgradeFour.style("width", "100px");
        this.upgradeFour.style("height", "30px");
        this.upgradeFour.style("background-color", "#f6eee3");
        this.upgradeFour.style("border-color", "#733c0f");
        this.upgradeFour.style("color", "#47280e");
        this.upgradeFour.style("font-size", "15px");
        this.upgradeFour.hide();

        this.upgradeFive = createButton('Buy');
        this.upgradeFive.position(86,780);
        this.upgradeFive.style("width", "100px");
        this.upgradeFive.style("height", "30px");
        this.upgradeFive.style("background-color", "#f6eee3");
        this.upgradeFive.style("border-color", "#733c0f");
        this.upgradeFive.style("color", "#47280e");
        this.upgradeFive.style("font-size", "15px");
        this.upgradeFive.hide();
    }

    buildMode() {
        this.buildButton.hide();
        this.buildButtonClone.show();
        this.upgradeButton.show();
        this.upgradeButtonClone.hide();

        //Show every builds in buildMode
        this.buildDisplay.visible = true;
        this.shipOne.show();
        this.shipTwo.show();
        this.shipThree.show();
        this.shipFour.show();

        //Hide every upgrades in buildMode
        this.upgradeDisplay.visible = false;
        this.upgradeOne.hide();
        this.upgradeTwo.hide();
        this.upgradeThree.hide();
        this.upgradeFour.hide();
        this.upgradeFive.hide();
    }

    upgradeMode() {
        this.buildButton.show();
        this.buildButtonClone.hide();
        this.upgradeButton.hide();
        this.upgradeButtonClone.show();

        //Hide every builds in upgradeMode
        this.buildDisplay.visible = false;
        this.shipOne.hide();
        this.shipTwo.hide();
        this.shipThree.hide();
        this.shipFour.hide();

        //Show every upgrades in upgradeMode
        this.upgradeDisplay.visible = true;
        this.upgradeOne.show();
        this.upgradeTwo.show();
        this.upgradeThree.show();
        this.upgradeFour.show();
        this.upgradeFive.show();
    }

    buildShip(type) {
        if (type == 'One') {
            this.shipType = 0;
        } else if (type == 'Two') {
            this.shipType = 1;
        } else if (type == 'Three') {
            this.shipType = 2;
        } else if (type == 'Four') {
            this.shipType = 3;
        }
        if (this.base.baseBag >= this.ship[this.shipType].cost) {
            this.base.baseBag -= this.ship[this.shipType].cost;
            if (this.shipType == 0) {
                this.startBuildingShipOne = true;
            } else if (this.shipType == 1) {
                this.startBuildingShipTwo = true;
            } else if (this.shipType == 2) {
                this.startBuildingShipThree = true;
            } else if (this.shipType == 3) {
                this.startBuildingShipFour = true;
            }
        } else {
            //if there's no gold enough to buy ship show the warning
            this.noGold.counter = 100;
            this.noGold.startCounter = true;
        }
    }

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

    hoverOut() {
        console.log('this is for hoverOut')
    }

    notificationManager() {
        if (this.noGold.startCounter == true) {
            this.noGold.counter--;
            this.noGold.visible = true;
            if (this.noGold.counter <= 0) {
                this.noGold.visible = false;
                this.noGold.startcounter = false;
                this.noGold.counter = 1;
            }
        }

        if (this.shipBuilt.startCounter == true) {
            this.shipBuilt.counter--;
            this.shipBuilt.visible = true;
            if (this.shipBuilt.counter <= 0) {
                this.shipBuilt.visible = false;
                this.shipBuilt.startcounter = false;
                this.shipBuilt.counter = 1;
            }
        }

        if (this.shipBuilt.visible == true) {
            this.noGold.visible = false;
        } else if (this.noGold.visible == true) {
            this.shipBuilt.visible = false;
        }
    }

    spawnShip() {
        if (this.startBuildingShipOne == true) {
            this.ship[0].buildTime--;
            if (this.ship[0].buildTime <= 0) {
                this.ship[0].buildTime = 300;
                this.ship.push(this.factory.createShipOne(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipOne = false;
            }
        }
        if (this.startBuildingShipTwo == true) {
            this.ship[1].buildTime--;

            if (this.ship[1].buildTime <= 0) {
                this.ship[1].buildTime = 600;
                this.ship.push(this.factory.createShipTwo(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipTwo = false;
            }
        }
        if (this.startBuildingShipThree == true) {
            this.ship[2].buildTime--;
            if (this.ship[2].buildTime <= 0) {
                this.ship[2].buildTime = 600;
                this.ship.push(this.factory.createShipThree(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipThree = false;
            }
        }
        if (this.startBuildingShipFour == true) {
            this.ship[3].buildTime--;
            if (this.ship[3].buildTime <= 0) {
                this.ship[3].buildTime = 1500;
                this.ship.push(this.factory.createShipFour(500, H / 2 - 100));
                this.shipBuilt.counter = 100;
                this.shipBuilt.startCounter = true;
                this.startBuildingShipFour = false;
            }
        }
    }

    animationControls() {
        this.goldCoin_Ani.loop();
        this.goldCoin_Ani.scale = 0.04;
        this.heart_Ani.frameDelay = 5;
        this.heart_Ani.loop();
        this.heart_Ani.scale = 1.5;
    }
}