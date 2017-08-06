package projectchess2;

import projectchess2.pieces.Bishop;
import projectchess2.pieces.King;
import projectchess2.pieces.Knight;
import projectchess2.pieces.Pawn;
import projectchess2.pieces.Queen;
import projectchess2.pieces.Rook;

public class PieceFactory {
	
	private Board board;

	public PieceFactory(Board board) {
		this.board = board;
	}

	public Piece createPiece(Pos pos, PieceType type, Side side) {
		Piece result = null;
		
		switch(type){
			case EMPTY:
				result = new EmptyPiece();
				break;
			case BISHOP:
				result = new Bishop(board, pos, side);
				break;
			case KING:
				result = new King(board, pos, side);
				break;
			case KNIGHT:
				result = new Knight(board, pos, side);
				break;
			case PAWN:
				result = new Pawn(board, pos, side);
				break;
			case QUEEN:
				result = new Queen(board, pos, side);
				break;
			case ROOK:
				result = new Rook(board, pos, side);
				break;
			default: break;
		}
		
		return result;
	}

	public Piece createPieceByTransposition(Pos dest, Piece piece) {
		Piece newPiece = createPiece(dest, piece.getType(), piece.getSide());
		if(newPiece instanceof Pawn){
			((Pawn) newPiece).setMoved(true);
		}
		return newPiece;
	}
	
	public Piece copyPiece(Piece toCopy){
		Piece newPiece = createPiece(toCopy.getPos(), toCopy.getType(), toCopy.getSide());
		if(toCopy instanceof Pawn){
			((Pawn) newPiece).setMoved(((Pawn) toCopy).hasMoved());
		}
		return newPiece;
		
	}

}
