class GlobalController{
	static state: State;
	static changeStateCallbacks: Map<State, CallbackPool>;
	static boardView: Board;
	static boardModel: BoardModel;
	
	static start(){
	    GlobalController.boardView = new Board(8, 8);
		GlobalController.boardModel = new BoardModel(8,8);
		GlobalController.setStandard();
		GlobalController.initializeStateCallbacks();
	}
	
	static initializeStateCallbacks(){
		addStateChangeCallback(State.WHITES_TURN,
			() => {
				//turn on white piece click listeners
			});
		addStateChangeCallback(State.BLACKS_TURN,
			() => {
				//turn off white piece click listeners
			});
		addStateChangeCallback(State.FINISH,
			() => {
				//print result
			});
	}
	
	static update(){
	    GlobalController.board = Board.fromSerial(GlobalController.boardModel.serialize());
		document.body.innerHTML = GlobalController.board.toHTML();
    }
	
	static turnOnWhiteClickListeners(){
	
		
	}
	
	static turnOffWhiteClickListeners(){
	
	}
	
	static changeState(newState: State){
		this.state = newState;
		fireCallbacksForState(this.state);
	}
	
	static addStateChangeCallback(newState: State, callback: {(): void;}){
		var callbacks = changeStateCallbacks.get(newState);
		if(callbacks == null || callbacks == undefined){
			var newCallbackPool = new CallbackPool(callback);
			changeStateCallbacks.set(newState, newCallbackPool);
		}
		else{
			callbacks.addCallback(callback);
		}
	}
	
	static fireCallbacksForState(state: State){
		var callbacks = changeStateCallbacks.get(state);
		if(callbacks != null || callbacks != undefined){
			callbacks.fire();
		}
	}

}