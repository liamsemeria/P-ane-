var timeLastCalled = 0;

function setup() {
	createCanvas(400, 400);
	timeLastCalled = millis();
}

function draw() {
      var timeNow = millis();
	var dt = timeNow - timeLastCalled;
	timeLastCalled = timeNow;
      background(220);
      fill(10, 10, 225);
      ellipse(100, 100, 50, 50);
}