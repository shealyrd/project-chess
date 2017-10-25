class GeneralModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.GENERAL);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, 0, -1)
            .addAll(MoveFactory.getRelativeToPiece(this, 0, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 0))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, 0));
    }
}