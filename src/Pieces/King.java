package projectchess.pieces;

import projectchess.Color;
import projectchess.Movement;

public class King extends Piece{

	public King(Color color) {
		super(color);
	}

	@Override
	public Movement getMovement() {
		return Movement.KING;
	}

}
