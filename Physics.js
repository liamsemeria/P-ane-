class Physics
{
    constructor(velocity, acceleration)
    {
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    updateVelocity(delta)
    {
        this.velocity[0] += this.acceleration[0] * delta;
        this.velocity[1] += this.acceleration[1] * delta;
    }
    updateAcceleration(deltaX, deltaY)
    {
        this.acceleration[0] += deltaX;
        this.acceleration[1] += deltaY;    
    }
    // getters
    getVelocity(){return this.velocity};
    getAcceleration(){return this.acceleration};


};