package projectchess;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import projectchess.pieces.Piece;

public class MoveInterpreter {
	Board board;
	
	public MoveInterpreter(Board board) {
		this.board = board;
	}

	public Set<Cell> getValidMoves(Piece piece){
		Map<Pos, Cell> cellMap = board.getCellMap();
		Movement move = piece.getMovement();
		
		Set<Cell> result = new HashSet<Cell>();
		
		final Piece refPiece = piece;
		
		Filter<Cell> verticalFilter = new Filter<Cell>(){

			@Override
			public boolean passesFilter(Cell t) {
				if(t.getPos().getX() == refPiece.getPos().getX()){
					return true;
				}
				return false;
			}
			
		};
		
		Filter<Cell> horizontalFilter = new Filter<Cell>(){

			@Override
			public boolean passesFilter(Cell t) {
				if(t.getPos().getY() == refPiece.getPos().getY()){
					return true;
				}
				return false;
			}
			
		};
		
		Filter<Cell> diagonalFilter = new Filter<Cell>(){

			@Override
			public boolean passesFilter(Cell t) {
				System.out.println(t.getPos() + " - " + refPiece.getPos() + " = " +  t.getPos().subtract(refPiece.getPos().getX(), refPiece.getPos().getY()));
				Pos pos = t.getPos().subtract(refPiece.getPos().getX(), refPiece.getPos().getY());
				if(Math.abs(pos.getX()) == Math.abs(pos.getY())){
					return true;
				}
				return false;
			}
			
		};
		
		if(move.isFullVertical()){
			result.addAll(verticalFilter.filter((cellMap.values())));	
		}
		if(move.isFullHorizontal()){
			result.addAll(horizontalFilter.filter((cellMap.values())));
		}
		if(move.isFullDiagonal()){
			result.addAll(diagonalFilter.filter((cellMap.values())));
		}
		
		return result;
	}
	
}	
