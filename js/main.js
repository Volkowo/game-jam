let ship, resourceNodes, base;
let resourceCounter = 0;
let spawnBoolean = false;

function preload(){

}

function setup(){
    new Canvas(800,800)
    
    base = new Sprite(width/2, height/2);
    base.w = 100;
    base.h = 60;

    resourceNodes = new Group();
    // resourceNodes.d = 50;
    // resourceNodes.y = 50;
    // while (resourceNodes.length < 3) {
    //     let resourceNode = new resourceNodes.Sprite();
    //     resourceNode.x = resourceNodes.length * 150;
    // }

    ship = new Group();
    ship.w = 30;
    ship.h = 50;
}

function draw(){
    background(125);

    textSize(22);
    text("Resource Collected: " + resourceCounter, 50, 700);

    spawnResources();
    collectResources();
    spawnMinions();
}

function spawnResources(){
    if(spawnBoolean == false){
        for(let i = 0; resourceNodes.length < 8; i++){
            resourceNodes.add(createResource());
            console.log(resourceNodes.length);
        }
        spawnBoolean = true;
    } 
}

function createResource(){
    let resourceNode = new Sprite();
    resourceNode.d = 50;
    resourceNode.y = 50;
    resourceNode.x = (resourceNodes.length * 100) + 50;
    resourceNode.collider = 'static'

    return resourceNode;
}

function collectResources(){
    for(let i = 0; i < resourceNodes.length; i++){
        // console.log(dist(mouseX, mouseY, resourceNodes[0].x, resourceNodes[0].y))
        if(mouse.pressing() && dist(mouseX, mouseY, resourceNodes[i].x, resourceNodes[i].y) < resourceNodes[0].d){
            resourceNodes[i].remove();
            resourceCounter += 1;
            console.log(resourceCounter);
        }
    }
}

let warningText = false;

function spawnMinions(){
    if (kb.presses('o') && resourceCounter >= 3){
        new ship.Sprite(width/2, height/2-50);
        resourceCounter -= 3;
    } else {
        text("You need to collect at least 3 resources to spawn a ship!", 50 , 750)
    }
}