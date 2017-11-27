class MoveFactory{

    static getAllUpwards(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() - 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                    result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
            x += 1;
        }

        return new MoveCollection(result);
    }
	
	static getAllOrthagonalWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
		var result: MoveCollection = new MoveCollection();
		
		result.addAll(MoveFactory.getAllRightWithCondition(piece, func));
		result.addAll(MoveFactory.getAllLeftWithCondition(piece, func));
		result.addAll(MoveFactory.getAllDownwardsWithCondition(piece, func));
		result.addAll(MoveFactory.getAllUpwardsWithCondition(piece, func));
		
		return result;
	}
	
	static getAllRightWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
		var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY();

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
			var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
            if(filterResult.passesFilter){
				result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
            x += 1;
        }

        return new MoveCollection(result);
	}
	
	static getAllLeftWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY();

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
			var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
            if(filterResult.passesFilter){
				result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
            x -= 1;
        }

        return new MoveCollection(result);
    }
	
	static getAllUpwardsWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() - 1;

         while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
			var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
            if(filterResult.passesFilter){
				result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
            y -= 1;
        }

        return new MoveCollection(result);
    }
	
	static getAllDownwardsWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() + 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
			var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
            if(filterResult.passesFilter){
				result.push(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
            y += 1;
        }

        return new MoveCollection(result);
    }

	static getLeapingLineWithCondition(piece: PieceModel, x: number, y: number, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
	    var result: MoveCollection = new MoveCollection();

        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        while(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
			var filterResult: MoveFilterResult = func(new Pos(newX, newY), piece);
            if(filterResult.passesFilter){
				result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
			newX += x;
			newY += y;
        }

        return result;
	}
	
	
static getAllCircularLeapsWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
		var coordinates = new Array();
        coordinates.push(new Pos(-1, -2));
        coordinates.push(new Pos(-2, -1));
        coordinates.push(new Pos(-2, 1));
        coordinates.push(new Pos(-1, 2));
        coordinates.push(new Pos(1, 2));
        coordinates.push(new Pos(2, 1));
        coordinates.push(new Pos(2, -1));
        coordinates.push(new Pos(1, -2));
        var result = new MoveCollection();
        for (var eachIdx in coordinates) {
            var eachCoordinate = coordinates[eachIdx];
            var newX = piece.getPos().getX() + eachCoordinate.getX();
            var newY = piece.getPos().getY() + eachCoordinate.getY();
            var counter = 1;
			var idxIncr = +eachIdx;
            while (piece.getBoardModel().isValidPosition(new Pos(newX, newY)) && (counter < 8)) {

                var filterResult = func(new Pos(newX, newY), piece);
                if (filterResult.passesFilter) {
                    result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                }
                if (filterResult.breakLoop) {
                    break;
                }
                var nextCoordinate;
                if (idxIncr < (coordinates.length -1)) {
					idxIncr++;
                }
                else {
					idxIncr = 0;
                }
				nextCoordinate = coordinates[+idxIncr];
                newX = newX + nextCoordinate.getX();
                newY = newY + nextCoordinate.getY();
                counter++;
				
            }
        }
        return result;
	}
	
	static getCircularLeapWithCondition(piece: PieceModel, x: number, y: number, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
	    var result: MoveCollection = new MoveCollection();

        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;
		var swapTemp: number;
		var circularState: number = 1;
		
        while(piece.getBoardModel().isValidPosition(new Pos(newX, newY)) && (circularState <= 8)){
			var filterResult = func(new Pos(newX, newY), piece);
            if (filterResult.passesFilter) {
                result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
            }
            if (filterResult.breakLoop) {
                break;
            }
            if (circularState == 4) {
                x = x * (-1);
				circularState = 1;
            }
            else if (circularState == 3) {
                swapTemp = x;
                x = y;
                y = swapTemp;
            }
            else if (circularState == 2) {
                y = y * (-1);
            }
            else if (circularState == 1) {
                swapTemp = x;
                x = y;
                y = swapTemp;
            }
			newX = newX + x;
			newY = newY + y;
            circularState += 1;
        }

        return result;
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
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                y += 1;
            }
        }

        return result;
	}

    static getFling(piece: PieceModel, dest: Pos): MoveCollection{
        var result: MoveCollection = new MoveCollection();
        if(piece.getBoardModel().isValidPosition(dest)){
            result.add(new Move(piece.getPos(), dest, MoveType.FLING));
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
	
	static getAllDiagonalWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
        var result: MoveCollection = new MoveCollection();

        result.addAll(MoveFactory.getAllLeftDownDiagonalWithCondition(piece, func));
        result.addAll(MoveFactory.getAllRightDownDiagonalWithCondition(piece, func));
        result.addAll(MoveFactory.getAllRightUpDiagonalWithCondition(piece, func));
        result.addAll(MoveFactory.getAllLeftUpDiagonalWithCondition(piece, func));

        return result;
    }

	static getAllLeftUpDiagonalWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
		var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() - 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))) {
           	var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
            if(filterResult.passesFilter){
				result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
            x -= 1;
            y -= 1;
        }


        return result;
    }
	
	static getAllRightUpDiagonalWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() - 1;

		while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
           	var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
            if(filterResult.passesFilter){
				result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
            x += 1;
            y -= 1;
        }

        return result;
    }
	
	static getAllRightDownDiagonalWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() + 1;


        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
			var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
            if(filterResult.passesFilter){
				result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
			}
			if(filterResult.breakLoop){
				break;
			}
            x += 1;
            y += 1;
        }

        return result;
    }
	
	static getAllLeftDownDiagonalWithCondition(piece: PieceModel, func: (pos: Pos, piece: PieceModel) => MoveFilterResult){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() + 1;

            while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
				var filterResult: MoveFilterResult = func(new Pos(x, y), piece);
				if(filterResult.passesFilter){
					result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
				}
				if(filterResult.breakLoop){
					break;
				}
                x -= 1;
                y += 1;
            }


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
                    result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else {
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                break;
            }
            else{
                break;
            }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                    result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                    break;
                }
                else{
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                        result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
                        break;
                    }
                    else {
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y), MoveType.CAPTURE));
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
                    result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                }
            }
            else{
                result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
            }
        }

        return result;
    }

    static getRelativeToPieceFling(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();
        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.FLING));
            }
        }

        return result;
    }

    static getRelativeToPieceHop(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();
        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (piece.getBoardModel().isFree(new Pos(newX, newY))) {
			    var removePos: Pos = new Pos(newX, newY).minus(piece.getPos()).divide(2);
				removePos = piece.getPos().plus(removePos);
				if (!piece.getBoardModel().isFree(removePos)) {
					if (piece.getBoardModel().getPieceFromPosition(removePos).getColor() != piece.getColor()) {
						result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.HOP));
					}
				}
            }
        }

        return result;
    }

	static getHop(board: BoardModel, color: Color, origin: Pos, x: number, y: number){
        var result: MoveCollection = new MoveCollection();
        var newX: number = origin.getX() + x;
        var newY: number = origin.getY() + y;

        if(board.isValidPosition(new Pos(newX, newY))){
            if (board.isFree(new Pos(newX, newY))) {
			    var removePos: Pos = new Pos(newX, newY).minus(origin).divide(2);
				removePos = origin.plus(removePos);
				if (!board.isFree(removePos)) {
					if (board.getPieceFromPosition(removePos).getColor() != color) {
						result.add(new Move(origin, new Pos(newX, newY), MoveType.HOP));
					}
				}
            }
        }

        return result;
    }
	
	static applyMove(move: Move, board: BoardModel): BoardModel{
		var newBoard = new BoardModel(board.getWidth(), board.getHeight());
		newBoard.populateFromSerial(board.serialize());
		newBoard.executeMove(move);
		return newBoard;
	}
	
	static getRecursiveCheckerKingHop(piece: PieceModel){
		var direction = piece.getDirection();
		var moves: MoveCollection;
		var result: MoveCollection = new MoveCollection();
		
		moves = MoveFactory.getRelativeToPieceHop(piece, 2, -2)
		.addAll(MoveFactory.getRelativeToPieceHop(piece, -2, -2))
		.addAll(MoveFactory.getRelativeToPieceHop(piece, -2, 2))
		.addAll(MoveFactory.getRelativeToPieceHop(piece, 2, 2));
		
		for(var eachMoveIdx in moves.getMoves()){
			var eachMove = moves.getMoves()[eachMoveIdx];
			var newBoard = MoveFactory.applyMove(eachMove, piece.getBoardModel());
			var transformedMoves = MoveFactory.recursivelyTransformKingHop(eachMove, piece, newBoard);
			result.addAll(transformedMoves);
		}
		
		return result;
    }

	static recursivelyTransformKingHop(move: Move, piece: PieceModel, board: BoardModel): MoveCollection{
		var result: MoveCollection = new MoveCollection();
		var eachMoveHopOptions = MoveFactory.getHop(board, piece.getColor(), move.getDest(), 2, -2)
			.addAll(MoveFactory.getHop(board, piece.getColor(), move.getDest(), -2, -2))
			.addAll(MoveFactory.getHop(board, piece.getColor(), move.getDest(), -2, 2))
			.addAll(MoveFactory.getHop(board, piece.getColor(), move.getDest(), 2, 2));
		
		if(eachMoveHopOptions.size() >= 1){
			for(var eachMoveIdx in eachMoveHopOptions.getMoves()){
				var eachMove = eachMoveHopOptions.getMoves()[eachMoveIdx];
				var newBoard = MoveFactory.applyMove(eachMove, board);
				var transformedMoves = MoveFactory.recursivelyTransformKingHop(eachMove, piece, newBoard);
				for(var eachMoveIdx2 in transformedMoves.getMoves()){
					var eachMove2 = transformedMoves.getMoves()[eachMoveIdx2];
					var moveCopy = move.clone();
					moveCopy.setNextMove(eachMove2);
					result.add(moveCopy);
				}
			}
		}
		else{
			result.add(move);
		}
		return result;
	}
	
	static getRecursiveCheckerHop(piece: PieceModel){
		var direction = piece.getDirection();
		var moves: MoveCollection;
		var result: MoveCollection = new MoveCollection();
		
		moves = MoveFactory.getRelativeToPieceHop(piece, 2, -2 * direction)
		.addAll(MoveFactory.getRelativeToPieceHop(piece, -2, -2 * direction));
		
		for(var eachMoveIdx in moves.getMoves()){
			var eachMove = moves.getMoves()[eachMoveIdx];
			var transformedMoves = MoveFactory.recursivelyTransformHop(eachMove, piece);
			result.addAll(transformedMoves);
		}
		
		return result;
    }

	static recursivelyTransformHop(move: Move, piece: PieceModel): MoveCollection{
		var result: MoveCollection = new MoveCollection();
		var eachMoveHopOptions = MoveFactory.getHop(piece.getBoardModel(), piece.getColor(), move.getDest(), 2, -2 * piece.getDirection())
			.addAll(MoveFactory.getHop(piece.getBoardModel(), piece.getColor(), move.getDest(), -2, -2 * piece.getDirection()));
		
		if(eachMoveHopOptions.size() >= 1){
			for(var eachMoveIdx in eachMoveHopOptions.getMoves()){
				var eachMove = eachMoveHopOptions.getMoves()[eachMoveIdx];
				var transformedMoves = MoveFactory.recursivelyTransformHop(eachMove, piece);
				for(var eachMoveIdx2 in transformedMoves.getMoves()){
					var eachMove2 = transformedMoves.getMoves()[eachMoveIdx2];
					var moveCopy = move.clone();
					moveCopy.setNextMove(eachMove2);
					result.add(moveCopy);
				}
			}
		}
		else{
			result.add(move);
		}
		return result;
	}
	
	static unrollMoves(move: Move): MoveCollection{
		var result: MoveCollection = new MoveCollection();
		var moveDepth = move.getMoveDepth();
		var moveHandle: Move = move;
		var individualMoveArray: Move[] = new Array();
		

		for(var i = 1; i <= moveDepth; i++){
			individualMoveArray.push(moveHandle.cloneWithoutNextMove());
			if(moveHandle.hasNextMove()){
				moveHandle = moveHandle.getNextMove();
			}
		}
		
		var baseMove: Move;
		for(var j = 0; j < individualMoveArray.length; j++){
			var eachMove = individualMoveArray[j];
			if(baseMove == null){
				baseMove = eachMove;
			}
			else{
				baseMove.appendMoveToEnd(eachMove);
			}
			result.add(baseMove.clone());
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
                result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
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
                    result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
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
                            result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                            count--;
                            newY--;
                        }
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
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
                            result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
                            count--;
                            newY++;
                        }
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
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
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
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
                        result.add(new Move(piece.getPos(), new Pos(newX, newY), MoveType.CAPTURE));
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