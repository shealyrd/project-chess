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
		return createPiece(dest, piece.getType(), piece.getSide());
	}

}
