class King extends Piece{
    static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bK.png";
    static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wK.png";

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