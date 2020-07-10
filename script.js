var timeLastCalled = 0;

function setup() {
      createCanvas(400, 400);
      player = new PLayer(new p5.Vector(200,200,0), new p5.Vector(0,0,0), new p5.Vector(0,0,0),.001,1);
	timeLastCalled = millis();
}

function draw() {
      var timeNow = millis();
	var dt = timeNow - timeLastCalled;
	timeLastCalled = timeNow;
      background(220);
      fill(10, 10, 225);
      ellipse(100, 100, 50, 50);
      player.update(1);
      player.draw();
}