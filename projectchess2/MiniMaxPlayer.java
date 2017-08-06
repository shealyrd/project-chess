package projectchess2;

public class MiniMaxPlayer extends Player{

	private final float BISHOP_WEIGHT = 1;
	private final float KING_WEIGHT = Integer.MAX_VALUE;
	private final float KNIGHT_WEIGHT = 1;
	private final float PAWN_WEIGHT = 1;
	private final float QUEEN_WEIGHT = 1;
	private final float ROOK_WEIGHT = 1;
	@Override
	public Move chooseMove(Board board) {
		MoveCollection possibleMoves = getAllMoves(board);
		possibleMoves.shuffle();
		Move topMove = null;
		Integer topValuation = Integer.MIN_VALUE;
		for(Move move: possibleMoves){
			int valuate = valuateMove(move, board);
			if(valuate > topValuation){
				topMove = move;
				topValuation = valuate;
			}
		}
		return topMove;
	}
	
	private int valuateMove(Move move, Board board) {
		int value;
		Board copy = board.copy();
		copy.executeMove(move);
		value = getMaterialValue(board);
		return value;
	}

	private int getMaterialValue(Board board) {
		int value = 0;
		for(Piece piece: board.getPieces(getSide())){
			switch(piece.getType()){
			case BISHOP:
				value += BISHOP_WEIGHT;
				break;
			case KING:
				value += KING_WEIGHT;
				break;
			case KNIGHT:
				value += KNIGHT_WEIGHT;
				break;
			case PAWN:
				value += PAWN_WEIGHT;
				break;
			case QUEEN:
				value += QUEEN_WEIGHT;
				break;
			case ROOK:
				value += ROOK_WEIGHT;
				break;
			default:
				break;
			}
		}
		for(Piece piece: board.getOpposingPieces(getSide())){
			switch(piece.getType()){
			case BISHOP:
				value -= BISHOP_WEIGHT;
				break;
			case KING:
				value -= KING_WEIGHT;
				break;
			case KNIGHT:
				value -= KNIGHT_WEIGHT;
				break;
			case PAWN:
				value -= PAWN_WEIGHT;
				break;
			case QUEEN:
				value -= QUEEN_WEIGHT;
				break;
			case ROOK:
				value -= ROOK_WEIGHT;
				break;
			default:
				break;
			}
		}
		return value;
	}

	public MoveCollection getAllMoves(Board board){
		MoveCollection result = new MoveCollection();
		for(Piece piece: board.getPieces(getSide())){
			result.addAll(piece.getPossibleMoves());
		}
		return result;
	}

}
