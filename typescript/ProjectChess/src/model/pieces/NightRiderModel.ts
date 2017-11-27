class NightRiderModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.NIGHTRIDER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getLeapingLineWithCondition(this, -2, -1, MoveFilters.BASIC)
        .addAll(MoveFactory.getLeapingLineWithCondition(this, 2, -1, MoveFilters.BASIC))
        .addAll(MoveFactory.getLeapingLineWithCondition(this, -2, 1, MoveFilters.BASIC))
        .addAll(MoveFactory.getLeapingLineWithCondition(this, 2, 1, MoveFilters.BASIC))
        .addAll(MoveFactory.getLeapingLineWithCondition(this, 1, -2, MoveFilters.BASIC))
        .addAll(MoveFactory.getLeapingLineWithCondition(this, -1, 2, MoveFilters.BASIC))
        .addAll(MoveFactory.getLeapingLineWithCondition(this, 1, 2, MoveFilters.BASIC))
        .addAll(MoveFactory.getLeapingLineWithCondition(this, -1, -2, MoveFilters.BASIC));
    }
}