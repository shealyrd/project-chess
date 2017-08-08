package projectchess2;

public class Driver {
	
	private final static int GAMES_NUMBER = 100;
	
	public static void main(String[] args){
		//PlainBoard board = new PlainBoard();
		///TestBoard board = new TestBoard();
		Side winner = Side.WHITE;
		int games = 0;
		int gamesNum = GAMES_NUMBER;
		while(winner == Side.WHITE){
			ChessLoop loop = new ChessLoop(new PlainBoard(), new MiniMaxPlayer(), new RandomPlayer());
			winner = loop.runLoop();
			games++;
		}
		System.out.println("Minimax won for " + games + " games straight");
		/*int minimaxWins = 0;
		int otherWins = 0;
		
		while(gamesNum > 0){
			ChessLoop loop = new ChessLoop(new PlainBoard(), new MiniMaxPlayer(), new RandomPlayer());
			winner = loop.runLoop();
			if(winner.equals(Side.WHITE)){
				minimaxWins++;
			}
			if(winner.equals(Side.BLACK)){
				otherWins++;
			}
			gamesNum--;
		}
		
		//double percent = Float.valueOf(minimaxWins)/Float.valueOf(GAMES_NUMBER);
		System.out.println("Minimax: " + minimaxWins);
		System.out.println("Random: " + otherWins);*/
		//System.out.println("Minimax won " + percent + "% ");
		
		
		//System.out.println(board.toString());
		
		//Board newBoard = board.copy();
		//System.out.println(newBoard.toString());
	}

}
