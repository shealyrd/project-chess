abstract class PieceModel{
    private pos: Pos;
    private color: Color;
    private boardModel: BoardModel;
    private type: PieceType;

    constructor(board: BoardModel, pos: Pos, color: Color, type: PieceType){
        this.pos = pos;
        this.color = color;
        this.boardModel = board;
        this.type = type;
    }

    getPos(): Pos{
        return this.pos;
    }

    getColor(): Color{
        return this.color;
    }

    getBoardModel(): BoardModel{
        return this.boardModel;
    }

    getType(): PieceType{
        return this.type;
    }

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllUpwards(this);
    }
	
	transformInto(type: PieceType){
		this.getBoardModel().removePiece(this.getPos());
		this.getBoardModel().addPiece(type, this.getPos().getX(), this.getPos().getY(), this.getColor);
	}
	
    abstract onMove(move: Move);
    abstract giveInternalAttributes(piece: PieceModel);
}