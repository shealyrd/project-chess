package projectchess.pieces;

import projectchess.Color;
import projectchess.Movement;

public class Pawn extends Piece{
	private boolean isFirstMove;
	
	public Pawn(Color color) {
		super(color);
	}

	public boolean isFirstMove() {
		return isFirstMove;
	}

	@Override
	public Movement getMovement() {
		return Movement.PAWN;
	}

}
