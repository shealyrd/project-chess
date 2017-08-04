package projectchess2;

public abstract class Player {
	private Side side;
	
	public abstract Move chooseMove(Board board);
	
	public Side getSide(){
		return side;
	}
	
	public void setSide(Side side){
		this.side = side;
	}
}
