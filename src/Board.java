package projectchess;

import java.util.HashMap;
import java.util.Map;

import projectchess.pieces.Bishop;
import projectchess.pieces.King;
import projectchess.pieces.Knight;
import projectchess.pieces.Pawn;
import projectchess.pieces.Piece;
import projectchess.pieces.Queen;
import projectchess.pieces.Rook;

public class Board {
	Map<Pos, Cell> cellMap = new HashMap<Pos, Cell>();

	public void initialize() {
		Color color = Color.WHITE;
		for (int y = 0; y < 8; y++) {
			for (int x = 0; x < 8; x++) {
				Cell cell = new Cell(color);
				cell.setPos(new Pos(x,y));
				cellMap.put(new Pos(x, y), cell);
				color = color.swap();
			}
			color = color.swap();
		}
		
		addPiece(0, 0, new Rook(Color.BLACK));
		addPiece(1, 0, new Knight(Color.BLACK));
		addPiece(2, 0, new Bishop(Color.BLACK));
		addPiece(3, 0, new Queen(Color.BLACK));
		addPiece(4, 0, new King(Color.BLACK));
		addPiece(5, 0, new Bishop(Color.BLACK));
		addPiece(6, 0, new Knight(Color.BLACK));
		addPiece(7, 0, new Rook(Color.BLACK));
		addPiece(0, 1, new Pawn(Color.BLACK));
		addPiece(1, 1, new Pawn(Color.BLACK));
		addPiece(2, 1, new Pawn(Color.BLACK));
		addPiece(3, 1, new Pawn(Color.BLACK));
		addPiece(4, 1, new Pawn(Color.BLACK));
		addPiece(5, 1, new Pawn(Color.BLACK));
		addPiece(6, 1, new Pawn(Color.BLACK));
		addPiece(7, 1, new Pawn(Color.BLACK));
		
		addPiece(0, 6, new Pawn(Color.WHITE));
		addPiece(1, 6, new Pawn(Color.BLACK));
		addPiece(2, 6, new Pawn(Color.WHITE));
		addPiece(3, 6, new Pawn(Color.WHITE));
		addPiece(4, 6, new Pawn(Color.WHITE));
		addPiece(5, 6, new Pawn(Color.WHITE));
		addPiece(6, 6, new Pawn(Color.WHITE));
		addPiece(7, 6, new Pawn(Color.WHITE));
		addPiece(0, 7, new Pawn(Color.WHITE));
		addPiece(1, 7, new Knight(Color.WHITE));
		addPiece(2, 7, new Bishop(Color.WHITE));
		addPiece(3, 7, new King(Color.WHITE));
		addPiece(4, 7, new Queen(Color.WHITE));
		addPiece(5, 7, new Bishop(Color.WHITE));
		addPiece(6, 7, new Knight(Color.WHITE));
		//addPiece(6, 4, new Queen(Color.WHITE));
	}

	public Cell getCellAtPos(int x, int y) {
		return cellMap.get(new Pos(x, y));
	}
	

	public Map<Pos, Cell> getCellMap() {
		return cellMap;
	}

	public void setCellMap(Map<Pos, Cell> cellMap) {
		this.cellMap = cellMap;
	}

	public String toString() {
		StringBuilder builder = new StringBuilder();

		for (int y = 0; y < 8; y++) {
			for (int x = 0; x < 8; x++) {
				builder.append(getCellAtPos(x, y));
			}
			builder.append("\n");
		}

		return builder.toString();
	}
	
	public void addPiece(int x, int y, Piece piece){
		Cell cell = cellMap.get(new Pos(x, y));
		cell.setCurrentPiece(piece);
		piece.setPos(new Pos(x,y));
	}

	public boolean hasPiece(Pos target, Color swap) {
		boolean result = false;;
		if(cellMap.containsKey(target)){
			if(cellMap.get(target).isOccupied()){
				result = cellMap.get(target).getCurrentPiece().getColor().equals(swap);
			}
		}
		return result;
	}
	
	public void movePiece(int x, int y, Piece piece){
		Pos oldPos = piece.getPos();
		Cell oldCell = cellMap.get(oldPos);
		Cell cell = cellMap.get(new Pos(x, y));
		cell.setCurrentPiece(piece);
		oldCell.removeCurrentPiece();
		piece.setPos(new Pos(x,y));
	}

}
