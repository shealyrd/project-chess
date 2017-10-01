public abstract class PieceModel{
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

}