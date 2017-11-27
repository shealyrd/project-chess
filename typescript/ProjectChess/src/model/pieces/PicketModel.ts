class PicketModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.PICKET);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
	
		var x = this.getPos().getX();
		var y = this.getPos().getY();
	
		var invalidMoves = new MoveCollection();
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y + 1), MoveType.CAPTURE));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y + 2), MoveType.CAPTURE));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y + 1), MoveType.CAPTURE));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y + 2), MoveType.CAPTURE));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y - 1), MoveType.CAPTURE));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y - 2), MoveType.CAPTURE));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y - 1), MoveType.CAPTURE));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y - 2), MoveType.CAPTURE));
		
		return MoveFactory.getAllDiagonalWithCondition(this, MoveFilters.BASIC).minusIgnoreType(invalidMoves);
    }
}