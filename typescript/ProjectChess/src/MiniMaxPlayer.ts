class MiniMaxPlayer extends Player{

	getNextMove(board: BoardModel):Move{
		var moves: Move[] = board.getAllMovesForColor(Color.BLACK);
		var bestValuation: number;
		var bestMove: Move;
		for(var moveIdx in moves){
			var eachMove: Move = moves[moveIdk];
			var newBoard = new BoardModel(board.getHeight(), board.getWidth());
			newBoard.fromSerial(board.serialize());
			var currentValuation = evaluate(newBoard);
			if(currentValuation > bestValuation){
				bestValuation = currentValuation;
				bestMove = eachMove;
			}
		}
		return bestMove;
	}
}