class Knight extends Piece{
    static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bN.png";
    static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wN.png";

    static getSizeRatio(): number{
        return 1.5;
    }

    getWhiteImg(): string{
        return Knight.whiteImg;
    }

    getBlackImg(): string{
        return Knight.blackImg;
    }

}