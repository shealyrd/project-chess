class MoveFactory{

    static getAllUpwards(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() - 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            y -= 1;
        }

        return new MoveCollection(result);
    }

    static getAllDownwards(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() + 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            y += 1;
        }

        return new MoveCollection(result);
    }

    static getAllLeft(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY();

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            x -= 1;
        }

        return new MoveCollection(result);
    }

    static getAllRight(piece: PieceModel): MoveCollection{
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY();

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(piece.getBoardModel().isFree(new Pos(x, y)) == false){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            x += 1;
        }

        return new MoveCollection(result);
    }

    static getAllCardinal(piece: PieceModel){
        var result: MoveCollection = new MoveCollection();

        result.addAll(MoveFactory.getAllRight(piece));
        result.addAll(MoveFactory.getAllLeft(piece));
        result.addAll(MoveFactory.getAllUpwards(piece));
        result.addAll(MoveFactory.getAllDownwards(piece));

        return result;
    }

    static getAllLeftUpDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() - 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else {
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y)));
            x -= 1;
            y -= 1;
        }


        return result;
    }

    static getAllRightUpDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() - 1;

    while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
        if(!piece.getBoardModel().isFree(new Pos(x, y))){
            if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                break;
            }
            else{
                break;
            }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y)));
            x += 1;
            y -= 1;
        }

        return result;
    }

    static getAllRightDownDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() + 1;


        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.add(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y)));
            x += 1;
            y += 1;
        }

        return result;
    }

    static getAllLeftDownDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() + 1;

            while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
                if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                    if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                        result.add(new Move(piece.getPos(), new Pos(x, y)));
                        break;
                    }
                    else {
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                x -= 1;
                y += 1;
            }


        return result;
    }

    static getAllDiagonal(piece: PieceModel){
        var result: MoveCollection = new MoveCollection();

        result.addAll(MoveFactory.getAllLeftDownDiagonal(piece));
        result.addAll(MoveFactory.getAllRightDownDiagonal(piece));
        result.addAll(MoveFactory.getAllRightUpDiagonal(piece));
        result.addAll(MoveFactory.getAllLeftUpDiagonal(piece));

        return result;
    }

    static getRelativeToPiece(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();

        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                }
            }
            else{
                result.add(new Move(piece.getPos(), new Pos(newX, newY)));
            }
        }

        return result;
    }




}