package projectchess2;

public abstract class Piece {
	
	private Pos pos;
	private Side side;
	private Board board;
	
	public Piece(Board board, Pos pos, Side side){
		this.pos = pos;
		this.side = side;
		this.board = board;
	}
	
	public abstract MoveCollection getPossibleMoves();

	public Pos getPos() {
		return pos;
	}
	
	public Side getSide() {
		return side;
	}

	public Board getBoard() {
		return board;
	}

	public static boolean isEmpty(Piece piece) {
		return piece instanceof EmptyPiece;
	};
	
	public abstract PieceType getType();
}
