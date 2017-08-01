package projectchess.pieces;

import projectchess.Color;

public class Pawn extends Piece{
	private boolean isFirstMove;
	
	public Pawn(Color color) {
		super(color);
	}

	public boolean isFirstMove() {
		return isFirstMove;
	}

}
