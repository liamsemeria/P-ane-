class PLayer extends Physics
{
    constructor(pos,velocity,acceleration, accelerationMagnitude, dashTime)
    {
        super(velocity,acceleration);
        this.isDead = false;
        this.canDash = false;
        this.Dashing = false;
        this.pos = pos;
        this.accelerationMagnitude = accelerationMagnitude;
        this.dashTime = dashTime;
    }
    // update player
    update(deltaTime)
    {
        // get player input
        this.playerInput();
        // update velocity and position
        this.updateVelocity(deltaTime);
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
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