class PieceFactory{

    static createPieceByTransposition(pos: Pos, piece: PieceModel): PieceModel{
        var newPiece: PieceModel = new PieceModel(piece.getBoardModel(), pos, piece.getColor(), piece.getType());
        return newPiece;
    }
}