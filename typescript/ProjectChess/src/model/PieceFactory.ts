class PieceFactory{

    static createPiece(board: BoardModel, pos: Pos, color: Color, type: PieceType): PieceModel{
        var newPiece: PieceModel;
        switch(type){
            case PieceType.ROOK: newPiece = new RookModel(board, pos, color); break;
            case PieceType.BISHOP: newPiece = new BishopModel(board, pos, color); break;
            case PieceType.PAWN: newPiece = new PawnModel(board, pos, color); break;
            case PieceType.KING: newPiece = new KingModel(board, pos, color); break;
            case PieceType.KNIGHT: newPiece = new KnightModel(board, pos, color); break;
            case PieceType.QUEEN: newPiece = new QueenModel(board, pos, color); break;
        }
        return newPiece;
    }

    static createPieceByTransposition(pos: Pos, piece: PieceModel): PieceModel{
        var newPiece: PieceModel = PieceFactory.createPiece(piece.getBoardModel(), pos, piece.getColor(), piece.getType());
        piece.giveInternalAttributes(newPiece);
        return newPiece;
    }
}