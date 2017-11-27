class CheckerModel extends PieceModel {

    constructor(board:BoardModel, pos:Pos, color:Color) {
        super(board, pos, color, PieceType.CHECKER);
    }

    onMove(move:Move) {
    }

    giveInternalAttributes(piece:PieceModel) {

    }

    getDirection():number {
        return this.getBoardModel().getDirection(this.getColor());
    }

    getPossibleMoves():MoveCollection {
		/*if(this.getDirection() == 1){
			return MoveFactory.getRelativeToPieceHop(this, 2, -2)
            .addAll(MoveFactory.getRelativeToPieceHop(this, -2, -2));
		}
		else if(this.getDirection() == -1){
			return MoveFactory.getRelativeToPieceHop(this, 2, 2)
            .addAll(MoveFactory.getRelativeToPieceHop(this, -2, 2));
		}*/
		var result = MoveFactory.getRecursiveCheckerHop(this);
		return result;
    }

}