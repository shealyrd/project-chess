package projectchess;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiPredicate;

import projectchess.pieces.Pawn;
import projectchess.pieces.Piece;

public class Movement {
	private boolean FULL_DIAGONAL;
	private boolean FULL_HORIZONTAL;
	private boolean FULL_VERTICAL;
	private boolean JUMPING;
	
	List<Pos> validRelativePositions = new ArrayList<Pos>();
	List<Pos> validNonCapturingRelativePositions = new ArrayList<Pos>();
	List<Object[]> conditionalPositions = new ArrayList<Object[]>();
	List<Object[]> conditionalNonCapturingPositions = new ArrayList<Object[]>();
	
	
	
	public boolean isFullDiagonal() {
		return FULL_DIAGONAL;
	}
	public boolean isFullHorizontal() {
		return FULL_HORIZONTAL;
	}
	public boolean isFullVertical() {
		return FULL_VERTICAL;
	}
	public Movement addValidPosition(Pos pos){
		validRelativePositions.add(pos);
		return this;
	}
	public Movement addValidPosition(Pos... pos){
		for(Pos p: pos){
			validRelativePositions.add(p);
		}
		return this;
	}
	
	public Movement addValidNonCapturingPosition(Pos pos){
		validNonCapturingRelativePositions.add(pos);
		return this;
	}
	
	public Movement addValidNonCapturingPosition(Pos... pos){
		for(Pos p: pos){
			validNonCapturingRelativePositions.add(p);
		}
		return this;
	}
	
	public Movement addPositionIf(Pos pos, BiPredicate<Board, Piece> func){
		conditionalPositions.add(new Object[]{pos, func});
		return this;
	}
	
	public Movement addNonCapturingPositionIf(Pos pos, BiPredicate<Board, Piece> func){
		conditionalNonCapturingPositions.add(new Object[]{pos, func});
		return this;
	}
	
	public Movement setFullDiagonal(){
		FULL_DIAGONAL = true;
		return this;
	}
	public Movement setFullHorizontal(){
		FULL_HORIZONTAL = true;
		return this;
	}
	public Movement setFullVertical(){
		FULL_VERTICAL = true;
		return this;
	}
	public Movement setJumping(){
		JUMPING = true;
		return this;
	}

	public static Movement QUEEN = 
			new Movement().setFullDiagonal()
						  .setFullVertical()
						  .setFullHorizontal();
	
	public static Movement KING = 
			new Movement()
					.addValidPosition(new Pos(1,0),
									  new Pos(0,1),
									  new Pos(-1,0),
									  new Pos(0,-1),
									  new Pos(-1,-1),
									  new Pos(1,-1),
									  new Pos(-1,1),
									  new Pos(1,1));
	public static Movement ROOK = 
			new Movement().setFullVertical()
						  .setFullHorizontal();
	
	public static Movement BISHOP = 
			new Movement().setFullDiagonal();
	
	public static Movement KNIGHT = 
			new Movement().setJumping()
						  .addValidPosition(new Pos(1,2),
								  			new Pos(2,1),
								  			new Pos(-1,2),
								  			new Pos(2,-1),
								  			new Pos(-2,1),
								  			new Pos(-1,-2),
								  			new Pos(-2,-1),
								  			new Pos(1,-2));
	
	public static Movement PAWN = 
			new Movement().addValidNonCapturingPosition(new Pos(0,1))
						  .addNonCapturingPositionIf(new Pos(0,2), 
								         (board, piece) -> 
						  				 	{return ((Pawn) piece).isFirstMove();})
						  .addPositionIf(new Pos(1,1), 
							         	 (board, piece) -> 
						  					{Pos target = piece.getPos().add(1, 1);
							         		return board.hasPiece(target, piece.getColor().swap());
							         		});
}
