class Physics
{
    constructor(velocity, acceleration)
    {
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    updateVelocity(delta)
    {
        this.velocity.x += this.acceleration.x * delta;
        this.velocity.y += this.acceleration.y * delta;
    }
    updateAcceleration(deltaX, deltaY)
    {
        this.acceleration.x += deltaX;
        this.acceleration.y += deltaY;    
    }
    // getters
    getVelocity(){return this.velocity};
    getAcceleration(){return this.acceleration};


};