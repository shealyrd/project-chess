package projectchess.pieces;

import projectchess.Color;


public abstract class Piece {
	protected Color color;
	
	public Piece(Color color){
		this.color = color;
	}
	
	public String toString(){
		return this.getClass().getSimpleName();
	}
}
