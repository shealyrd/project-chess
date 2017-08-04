package projectchess2;

public class EmptyPiece extends Piece{

	public EmptyPiece() {
		super(null, null, null);
	}

	@Override
	public PieceType getType() {
		return PieceType.EMPTY;
	}

}
