class Move{
    private dest: Pos;
    private origin: Pos;
    private type: MoveType;
	private nextMove: Move;

    constructor(origin: Pos, dest: Pos, type: MoveType){
        this.dest = dest;
        this.origin = origin;
        this.type = type;
    }

    getDest(): Pos{
        return this.dest;
    }

    getType(): MoveType{
        return this.type;
    }
	
    getOrigin(): Pos{
        return this.origin;
    }
	
	getNextMove(): Move{
        return this.nextMove;
    }
	
	setNextMove(move: Move){
        this.nextMove = move;
    }
	
	hasNextMove(): boolean{
        return (this.nextMove != null);
    }
	
	cloneWithoutNextMove(){
		return new Move(this.getOrigin(), this.getDest(), this.getType());
	}
	
	getSubMoveAtDepth(depth: number): Move{
		var result: Move = this;
		for(var i = 2; i <= depth; i++){
			result = result.getNextMove();
		}
		return result;
	}
	
	appendMoveToEnd(move: Move){
		this.getFinalSubMove().setNextMove(move);
	}
	
	beginsWithChain(move: Move): boolean{
		var result = true;
		if(this.getMoveDepth() < move.getMoveDepth()){
			result = false;
		}
		else{
			for(var i = 1; i <= move.getMoveDepth(); i++){
				result = result && move.getSubMoveAtDepth(i).cloneWithoutNextMove().equals(this.getSubMoveAtDepth(i).cloneWithoutNextMove());
			}
		}
		return result;
	}
	
	getFinalSubMove(): Move{
		var moveHandle: Move = this;
		while(moveHandle.hasNextMove()){
			moveHandle = moveHandle.getNextMove();
		}
		return moveHandle;
	}
	
	getMoveDepth(): number{
		var moveHandle: Move = this;
		var result: number = 1;
		
		while(moveHandle.hasNextMove()){
			result++;
			moveHandle = moveHandle.getNextMove();
		}
		
		return result;
	}
	
	clone(){
		var result: Move = new Move(this.getOrigin(), this.getDest(), this.getType());
		if(this.hasNextMove()){
			result.setNextMove(this.getNextMove().clone());
		}
		return result;
	}
	
    equals(move: Move): boolean{
        var result: boolean = this.getDest().equals(move.getDest()) && this.getOrigin().equals(move.getOrigin()) && (this.type ==  move.getType());
		if(result){
			if(this.nextMove != null && move.nextMove != null){
				result = result && this.getNextMove().equals(move.getNextMove());
			}
			else if(this.getNextMove() == null && move.getNextMove() == null){
			}
			else{
				result = false;
			}
		}
		return result;
    }

    equalsIgnoreType(move: Move): boolean{
        var result: boolean = this.getDest().equals(move.getDest()) && this.getOrigin().equals(move.getOrigin());
		if(result){
			if(this.nextMove != null && move.nextMove != null){
				result = result && this.getNextMove().equals(move.getNextMove());
			}
			else if(this.getNextMove() == null && move.getNextMove() == null){
			}
			else{
				result = false;
			}
		}
		return result;
    }

}