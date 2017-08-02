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
				
				Pos pos = t.getPos().subtract(refPiece.getPos().getX(), refPiece.getPos().getY());
				if(Math.abs(pos.getX()) == Math.abs(pos.getY())){
					return true;
				}
				return false;
			}
			
		};
		
		Filter<Cell> positionFilter = new Filter<Cell>(){

			@Override
			public boolean passesFilter(Cell t) {
				
				Pos pos = t.getPos().subtract(refPiece.getPos());
				if(refPiece.getMovement().validRelativePositions.contains(pos)){
					return true;
				}
				return false;
			}
			
		};
		
		Filter<Cell> noncapturingPositionFilter = new Filter<Cell>(){

			@Override
			public boolean passesFilter(Cell t) {
				
				Pos pos = t.getPos().subtract(refPiece.getPos());
				if(refPiece.getMovement().validNonCapturingRelativePositions.contains(pos)){
					return true;
				}
				return false;
			}
			
		};
		
		Filter<Cell> conditionalPositionFilter = new Filter<Cell>(){

			@Override
			public boolean passesFilter(Cell t) {
				
				Pos pos = t.getPos().subtract(refPiece.getPos());
				for(Object[] dual: refPiece.getMovement().conditionalPositions){
					//System.out.println(t.getPos().subtract(refPiece.getPos()));
					if(((Pos) dual[0]).equals(t.getPos().subtract(refPiece.getPos()))){
						boolean temp = ((BiPredicate<Board, Piece>) dual[1]).test(board, refPiece);
						System.out.println(t.getPos() + ": " + temp);
						return temp;
					}
				}
				return false;
			}
			
		};
		
		Filter<Cell> conditionalNonCapturingPositionFilter = new Filter<Cell>(){

			@Override
			public boolean passesFilter(Cell t) {
				
				Pos pos = t.getPos().subtract(refPiece.getPos());
				for(Object[] dual: refPiece.getMovement().conditionalNonCapturingPositions){
					if(((Pos) dual[0]).equals(t.getPos().subtract(refPiece.getPos()))){
						return ((BiPredicate<Board, Piece>) dual[1]).test(board, refPiece);
					}
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
		result.addAll(positionFilter.filter((cellMap.values())));
		result.addAll(conditionalNonCapturingPositionFilter.filter((cellMap.values())));
		result.addAll(conditionalPositionFilter.filter((cellMap.values())));
		result.addAll(noncapturingPositionFilter.filter((cellMap.values())));
		
		return result;
	}
	
}	
