package projectchess.pieces;

import projectchess.Color;
import projectchess.Movement;
import projectchess.Pos;


public abstract class Piece {
	protected Color color;
	protected Pos pos;
	
	public abstract Movement getMovement();
	
	public Piece(Color color){
		this.color = color;
	}
	
	public String toString(){
		return this.getClass().getSimpleName();
	}

	public Color getColor() {
		return color;
	}
	
	
	public void setPos(Pos pos) {
		this.pos = pos;
	}

	public Pos getPos() {
		return this.pos;
	}
	
	
}
