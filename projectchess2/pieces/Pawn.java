package projectchess2.pieces;

import projectchess2.Board;
import projectchess2.MoveCollection;
import projectchess2.Piece;
import projectchess2.PieceType;
import projectchess2.Pos;
import projectchess2.Side;


public class Pawn extends Piece {

	public Pawn(Board board, Pos pos, Side side) {
		super(board, pos, side);
	}

	@Override
	public PieceType getType() {
		return PieceType.PAWN;
	}

	@Override
	public MoveCollection getPossibleMoves() {
		// TODO Auto-generated method stub
		return null;
	}

}
