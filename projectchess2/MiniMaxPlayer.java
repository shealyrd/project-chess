package projectchess2;

import java.util.HashMap;
import java.util.Map;

public class MiniMaxPlayer extends Player{

	private final int BISHOP_WEIGHT = 1;
	private final int KING_WEIGHT = 100000;
	private final int KNIGHT_WEIGHT = 1;
	private final int PAWN_WEIGHT = 1;
	private final int QUEEN_WEIGHT = 100;
	private final int ROOK_WEIGHT = 50;
	
	
	@Override
	public Move chooseMove(Board board) {
		MoveCollection possibleMoves = getAllMoves(board);
		possibleMoves.shuffle();
		Move topMove = null;
		Integer topValuation = Integer.MIN_VALUE;
		for(Move move: possibleMoves){
			int valuate = alphaBeta(move, board, 6, Integer.MIN_VALUE, Integer.MAX_VALUE, true);
			if(valuate >= topValuation){
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
	
	
	private int alphaBeta(Move move, Board board, int depth, int alpha, int beta, boolean maximize){
		if(depth == 0){
			return valuateMove(move, board);
		}
		Board copy = board.copy();
		copy.executeMove(move);
		int v;
		if(maximize){
			v = Integer.MIN_VALUE;
			for(Move newMove: getAllMoves(copy, getSide())){
				v = Math.max(v, alphaBeta(newMove, copy, depth - 1, alpha, beta, false));
				alpha = Math.max(alpha,v);
				if(beta <= alpha){
					break;
				}
			}
			return v;
		}
		else{
			v = Integer.MAX_VALUE;
			Side opp;
			if(getSide().equals(Side.WHITE)){
				opp = Side.BLACK;
			}
			else{
				opp = Side.WHITE;
			}
			for(Move newMove: getAllMoves(copy, opp)){
				v = Math.min(v, alphaBeta(newMove, copy, depth - 1, alpha, beta, true));
				beta = Math.min(beta,v);
				if(beta <= alpha){
					break;
				}
			}
			return v;
		}
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
	public MoveCollection getAllMoves(Board board, Side side){
		MoveCollection result = new MoveCollection();
		for(Piece piece: board.getPieces(side)){
			result.addAll(piece.getPossibleMoves());
		}
		return result;
	}

	
}
