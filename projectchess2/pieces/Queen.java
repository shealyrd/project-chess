package projectchess2.pieces;

import projectchess2.Board;
import projectchess2.MoveCollection;
import projectchess2.MoveFactory;
import projectchess2.Piece;
import projectchess2.PieceType;
import projectchess2.Pos;
import projectchess2.Side;

public class Queen extends Piece {

	public Queen(Board board, Pos pos, Side side) {
		super(board, pos, side);
		// TODO Auto-generated constructor stub
	}

	@Override
	public PieceType getType() {
		return PieceType.QUEEN;
	}

	@Override
	public MoveCollection getPossibleMoves() {
		return MoveFactory.getAllCardinal(this)
				.addAll(MoveFactory.getAllDiagonal(this));
	}

}
