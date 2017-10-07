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
        return null; //MoveFactory.getAllUpwards(this);
    }

    abstract onMove();
    abstract giveInternalAttributes(piece: PieceModel);
}