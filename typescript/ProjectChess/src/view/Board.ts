class Board extends HTMLObject{
    squares: Square[] = new Array();
    rows: Row[] = new Array();
    pieces: Piece[] = new Array();

    locations: PieceLocation[] = new Array();

    numRows: number;
    numColumns: number;
    offsetTop: number;
    offsetLeft: number;

    squareWidth: number;
    squareHeight: number;



    constructor(numCol: number, numRows: number, offsetTop?: number, offsetLeft?: number, squareWidth?: number, squareHeight?: number) {
        super();
        if (offsetTop == null) {
            offsetTop = 0;
        }
        if (offsetLeft == null) {
            offsetLeft = 0;
        }
        if (squareWidth == null) {
            squareWidth = 50;
        }
        if (squareHeight == null) {
            squareHeight = 50;
        }
        this.squareHeight = squareHeight;
        this.squareWidth = squareWidth;
        this.initialize(numCol, numRows, offsetTop, offsetLeft);
    }

    initialize(numCol: number, numRows: number, offsetTop: number, offsetLeft: number){
        this.numRows = numRows;
        this.numColumns = numCol;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;

        this.rows = new Array();
        var cornerColor: Color = Color.WHITE;

        for(var i: number = 0; i < this.numRows; i++){
            var row: Row = new Row(this.offsetLeft, this.offsetTop + (i * this.squareHeight), this.squareWidth * this.numColumns, this.squareHeight, this.numColumns);
            row.setY(i);
            row.initialize();
            row.setAlternating(cornerColor);
            this.rows.push(row);

            if(cornerColor == Color.WHITE){
                cornerColor = Color.BLACK;
            }
            else if(cornerColor == Color.BLACK){
                cornerColor = Color.WHITE;
            }
        }
    }

    getPieces(): Piece[]{
        return this.pieces;
    }
	
	getSquares(): Square[]{
		var result: Square[] = new Array();
		
		for(var row in this.rows){
			var each: Row = this.rows[row];
            var meSqrs = each.getSquares();
			for(var square in each.getSquares()){
                var eachSqr = meSqrs[square];
				result.push(eachSqr);
			}
		}
		
        return result;
    }


    addPiece(piece: PieceType, x: number, y: number, color: Color){
        var newPiece: Piece;
       /* switch(piece){
            case PieceType.ROOK: newPiece = new Rook(this.calcPosFromLeft(x), this.calcPosFromTop(Rook.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Rook.getSizeRatio()), y, color); break;
            case PieceType.QUEEN: newPiece = new Queen(this.calcPosFromLeft(x), this.calcPosFromTop(Queen.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Queen.getSizeRatio()), y, color); break;
            case PieceType.BISHOP: newPiece = new Bishop(this.calcPosFromLeft(x), this.calcPosFromTop(Bishop.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Bishop.getSizeRatio()), y, color); break;
            case PieceType.PAWN: newPiece = new Pawn(this.calcPosFromLeft(x), this.calcPosFromTop(Pawn.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Pawn.getSizeRatio()), y, color); break;
            case PieceType.KNIGHT: newPiece = new Knight(this.calcPosFromLeft(x), this.calcPosFromTop(Knight.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Knight.getSizeRatio()), y, color); break;
            case PieceType.KING: newPiece = new King(this.calcPosFromLeft(x), this.calcPosFromTop(King.getSizeRatio(), y), this.squareWidth, (this.squareHeight * King.getSizeRatio()), y, color); break;
            case PieceType.GENERAL: newPiece = new General(this.calcPosFromLeft(x), this.calcPosFromTop(Knight.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Knight.getSizeRatio()), y, color); break;
            case PieceType.MINISTER: newPiece = new Minister(this.calcPosFromLeft(x), this.calcPosFromTop(King.getSizeRatio(), y), this.squareWidth, (this.squareHeight * King.getSizeRatio()), y, color); break;
        }*/
        newPiece = new Piece(this.calcPosFromLeft(x), this.calcPosFromTop(Piece.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Piece.getSizeRatio()), y, color, piece);
        newPiece.setX(x);
        newPiece.setY(y);
        this.pieces.push(newPiece);
        this.addLocation(x, y, piece, color);
    }

    toHTML():string {
        var result: string = "";

        for (var row in this.rows) {
            result += this.rows[row].toHTML();
        }

        for (var piece in this.pieces) {
            result += this.pieces[piece].toHTML();
        }

        return result;
    }

    public setStandard(){
        this.addPiece(PieceType.ROOK, 0, 0, Color.BLACK);
        this.addPiece(PieceType.KNIGHT, 1, 0, Color.BLACK);
        this.addPiece(PieceType.BISHOP, 2, 0, Color.BLACK);
        this.addPiece(PieceType.QUEEN, 3, 0, Color.BLACK);
        this.addPiece(PieceType.KING, 4, 0, Color.BLACK);
        this.addPiece(PieceType.BISHOP, 5, 0, Color.BLACK);
        this.addPiece(PieceType.KNIGHT, 6, 0, Color.BLACK);
        this.addPiece(PieceType.ROOK, 7, 0, Color.BLACK);

        this.addPiece(PieceType.PAWN, 0, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 1, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 2, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 3, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 4, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 5, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 6, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 7, 1, Color.BLACK);


        this.addPiece(PieceType.ROOK, 0, 7, Color.WHITE);
        this.addPiece(PieceType.KNIGHT, 1, 7, Color.WHITE);
        this.addPiece(PieceType.BISHOP, 2, 7, Color.WHITE);
        this.addPiece(PieceType.QUEEN, 3, 7, Color.WHITE);
        this.addPiece(PieceType.KING, 4, 7, Color.WHITE);
        this.addPiece(PieceType.BISHOP, 5, 7, Color.WHITE);
        this.addPiece(PieceType.KNIGHT, 6, 7, Color.WHITE);
        this.addPiece(PieceType.ROOK, 7, 7, Color.WHITE);

        this.addPiece(PieceType.PAWN, 0, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 1, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 2, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 3, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 4, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 5, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 6, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 7, 6, Color.WHITE);
    }

    private addLocation(x: number, y: number, type: PieceType, color: Color){
        var newLocation = new PieceLocation(x, y, type, color);
        this.locations.push(newLocation);
    }

    private calcPosFromLeft(x:number): number{
        return this.offsetLeft + (x * this.squareWidth);
    }

    private calcPosFromTop(ratio: number, y:number): number{
        return (this.offsetTop + (y * this.squareHeight)) + (this.squareHeight * ( 1 - ratio));
    }

    public getPieceById(id: string): Piece{
        for(var piece in this.pieces){
            var each = this.pieces[piece];
            if(each.getId() == id){
                return each;
            }
        }
    }

	public getSquareById(id: string): Square{
		var locSquares = this.getSquares();
        for(var square in locSquares){
            var each = locSquares[square];
            if(each.getId() == id){
                return each;
            }
        }
    }
	
    public static fromSerial(serial: string, offsetTop?: number, offsetLeft?: number, squareWidth?: number, squareHeight?: number): Board{
        var result: Board;
        var locations: PieceLocation[] = new Array();
        var length: number;
        var height: number;
		var dataHalves: string[] = serial.split("-");
        var rows: string[] = dataHalves[0].split("/");
		var configRows: string[] = dataHalves[1].split("/");
        height = rows.length;

        for(var y = 0; y < rows.length; y++){
            var row = rows[y];
            var squares: string[] = row.split(",");
            length = squares.length;

            for(var x = 0; x < squares.length; x++){
                var sqrData:string = squares[x].substring(1, squares[x].length - 1);

                if(sqrData.length != 0){
                    var sqrDataSplit = sqrData.split("_");
                    var thisColor: Color;

                    if(sqrDataSplit[1] == "W"){
                        thisColor = Color.WHITE;
                    }
                    else{
                        thisColor = Color.BLACK;
                    }
                    var newLoc: PieceLocation = new PieceLocation(x, y, +sqrDataSplit[0], thisColor);
                    locations.push(newLoc);
                }
            }
        }

        result = new Board(length, height, offsetTop, offsetLeft, squareWidth, squareHeight);

        for(var eachLoc in locations){
            var location: PieceLocation = locations[eachLoc];
            result.addPiece(location.getType(), location.getX(), location.getY(), location.getColor());
        }
		
        for(var y = 0; y < rows.length; y++){
            var row = configRows[y];
            var squares: string[] = row.split(",");
            length = squares.length;

            for(var x = 0; x < squares.length; x++){
                var eachSqr: Square = result.getSquareAtPos(new Pos(x,y));
				var sqrData: string = squares[x].substring(1, squares[x].length - 1);
				eachSqr.setType(+sqrData);
				eachSqr.resetHexColor();
            }
        }
        return result;
    }

    public serialize(): string{
        var serialization: string = "";
        var pieceMap: string[][] = [];

        for(var r: number = 0; r < this.numRows; r++ ){
            pieceMap[r] = [];
        }

        for (var location in this.locations) {
            var currLoc = this.locations[location];
            var strRep = "[" + currLoc.getType() + "_";
            if(currLoc.getColor() == Color.WHITE){
                strRep += "W"
            }
            else if(currLoc.getColor() == Color.BLACK){
                strRep += "B"
            }
            strRep += "]";
            pieceMap[currLoc.getX()][currLoc.getY()] = strRep;
        }

        for(var y: number = 0; y < this.numRows; y++ ){
            for (var x: number = 0; x < this.numColumns; x++){
                if (pieceMap[x][y] == undefined) {
                    serialization += "[]";
                }
                else {
                    serialization += pieceMap[x][y];
                }
                serialization += ",";
            }
            serialization = serialization.substring(0, serialization.length - 1);
            serialization += "/";
        }
        serialization = serialization.substring(0, serialization.length - 1);
		
		serialization += "-";
		
		for(var y: number = 0; y < this.numRows; y++ ){
            for (var x: number = 0; x < this.numColumns; x++){
                serialization += "[" + this.getSquareAtPos(new Pos(x,y)).getType() + "],";
            }
            serialization = serialization.substring(0, serialization.length - 1);
            serialization += "/";
        }
		serialization = serialization.substring(0, serialization.length - 1);
		
        return serialization;
    }

    unselectAllSquares(){
        var locSquares = this.getSquares();
        for(var square in locSquares){
            var each = locSquares[square];
            each.resetHexColor();
        }
    }

    getSquareAtPos(pos: Pos): Square{
        var locSquares = this.getSquares();
        for(var square in locSquares){
            var each = locSquares[square];
            if(each.getPos().equals(pos)){
                return each;
            }
        }
    }

    getPieceAtPos(pos: Pos): Piece{
        for(var piece in this.pieces){
            var each = this.pieces[piece];
            if(each.getPos().equals(pos)){
                return each;
            }
        }

        return null;
    }

    removePieceAtPos(pos: Pos){
        var idx2Delete;
        for(var piece in this.pieces){
            var each = this.pieces[piece];
            if(each.getPos().equals(pos)){
                idx2Delete = piece;
            }
        }
        this.pieces.splice(idx2Delete, 1);

        for(var locIdx in this.locations){
            var eachLoc = this.locations[locIdx];
            if(pos.equals(new Pos(eachLoc.getX(), eachLoc.getY()))){
                idx2Delete = locIdx;
            }
        }
        this.locations.splice(idx2Delete, 1);
    }

    getPixelHeight(): number{
        return this.numRows * this.squareHeight + this.offsetTop;
    }

    getPixelWidth(): number{
        return this.numColumns * this.squareWidth + this.offsetLeft;
    }
}