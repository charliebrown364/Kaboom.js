import kaboom from "kaboom"

kaboom()

loadSprite("player", "sprites/bean.png")
loadSprite("pizza", "sprites/pizza.png")

// game

const JUMP_FORCE = 600
const GRAVITY = 1800
const NUM_PLATFORMS = 100
const NUM_PIZZAS = 5
const STARTING_TIME = 30

var score

scene("game", () => {

    score = 0

    gravity(GRAVITY)

    // player

    const player = add([
        sprite("player"),
        pos(width() / 2, height() - 20),
        scale(0.3), 
        area(),
        body(),
        "player"
    ])

    // floor

    add([
        rect(width(), 5),
        pos(0, height() - 5),
        outline(1),
        area(),
        solid(),
        color(0, 128, 0),
        "floor"
    ])

    // platforms

    var getNewPlatform = true
    var length, platform_x, platform_y

    for (var i = 0; i < NUM_PLATFORMS; i++) {

        length = rand(30, width() / 10)
        platform_x = rand(0, width()  - length)
        platform_y = rand(0, height() - 10)
        
        const current_platform = add([
            rect(length, 5),
            pos(platform_x, platform_y),
            outline(1),
            area(),
            solid(),
            color(0, 128, 255),
            "platform"
        ])
        
        while (getNewPlatform) {
        
            getNewPlatform = false
        
            current_platform.collides("platform", (platform) => {
                destroy(platform)
                getNewPlatform = true
            })
        
        }

    }

    // movement

    keyPress("space", () => {
        if (player.grounded()) {
            player.jump(JUMP_FORCE)
        }
    })

    keyDown("left", () => {
        player.move(-400, 0)
    })

    keyDown("right", () => {
        player.move(400, 0)
    })

    // pizzas & score

    var pizza_x, pizza_y

    for (var i = 0; i < NUM_PIZZAS; i++) {

        pizza_x = rand(0, width())
        pizza_y = rand(0, height())

        add([
            sprite("pizza"),
            pos(pizza_x, pizza_y),
            scale(0.3), 
            area(),
            "pizza"
        ])

    }

    add([
	    text(score),
	    pos(10, 10),
        scale(0.5),
        "score"
    ])

    player.collides("pizza", (pizza) => {
                
                destroy(pizza)
                destroyAll("score")
                
                score ++

                add([
                    text(score),
                    pos(10, 10),
                    scale(0.5),
                    "score"
                ])

    })

    // time

    var time = STARTING_TIME

    loop(1, () => {
    
        if (time != STARTING_TIME) {
            destroyAll("time")
        }

        add([
            text(time),
            pos(10, 50),
            scale(0.5),
            "time"
        ])

        if (time == 0) {
            go("lose", score)
        }

        time -= 1

    })

})

// lose scene

scene("lose", () => {

	add([
		text("Game Over"),
		pos(center()),
		origin("center"),
	])

    add([
		text("Score: " + score),
		pos(width() / 2, height() / 2 + 100),
		origin("center"),
	])

    keyPress("space", () => go("game"));
	mouseClick(() => go("game"));

})

go("game")

/*

TO DO:
- fix positions of random platform
- add settings (instructions)

*/