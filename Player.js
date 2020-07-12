class PLayer extends Physics
{
    constructor(pos,velocity,acceleration, accelerationMagnitude, dashTime)
    {
        super(velocity,acceleration, pos, [createVector(-11, -6), createVector(-5, -11), createVector(5, -11), createVector(11, -6), createVector(11, 4), createVector(6, 11), createVector(-6, 11), createVector(-10, 7)]);
        this.isDead = false;
        this.canDash = false;
        this.Dashing = false;
        this.accelerationMagnitude = accelerationMagnitude;
        this.dashTime = dashTime;
        this.timePassed = dashTime;
        this.dashDirection = new p5.Vector(0,0,0);
        this.gettingHit = [];
        this.granterpos = new p5.Vector(0,0,0);
        this.granterSpawnTime = 5;
        this.timePassedGranter = -1;
    }
    // update player
    update(deltaTime)
    {
        // get player input
        this.playerInput();
        // velocity cap
        if (this.velocity.mag() < 400)
		{
			this.updateVelocity(deltaTime);
		}
        else
        {
            // if cap is reached reduce acceleration and velocity
            this.acceleration.mult(.4);
            this.velocity.mult(.9);
        }
        // update position
        this.pos.x += this.velocity.x * deltaTime;
        this.pos.y += this.velocity.y * deltaTime;
        // dashing
        if (this.Dashing)
        {
            this.acceleration = new p5.Vector(0,0,0);
            this.velocity = this.dashDirection;
            this.timePassed -= deltaTime;
            if (this.timePassed < 0)
            {
                this.Dashing = false;
                this.velocity.mult(.2);
                this.canDash = false;
                this.timePassed = this.dashTime;
            }
        }
        // bounce of the edges of the screen
        this.bounceOfWalls();
        // death
        if (this.gettingHitAtAll() && !this.Dashing)
        {
            this.acceleration = new p5.Vector(0,0,0);
            this.velocity = new p5.Vector(0,0,0);
            this.canDash = false;
            this.isDead = true;
        }
        // get dash back if near granter
        if (this.pos.dist(this.granterpos) < 35)
        {
            this.canDash = true;
            this.granterpos = new p5.Vector(-20,-20,0);
            this.timePassedGranter = 0;
        }
        // respawn the granter 5 seconds after it is collected
        if ((this.timePassedGranter != -1) && (this.timePassedGranter < 5)) this.timePassedGranter += deltaTime;
        if (this.timePassedGranter > this.granterSpawnTime)
        {
            this.spawnGranter()
        }
    }
	
	gettingHitAtAll()
	{
		console.log(this.gettingHit.length);
		for (var i = 0; i < this.gettingHit.length; i++)
		{
			if (this.gettingHit[i])
			{
				this.gettingHit = [];
				return true;
			}
		}
		this.gettingHit = [];
		return false;
	}
	
    // draw player
    draw()
    {
        // change color when dashing
        if (this.Dashing) fill(93,125,252);
        else if (this.isDead) fill(200, 20, 20);
		else fill(0, 0, 0);
        // makes a "cursor" shape rotated for the acceleration
        translate(this.pos.x,this.pos.y);
        rotate(this.pos.angleBetween(this.acceleration));
        quad(8,-10,3,3,-10,8,16,16);
        rotate(-this.pos.angleBetween(this.acceleration));
        translate(-this.pos.x,-this.pos.y);

        fill(93,125,260);
        ellipse(this.granterpos.x, this.granterpos.y, 10, 10);
    }

    bounceOfWalls()
    {
        if ((this.pos.x - 12.5 < 0) || (this.pos.x + 12.5 > WIDTH)) this.velocity.x *= -1.5;
        else if ((this.pos.y - 12.5 < 0) || (this.pos.y + 12.5 > HEIGHT)) this.velocity.y *= -1.5;
    }

    playerInput()
    {
        let d = new p5.Vector(0,0,0);
        if (keyIsDown(65)) d.x = -1;
        if (keyIsDown(68)) d.x = 1;
        if (keyIsDown(87)) d.y = -1;
        if (keyIsDown(83)) d.y = 1;
        // change acceleration
        if (!this.Dashing && !this.isDead) this.updateAcceleration(d.x * this.accelerationMagnitude,d.y * this.accelerationMagnitude);
        if (!this.Dashing && mouseIsPressed && this.canDash) this.dash();
    }

    dash()
    {
        this.Dashing = true;
        this.dashDirection = new p5.Vector(this.pos.x - mouseX, this.pos.y - mouseY,0);
        this.dashDirection.normalize().mult(-1000);
    }

    spawnGranter()
    {
        this.granterpos = new p5.Vector(20 + random()*(WIDTH-20),20 + random()*(HEIGHT-20),0);
        this.timePassedGranter = -1;
    }

    // getters and setters
    getIsDead() {return this.isDead};
    setIsDead(b) {this.isDead = b};

}