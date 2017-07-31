import java.util.HashMap;
import java.util.Map;

import Pieces.Bishop;
import Pieces.King;
import Pieces.Knight;
import Pieces.Pawn;
import Pieces.Piece;
import Pieces.Queen;
import Pieces.Rook;

public class Board {
	Map<Pos, Cell> cellMap = new HashMap<Pos, Cell>();

	public void initialize() {
		Color color = Color.WHITE;
		for (int y = 0; y < 8; y++) {
			for (int x = 0; x < 8; x++) {
				cellMap.put(new Pos(x, y), new Cell(color));
				color = color.swap();
			}
			color = color.swap();
		}
		
		addPiece(0, 0, new Rook());
		addPiece(1, 0, new Knight());
		addPiece(2, 0, new Bishop());
		addPiece(3, 0, new Queen());
		addPiece(4, 0, new King());
		addPiece(5, 0, new Bishop());
		addPiece(6, 0, new Knight());
		addPiece(7, 0, new Rook());
		addPiece(0, 1, new Pawn());
		addPiece(1, 1, new Pawn());
		addPiece(2, 1, new Pawn());
		addPiece(3, 1, new Pawn());
		addPiece(4, 1, new Pawn());
		addPiece(5, 1, new Pawn());
		addPiece(6, 1, new Pawn());
		addPiece(7, 1, new Pawn());
		
		addPiece(0, 6, new Pawn());
		addPiece(1, 6, new Pawn());
		addPiece(2, 6, new Pawn());
		addPiece(3, 6, new Pawn());
		addPiece(4, 6, new Pawn());
		addPiece(5, 6, new Pawn());
		addPiece(6, 6, new Pawn());
		addPiece(7, 6, new Pawn());
		addPiece(0, 7, new Rook());
		addPiece(1, 7, new Knight());
		addPiece(2, 7, new Bishop());
		addPiece(3, 7, new King());
		addPiece(4, 7, new Queen());
		addPiece(5, 7, new Bishop());
		addPiece(6, 7, new Knight());
		addPiece(7, 7, new Rook());
	}

	public Cell getCellAtPos(int x, int y) {
		return cellMap.get(new Pos(x, y));
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
	}

}
