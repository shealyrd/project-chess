class Pos{
    private X: number;
    private Y: number;

    constructor(x: number, y: number){
        this.X = x;
        this.Y = y;
    }

    getX(): number{
        return this.X;
    }
    getY(): number{
        return this.Y;
    }

    toString(): string{
        return this.getX() + ", " + this.getY();
    }

    equals(pos: Pos): boolean{
        return (this.getX() == pos.getX()) && (this.getY() == pos.getY());
    }

    plus(addPos: Pos): Pos{
        var newX = this.getX() + addPos.getX();
        var newY = this.getY() + addPos.getY();
        return new Pos(newX, newY);
    }
	
	minus(subPos: Pos): Pos{
        var newX = this.getX() - subPos.getX();
        var newY = this.getY() - subPos.getY();
        return new Pos(newX, newY);
    }
	
	divide(scalar: number): Pos{
		var newX = Math.floor(this.getX() / scalar);
        var newY = Math.floor(this.getY() / scalar);
        return new Pos(newX, newY);
	}
}
