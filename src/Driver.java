package projectchess;

import java.util.Scanner;
import java.util.Set;

import projectchess.pieces.Piece;
import projectchess.pieces.Queen;

public class Driver {

	public static void main(String[] args){
		Board board = new Board();
		board.initialize();
		System.out.println(board.toString());
		MoveInterpreter interpreter = new MoveInterpreter(board);
		Piece myPiece = new Queen(Color.WHITE);
		board.addPiece(1, 1, myPiece);
		while(true){
		//Set<Cell> availableMoves = interpreter.getValidMoves(myPiece);
		for (int y = 0; y < 8; y++) {
			for (int x = 0; x < 8; x++) {
				/*if(availableMoves.contains(board.getCellAtPos(x, y))){
					System.out.print("[X]");
				}
				else{*/
					System.out.print(board.getCellAtPos(x, y).toString());
				//}
			}
			System.out.print("\n");
		}
		Scanner reader = new Scanner(System.in);  // Reading from System.in
		System.out.println("Enter a piece & pos: ");
		String n = reader.nextLine();
		String[] tokens = n.split(",");
		Piece targ = board.getCellAtPos(Integer.parseInt(tokens[0]), Integer.parseInt(tokens[1])).getCurrentPiece();
		if(interpreter.getValidMoves(targ).contains(board.getCellAtPos(Integer.parseInt(tokens[2]), Integer.parseInt(tokens[3])))){
			board.movePiece(Integer.parseInt(tokens[2]), Integer.parseInt(tokens[3]), targ);
			//board.getCellAtPos(Integer.parseInt(tokens[2]), Integer.parseInt(tokens[3])).setOccupied(false);
		}
		else{
			System.out.println("Invalid move! " + targ.getClass().getSimpleName() + " can only move to:");
			/*for(Cell cell: interpreter.getValidMoves(targ)){
				System.out.println(cell.getPos());	
			}*/
			StringBuilder builder = new StringBuilder();

			for (int y = 0; y < 8; y++) {
				for (int x = 0; x < 8; x++) {
					if(board.getCellAtPos(x, y).getCurrentPiece() != null && board.getCellAtPos(x, y).getCurrentPiece().equals(targ)){
						builder.append("[O]");
					}
					else if(interpreter.getValidMoves(targ).contains(board.getCellAtPos(x, y))){
						builder.append("[X]");
					}
					else{
						builder.append("[ ]");
					}

				}
				builder.append("\n");
			}

			System.out.println(builder.toString());
		}
		
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
