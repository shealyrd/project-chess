class KnightModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.KNIGHT);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, -2, -1)
        .addAll(MoveFactory.getRelativeToPiece(this, 2, -1))
        .addAll(MoveFactory.getRelativeToPiece(this, -2, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 2, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, -2))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, -2));
    }
}