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

	static getGiraffeMovement(piece: PieceModel){
		var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();
		
		var x = piece.getPos().getX();
        var y = piece.getPos().getY();
		
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x + 1, y - 1))); 
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x - 1, y - 1)));
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x + 1, y + 1)));
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x - 1, y + 1)));
		
		return result;
	}
	

	
	static getGiraffeMovementQuarter(piece: PieceModel, pos: Pos): MoveCollection{
		var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();
		
		var x = pos.getX();
        var y = pos.getY();
		
		var positionsThatMustBeClear: Pos[] = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y - 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
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
                y -= 1;
            }
        }

        x = pos.getX();
        y = pos.getY();

        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x + 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
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
            }
        }

        x = pos.getX();
        y = pos.getY();

        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x - 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
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
                x -= 1;
            }
        }

        x = pos.getX();
        y = pos.getY();

        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y + 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
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
                y += 1;
            }
        }

        return result;
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

    static getRelativeToPieceNonCapturing(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();
        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
            }
            else{
                result.add(new Move(piece.getPos(), new Pos(newX, newY)));
            }
        }

        return result;
    }

    static getRelativeToPieceOnlyIfCapturable(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();

        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                }
            }
        }

        return result;
    }

    static getLineForward(piece: PieceModel, length: number, direction: number){
        var result: MoveCollection = new MoveCollection();

        if(direction > 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() - 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                            result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                            count--;
                            newY--;
                        }
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY--;
                    }
                }
            }
        }
        if(direction < 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() + 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                            result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                            count--;
                            newY++;
                        }
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY++;
                    }
                }
            }
        }

        return result;
    }

    static getLineForwardNoncapturing(piece: PieceModel, length: number, direction: number){
        var result: MoveCollection = new MoveCollection();

        if(direction > 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() - 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        break;
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY--;
                    }
                }
                else{
                    break;
                }
            }
        }
        if(direction < 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() + 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        break;
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY++;
                    }
                }
                else{
                    break;
                }
            }
        }

        return result;
    }
}