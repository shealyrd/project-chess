class PawnModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.PAWN);
    }

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, 0, -1 * this.getBoardModel().getDirection(this.getColor()));
    }
}