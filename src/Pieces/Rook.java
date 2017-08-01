package projectchess.pieces;

import projectchess.Color;
import projectchess.Movement;

public class Rook extends Piece{

	public Rook(Color color) {
		super(color);
	}

	@Override
	public Movement getMovement() {
		return Movement.BISHOP;
	}

}
