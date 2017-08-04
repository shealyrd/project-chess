package projectchess2.pieces;

import projectchess2.Board;
import projectchess2.MoveCollection;
import projectchess2.MoveFactory;
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

	@Override
	public MoveCollection getPossibleMoves() {
		return MoveFactory.getMoveByRelativePositions(this,
													  new Pos(0,1),
													  new Pos(1,0),
													  new Pos(0,-1),
													  new Pos(-1,0),
													  new Pos(1,1),
													  new Pos(-1,1),
													  new Pos(1,-1),
													  new Pos(-1,-1));
	}

}
