package projectchess2;

public class TestBoard extends Board{
	Piece target;
	PieceType type = PieceType.PAWN;
	
	public TestBoard() {
		super(8, 8);
		
		addPiece(new Pos(3, 2), type, Side.WHITE);
		
		addPiece(new Pos(4, 2), PieceType.BISHOP, Side.BLACK);
		addPiece(new Pos(2, 2), PieceType.BISHOP, Side.WHITE);
		
		target = getPiece(new Pos(3, 2));
		
		movePiece(target, new Pos(3,3));
		
		target = getPiece(new Pos(3, 3));
		
		for(Move move: target.getPossibleMoves()){
			addPiece(move.getDest(), type, Side.WHITE);
		}
	}

	@Override
	public boolean isInCheckmate(Side side) {
		// TODO Auto-generated method stub
		return false;
	}
	
	public String toString(){
		StringBuilder builder = new StringBuilder();
		for(int y = 0; y < getHeight(); y++){
			for(int x = 0; x < getWidth(); x++){
				Pos pos = new Pos(x,y);
				Piece piece = getPiece(pos);
				if(Piece.isEmpty(piece)){
					builder.append("[ ]");
				}
				else if(piece.equals(target)){
					builder.append("[" + "O" + "]");
				}
				else{
					if(piece.getType().equals(type)){
						builder.append("[" + "X" + "]");
					}
					else{
						builder.append("[" + "A" + "]");
					}

				}

			}
			builder.append("\n");
		}
		return builder.toString();
	}

}
