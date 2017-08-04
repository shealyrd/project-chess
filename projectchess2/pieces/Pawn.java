package projectchess2.pieces;

import projectchess2.Board;
import projectchess2.MoveCollection;
import projectchess2.MoveFactory;
import projectchess2.Piece;
import projectchess2.PieceType;
import projectchess2.Pos;
import projectchess2.Side;


public class Pawn extends Piece {
	
	boolean hasMoved = false;

	public Pawn(Board board, Pos pos, Side side) {
		super(board, pos, side);
	}

	@Override
	public PieceType getType() {
		return PieceType.PAWN;
	}
	
	public void setMoved(boolean hasMoved){
		this.hasMoved = hasMoved;
	}
	
	@Override
	public MoveCollection getPossibleMoves() {
		MoveCollection result = MoveFactory.getMoveByRelativePositions(this,
													  new Pos(0, -1 * getBoard().getDirection(getSide())));
		if(!hasMoved){
			result.addAll(MoveFactory.getMoveByRelativePositions(this,
					  	new Pos(0, -2 * getBoard().getDirection(getSide()))));
		}
		
		result.addAll(MoveFactory.getMoveByRelativePositionsOnlyIfCapturable(this,
																new Pos(1,-1 * getBoard().getDirection(getSide())),
																new Pos(-1,-1 * getBoard().getDirection(getSide()))));
	
		return result;
	}
	

}
