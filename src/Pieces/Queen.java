package projectchess.pieces;

import projectchess.Color;
import projectchess.Movement;

public class Queen extends Piece{

	public Queen(Color color) {
		super(color);
	}

	@Override
	public Movement getMovement() {
		return Movement.QUEEN;
	}

}
