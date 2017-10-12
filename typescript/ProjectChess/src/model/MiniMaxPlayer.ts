//TODO: Log what it thinks the best move for white is

class MiniMaxPlayer extends Player{
	myColor: Color = Color.BLACK;

	/*getNextMove(board: BoardModel):Move{
		var moves: MoveCollection = board.getAllMovesForColor(Color.BLACK);
		moves.shuffle();
		var bestValuation: number = Number.MAX_SAFE_INTEGER * -1;
		var bestMove: Move;
		for(var moveIdx in moves.getMoves()){
			var eachMove: Move = moves.getMoves()[moveIdx];
			var newBoard = new BoardModel(board.getHeight(), board.getWidth());
			newBoard.populateFromSerial(board.serialize());
			newBoard.executeMove(eachMove);
			var currentValuation = this.evaluate(newBoard);
			if(currentValuation > bestValuation){
				bestValuation = currentValuation;
				bestMove = eachMove;
			}
		}
		return bestMove;
	}*/

	getNextMove(board: BoardModel):Move{
		var moves: MoveCollection = board.getAllMovesForColor(Color.BLACK);
		moves.shuffle();
		var bestValuation: number = Number.MAX_SAFE_INTEGER * -1;
		var bestMove: Move;
		for(var moveIdx in moves.getMoves()){
			var eachMove: Move = moves.getMoves()[moveIdx];
			var currentValuation = this.minimax(eachMove, board, 2, this.myColor, Number.MAX_SAFE_INTEGER * -1, Number.MAX_SAFE_INTEGER, true);
			//alert(JSON.stringify(eachMove) + " " + currentValuation);
			if(currentValuation > bestValuation){
				bestValuation = currentValuation;
				bestMove = eachMove;
			}
		}
		ConsoleController.log("Best move for white: " + JSON.stringify(storageMove));
		return bestMove;
	}

	minimax(move: Move, board: BoardModel, depth: number, color: Color, alpha: number, beta: number, maximize: boolean): number{
		var newBoard: BoardModel = this.applyMove(move, board);
		if(depth == 0){
			//alert(JSON.stringify(move) + " " + this.evaluate(newBoard, color));
			return this.evaluate(newBoard, color);
		}
		var bestValuation: number;
		var bestValuation2: number;
		if(maximize){
			bestValuation = Number.MAX_SAFE_INTEGER * -1;
			var maxMoves: MoveCollection = newBoard.getAllMovesForColor(color);
			for(var maxMoveIdx in maxMoves.getMoves()) {
				var eachMaxMove:Move = maxMoves.getMoves()[maxMoveIdx];
				bestValuation = Math.max(bestValuation, this.minimax(eachMaxMove, newBoard, depth - 1, this.swapColor(color), alpha, beta, false));
				alpha = Math.max(alpha, bestValuation);
				if(beta <= alpha){
					break;
				}
			}
		}
		else if(!maximize){
			bestValuation = Number.MAX_SAFE_INTEGER;
			var minMoves: MoveCollection = newBoard.getAllMovesForColor(color);
			for(var minMoveIdx in minMoves.getMoves()) {
				var eachMinMove:Move = minMoves.getMoves()[minMoveIdx];
				bestValuation2 = bestValuation;
				bestValuation = Math.min(bestValuation, this.minimax(eachMinMove, newBoard, depth - 1, this.swapColor(color), alpha, beta, true));
				beta = Math.min(beta, bestValuation);
				if(beta <= alpha){
					break;
				}
			}
		}
		return bestValuation;
	}

	swapColor(color: Color): Color{
		if(color == Color.BLACK){
			return Color.WHITE;
		}
		else{
			return Color.BLACK;
		}
	}

	applyMove(move: Move, board: BoardModel): BoardModel{
		var newBoard = new BoardModel(board.getHeight(), board.getWidth());
		newBoard.populateFromSerial(board.serialize());
		newBoard.executeMove(move);
		return newBoard;
	}


	evaluate(board: BoardModel, color: Color): number{
		var result = 0;
		/*result += board.getAllPiecesOfColor(color).length;
		result -= board.getAllPiecesOfColor(this.swapColor(color)).length;*/
		result += this.getMaterial(board, color);
		return result;
	}

	getMaterial(board: BoardModel, color: Color){
		var pieces = board.getAllPieces();
		var value = 0;
		for(var pieceIdx in pieces){
			var eachPiece =  pieces[pieceIdx];
			var thisValue = 0;
			switch(eachPiece.getType()){
				case PieceType.ROOK: thisValue += 5; break;
				case PieceType.PAWN: thisValue += 1; break;
				case PieceType.QUEEN: thisValue += 9; break;
				case PieceType.KNIGHT: thisValue += 3; break;
				case PieceType.BISHOP: thisValue += 3; break;
				case PieceType.KING: thisValue += 100000; break;
			}
			if(eachPiece.getColor() == color){
				value += thisValue;
			}
			else{
				value -= thisValue;
			}
		}
		return value;
	}
}