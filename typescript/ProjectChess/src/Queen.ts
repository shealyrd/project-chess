class Queen extends Piece{
	static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bQ.png";
	static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wQ.png";

	static getSizeRatio(): number{
		return 1.5;
	}

	getWhiteImg(): string{
		return Queen.whiteImg;
	}

	getBlackImg(): string{
		return Queen.blackImg;
	}

}