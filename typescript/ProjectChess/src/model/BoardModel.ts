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

    addPiece(type: PieceType, x: number, y: number, color: Color){
        this.placePiece(new PieceModel(this, new Pos(x, y), color, type));
    }

    placePiece(piece: PieceModel){
        this.pos2PieceMap.set(piece.getPos(), piece);
    }

    getHeight(): number{
        return this.HEIGHT;
    }

    getWidth(): number{
        return this.WIDTH;
    }

    getAllPieces(): PieceModel[]{
        var result: PieceModel[] = new Array();
        this.pos2PieceMap.forEach((value, key, map) => {
            result.push(value);
        });
        return result;
    }

    getAllPiecesOfColor(color: Color): PieceModel[]{
        var result: PieceModel[] = new Array();
        this.pos2PieceMap.forEach((value, key, map) => {
            if(value.getColor() == color){
                result.push(value);
            }
        });
        return result;
    }

    removePiece(pos: Pos){
        this.pos2PieceMap.forEach((value, key, map) => {
            if (pos.equals(key)) {
                this.pos2PieceMap.set(pos, null);
            }
        });
    }

    executeMove(move: Move){
        var originalPiece = this.getPieceFromPosition(move.getOrigin());
        this.movePiece(originalPiece, move.getDest());
    }

    movePiece(piece: PieceModel, dest: Pos){
        this.removePiece(piece.getPos());
        var transposedPiece = PieceFactory.createPieceByTransposition(dest, piece);
        this.placePiece(transposedPiece);
    }

    isValidPosition(pos: Pos): boolean{
        var result = false;
        this.pos2PieceMap.forEach((value, key, map) => {
            if (pos.equals(key)) {
                result = true;
            }
        });

        return result;
    }

    serialize(): string{
        var result = "";
        for(var y: number = 0; y < this.getHeight(); y++){
            for (var x: number = 0; x < this.getWidth(); x++){
                var thisPiece = this.getPieceFromPosition(new Pos(x, y));

                result += "[";
                if(thisPiece != null){
                    result += thisPiece.getType() + "_";

                    if(thisPiece.getColor() == Color.BLACK){
                        result += "B";
                    }
                    else{
                        result += "W";
                    }
                }
                result += "],";
            }
            result = result.substring(0, result.length - 1);
            result += "/";
        }
        result = result.substring(0, result.length - 1);
        return result;
    }

    getPieceFromPosition(pos: Pos): any{
        var result;
        this.pos2PieceMap.forEach((value, key, map) => {
            if (pos.equals(key)) {
                result = this.pos2PieceMap.get(key);
            }
        });

        return result;
    }
}