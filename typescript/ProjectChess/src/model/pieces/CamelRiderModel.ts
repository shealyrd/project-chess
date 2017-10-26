class CamelRiderModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.CAMEL_RIDER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, -3, -1)
        .addAll(MoveFactory.getRelativeToPiece(this, 3, -1))
        .addAll(MoveFactory.getRelativeToPiece(this, -3, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 3, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, -3))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, 3))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, 3))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, -3));
    }
}