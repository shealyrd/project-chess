class MoveFactory{

    static getAllUpwards(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() - 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            result.add(new Move(piece.getPos(), new Pos(x, y)));
            y -= 1;
        }

        return result;
    }


}