class QueenModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.QUEEN);
    }

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllCardinal(this)
            .addAll(MoveFactory.getAllDiagonal(this));
    }
}