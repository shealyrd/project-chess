class Pawn extends Piece{
    static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bP.png";
    static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wP.png";

    static getSizeRatio(): number{
        return 1.5;
    }

    getWhiteImg(): string{
        return Pawn.whiteImg;
    }

    getBlackImg(): string{
        return Pawn.blackImg;
    }

}