class ElephantRiderModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.ELEPHANT_RIDER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
		 return MoveFactory.getRelativeToPiece(this, -2, -2)
        .addAll(MoveFactory.getRelativeToPiece(this, 2, -2))
        .addAll(MoveFactory.getRelativeToPiece(this, -2, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, 2, 2));
    }
}