class King extends Piece{
    static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bK.png";
    static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wK.png";

    constructor(left: number, top: number, width: number, height: number, z:number, color: Color){
        super(left, top, width, height, z, color, PieceType.KING);
    }

    static getSizeRatio(): number{
        return 1.5;
    }

    getWhiteImg(): string{
        return King.whiteImg;
    }

    getBlackImg(): string{
        return King.blackImg;
    }

}