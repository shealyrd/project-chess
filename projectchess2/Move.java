package projectchess2;

public class Move {
	private Pos dest;
	private Pos origin;
	
	public Move(Pos origin, Pos dest){
		this.dest = dest;
		this.origin = origin;
	}

	public Pos getDest() {
		return dest;
	}

	public Pos getOrigin() {
		return origin;
	}
	
	
}
