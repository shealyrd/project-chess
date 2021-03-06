class MiniMaxPlayer extends Player{

	getNextMove(board: BoardModel):Move{
		var moves: MoveCollection = board.getAllMovesForColor(this.getColor());
		moves.shuffle();
		var bestValuation: number = Number.MAX_SAFE_INTEGER * -1;
		var bestMove: Move = this.rootMiniMax(board, 2, this.getColor());
		return bestMove;
	}
	
	rootMiniMax(board: BoardModel, depth: number, color: Color): Move{
		var bestMove: Move;
		var bestValuation: number = Number.MAX_SAFE_INTEGER * -1;
		var alpha = Number.MAX_SAFE_INTEGER * -1;
		var beta = Number.MAX_SAFE_INTEGER;
			var maxMoves: MoveCollection = board.getAllMovesForColor(color);
			maxMoves.shuffle();
			for(var maxMoveIdx in maxMoves.getMoves()) {
				var eachMaxMove:Move = maxMoves.getMoves()[maxMoveIdx];
				var currentValuation = this.minimax(eachMaxMove, board, depth - 1, this.swapColor(color), alpha, beta, false);
				if(currentValuation >= bestValuation){
					bestValuation = currentValuation;
					bestMove = eachMaxMove;
				}
			}

		return bestMove;
	}
	
	minimax(move: Move, board: BoardModel, depth: number, color: Color, alpha: number, beta: number, maximize: boolean): number{
		var newBoard: BoardModel = this.applyMove(move, board);
		if(depth == 0){
			return this.evaluate(newBoard, color);
		}
		var bestValuation: number;
		if(maximize){
			bestValuation = Number.MAX_SAFE_INTEGER * -1;
			var maxMoves: MoveCollection = newBoard.getAllMovesForColor(color);
			maxMoves.shuffle();
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
			minMoves.shuffle();
			for(var minMoveIdx in minMoves.getMoves()) {
				var eachMinMove:Move = minMoves.getMoves()[minMoveIdx];
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
		var newBoard = new BoardModel(board.getWidth(), board.getHeight());
		newBoard.populateFromSerial(board.serialize());
		newBoard.executeMove(move);
		return newBoard;
	}


	evaluate(board: BoardModel, color: Color): number{
		var result = 0;
		/*result += board.getAllPiecesOfColor(color).length;
		result -= board.getAllPiecesOfColor(this.swapColor(color)).length;*/
		result += this.getMaterial(board, color);
		result += (this.getMobility(board, color) * 0.01);
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
				case PieceType.GIRAFFE_RIDER: thisValue += 4; break;
				case PieceType.GENERAL: thisValue += 1; break;
				case PieceType.MINISTER: thisValue += 1; break;
				case PieceType.CAMEL_RIDER: thisValue += 3; break;
				case PieceType.ELEPHANT_RIDER: thisValue += 3; break;
				case PieceType.WAR_MACHINE: thisValue += 2; break;
				case PieceType.PICKET: thisValue += 2; break;
				case PieceType.CANNON: thisValue += 2; break;
				case PieceType.KING: thisValue += 1000; break;
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

	getMobility(board: BoardModel, color: Color){
		var myMoves = board.getAllMovesForColor(color);
		var oppMoves = board.getAllMovesForColor(this.swapColor(color));
		return myMoves.getMoves().length - oppMoves.getMoves().length;
	}

	isAutoExecute(){
		return true;
	}

}