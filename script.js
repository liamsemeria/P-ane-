var timeLastCalled = 0;
var player;
// var enemy;
var entities;
var enemySpawner;

var WIDTH = 600;
var HEIGHT = 600;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	// enemy = new Enemy(createVector(-50, 100), createVector(200, 200), 166);
	enemySpawner = new EnemySpawner(2, 150);
    player = new PLayer(new p5.Vector(200,200,0), new p5.Vector(0,0,0), new p5.Vector(0,0,0),50,.2);
	entities = [player];
	timeLastCalled = millis();
}

function draw() {
	var timeNow = millis();
	var dt = (timeNow - timeLastCalled) / 1000;
	timeLastCalled = timeNow;
	background(220);
	enemySpawner.update(entities, player);
	for (var i = 0; i < entities.length; i++)
	{
		entities[i].update(dt);
		entities[i].draw();
	}
	for (var i = 0; i < entities.length; i++)
	{
		if (entities[i].shouldDelete)
		{
			console.log("DELETING");
			entities.splice(i, 1);
			i--;
		}
	}
}