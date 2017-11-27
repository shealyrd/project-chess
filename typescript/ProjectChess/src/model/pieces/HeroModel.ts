class HeroModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.HERO);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllCardinal(this)
            .addAll(MoveFactory.getAllDiagonalWithCondition(this, MoveFilters.BASIC))
			.addAll(MoveFactory.getRelativeToPiece(this, -2, -1)
			.addAll(MoveFactory.getRelativeToPiece(this, 2, -1))
			.addAll(MoveFactory.getRelativeToPiece(this, -2, 1))
			.addAll(MoveFactory.getRelativeToPiece(this, 2, 1))
			.addAll(MoveFactory.getRelativeToPiece(this, 1, -2))
			.addAll(MoveFactory.getRelativeToPiece(this, -1, 2))
			.addAll(MoveFactory.getRelativeToPiece(this, 1, 2))
			.addAll(MoveFactory.getRelativeToPiece(this, -1, -2));
    }
}