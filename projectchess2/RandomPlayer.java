package projectchess2;

import java.util.Collections;
import java.util.List;

public class RandomPlayer extends Player{

	@Override
	public Move chooseMove(Board board) {
		List<Piece> pieces = board.getPieces(getSide());
		MoveCollection moves = new MoveCollection();
		
		for(Piece piece: pieces){
			moves.addAll(piece.getPossibleMoves());
		}
		
		moves.shuffle();
		
		for(Move move: moves){
			return move;
		}
		System.out.println("No moves left!");
		return null;
	}

}
