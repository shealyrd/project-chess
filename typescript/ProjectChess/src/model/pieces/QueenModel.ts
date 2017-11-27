class QueenModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.QUEEN);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
	
			return MoveFactory.getAllOrthagonalWithCondition(this, MoveFilters.BASIC)
					.addAll(MoveFactory.getAllDiagonalWithCondition(this, MoveFilters.BASIC));
    }
}