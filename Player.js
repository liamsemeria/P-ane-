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
        this.canDash = true;
        this.Dashing = false;
        this.accelerationMagnitude = accelerationMagnitude;
        this.dashTime = dashTime;
        this.timePassed = dashTime;
        this.dashDirection = new p5.Vector(0,0,0);
    }
    // update player
    update(deltaTime)
    {
        // get player input
        this.playerInput();
        // velocity cap
        if (this.velocity.mag() < 6)
		{
			this.updateVelocity(deltaTime);
		}
        else
        {
            // if cap is reached reduce acceleration and velocity
            this.acceleration.mult(.45);
            this.velocity.mult(.9);
        }
        // update position
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        // dashing
        if (this.Dashing)
        {
            this.acceleration = new p5.Vector(0,0,0);
            this.velocity = this.dashDirection;
            this.timePassed -= deltaTime;
            if (this.timePassed < 0)
            {
                this.Dashing = false;
                this.velocity = new p5.Vector(0,0,0)
                //this.canDash = false;
                this.timePassed = this.dashTime;
            }
        }

    }
    // draw player
    draw()
    {
        // change color when dashing
        if (this.Dashing) fill(93,125,252);
        else fill(0, 0, 0);
        ellipse(this.pos.x, this.pos.y, 25, 25);
    }

    playerInput()
    {
        let d = new p5.Vector(0,0,0);
        if (keyIsDown(65)) d.x = -1;
        if (keyIsDown(68)) d.x = 1;
        if (keyIsDown(87)) d.y = -1;
        if (keyIsDown(83)) d.y = 1;
        // change acceleration
        if (!this.Dashing) this.updateAcceleration(d.x * this.accelerationMagnitude,d.y * this.accelerationMagnitude);
        if (!this.Dashing && mouseIsPressed && this.canDash) this.dash();
    }

    dash()
    {
        this.Dashing = true;
        this.dashDirection = new p5.Vector(this.pos.x - mouseX, this.pos.y - mouseY,0);
        this.dashDirection.normalize().mult(-5);
    }



}