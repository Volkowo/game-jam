let ship, resourceNodes, base;

function preload(){

}

function setup(){
    new Canvas(800,800)
    
    base = new Sprite(width/2, height/2);
    base.w = 100;
    base.h = 60;

    resourceNodes = new Group();
    resourceNodes.d = 50;
    resourceNodes.y = 50;
    while (resourceNodes.length < 3) {
        let resourceNode = new resourceNodes.Sprite();
        resourceNode.x = resourceNodes.length * 150;
    }

    ship = new Group();
    ship.w = 30;
    ship.h = 50;
}

function draw(){
    background(125)

    if (kb.presses('o')){
        new ship.Sprite(width/2, height/2-50);
    }
}