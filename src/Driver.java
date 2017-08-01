package projectchess;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import projectchess.pieces.Piece;

public class Driver {

	public static void main(String[] args){
		Board board = new Board();
		board.initialize();
		System.out.println(board.toString());
		MoveInterpreter interpreter = new MoveInterpreter(board);
		Set<Cell> availableMoves = interpreter.getValidMoves(board.getCellAtPos(6, 4).getCurrentPiece());
		for (int y = 0; y < 8; y++) {
			for (int x = 0; x < 8; x++) {
				if(availableMoves.contains(board.getCellAtPos(x, y))){
					System.out.print("[X]");
				}
				else{
					System.out.print("[ ]");
				}
			}
			System.out.print("\n");
		}
		
		//availableMoves(board.getCellAtPos(5, 5).getCurrentPiece(), board);
	}
	/*
	public static void availableMoves(Piece piece, Board board){
		Movement move = piece.getMovement();
		if(move == null){
			System.out.println("Move is null");
		}
		List<Cell> vaidMoves = new ArrayList<Cell>();
		for (int y = 0; y < 8; y++) {
			for (int x = 0; x < 8; x++) {
				Cell cell = board.getCellAtPos(x, y);
				if(move.isFullVertical()){
					if(x == piece.getPos().getX()){
						//System.out.println("["+ x+ "," + y + "]");
						System.out.println(piece.getPos());
						vaidMoves.add(cell);
					}
				}
				if(move.isFullHorizontal()){
					if(y == piece.getPos().getY()){
						System.out.println("["+ x+ "," + y + "]");
						vaidMoves.add(cell);
					}
				}
				if(move.isFullDiagonal())
			}
		}
		
		StringBuilder builder = new StringBuilder();

		for (int y = 0; y < 8; y++) {
			for (int x = 0; x < 8; x++) {
				if(vaidMoves.contains(board.getCellAtPos(x, y))){
					builder.append("[X]");
				}
				else{
					builder.append(board.getCellAtPos(x, y));
				}

			}
			builder.append("\n");
		}

		System.out.println(builder.toString());
	}
	*/
}
