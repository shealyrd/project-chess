class CannonModel extends PieceModel{
    hasMoved: boolean;

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.CANNON);
    }

    onMove(move: Move){
    }

    giveInternalAttributes(piece: PieceModel) {

    }

    getDirection(): number{
        return this.getBoardModel().getDirection(this.getColor());
    }

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllLeft(this).addAll(MoveFactory.getAllRight(this));
    }
}