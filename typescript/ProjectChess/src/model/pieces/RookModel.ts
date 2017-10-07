class RookModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.ROOK);
    }

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllCardinal(this);
    }
}