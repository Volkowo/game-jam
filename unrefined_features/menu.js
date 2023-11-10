class Loading {
    constructor() {

    }

    preload() {
        this.loadingImg = loadImage("assets/menu/loading.jpg");
    }

    setup() {
    }

    draw() {
        //Background Image
        image(this.loadingImg, 0, 0, W, H);

        //Loading Text
        textAlign(CENTER, CENTER);
        textSize(100);
        fill('white');
        text('loading', W / 2, 75);

        //Revert Back to Normal
        textAlign(CENTER, CENTER);
        textSize(10);
        fill('black');

        if (frameCount === 150 && currentScreen == LOADING) { // loading screen stops after 150 frames
            currentScreen = PRESS_ANY_KEY;
        }
    }
}

class PressAnyKey {
    constructor() {

    }

    preload() {
        this.loadingImg = loadImage("assets/menu/loading.jpg");
    }

    setup() {

    }

    draw() {
        //Background Image
        image(this.loadingImg, 0, 0, W, H);

        //Loading Text
        textAlign(CENTER, CENTER);
        textSize(100);
        fill('white');
        text('press any key to continue', W / 2, 75);

        //Revert Back to Normal
        textAlign(CENTER, CENTER);
        textSize(10);
        fill('black');

        if (mouse.presses('left') || mouse.presses('right')) {
            currentScreen = MENU;
            screenMenu.enableMenuButtons();
        }
    }
}

class Menu {
    constructor() {

    }

    preload() {
        this.menuImg = loadImage("assets/menu/menu.jpg");
        this.settingButtonImg = loadImage("assets/menu/settingButton.png");
        this.creditsButtonImg = loadImage("assets/menu/creditsButton.png");
        this.playButtonImg = loadImage("assets/menu/playButton.png");
        this.shadeImg = loadImage("assets/menu/buttonShade.png");
    }

    setup() {
        // this.buttonCreation();
        this.buttonSprites();
        this.settingSprites();
    }

    draw() {
        //Background Image
        image(this.menuImg, 0, 0, W, H);

        //Game Title
        textAlign(CENTER, CENTER);
        textSize(100);
        fill('white');
        text('menu screen', W / 2, 75);

        //Revert Back to Normal
        textAlign(CENTER, CENTER);
        textSize(10);
        fill('black');

        this.buttonSpritesFunctions();
    }

    // buttonCreation() {
    //     this.playButton = createButton('Start Game');
    //     this.playButton.mouseClicked(() => {this.playButtonClicked()});
    //     this.playButton.size(100, 50);
    //     this.playButton.position(W / 2 - this.playButton.size().width / 2, H / 2);
    //     this.playButton.show();

    //     // this.quitButton = createButton('Quit Game');
    //     // this.quitButton.mouseClicked(() => {this.quitButtonClicked()});
    //     // this.quitButton.size(100, 50);
    //     // this.quitButton.position(100, 100);
    //     // this.quitButton.hide();

    //     this.settingButton = createButton('Settings');
    //     this.settingButton.mouseClicked(() => {this.settingButtonClicked()});
    //     this.settingButton.size(100, 50);
    //     this.settingButton.position(W / 2 - this.settingButton.size().width / 2, (H / 2) + 100);
    //     this.settingButton.show();

    //     this.creditsButton = createButton('Credits');
    //     this.creditsButton.mouseClicked(() => {this.creditsButtonClicked()});
    //     this.creditsButton.size(100, 50);
    //     this.creditsButton.position(W / 2 - this.creditsButton.size().width / 2, (H / 2) + 200);
    //     this.creditsButton.show();

    //     this.backToMenuButton = createButton('Back to Main Menu');
    //     this.backToMenuButton.mouseClicked(() => {this.backToMenuButtonClicked()});
    //     this.backToMenuButton.size(100, 50);
    //     this.backToMenuButton.position(W / 2 - this.backToMenuButton.size().width / 2, (H / 2) + 200);
    //     this.backToMenuButton.hide();
    // }

    buttonSprites() {
        this.playButtonSprite = new Sprite(W / 2 - 200, H - 150);
        this.playButtonSprite.w = 166; //128
        this.playButtonSprite.h = 240; //185
        this.playButtonSprite.color = 'red';
        this.playButtonSprite.draw = () => {
            let hoverEffect = 0;
            if (mouseX > this.playButtonSprite.x - this.playButtonSprite.w / 2
                && mouseX < this.playButtonSprite.x + this.playButtonSprite.w / 2
                && mouseY > this.playButtonSprite.y - this.playButtonSprite.h / 2
                && mouseY < this.playButtonSprite.y + this.playButtonSprite.h / 2) {
                hoverEffect = -5;
            } else {
                hoverEffect = 0;
            }
            image(this.shadeImg, 0, 0 + movingAni, 166, 240);
            image(this.playButtonImg, hoverEffect, hoverEffect + movingAni, 166, 240);
        }
        this.playButtonSprite.visible = true;
        this.playButtonSprite.collider = 'k';

        this.settingButtonSprite = new Sprite(W / 2, H - 150);
        this.settingButtonSprite.w = 166;
        this.settingButtonSprite.h = 240;
        this.settingButtonSprite.color = 'red';
        this.settingButtonSprite.draw = () => {
            let hoverEffect = 0;
            if (mouseX > this.settingButtonSprite.x - this.settingButtonSprite.w / 2
                && mouseX < this.settingButtonSprite.x + this.settingButtonSprite.w / 2
                && mouseY > this.settingButtonSprite.y - this.settingButtonSprite.h / 2
                && mouseY < this.settingButtonSprite.y + this.settingButtonSprite.h / 2) {
                hoverEffect = -5;
            } else {
                hoverEffect = 0;
            }
            image(this.shadeImg, 0, 0 + movingAni, 166, 240);
            image(this.settingButtonImg, hoverEffect, hoverEffect + movingAni, 166, 240);
        }
        this.settingButtonSprite.visible = true;
        this.settingButtonSprite.collider = 'k';

        this.creditsButtonSprite = new Sprite(W / 2 + 200, H - 150);
        this.creditsButtonSprite.w = 166;
        this.creditsButtonSprite.h = 240;
        this.creditsButtonSprite.color = 'red';
        this.creditsButtonSprite.draw = () => {
            let hoverEffect = 0;
            if (mouseX > this.creditsButtonSprite.x - this.creditsButtonSprite.w / 2
                && mouseX < this.creditsButtonSprite.x + this.creditsButtonSprite.w / 2
                && mouseY > this.creditsButtonSprite.y - this.creditsButtonSprite.h / 2
                && mouseY < this.creditsButtonSprite.y + this.creditsButtonSprite.h / 2) {
                hoverEffect = -5;
            } else {
                hoverEffect = 0;
            }
            image(this.shadeImg, 0, 0 + movingAni, 166, 240);
            image(this.creditsButtonImg, hoverEffect, hoverEffect + movingAni, 166, 240);
        }
        this.creditsButtonSprite.visible = true;
        this.creditsButtonSprite.collider = 'k';

        this.closeSettingButton = createButton('x');
        this.closeSettingButton.position(950, 150);
        this.closeSettingButton.mouseClicked(() => { this.closeSettingClicked() });
        this.closeSettingButton.style("width", "50px");
        this.closeSettingButton.style("height", "50px");
        this.closeSettingButton.style("background-color", "#f6eee3");
        this.closeSettingButton.style("border-color", "#f6eee3");
        this.closeSettingButton.style("color", "#47280e");
        this.closeSettingButton.style("font-size", "50px");
        this.closeSettingButton.hide();

        this.backToMenuButton = createButton('Back to Main Menu');
        this.backToMenuButton.mouseClicked(() => { this.backToMenuButtonClicked() });
        this.backToMenuButton.size(100, 50);
        this.backToMenuButton.position(W / 2 - this.backToMenuButton.size().width / 2, (H / 2) + 200);
        this.backToMenuButton.hide();

        //Setting Sliders
        //Music Volume Control
        this.musicSlider = createSlider(0, 1, 0.05, 0.01);
        this.musicSlider.position(700, 460);
        this.musicSlider.style("width", "200px");
        this.musicSlider.style("background-color", "black");
        this.musicSlider.hide();
        
        //Sound Volume Control
        this.soundSlider = createSlider(0, 1, 0.1, 0.01);
        this.soundSlider.position(700, 530);
        this.soundSlider.style("width", "200px");
        this.soundSlider.style("background-color", "black");
        this.soundSlider.hide();
        
        //Setting Check Boxes
        //Music Checker
        this.musicCheck = createCheckbox("", false);
        this.musicCheck.position(650, 463);
        this.musicCheck.hide();
        
        //Sound Checker
        this.soundCheck = createCheckbox("", false);
        this.soundCheck.position(650, 533);
        this.soundCheck.hide();
    }

    settingSprites() {
        this.settingPopUp = new Sprite(800, 450);
        this.settingPopUp.w = 400;
        this.settingPopUp.h = 600;
        this.settingPopUp.draw = () => {
            fill(0, 0, 0, 150);
            rect(0, -1000 + (movingAni * 2), 400, 600);
        }
        this.settingPopUp.collider = 'n';
        this.settingPopUp.visible = false;
    }

    buttonSpritesFunctions() {
        if (this.playButtonSprite.mouse.presses()) {
            this.playButtonClicked();
        }
        if (this.settingButtonSprite.mouse.presses()) {
            this.settingButtonClicked();
        }
        if (this.creditsButtonSprite.mouse.presses()) {
            this.creditsButtonClicked();
        }

        //Opening and Closing Setting
        //Animations
        if (startMenuAni == true) {
            movingAni -= 30;
            if (movingAni <= 0) {
                movingAni = 0;
                startMenuAni = false;
            }
        }
        if (openSetting == true) {
            movingAni += 30;
            if (movingAni >= 500) {
                movingAni = 500;
                openSetting = false;
            }
        }
        //Buttons Visibility
        if (activateSetting == true) {
            this.settingPopUp.visible = true;
        } else if (startMenuAni == false && activateSetting == false) {
            this.settingPopUp.visible = false;
        }
        if (openSetting == false && activateSetting == true) {
            this.closeSettingButton.show();
        } else if (activateSetting == false) {
            this.closeSettingButton.hide();
        }
    }

    disabledMenuButtons() {
        this.creditsButtonSprite.visible = false;
        this.playButtonSprite.visible = false;
        this.settingButtonSprite.visible = false;

        this.creditsButtonSprite.collider = 'n';
        this.playButtonSprite.collider = 'n';
        this.settingButtonSprite.collider = 'n';
    }

    enableMenuButtons() {
        this.creditsButtonSprite.visible = true;
        this.playButtonSprite.visible = true;
        this.settingButtonSprite.visible = true;

        this.creditsButtonSprite.collider = 'k';
        this.playButtonSprite.collider = 'k';
        this.settingButtonSprite.collider = 'k';

        // Activate The Anmiation for the Menu Buttons
        startMenuAni = true;
        movingAni = 500;
    }

    playButtonClicked() {
        currentScreen = GAME;

        // Old Buttons
        // this.playButton.hide();
        // this.settingButton.hide();
        // this.creditsButton.hide();
        // this.quitButton.show();

        // New Sprite Buttons
        this.disabledMenuButtons();
    }

    // Should add quit game button in the game and not in menu
    // quitButtonClicked() { // reset game parameters here (needs to be added)
    //     currentScreen = MENU;
    //     playButton.show();
    //     quitButton.hide();
    //     creditsButton.show();

    //     isGameActive = false;
    //     allSprites.remove();
    // }

    creditsButtonClicked() {
        currentScreen = CREDITS;
        // Old Buttons
        // this.playButton.hide();
        // this.settingButton.hide();
        // this.creditsButton.hide();
        // this.backToMenuButton.show();

        // New Sprite Buttons
        this.backToMenuButton.show();
        this.disabledMenuButtons();
    }

    backToMenuButtonClicked() {
        currentScreen = MENU;
        this.backToMenuButton.hide();
        this.enableMenuButtons();
    }

    settingButtonClicked() {
        //setting stuffs may be???
        activateSetting = true;

        //Activate Animation
        movingAni = 0;
        openSetting = true;
    }

    closeSettingClicked() {
        // this.settingPopUp.visible = false;
        activateSetting = false;

        this.creditsButtonSprite.collider = 'k';
        this.playButtonSprite.collider = 'k';
        this.settingButtonSprite.collider = 'k';

        startMenuAni = true;
        movingAni = 500;
        // this.enableMenuButtons();
    }
}

class Credits {
    constructor() {

    }

    preload() {
        this.loadingImg = loadImage("assets/menu/loading.jpg");
    }

    setup() {

    }

    draw() {
        //Background Image
        image(this.loadingImg, 0, 0, W, H);

        //Loading Text
        textAlign(CENTER, CENTER);
        textSize(100);
        fill('white');
        text('credits screen', W / 2, 75);

        //Revert Back to Normal
        textAlign(CENTER, CENTER);
        textSize(10);
        fill('black');
    }
}