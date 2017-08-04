package projectchess2;

public class Driver {
	
	public static void main(String[] args){
		PlainBoard board = new PlainBoard();
		///TestBoard board = new TestBoard();
		
		ChessLoop loop = new ChessLoop(board, new CommandLinePlayer(), new RandomPlayer());
		loop.runLoop();
		
		//System.out.println(board.toString());
		
	}

}
