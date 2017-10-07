class BishopModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.BISHOP);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllDiagonal(this);
    }
}