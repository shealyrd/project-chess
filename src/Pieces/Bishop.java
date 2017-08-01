package projectchess.pieces;

import projectchess.Color;
import projectchess.Movement;

public class Bishop extends Piece{

	public Bishop(Color color) {
		super(color);
	}

	@Override
	public Movement getMovement() {
		return Movement.BISHOP;
	}

}
