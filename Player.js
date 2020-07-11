class PLayer extends Physics
{
    constructor(pos,velocity,acceleration, accelerationMagnitude, dashTime)
    {
		/*
		-87, -51
	-44,-89
	43,-89
	88,-48
	90,36
	50,84
	-47,85
	-83,54
		*/
        super(velocity,acceleration, pos, [createVector(-87, -51), createVector(-44, -89), createVector(43, -89), createVector(88, -48), createVector(90, 36), createVector(50, 84), createVector(-47, 85), createVector(-83, 54)]);
        this.isDead = false;
        this.canDash = false;
        this.Dashing = false;
        this.accelerationMagnitude = accelerationMagnitude;
        this.dashTime = dashTime;
    }
    // update player
    update(deltaTime)
    {
        // update velocity and position
		super.update(deltaTime);
        // get player input
        this.playerInput();
    }
    // draw player
    draw()
    {
        fill(0, 0, 0);
        ellipse(this.pos.x, this.pos.y, 25, 25);
    }

    playerInput()
    {
        let d = new p5.Vector(0,0,0);
        if (keyIsDown(LEFT_ARROW)) d.x = -1;
        if (keyIsDown(RIGHT_ARROW)) d.x = 1;
        if (keyIsDown(UP_ARROW)) d.y = -1;
        if (keyIsDown(DOWN_ARROW)) d.y = 1;
        if (!this.Dashing) this.updateAcceleration(d.x * this.accelerationMagnitude,d.y * this.accelerationMagnitude);
    }

    dash (direction)
    {
        this.Dashing = true;
        acceleration = new p5.Vector(0,0,0);
    }



}