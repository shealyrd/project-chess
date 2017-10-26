class GiraffeRiderModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.GIRAFFE_RIDER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
		return MoveFactory.getGiraffeMovement(this);
    }
}