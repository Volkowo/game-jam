class Factory {
    constructor() {

    }
    preload() {

    }
    setup() {
        rectMode(CENTER);
        this.createBase(W/2+300,H/2+100);
        this.createSmallNode(W/2+400,H/2+200);
        this.createSmallNode(W/2+500,H/2);
        this.createBigNode(200,100);
        this.createSloop(W/2+200,H/2);
    }
    draw(){

    }

    //___________________For Base, Towns and Resource Nodes___________________//
    createItem(x,y) {
        let item = new Sprite(x,y);
        return item;
    }
    createBase(x,y) {
        let item = this.createItem(x,y);
        item.draw = function() {
            fill('blue');
            rect(0,0, 100,100);
        }
        return item;
    }
    createSmallNode(x,y) {
        let item = this.createItem(x,y);
        item.draw = function() {
            fill('green');
            quad(0,-10, 10,0, 0,10, -10,0);
        }
        return item;
    }
    createBigNode(x,y) {
        let item = this.createItem(x,y);
        item.draw = function() {
            fill('brown');
            quad(0,-30, 30,0, 0,30, -30,0);
        }
        return item;
    }

    //___________________For all types of ships___________________//
    createShip(x, y, type) {
        let ship = this.createItem(x,y);
        ship.type = type;
        return ship;
    }

    createSloop(x,y){
        let ship = this.createShip(x, y, "sloop");
        ship.draw = function() {
            fill('red');
            rect(0,0, 30,10);
        }
        ship.originalPosition = {x:x, y:y};
        return ship;
    }
}