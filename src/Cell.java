package projectchess;

import projectchess.pieces.Piece;

public class Cell {

	private Color color;
	private Piece currentPiece;
	boolean isOccupied;
	
	public Cell(Color color){
		this.color = color;
	}

	public String toString(){
		//return "[" + color.toString() + "]";
		if(!isOccupied){
			return "[ ]";
		}
		else{
			return "[" + currentPiece.toString() + "]";
		}
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public Piece getCurrentPiece() {
		return currentPiece;
	}

	public void setCurrentPiece(Piece currentPiece) {
		this.currentPiece = currentPiece;
		isOccupied = true;
	}

	public boolean isOccupied() {
		return isOccupied;
	}
	
	public void removeCurrentPiece() {
		this.currentPiece = null;
		isOccupied = false;
	}
	
}
