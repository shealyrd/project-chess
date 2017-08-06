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
		int turnCount = 0;
		while(true){
			System.out.println(board);
			swapTurn();
			Move move = whoseTurn.chooseMove(board);
			if(move == null){
				System.out.println(whoseTurn.getSide().name() + " loses!");
				break;
			}
			board.executeMove(move);
			if(board.isInCheckmate(whoseTurn.getSide())){
				System.out.println(whoseTurn.getSide().name() + " loses!");
				break;
			}
			turnCount++;
			System.out.println("Turn count: " + turnCount);
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
