package projectchess2;

public class ChessLoop {
	private Player white;
	private Player black;
	private Player whoseTurn;
	private Board board;
	
	public ChessLoop(Board board, Player white, Player black){
		this.board = board;
		this.white = white;
		this.black = black;
		setSides();
	}
	
	public void setSides(){
		white.setSide(Side.WHITE);
		black.setSide(Side.BLACK);
	}
	
	public void runLoop(){
		System.out.println("Starting...");
		while(true){
			System.out.println(board);
			swapTurn();
			Move move = whoseTurn.chooseMove(board);
			board.executeMove(move);
		}

		
	}
	
	public void swapTurn(){
		if(whoseTurn == white){
			whoseTurn = black;
		}
		else{
			whoseTurn = white;
		}
	}
}
