var settings = {
    cols: 0,
    rows: 0,
    cellWidth: 50,
    canvasWidth: 1280,
    canvasHeight: 720,
    background: 230,
    strokeColorMaze: 0,
    strokeWeightMaze: 4,
    defaultWeapon: Gun
};
var game = new Game(settings);
var Engine = Matter.Engine, World = Matter.World, Vector = Matter.Vector, Events = Matter.Events, Bodies = Matter.Bodies;
// create an engine
var engine = Engine.create();
engine.world.gravity.y = 0;
function setup() {
    game.settings.cols = Math.round(random(5, 16));
    game.settings.rows = Math.round(random(5, 16));
    game.settings.canvasWidth = game.settings.cols * game.settings.cellWidth + 1;
    game.settings.canvasHeight = game.settings.rows * game.settings.cellWidth + 1;
    createCanvas(game.settings.canvasWidth, game.settings.canvasHeight);
    game.maze = new Maze(game.settings.cols, game.settings.rows, game.settings.cellWidth);
    game.player = new Tank();
    game.player.spawnRandom(game.settings.cols, game.settings.rows, game.settings.cellWidth);
    Matter.Events.on(engine, 'collisionStart', function (event) {
        // console.log(event.pairs[0]);
        event.pairs.forEach(function (pair) {
            var bodyA = pair.bodyA;
            var bodyB = pair.bodyB;
            var wall;
            if (bodyA.label == 'wall') {
                wall = bodyA;
            }
            if (bodyB.label == 'wall') {
                wall = bodyB;
            }
            var bullet;
            if (bodyA.label == 'bullet') {
                bullet = bodyA;
            }
            if (bodyB.label == 'bullet') {
                bullet = bodyB;
            }
            if (wall && bullet) {
                bullet.angle = Vector.angle(wall.position, bullet.position);
            }
        });
    });
    rectMode(CENTER);
    frameRate(60);
}
function draw() {
    background(game.settings.background);
    game.maze.render();
    game.player.show();
    Engine.update(engine);
    meter.tick();
}
//# sourceMappingURL=main.js.map