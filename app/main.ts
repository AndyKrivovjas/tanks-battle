var maze;

function setup() {
  var cols = Math.round(random(5,16));
  var rows = Math.round(random(5,16));
  var cell = 50;

  createCanvas(cols * cell + 1, rows * cell + 1);
  maze = new Maze(cols, rows, cell);
  maze.init();
  frameRate(30);
}

function draw() {
  background(240);
  maze.render();
}
