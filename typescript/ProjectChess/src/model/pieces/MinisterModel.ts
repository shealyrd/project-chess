class MinisterModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.MINISTER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, 1, 1)
            .addAll(MoveFactory.getRelativeToPiece(this, 1, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, -1));
    }
}