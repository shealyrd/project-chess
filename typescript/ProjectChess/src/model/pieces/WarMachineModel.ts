class WarMachineModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.WAR_MACHINE);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, -2, 0)
        .addAll(MoveFactory.getRelativeToPiece(this, 2, 0))
        .addAll(MoveFactory.getRelativeToPiece(this, 0, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, 0, 2));
    }
}