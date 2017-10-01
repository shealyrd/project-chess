class BoardModel{
    HEIGHT: number;
    WIDTH: number;

    pos2PieceMap: Map<Pos, PieceModel> = new Map();

    constructor(argWidth:number, argHeight:number){
        this.HEIGHT = argHeight;
        this.WIDTH = argWidth;

        for(var y:number = 0; y < argHeight; y++){
            for(var x:number = 0; x < argWidth; x++){
                this.pos2PieceMap.set(new Pos(x, y), null);
            }
        }
    }

    serialize(): string{
        return null;
    }
}