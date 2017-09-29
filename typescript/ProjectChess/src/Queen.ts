class Queen extends Piece{
	static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bQ.png";
    static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wQ.png";
	
	getSizeRatio(): string{
		return Queen.whiteImg;
	}
	
	getWhiteImg(): string{
		return Queen.whiteImg;
	}
	
	getBlackImg(): string{
		return Queen.blackImg;
	}
	
}