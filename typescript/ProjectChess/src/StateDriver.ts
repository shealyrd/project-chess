class StateDriver{
	state: State;
	changeStateCallbacks: Map<State, CallbackPool>;
	
	initialize(){
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
	
	changeState(newState: State){
		this.state = newState;
		fireCallbacksForState(this.state);
	}
	
	addStateChangeCallback(newState: State, callback: {(): void;}){
		var callbacks = changeStateCallbacks.get(newState);
		if(callbacks == null || callbacks == undefined){
			var newCallbackPool = new CallbackPool(callback);
			changeStateCallbacks.set(newState, newCallbackPool);
		}
		else{
			callbacks.addCallback(callback);
		}
	}
	
	fireCallbacksForState(state: State){
		var callbacks = changeStateCallbacks.get(state);
		if(callbacks != null || callbacks != undefined){
			callbacks.fire();
		}
	}
}