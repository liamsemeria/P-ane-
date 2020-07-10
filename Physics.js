class Physics
{
    constructor(velocity, acceleration, pos, vertices)
    {
        this.velocity = velocity;
        this.acceleration = acceleration;
		this.pos = pos;
		this.vertices = vertices;
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
	
	vecCompare(v1, v2)
	{
		if (v1.x > v2.x)
		{
			return 1;
		}
		if (v1.x == v2.x && v1.y > v2.y)
		{
			return 1;
		}
		if (v1.x == v2.x && v1.y == v2.y)
		{
			return 0;
		}
		return -1;
	}
	
	squash(v1, v2)
	{
		var proj = createVector(v2.x - v1.x, v2.y - v1.y).normalize();
		var points = [];
		var rv = getRealVertices();
		for (var i = 0; i < rv.length; i++)
		{
			var vec = rv[i];
			var pproj = proj.mult(vec.dot(proj));
			points.push(pproj);
		}
		points.sort(vecCompare);
		return [points[0], points[points.length - 1]];
	}
	
	intervalsIntersect(i1, i2)
	{
		var comp = vecCompare(i1[0], i2[0])
		if (comp > 0)
		{
			return intervalMerge(i2, i1)
		}
		return vecCompare(i1[1], i2[0]) >= 0;
	}
	
	getRealVertices()
	{
		var result = [];
		for (var i = 0; i < vertices.length; i++)
		{
			result.push(p5.Vector.add(vertices[i] + pos));
		}
		return result;
	}
    
    collidingWith(other)
    {
		var rv = getRealVertices();
		var otherrv = other.getRealVertices();
		
		for (var i = 0; i < rv.length; i++)
		{
			var v1 = rv[i];
			var v2 = rv[(i + 1) % rv.length];
			var inte = squash(v1, v2);
			var otherInte = other.squash(v1, v2);
			if (intervalsIntersect(inte, otherInte))
			{
				return true;
			}
		}
		return false;
    }
    
    // getters
    getVelocity(){return this.velocity};
    getAcceleration(){return this.acceleration};


};