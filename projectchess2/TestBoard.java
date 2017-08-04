package projectchess2;

public class TestBoard extends Board{

	public TestBoard() {
		super(8, 8);
		
		addPiece(new Pos(0, 0), PieceType.ROOK, Side.BLACK);
		
		addPiece(new Pos(3, 0), PieceType.PAWN, Side.WHITE);
		
		Piece target = getPiece(new Pos(0, 0));
		
		for(Move move: target.getPossibleMoves()){
			addPiece(move.getDest(), PieceType.ROOK, Side.BLACK);
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
				else{
					builder.append("[" + piece.getType().name() + "]");
				}

			}
			builder.append("\n");
		}
		return builder.toString();
	}

}
