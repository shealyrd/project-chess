package projectchess2.pieces;

import projectchess2.Board;
import projectchess2.Piece;
import projectchess2.PieceType;
import projectchess2.Pos;
import projectchess2.Side;

public class King extends Piece {

	public King(Board board, Pos pos, Side side) {
		super(board, pos, side);
		// TODO Auto-generated constructor stub
	}

	@Override
	public PieceType getType() {
		return PieceType.KING;
	}

}
