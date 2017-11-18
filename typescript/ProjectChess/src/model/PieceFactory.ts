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
            case PieceType.GENERAL: newPiece = new GeneralModel(board, pos, color); break;
            case PieceType.MINISTER: newPiece = new MinisterModel(board, pos, color); break;
            case PieceType.GIRAFFE_RIDER: newPiece = new GiraffeRiderModel(board, pos, color); break;
            case PieceType.WAR_MACHINE: newPiece = new WarMachineModel(board, pos, color); break;
            case PieceType.CAMEL_RIDER: newPiece = new CamelRiderModel(board, pos, color); break;
            case PieceType.ELEPHANT_RIDER: newPiece = new ElephantRiderModel(board, pos, color); break;
            case PieceType.PICKET: newPiece = new PicketModel(board, pos, color); break;
        }
        return newPiece;
    }

    static createPieceByTransposition(pos: Pos, piece: PieceModel): PieceModel{
        var newPiece: PieceModel = PieceFactory.createPiece(piece.getBoardModel(), pos, piece.getColor(), piece.getType());
        piece.giveInternalAttributes(newPiece);
        return newPiece;
    }
}