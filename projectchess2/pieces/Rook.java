package projectchess2.pieces;

import projectchess2.Board;
import projectchess2.Move;
import projectchess2.MoveCollection;
import projectchess2.Piece;
import projectchess2.PieceType;
import projectchess2.Pos;
import projectchess2.Side;

public class Rook extends Piece {

	public Rook(Board board, Pos pos, Side side) {
		super(board, pos, side);
		// TODO Auto-generated constructor stub
	}

	@Override
	public PieceType getType() {
		return PieceType.ROOK;
	}

	@Override
	public MoveCollection getPossibleMoves() {
		MoveCollection result = new MoveCollection();
		
		int x, y;
		
		//traverse upwards

		x = getPos().getX();
		y = getPos().getY() - 1;
		
		while(getBoard().isCapturableSpace(new Pos(x, y), getSide())){
			result.add(new Move(getPos(), new Pos(x, y)));
			if(!getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			y -= 1;
		}
		
		//traverse downwards
		
		x = getPos().getX();
		y = getPos().getY() + 1;
		
		while(getBoard().isCapturableSpace(new Pos(x, y), getSide())){
			result.add(new Move(getPos(), new Pos(x, y)));
			if(!getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			y += 1;
		}
		
		//traverse right
		
		x = getPos().getX() + 1;
		y = getPos().getY();
		
		while(getBoard().isCapturableSpace(new Pos(x, y), getSide())){
			result.add(new Move(getPos(), new Pos(x, y)));
			if(!getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x += 1;
		}
		
		//traverse left
		
		x = getPos().getX() - 1;
		y = getPos().getY();
		
		while(getBoard().isCapturableSpace(new Pos(x, y), getSide())){
			result.add(new Move(getPos(), new Pos(x, y)));
			if(!getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x -= 1;
			
		}
		
		
		return result;
	}

}
