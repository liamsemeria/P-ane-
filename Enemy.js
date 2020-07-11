
class Enemy extends Physics
{
	constructor(pos, target, speed)
	{
		super(Enemy.getDirection(pos, target).mult(speed), createVector(0, 0), pos, []);
	}
	
	static getDirection(pos1, pos2)
	{
		var result = createVector(pos2.x - pos1.x, pos2.y - pos1.y).normalize();
		return result;
	}
	
	draw()
	{
		fill(0, 0, 0);
		rect(this.pos.x, this.pos.y, 10, 10);
	}
	
	outOfBounds(leni)
	{
		return this.pos.x < -leni || this.pos.x > WIDTH + leni || this.pos.y < -leni || this.pos.y > HEIGHT + leni;
	}
}

class EnemySpawner
{
	constructor(rate, speed)
	{
		this.rate = rate;
		this.speed = speed;
		this.lastSpawned = millis();
		this.LENIENCY = 100; // for checking out of bounds
	}
	
	static randomPos(leni)
	{
		if (Math.random() * 2 < 1)
		{
			var val = Math.floor(Math.random() * WIDTH);
			if (Math.random() * 2 < 1)
			{
				return createVector(val, -leni);
			}
			return createVector(val, HEIGHT + leni);
		}
		var val = Math.floor(Math.random() * HEIGHT);
		if (Math.random() * 2 < 1)
		{
			return createVector(-leni, val);
		}
		return createVector(WIDTH + leni, val);
	}
	
	update(entities, player)
	{
		// check out of bounds
		for (var i = 0; i < entities.length; i++)
		{
			if (typeof entities[i] == Enemy && entities[i].outOfBounds(this.LENIENCY))
			{
				entities.shouldDelete = true;
			}
		}
		
		if (millis() - this.lastSpawned > this.rate * 1000)
		{
			console.log("hi " + entities.length);
			entities.push(new Enemy(EnemySpawner.randomPos(this.LENIENCY), player.pos, this.speed));
			console.log("hi " + entities.length);
			this.lastSpawned = millis();
		}
	}
}

































