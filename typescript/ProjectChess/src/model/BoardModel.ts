class BoardModel{
    HEIGHT: number;
    WIDTH: number;

    pos2PieceMap: Map<Pos, PieceModel> = new Map();
	pos2SquareType: Map<Pos, SquareType> = new Map();
	
    constructor(argWidth:number, argHeight:number){
        this.HEIGHT = argHeight;
        this.WIDTH = argWidth;

        for(var y:number = 0; y < argHeight; y++){
            for(var x:number = 0; x < argWidth; x++){
                this.pos2PieceMap.set(new Pos(x, y), null);
				this.pos2SquareType.set(new Pos(x, y), SquareType.NORMAL);
            }
        }
    }

    addPiece(type: PieceType, x: number, y: number, color: Color){
        this.placePiece(PieceFactory.createPiece(this, new Pos(x, y), color, type));
    }

    placePiece(piece: PieceModel){
        this.pos2PieceMap.set(piece.getPos(), piece);
    }
	
	setSquareTypeAtPos(pos: Pos, type: SquareType){
        this.pos2SquareType.forEach((value, key, map) => {
            if (pos.equals(key)) {
                this.pos2SquareType.set(key, type);
            }
        });
	}
	
    getDirection(color: Color): number{
        if(Color.WHITE == color){
            return 1;
        }
        else if(Color.BLACK == color){
            return -1;
        }
    }
	
	getBackRank(color: Color): Pos[]{
		var result: Pos[] = new Array();
		
		if(this.getDirection(color) > 0){
			for(var i = 0; i < this.getWidth(); i++){
				result.push(new Pos(i, 0));
			}
		}
		else{
			for(var i = 0; i < this.getWidth(); i++){
				result.push(new Pos(i, this.getHeight() - 1));
			}
		}
		
		return result;
	}
	
	isOnOppositeBackRank(pos: Pos, color: Color): boolean{
		var backRank: Pos[] = this.getBackRank(color);
		
		for(var eachIdx in backRank){
			var eachPos = backRank[eachIdx];
			if(eachPos.equals(pos)){
				return true;
			}
		}
		
		return false;
	}
	
    isFree(pos: Pos): boolean{
        var result: boolean;
        this.pos2PieceMap.forEach((value, key, map) => {
            if (pos.equals(key)) {
                result = (value == null || value == undefined);
            }
        });

        return result;
    }

    isAllFree(positions: Pos[]):boolean{
        for(var posIdx in positions){
            var eachPosition = positions[posIdx];
            if(!(this.isFree(eachPosition))){
                return false;
            }
        }

        return true;
    }

    isCapturable(pos: Pos, color: Color): boolean{
        return this.isFree(pos)
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
            if(value != null){
                result.push(value);
            }
        });
        return result;
    }

    getAllPiecesOfColor(color: Color): PieceModel[]{
        var result: PieceModel[] = new Array();
        this.pos2PieceMap.forEach((value, key, map) => {
            if(value != null && value != undefined ){
                if(value.getColor() == color){
                    result.push(value);
                }
            }
        });
        return result;
    }

    removePiece(pos: Pos){
        this.pos2PieceMap.forEach((value, key, map) => {
            if(key.equals(pos)){
                this.pos2PieceMap.delete(key);
            }
        });
        this.pos2PieceMap.set(pos, null);
    }

    executeMove(move: Move){
        var originalPiece: PieceModel = this.getPieceFromPosition(move.getOrigin());
        originalPiece.onMove(move);
        if((move.getType() == MoveType.CAPTURE))
        {
            this.movePiece(originalPiece.getPos(), move.getDest());
        }
        else if(move.getType() == MoveType.FLING){
            this.removePiece(move.getDest());
        }
    }

    movePiece(origin: Pos, dest: Pos) {
        var piece = this.getPieceFromPosition(origin);
        this.removePiece(piece.getPos());
        this.removePiece(dest);
        var transposedPiece = PieceFactory.createPieceByTransposition(dest, piece);
        this.placePiece(transposedPiece);
    }

    isValidPosition(pos: Pos): boolean{
        var result = false;
        this.pos2SquareType.forEach((value, key, map) => {
            if (pos.equals(key)) {
                if(value != SquareType.NON_EXISTENT){
                    result = true;
                }

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
		
		result += "-";
		
		for(var y: number = 0; y < this.getHeight(); y++){
            for (var x: number = 0; x < this.getWidth(); x++){
                result += "[" + this.getSquareTypeFromPosition(new Pos(x,y)) + "],";
            }
            result = result.substring(0, result.length - 1);
            result += "/";
        }
		result = result.substring(0, result.length - 1);
        return result;
    }

    reset(){
        this.pos2PieceMap.clear();
        this.pos2SquareType.clear();
        for(var y:number = 0; y < this.getHeight(); y++){
            for(var x:number = 0; x < this.getWidth(); x++){
                this.pos2PieceMap.set(new Pos(x, y), null);
				this.pos2SquareType.set(new Pos(x, y), SquareType.NORMAL);
            }
        }
    }

    getAllMovesForColor(color: Color): MoveCollection{
        var pieces: PieceModel[] = this.getAllPiecesOfColor(color);
        var resultArr: MoveCollection = new MoveCollection();
        for(var pieceIdx in pieces){
            var eachPiece: PieceModel = pieces[pieceIdx];
            resultArr.addAll(eachPiece.getPossibleMoves());
        }
        return resultArr;
    }

    populateFromSerial(serial: string) {
        this.reset();
		var halvedData:string[] = serial.split("-");
		var configRows:string[] = halvedData[1].split("/");
        var rows:string[] = halvedData[0].split("/");
        for (var y = 0; y < rows.length; y++) {
            var row = rows[y];
            var squares:string[] = row.split(",");
            var length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var sqrData:string = squares[x].substring(1, squares[x].length - 1);

                if (sqrData.length != 0) {
                    var sqrDataSplit = sqrData.split("_");
                    var thisColor:Color;

                    if (sqrDataSplit[1] == "W") {
                        thisColor = Color.WHITE;
                    }
                    else {
                        thisColor = Color.BLACK;
                    }
                    this.addPiece(+sqrDataSplit[0], x, y, thisColor);
                }
            }
        }
	    for (var y = 0; y < configRows.length; y++) {
            var row = configRows[y];
            var squares:string[] = row.split(",");
            var length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var sqrData:string = squares[x].substring(1, squares[x].length - 1);
				this.setSquareTypeAtPos(new Pos(x,y), +sqrData);
            }
        }
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
	
	 getSquareTypeFromPosition(pos: Pos): any{
        var result;
        this.pos2SquareType.forEach((value, key, map) => {
            if (pos.equals(key)) {
                result = this.pos2SquareType.get(key);
            }
        });

        return result;
    }
}