class Board extends HTMLObject{
    squares: Square[] = new Array();
    rows: Row[] = new Array();
    pieces: Piece[] = new Array();
    numRows: number;
    numColumns: number;
    offsetTop: number;
    offsetLeft: number;

    squareWidth: number = 50;
    squareHeight: number = 50;



    constructor(numCol: number, numRows: number, offsetTop?: number, offsetLeft?: number) {
        super();
        if (offsetTop == null) {
            offsetTop = 100;
        }
        if (offsetLeft == null) {
            offsetLeft = 100;
        }
        this.initialize(numCol, numRows, offsetTop, offsetLeft);
    }

    initialize(numCol: number, numRows: number, offsetTop: number, offsetLeft: number){
        this.numRows = numRows;
        this.numColumns = numCol;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;

        var cornerColor: Color = Color.WHITE;

        for(var i: number = 0; i < this.numRows; i++){
            var row: Row = new Row(this.offsetLeft, this.offsetTop + (i * this.squareHeight), this.squareWidth * this.numColumns, this.squareHeight, this.numColumns);
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

    addPiece(piece: PieceType, x: number, y: number, color: Color){
        var newPiece: Piece;
        switch(piece){
            case PieceType.ROOK: newPiece = new Rook(this.calcPosFromLeft(x), this.calcPosFromTop(Rook.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Rook.getSizeRatio()), y, color); break;
            case PieceType.QUEEN: newPiece = new Queen(this.calcPosFromLeft(x), this.calcPosFromTop(Queen.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Queen.getSizeRatio()), y, color); break;
            case PieceType.BISHOP: newPiece = new Bishop(this.calcPosFromLeft(x), this.calcPosFromTop(Bishop.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Bishop.getSizeRatio()), y, color); break;
            case PieceType.PAWN: newPiece = new Pawn(this.calcPosFromLeft(x), this.calcPosFromTop(Pawn.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Pawn.getSizeRatio()), y, color); break;
            case PieceType.KNIGHT: newPiece = new Knight(this.calcPosFromLeft(x), this.calcPosFromTop(Knight.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Knight.getSizeRatio()), y, color); break;
            case PieceType.KING: newPiece = new King(this.calcPosFromLeft(x), this.calcPosFromTop(King.getSizeRatio(), y), this.squareWidth, (this.squareHeight * King.getSizeRatio()), y, color); break;
        }
        this.pieces.push(newPiece);
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


    private calcPosFromLeft(x:number): number{
        return this.offsetLeft + (x * this.squareWidth);
    }

    private calcPosFromTop(ratio: number, y:number): number{
        return (this.offsetTop + (y * this.squareHeight)) + (this.squareHeight * ( 1 - ratio));
    }
}
