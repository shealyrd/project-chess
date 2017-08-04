package projectchess2;

import java.util.List;
import java.util.Scanner;

public class CommandLinePlayer extends Player{

	@Override
	public Move chooseMove(Board board) {
		System.out.println(getSide().name() + " making move...");
	    Scanner scanner = new Scanner(System.in);
	    String command = scanner.next();
	    if(command.startsWith("random")){
			List<Piece> pieces = board.getPieces(getSide());
			MoveCollection moves = new MoveCollection();
			
			for(Piece piece: pieces){
				moves.addAll(piece.getPossibleMoves());
			}
			
			moves.shuffle();
			
			for(Move move: moves){
				return move;
			}
	    }
	    String[] tokens = command.split(",");
	    if(tokens.length == 2){
		    Pos origin = new Pos(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1]));
		    if(Piece.isEmpty(board.getPiece(origin)) || !board.getPiece(origin).getSide().equals(getSide())){
		    	System.out.println("Position " + origin + " does not have a piece which you can move.");
		    	return chooseMove(board);
		    }
		    printBoardWithAvailableMoves(board, origin);
		    return chooseMove(board);
	    }
	    else{
		    Pos origin = new Pos(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1]));
		    Pos dest = new Pos(Integer.parseInt(tokens[2]), Integer.parseInt(tokens[3]));
		    
		    if(Piece.isEmpty(board.getPiece(origin)) || !board.getPiece(origin).getSide().equals(getSide())){
		    	System.out.println("Position " + origin + " does not have a piece which you can move.");
		    	return chooseMove(board);
		    }
		    
		    Move move = new Move(origin, dest);
		    
		    MoveCollection moves = board.getPiece(origin).getPossibleMoves();
		    
		    if(!moves.contains(move)){
		    	System.out.println("Move " + origin + " -> " + dest + " is invalid.");
		    	return chooseMove(board);
		    }
			return move;
	    }
	}

	private void printBoardWithAvailableMoves(Board board, Pos origin) {
		MoveCollection moves = board.getPiece(origin).getPossibleMoves();
		
		StringBuilder builder = new StringBuilder();
		builder.append("----------------------------------------------------------------\n");
		for(int y = 0; y < board.getHeight(); y++){
			for(int x = 0; x < board.getWidth(); x++){
				Pos pos = new Pos(x,y);
				Piece piece = board.getPiece(pos);
				if(moves.contains(new Move(origin, pos))){
					builder.append("[" + "  XX  " + "]");
				}else if(Piece.isEmpty(piece)){
					builder.append("[      ]");
				}
				else{
					builder.append("[" + formatString(piece.getType().name(), 6) + "]");
				}

			}
			builder.append("\n");
			builder.append("----------------------------------------------------------------");
			builder.append("\n");
		}
		System.out.println(builder.toString());
	}

	private String formatString(String str, int length){
		int diff = length - str.length();
		while(diff > 0){
			str = str + " ";
			diff--;
		}
		return str;
	}
}
