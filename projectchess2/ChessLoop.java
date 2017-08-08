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
	
	public Side runLoop(){
		System.out.println("Starting...");
		int turnCount = 0;
		
		while(true){
			swapTurn();
			System.out.println("Turn count: " + turnCount + " (" + whoseTurn.getSide().name() +")");
			System.out.println(board);
			if(board.isInCheckmate(whoseTurn.getSide())){
				System.out.println(whoseTurn.getSide().name() + " loses!");
				swapTurn();
				return whoseTurn.getSide();
			}
			Move move = whoseTurn.chooseMove(board);
			if(move == null){
				System.out.println(whoseTurn.getSide().name() + " loses!");
				swapTurn();
				return whoseTurn.getSide();
			}
			board.executeMove(move);
			turnCount++;

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
