class Loading {
    constructor() {

    }

    preload() {
        this.loadingImg = loadImage("assets/menu/loading.jpg");
        this.gameFont = loadFont("assets/font/new_rodin_pro.otf");
    }

    setup() {
        this.loadingTimer = 120;
    }

    draw() {
        //Background Image
        image(this.loadingImg, 0, 0, W, H);

        //Loading Text
        textAlign(LEFT, CENTER);
        strokeWeight(10);
        stroke(64, 37, 15);
        textSize(70);
        textFont(this.gameFont);
        fill('white');
        text('Loading . . .', 80, 790);

        //Revert Back to Normal
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        fill('black');

        this.loadingTimer--;
        if (this.loadingTimer <= 0) { // loading screen stops after 150 frames
            currentScreen = PRESS_ANY_KEY;
        }
    }
}

class PressAnyKey {
    constructor() {

    }

    preload() {
        this.loadingImg = loadImage("assets/menu/loading.jpg");
        this.gameFont = loadFont("assets/font/new_rodin_pro.otf");
    }

    setup() {

    }

    draw() {
        //Background Image
        image(this.loadingImg, 0, 0, W, H);

        //Loading Text
        textAlign(LEFT, CENTER);
        strokeWeight(10);
        stroke(64, 37, 15);
        textSize(70);
        textFont(this.gameFont);
        fill('white');
        text('Press any key to continue . . .', 80, 790);

        //Revert Back to Normal
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        fill('black');

        if (mouse.presses('left') || mouse.presses('right')) {
            if (loadingLink == 1) {
                currentScreen = MENU;
                screenMenu.enableMenuButtons();
                menuMusic.play();
                gameMusic.stop();
            } else if (loadingLink == 2) {
                currentScreen = GAME;
                menuMusic.stop();
                gameMusic.play();
            }
        }
    }
}

class Menu {
    constructor() {

    }

    preload() {
        //Images
        this.menuImg = loadImage("assets/menu/menu.jpg");
        this.settingButtonImg = loadImage("assets/menu/settingButton.png");
        this.creditsButtonImg = loadImage("assets/menu/creditsButton.png");
        this.playButtonImg = loadImage("assets/menu/playButton.png");
        this.shadeImg = loadImage("assets/menu/buttonShade.png");
        this.settingImg = loadImage("assets/menu/setting_background.png");
        this.closeSetting = loadImage("assets/menu/closeSetting.png");
        this.closeSettingHover = loadImage("assets/menu/closeSettingHover.png");

        //Font
        this.gameFont = loadFont("assets/font/new_rodin_pro.otf");
    }

    setup() {
        // this.buttonCreation();
        this.buttonSprites();
    }

    draw() {
        //Background Image
        image(this.menuImg, 0, 0, W, H);

        //Game Title
        textAlign(LEFT, CENTER);
        strokeWeight(10);
        stroke(64, 37, 15);
        textSize(60);
        textFont(this.gameFont);
        fill('white');
        text('very cool pirate game', 450, 75);

        //Revert Back to Normal
        noStroke();
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
        this.playButtonSprite.collider = 'n';

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
        this.settingButtonSprite.collider = 'n';

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
        this.creditsButtonSprite.collider = 'n';

        this.backToMenuButton = createButton('Back to Main Menu');
        this.backToMenuButton.mouseClicked(() => { this.backToMenuButtonClicked() });
        this.backToMenuButton.size(250, 50);
        this.backToMenuButton.style("font-size", "20px");
        this.backToMenuButton.position(W / 2 - this.backToMenuButton.size().width / 2, (H / 2) + 350);
        this.backToMenuButton.hide();

        //Setting Popup
        this.settingPopUp = new Sprite(800, 450);
        this.settingPopUp.w = 332;
        this.settingPopUp.h = 480;
        this.settingPopUp.draw = () => {
            let popUpPos = -1000 + (movingAni * 2);

            image(this.settingImg, 0, 0 + popUpPos, 332, 480);

            // Sound and Music volume percentage display
            fill(86, 54, 40);
            textSize(20);
            
            if (this.musicCheck.checked()) {
                menuMusic.setVolume(0);
                gameMusic.setVolume(0);
                creditVideo.volume(0);
                // add all musics like above
                text('0%', 30, -105 + popUpPos);
            } else {
                menuMusic.setVolume(this.musicSlider.value());
                gameMusic.setVolume(this.musicSlider.value());
                creditVideo.volume(this.musicSlider.value());
                // add all musics like above
                text(Math.floor(this.musicSlider.value() * 100) + "%", 30, -105 + popUpPos);
            }

            if (this.soundCheck.checked()) {
                buildSound.setVolume(0);
                buttonClickFx.setVolume(0);
                game_soundFx.setVolume(0);
                error_soundFx.setVolume(0);
                // add all sounds like above
                text('0%', 30, 20 + popUpPos);
            } else {
                buildSound.setVolume(this.soundSlider.value());
                buttonClickFx.setVolume(this.soundSlider.value());
                game_soundFx.setVolume(this.soundSlider.value());
                error_soundFx.setVolume(this.soundSlider.value());

                // add all sounds like above
                text(Math.floor(this.soundSlider.value() * 100) + "%", 30, 20 + popUpPos);
            }
        }
        this.settingPopUp.collider = 'n';
        this.settingPopUp.visible = false;


        this.closeSettingButton = new Sprite(800, 600);
        this.closeSettingButton.w = 80;
        this.closeSettingButton.h = 80;
        this.closeSettingButton.draw = () => {
            image(this.closeSetting, 0, 0, 80, 80);
            if (mouseX > this.closeSettingButton.x - this.closeSettingButton.w / 2
                && mouseX < this.closeSettingButton.x + this.closeSettingButton.w / 2
                && mouseY > this.closeSettingButton.y - this.closeSettingButton.h / 2
                && mouseY < this.closeSettingButton.y + this.closeSettingButton.h / 2) {
                image(this.closeSettingHover, 0, 0, 80, 80);
            }
        }
        this.closeSettingButton.collider = 'n';
        this.closeSettingButton.visible = false;

        //Setting Sliders
        //Music Volume Control
        this.musicSlider = createSlider(0, 1, 0.1, 0.01);
        this.musicSlider.position(750, 385);
        this.musicSlider.class("slider");
        this.musicSlider.style("width", "150px");
        this.musicSlider.style("background-color", "White");
        this.musicSlider.hide();

        //Sound Volume Control
        this.soundSlider = createSlider(0, 1, 0.1, 0.01);
        this.soundSlider.position(750, 510);
        this.soundSlider.class("slider");
        this.soundSlider.style("width", "150px");
        this.soundSlider.style("background-color", "White");
        this.soundSlider.hide();

        //Setting Check Boxes
        //Music Checker
        this.musicCheck = createCheckbox("", false);
        this.musicCheck.position(700, 382);
        this.musicCheck.class("checker");
        this.musicCheck.hide();

        //Sound Checker
        this.soundCheck = createCheckbox("", false);
        this.soundCheck.position(700, 508);
        this.soundCheck.class("checker");
        this.soundCheck.hide();
    }

    buttonSpritesFunctions() {
        if (this.playButtonSprite.mouse.presses()) {
            buttonClickFx.play();
            this.playButtonClicked();
        }
        if (this.settingButtonSprite.mouse.presses()) {
            buttonClickFx.play();
            this.settingButtonClicked();
        }
        if (this.creditsButtonSprite.mouse.presses()) {
            buttonClickFx.play();
            this.creditsButtonClicked();
        }
        if (this.closeSettingButton.mouse.presses()) {
            buttonClickFx.play();
            this.closeSettingClicked();
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
            this.closeSettingButton.visible = true;
            this.closeSettingButton.collider = 'k';
            this.soundCheck.show();
            this.musicCheck.show();
            this.soundSlider.show();
            this.musicSlider.show();
        } else if (activateSetting == false) {
            this.closeSettingButton.visible = false;
            this.closeSettingButton.collider = 'n';
            this.soundCheck.hide();
            this.musicCheck.hide();
            this.soundSlider.hide();
            this.musicSlider.hide();
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
        loadingLink = 2;
        screenLoading.loadingTimer = 120;
        currentScreen = LOADING;
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
        creditVideo.play();
        menuMusic.stop();
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
        buttonClickFx.play();
        creditVideo.stop();
        menuMusic.play();
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

        this.creditsButtonSprite.collider = 'n';
        this.playButtonSprite.collider = 'n';
        this.settingButtonSprite.collider = 'n';
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