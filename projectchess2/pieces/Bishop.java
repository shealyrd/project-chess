package projectchess2.pieces;

import projectchess2.Board;
import projectchess2.MoveCollection;
import projectchess2.MoveFactory;
import projectchess2.Piece;
import projectchess2.PieceType;
import projectchess2.Pos;
import projectchess2.Side;

public class Bishop extends Piece {

	public Bishop(Board board, Pos pos, Side side) {
		super(board, pos, side);
	}

	@Override
	public PieceType getType() {
		return PieceType.BISHOP;
	}

	@Override
	public MoveCollection getPossibleMoves() {
		return MoveFactory.getAllDiagonal(this);
	}

}
