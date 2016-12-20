var game = {
  settings: {
    cols: 0,
    rows: 0,
    cellWidth: 50,
    canvasWidth: 1280,
    canvasHeight: 720,
    background: 230,
    strokeColorMaze: 0,
    strokeWeightMaze: 4
  },
  maze: null,
  player: null
};

function setup() {
  game.settings.cols = Math.round(random(5,16));
  game.settings.rows = Math.round(random(5,16));

  game.settings.canvasWidth = game.settings.cols * game.settings.cellWidth + 1;
  game.settings.canvasHeight = game.settings.rows * game.settings.cellWidth + 1;

  createCanvas(game.settings.canvasWidth, game.settings.canvasHeight);
  game.maze = new Maze(game.settings.cols, game.settings.rows, game.settings.cellWidth);

  game.player = new Tank();
  game.player.spawnRandom(game.settings.cols, game.settings.rows, game.settings.cellWidth);

  frameRate(60);
}

function draw() {
  background(game.settings.background);

  game.maze.render();
  game.player.update();

  meter.tick();
}
