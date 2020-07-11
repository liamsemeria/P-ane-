var timeLastCalled = 0;

function setup() {
      createCanvas(600, 600);
      player = new PLayer(new p5.Vector(200,200,0), new p5.Vector(0,0,0), new p5.Vector(0,0,0),.005,250);
	timeLastCalled = millis();
}

function draw() {
      var timeNow = millis();
	var dt = timeNow - timeLastCalled;
	timeLastCalled = timeNow;
      background(220);
      fill(10, 10, 225);
      ellipse(100, 100, 50, 50);
      player.update(dt);
      player.draw();
}