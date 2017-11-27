class BattleShipModel extends PieceModel{
    hasMoved: boolean;

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.BATTLESHIP);
    }

    onMove(move: Move){
    }

    giveInternalAttributes(piece: PieceModel) {

    }

    getDirection(): number{
        return this.getBoardModel().getDirection(this.getColor());
    }

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllOrthagonalWithCondition(this, MoveFilters.BASIC_ONLY_WATER)
			.addAll(MoveFactory.getAllDiagonalWithCondition(this, MoveFilters.BASIC_ONLY_WATER))
            .addAll(MoveFactory.getRelativeToPieceFling(this, 0, -3))
                .addAll(MoveFactory.getRelativeToPieceFling(this, 0, 3))
                    .addAll(MoveFactory.getRelativeToPieceFling(this, 3, 0))
                        .addAll(MoveFactory.getRelativeToPieceFling(this, -3, 0));
    }
}