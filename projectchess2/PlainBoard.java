package projectchess2;

public class PlainBoard extends Board{

	public PlainBoard() {
		super(8, 8);
		
		addPiece(new Pos(0, 0), PieceType.ROOK, Side.BLACK);
		addPiece(new Pos(1, 0), PieceType.KNIGHT, Side.BLACK);
		addPiece(new Pos(2, 0), PieceType.BISHOP, Side.BLACK);
		addPiece(new Pos(3, 0), PieceType.QUEEN, Side.BLACK);
		addPiece(new Pos(4, 0), PieceType.KING, Side.BLACK);
		addPiece(new Pos(5, 0), PieceType.BISHOP, Side.BLACK);
		addPiece(new Pos(6, 0), PieceType.KNIGHT, Side.BLACK);
		addPiece(new Pos(7, 0), PieceType.ROOK, Side.BLACK);
		addPiece(new Pos(0, 1), PieceType.PAWN, Side.BLACK);
		addPiece(new Pos(1, 1), PieceType.PAWN, Side.BLACK);
		addPiece(new Pos(2, 1), PieceType.PAWN, Side.BLACK);
		addPiece(new Pos(3, 1), PieceType.PAWN, Side.BLACK);
		addPiece(new Pos(4, 1), PieceType.PAWN, Side.BLACK);
		addPiece(new Pos(5, 1), PieceType.PAWN, Side.BLACK);
		addPiece(new Pos(6, 1), PieceType.PAWN, Side.BLACK);
		addPiece(new Pos(7, 1), PieceType.PAWN, Side.BLACK);
		
		addPiece(new Pos(0, 7), PieceType.ROOK, Side.WHITE);
		addPiece(new Pos(1, 7), PieceType.KNIGHT, Side.WHITE);
		addPiece(new Pos(2, 7), PieceType.BISHOP, Side.WHITE);
		addPiece(new Pos(3, 7), PieceType.QUEEN, Side.WHITE);
		addPiece(new Pos(4, 7), PieceType.KING, Side.WHITE);
		addPiece(new Pos(5, 7), PieceType.BISHOP, Side.WHITE);
		addPiece(new Pos(6, 7), PieceType.KNIGHT, Side.WHITE);
		addPiece(new Pos(7, 7), PieceType.ROOK, Side.WHITE);
		addPiece(new Pos(0, 6), PieceType.PAWN, Side.WHITE);
		addPiece(new Pos(1, 6), PieceType.PAWN, Side.WHITE);
		addPiece(new Pos(2, 6), PieceType.PAWN, Side.WHITE);
		addPiece(new Pos(3, 6), PieceType.PAWN, Side.WHITE);
		addPiece(new Pos(4, 6), PieceType.PAWN, Side.WHITE);
		addPiece(new Pos(5, 6), PieceType.PAWN, Side.WHITE);
		addPiece(new Pos(6, 6), PieceType.PAWN, Side.WHITE);
		addPiece(new Pos(7, 6), PieceType.PAWN, Side.WHITE);
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
