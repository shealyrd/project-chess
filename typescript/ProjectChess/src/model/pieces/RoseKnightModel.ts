class RoseKnightModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.ROSE_KNIGHT);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
		return MoveFactory.getAllCircularLeapsWithCondition(this, MoveFilters.BASIC);
    }
}