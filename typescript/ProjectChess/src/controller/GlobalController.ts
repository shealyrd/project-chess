class GlobalController{
	static state: State;
	static changeStateCallbacks: Map<State, CallbackPool> = new Map<State, CallbackPool>();
	static boardView: Board;
	static boardModel: BoardModel;

	static SELECTION_TOGGLE: boolean = false;
	static SELECTED_PIECE: PieceModel = null;
	static SELECTED_OPP_PIECE: PieceModel = null;
	static WHITE_CLICK_ON: boolean = true;

	static STANDARD_BOARD: string = "[4_B],[2_B],[3_B],[5_B],[6_B],[3_B],[2_B],[4_B]/[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W]/[4_W],[2_W],[3_W],[5_W],[6_W],[3_W],[2_W],[4_W]";

	static opponent: MiniMaxPlayer = new MiniMaxPlayer(Color.BLACK);

	static start(){
	    GlobalController.boardView = new Board(8, 8);
		GlobalController.boardModel = new BoardModel(8,8);
		GlobalController.setStandard();
		GlobalController.initializeStateCallbacks();
		ConsoleController.run();
	}

	static initializeStateCallbacks(){
		GlobalController.addStateChangeCallback(State.WHITES_TURN,
			() => {
				if(GlobalController.hasLost(Color.WHITE)){
					ConsoleController.log("White has lost.");
					GlobalController.update();
				}
				else{
					if(GlobalController.isInCheck(Color.WHITE)){
						ConsoleController.log("White is in check");
					}
					GlobalController.WHITE_CLICK_ON = true;
					GlobalController.update();
				}
			});
		GlobalController.addStateChangeCallback(State.BLACKS_TURN,
			() => {
				if(GlobalController.hasLost(Color.BLACK)){
					ConsoleController.log("Black has lost.");
					GlobalController.update();
				}
                else {
					if(GlobalController.isInCheck(Color.BLACK)){
						ConsoleController.log("Black is in check");
					}
					GlobalController.WHITE_CLICK_ON = false;
					GlobalController.syncToBoard();
					GlobalController.update();
					//GlobalController.makeRandomMoveForBlack();
                    setTimeout(() => {
                        GlobalController.makeMoveForBlack();
                        GlobalController.syncToBoard();
					    GlobalController.changeState(State.WHITES_TURN);
                    }, 10);
				}
			});
		GlobalController.addStateChangeCallback(State.FINISH,
			() => {
				//print result
			});
	}

	static setStandard(){
		GlobalController.boardModel.populateFromSerial(GlobalController.STANDARD_BOARD);
		GlobalController.syncToBoard();
		GlobalController.update();
	}

	static syncToBoard() {
		GlobalController.boardView = Board.fromSerial(GlobalController.boardModel.serialize());
	}

    static update() {
        document.body.innerHTML = GlobalController.boardView.toHTML();
		ConsoleController.update();
        if (GlobalController.WHITE_CLICK_ON) {
            GlobalController.setWhiteClickListeners();
        }
    }

	static hasLost(color: Color): boolean{
		var pieces: PieceModel[] = GlobalController.boardModel.getAllPiecesOfColor(color);
		for(var pieceIdx in pieces){
			var eachPiece = pieces[pieceIdx];
			if(eachPiece.getType() == PieceType.KING){
				return false;
			}
		}
		return true;
	}

	static isInCheck(color: Color): boolean{
		var pieces: PieceModel[] = GlobalController.boardModel.getAllPiecesOfColor(color);
		for(var pieceIdx in pieces){
			var eachPiece = pieces[pieceIdx];
			if(eachPiece.getType() == PieceType.KING){
				if(GlobalController.boardModel.getAllMovesForColor(GlobalController.swapColor(color)).containsDestination(eachPiece.getPos())){
					return true;
				}
			}
		}
		return false;
	}

	static setWhiteClickListeners(){
		var pieces: Piece[] = GlobalController.boardView.getPieces();
		var squares: Square[] = GlobalController.boardView.getSquares();
		for (var piece in pieces) {
			var each = pieces[piece];
            if (each.getColor() == Color.WHITE) {
                var coSqr: Square = GlobalController.boardView.getSquareAtPos(each.getX(), each.getY());
				document.getElementById(coSqr.getId() + "").setAttribute("onclick", "whiteClickListener(\""+ + each.getId() + "\")");
			}
			else{
				var coSqr: Square = GlobalController.boardView.getSquareAtPos(each.getX(), each.getY());
				document.getElementById(coSqr.getId() + "").setAttribute("onclick", "blackClickListener(\""+ + each.getId() + "\")");
			}
		}
		for (var square in squares) {
			var eachSqr:Square = squares[square];
            if (document.getElementById(eachSqr.getId() + "").onclick == null || document.getElementById(eachSqr.getId() + "").onclick == undefined) {
                document.getElementById(eachSqr.getId() + "").setAttribute("onclick", "squareClickListener(\"" + eachSqr.getId() + "\")");   
            }
		}
	}

	static changeState(newState: State){
		this.state = newState;
		GlobalController.fireCallbacksForState(this.state);
	}

	static swapColor(color: Color): Color{
		if(color == Color.BLACK){
			return Color.WHITE;
		}
		else{
			return Color.BLACK;
		}
	}

	static makeRandomMoveForBlack(){
		var allBlkMoves: MoveCollection = GlobalController.boardModel.getAllMovesForColor(Color.BLACK);
		allBlkMoves.shuffle();
		var randomMove = allBlkMoves.getMoves()[0];
		//ConsoleController.log(randomMove.getOrigin().toString() + " to " + randomMove.getDest().toString());
		GlobalController.boardModel.executeMove(randomMove);
	}

	static makeMoveForBlack(){
		var nextMove = GlobalController.opponent.getNextMove(GlobalController.boardModel);
		GlobalController.boardModel.executeMove(nextMove);
	}

	static addStateChangeCallback(newState: State, callback: {(): void;}){
		var callbacks = GlobalController.changeStateCallbacks.get(newState);
		if(callbacks == null || callbacks == undefined){
			var newCallbackPool = new CallbackPool(callback);
			GlobalController.changeStateCallbacks.set(newState, newCallbackPool);
		}
		else{
			callbacks.addCallback(callback);
		}
	}
	
	static fireCallbacksForState(state: State){
		var callbacks = GlobalController.changeStateCallbacks.get(state);
		if(callbacks != null && callbacks != undefined){
			callbacks.fire();
		}
	}
}

var whiteClickListener = (id: string) => {
	var changeFlag = false;
	var meView = GlobalController.boardView.getPieceById(id);
	var meModel: PieceModel = GlobalController.boardModel.getPieceFromPosition(new Pos(meView.getX(), meView.getY()));
	var meSqr = GlobalController.boardView.getSquareAtPos(meView.getX(), meView.getY());
	if(!GlobalController.SELECTION_TOGGLE){
		GlobalController.SELECTED_PIECE = meModel;
		GlobalController.SELECTION_TOGGLE = true;
		meSqr.setHexColor(StaticColors.SQUARE_SELECTION_BLUE);
		var moves: MoveCollection = meModel.getPossibleMoves();
		for(var eachMoveIdx in moves.getMoves()){
			var eachMove: Move = moves.getMoves()[eachMoveIdx];
			var possibleSqr: Square = GlobalController.boardView.getSquareAtPos(eachMove.getDest().getX(), eachMove.getDest().getY());
			possibleSqr.setHexColor(StaticColors.SQUARE_SELECTION_BLUE);
		}
		GlobalController.SELECTED_PIECE = meModel;
	}
	else if (GlobalController.SELECTION_TOGGLE) {
		var move: Move = new Move(GlobalController.SELECTED_PIECE.getPos(), new Pos(meView.getX(), meView.getY()));
		if(GlobalController.SELECTED_PIECE.getPossibleMoves().contains(move)){
			GlobalController.boardModel.executeMove(move);
			changeFlag = true;
			GlobalController.syncToBoard();
			GlobalController.SELECTION_TOGGLE = false;
			GlobalController.SELECTED_PIECE= null;
			GlobalController.boardView.unselectAllSquares();
		}
		else if(GlobalController.SELECTED_PIECE.getPos().equals(meModel.getPos())){
			GlobalController.boardView = Board.fromSerial(GlobalController.boardModel.serialize());
			GlobalController.SELECTION_TOGGLE = false;
			GlobalController.SELECTED_PIECE= null;
			GlobalController.boardView.unselectAllSquares();
		}
	}
	if(changeFlag){
		GlobalController.update();
		GlobalController.changeState(State.BLACKS_TURN);
	}
	else{
		GlobalController.update();
	}
}

var squareClickListener = (id: string) => {
	var changeFlag = false;
	var meView: Square = GlobalController.boardView.getSquareById(id);
	if (GlobalController.SELECTION_TOGGLE) {
		var move: Move = new Move(GlobalController.SELECTED_PIECE.getPos(), new Pos(meView.getX(), meView.getY()));
		if(GlobalController.SELECTED_PIECE.getPossibleMoves().contains(move)){
			GlobalController.boardModel.executeMove(move);
			changeFlag = true;
			GlobalController.syncToBoard();
			GlobalController.SELECTION_TOGGLE= false;
			GlobalController.SELECTED_PIECE= null;
			GlobalController.boardView.unselectAllSquares();
		}
	}
	if(changeFlag){
		GlobalController.update();
		GlobalController.changeState(State.BLACKS_TURN);
	}
	else{
		GlobalController.update();
	}
}

var blackClickListener = (id: string) => {
	var changeFlag = false;
	var meView = GlobalController.boardView.getPieceById(id);
	var meModel: PieceModel = GlobalController.boardModel.getPieceFromPosition(new Pos(meView.getX(), meView.getY()));
	var meSqr = GlobalController.boardView.getSquareAtPos(meView.getX(), meView.getY());
	if (GlobalController.SELECTION_TOGGLE && GlobalController.SELECTED_PIECE != null) {
		var move: Move = new Move(GlobalController.SELECTED_PIECE.getPos(), new Pos(meView.getX(), meView.getY()));
		if(GlobalController.SELECTED_PIECE.getPossibleMoves().contains(move)){
			GlobalController.boardModel.executeMove(move);
			changeFlag = true;
			GlobalController.syncToBoard();
			GlobalController.SELECTION_TOGGLE= false;
			GlobalController.SELECTED_PIECE= null;
			GlobalController.boardView.unselectAllSquares();
		}
	}
	else{
		if (GlobalController.SELECTION_TOGGLE && GlobalController.SELECTED_PIECE == null) {
			if(GlobalController.SELECTED_OPP_PIECE.getPos().equals(meModel.getPos())){
				GlobalController.SELECTION_TOGGLE = false;
				GlobalController.SELECTED_OPP_PIECE = null;
				GlobalController.boardView.unselectAllSquares();
			}
		}
		else{
			GlobalController.SELECTION_TOGGLE = true;
			meSqr.setHexColor(StaticColors.SQUARE_SELECTION_RED);
			var moves: MoveCollection = meModel.getPossibleMoves();
			for(var eachMoveIdx in moves.getMoves()){
				var eachMove: Move = moves.getMoves()[eachMoveIdx];
				var possibleSqr: Square = GlobalController.boardView.getSquareAtPos(eachMove.getDest().getX(), eachMove.getDest().getY());
				possibleSqr.setHexColor(StaticColors.SQUARE_SELECTION_RED);
			}
			GlobalController.SELECTED_OPP_PIECE = meModel;
		}
	}
	if(changeFlag){
		GlobalController.update();
		GlobalController.changeState(State.BLACKS_TURN);
	}
	else{
		GlobalController.update();
	}
}
