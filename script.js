var timeLastCalled = 0;
var player;
// var enemy;
var entities;
var enemySpawner;

var WIDTH = 400;
var HEIGHT = 400;

function setup() {
	createCanvas(WIDTH, HEIGHT);
	player = new PLayer(new p5.Vector(200,200,0), new p5.Vector(0,0,0), new p5.Vector(0,0,0),5,1);
	// enemy = new Enemy(createVector(-50, 100), createVector(200, 200), 166);
	entities = [player];
	enemySpawner = new EnemySpawner(2, 150);
	timeLastCalled = millis();
}

function draw() {
	var timeNow = millis();
	var dt = (timeNow - timeLastCalled) / 1000;
	timeLastCalled = timeNow;
	background(220);
	fill(10, 10, 225);
	ellipse(100, 100, 50, 50);
	enemySpawner.update(entities, player);
	for (var i = 0; i < entities.length; i++)
	{
		if (entities.length > 1)
		{
			console.log("hi " + entities.length);
		}
		entities[i].update(dt);
		entities[i].draw();
	}
	for (var i = 0; i < entities.length; i++)
	{
		if (entities[i].shouldDelete)
		{
			entities.splice(i, 1);
			i--;
		}
	}
}