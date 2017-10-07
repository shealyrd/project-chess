class Rook extends Piece{
	static blackImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/bR.png";
	static whiteImg: string = "http://chessboardjs.com/img/chesspieces/wikipedia/wR.png";

	static getSizeRatio(): number{
		return 1.5;
	}

	getWhiteImg(): string{
		return Rook.whiteImg;
	}

	getBlackImg(): string{
		return Rook.blackImg;
	}


}