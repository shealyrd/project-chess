class PawnModel extends PieceModel{
    hasMoved: boolean;

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.PAWN);
    }

    onMove(move: Move){
       this.hasMoved = true;
	   if(this.getBoardModel().isOnOppositeBackRank(move.getDest(), this.getColor())){
			this.transformInto(PieceType.QUEEN);
			//alert("I'm promoting!");
			//this.getBoardModel().addPiece();
	   }
    }

    giveInternalAttributes(piece: PieceModel) {
        var currPiece = piece as PawnModel;
        currPiece.hasMoved = this.hasMoved;

    }

    getDirection(): number{
        return this.getBoardModel().getDirection(this.getColor());
    }

    getPossibleMoves(): MoveCollection{
        /*
        if(this.hasMoved){
            return MoveFactory.getRelativeToPieceNonCapturing(this, 0, -1 * this.getDirection())
                    .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, -1, -1 * this.getDirection()))
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, 1, -1 * this.getDirection()));
        }
        else{
            //alert(MoveFactory.getLineForward(this, 2, this.getDirection()).getMoves.length);
            return MoveFactory.getRelativeToPieceNonCapturing(this, 0, -1 * this.getDirection())
                .addAll(MoveFactory.getLineForwardNoncapturing(this, 2, this.getDirection())
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, -1, -1 * this.getDirection()))
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, 1, -1 * this.getDirection())));
        }*/

        return MoveFactory.getFling(this, new Pos(this.getPos().getX(), this.getPos().getY() - 3));

    }
}