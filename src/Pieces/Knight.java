package projectchess.pieces;

import projectchess.Color;
import projectchess.Movement;

public class Knight extends Piece{

	public Knight(Color color) {
		super(color);
	}

	@Override
	public Movement getMovement() {
		return Movement.KNIGHT;
	}

}
