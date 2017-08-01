package projectchess.pieces;

import java.util.List;

import projectchess.Color;
import projectchess.Pos;


public abstract class Piece {
	protected Color color;
	protected Pos pos;
	
	public Piece(Color color){
		this.color = color;
	}
	
	public String toString(){
		return this.getClass().getSimpleName();
	}

	public Color getColor() {
		return color;
	}

	public Pos getPos() {
		return this.pos;
	}
}
