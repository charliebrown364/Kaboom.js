import kaboom from "kaboom";

kaboom();

loadBean();
loadSprite("player", "sprites/bean.png");

const bean = add([
	sprite("bean"),
	pos(80, 40),
	area()
]);

const player = add([
	sprite("player"),
	pos(80, 40),
	area(),
    solid()
]);

// move bean

async function MoveBean() {
    var x = rand(10, width()  - 10);
    var y = rand(10, height() - 10);
    bean.moveTo(x, y);
    await new Promise(resolve => setTimeout(resolve, 2000));
    MoveBean();
}

// move player

function MovePlayer() {

    var xChange = 5000;
    var yChange = 5000;

    keyPress("left", () => {
        player.move(-xChange, 0);
    })

    keyPress("right", () => {
        player.move(xChange, 0);
    })

    keyPress("up", () => {
        player.move(0, -yChange);
    })

    keyPress("down", () => {
        player.move(0, yChange);
    })

}

MoveBean();
MovePlayer();