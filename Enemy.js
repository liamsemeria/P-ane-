
class Enemy extends Physics
{
	constructor(pos, target, speed, player, entities, hitbox)
	{
		super(Enemy.getDirection(pos, target).mult(speed), createVector(0, 0), pos, hitbox);
		this.destroyOffBounds = true;
		this.player = player;
		this.entities = entities;
	}
	
	static getDirection(pos1, pos2)
	{
		var result = createVector(pos2.x - pos1.x, pos2.y - pos1.y).normalize();
		return result;
	}
	
	draw() //override
	{
		fill(0, 0, 0);
		rect(this.pos.x, this.pos.y, 10, 10);
	}
	
	outOfBounds(leni)
	{
		var result = this.pos.x < -leni || this.pos.x > WIDTH + leni || this.pos.y < -leni || this.pos.y > HEIGHT + leni;
		return result;
	}
	
	update(deltaTime)
	{
		this.updateMovement(deltaTime);
		if (this.collidingWith(player))
		{
			// console.log("ahhhhh");
			player.gettingHit.push(true);
		}
		else
		{
			player.gettingHit.push(false);
		}
	}
}

class EnemyPolygon extends Enemy
{
	constructor(pos, target, speed, player, entities, vertices, enColor)
	{
		super(pos, target, speed, player, entities, vertices);
		this.enColor = enColor;
	}
	
	draw()
	{
		fill(this.enColor[0], this.enColor[1], this.enColor[2]);
		beginShape();
		for (var i = 0; i < this.vertices.length; i++)
		{
			vertex(this.vertices[i].x + this.pos.x, this.vertices[i].y + this.pos.y);
		}
		endShape(CLOSE);
	}
}

var POLYGON_CONSTRAINTS = [
	[7, 17, 4, 14],
	[24, 33, 4, 14],
	[34, 42, 18, 28],
	[24, 33, 30, 40],
	[7, 17, 30, 40],
	[1, 7, 18, 28]
]

var BIG_CONSTRAINTS = [
	[14, 34, 8, 28],
	[48, 66, 8, 28],
	[68, 84, 36, 56],
	[48, 66, 60, 80],
	[14, 34, 60, 80],
	[2, 14, 36, 56]
]

function rand(a, b)
{
	return Math.floor(random() * (b - a + 1)) + a;
}

class EnemySpawner
{
	constructor(startRate, startSpeed)
	{
		this.startRate = startRate;
		this.startSpeed = startSpeed;
		this.lastSpawned = millis();
		this.LENIENCY = 100; // for checking out of bounds & spawning objects
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
	
	getSpeed(roundTime)
	{
		return this.startSpeed + roundTime * 5;
	}
	
	getRate(roundTime)
	{
		return this.startRate / (1 + roundTime / 10);
	}
	
	randomEnemy(roundTime)
	{
		var r = random();
		var pos = EnemySpawner.randomPos(this.LENIENCY);
		var target = player.pos;
		if (r < 0.9)
		{
			var points = [];
			var speed = this.getSpeed(roundTime);
			for (var i = 0; i < POLYGON_CONSTRAINTS.length; i++)
			{
				var pointX = rand(POLYGON_CONSTRAINTS[i][0], POLYGON_CONSTRAINTS[i][1]);
				var pointY = rand(POLYGON_CONSTRAINTS[i][2], POLYGON_CONSTRAINTS[i][3]);
				var toPush = createVector(pointX, pointY)
				points.push(toPush);
			}
			var grey = rand(25, 100);
			return new EnemyPolygon(pos, target, speed, player, entities, points, [grey, grey, grey]);
		}
		var points = [];
		for (var i = 0; i < BIG_CONSTRAINTS.length; i++)
		{
			var pointX = rand(BIG_CONSTRAINTS[i][0], BIG_CONSTRAINTS[i][1]);
			var pointY = rand(BIG_CONSTRAINTS[i][2], BIG_CONSTRAINTS[i][3]);
			var toPush = createVector(pointX, pointY)
			points.push(toPush);
		}
		var grey = rand(25, 100);
		return new EnemyPolygon(pos, target, 20, player, entities, points, [grey, grey, grey]);
	}
	
	update(entities, player, roundTime)
	{
		// check out of bounds
		for (var i = 0; i < entities.length; i++)
		{
			if (entities[i].destroyOffBounds && entities[i].outOfBounds(this.LENIENCY))
			{
				entities[i].shouldDelete = true;
			}
		}
		
		if (millis() - this.lastSpawned > this.getRate(roundTime) * 1000)
		{
			
			var newEnemy = this.randomEnemy(roundTime);
			
			entities.push(newEnemy);
			this.lastSpawned = millis();
		}
	}
}

































