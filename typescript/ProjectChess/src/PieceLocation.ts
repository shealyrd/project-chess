class PieceLocation{
    x : number;
    y: number;
    type: PieceType;
    color: Color;

    constructor(x:number, y: number, type: PieceType, color: Color){
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
    }

    getX(): number{
        return this.x;
    }
    getY(): number{
        return this.y;
    }
    getType(): PieceType{
        return this.type;
    }
    getColor(): Color{
        return this.color;
    }
}
