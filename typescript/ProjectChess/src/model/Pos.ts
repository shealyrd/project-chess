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

    equals(pos: Pos): boolean{
        return (this.getX() == pos.getX()) && (this.getY() == pos.getY());
    }

}
