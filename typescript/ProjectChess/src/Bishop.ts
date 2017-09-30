class Bishop extends Piece{
    static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bB.png";
    static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wB.png";

    static getSizeRatio(): number{
        return 1.5;
    }

    getWhiteImg(): string{
        return Bishop.whiteImg;
    }

    getBlackImg(): string{
        return Bishop.blackImg;
    }

}