class PicketModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.PICKET);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
	
		var x = piece.getX();
		var y = piece.getY();
	
		var invalidMoves = new MoveCollection();
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y + 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y + 2)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y + 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y + 2)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y - 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y - 2)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y - 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y - 2)));
		
		return MoveFactory.getAllDiagonal(this).minus(invalidMoves);
    }
}