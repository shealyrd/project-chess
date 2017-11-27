class MoveCollection{

    private moves: Move[] = new Array();

    constructor(moves?: Move[]){
        if(moves != null && moves != undefined){
            this.moves = moves;
        }
    }

    public add(move: Move){
        this.moves.push(move);
    }

    public getMoves(): Move[]{
        return this.moves;
    }

    public contains(move: Move): boolean{
        var result = false;
        this.moves.forEach((e, i, me) => {
            if(move.equals(e)){
                result = true;
            }
        });
        return result;
    }

    public containsIgnoreType(move: Move): boolean{
        var result = false;
        this.moves.forEach((e, i, me) => {
            if(move.equalsIgnoreType(e)){
                result = true;
            }
        });
        return result;
    }

	public getAllChains(move: Move){
		var result: MoveCollection = new MoveCollection();
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            if(eachMove.beginsWithChain(move)){
                result.add(eachMove);
            }
        }
		
        return result;
	}
	
	
	public filterDestinationType(board: BoardModel, type: SquareType): MoveCollection{
		var result: MoveCollection = new MoveCollection();
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            var destType = board.getSquareTypeAtPos(eachMove.getDest());
			if(!(destType == type)){
				result.add(eachMove);
			}
        }
		
        return result;
	}
	
	
	public onlyWithDestinationType(board: BoardModel, type: SquareType): MoveCollection{
		var result: MoveCollection = new MoveCollection();
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            var destType = board.getSquareTypeAtPos(eachMove.getDest());
			if(destType == type){
				result.add(eachMove);
			}
        }
		
        return result;
	}
	
	public flattenToLastSubmoves(){
		var result: MoveCollection = new MoveCollection();
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
			result.add(eachMove.getFinalSubMove().cloneWithoutNextMove());
        }
        return result;
	}
	
		
	public flattenToDepth(depth: number){
		var result: MoveCollection = new MoveCollection();
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
			if(eachMove.getMoveDepth() >= depth){
				result.add(eachMove.getSubMoveAtDepth(depth));			
			}
        }
        return result;
	}
	
	
	public flattenToFirstSubmoves(){
		var result: MoveCollection = new MoveCollection();
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
			result.add(eachMove.cloneWithoutNextMove());
        }
		
        return result;
	}
	
	public getMaximumDepth(): number{
		var result: number = 1;
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
			if(eachMove.getMoveDepth() > result){
				result = eachMove.getMoveDepth();
			}
        }
		
        return result;
	}

	public getAllWithDepth(depth: number){
		var result: MoveCollection = new MoveCollection();
		
	    for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
			if(eachMove.getMoveDepth() == depth){
				result.add(eachMove);
			}   
        }
        return result;
	}
	
    public addAll(movesArg: MoveCollection): MoveCollection{
        var moveArray: Move[] = movesArg.getMoves();
        moveArray.forEach((e, i, me) => {
            this.moves.push(e);
        });

        return this;
    }

    public minus(movesArg: MoveCollection): MoveCollection{
        var result: Move[] = new Array();
		
        var moveArray: Move[] = movesArg.getMoves();
		var length = this.moves.length;
		for(var i = 0; i < moveArray.length; i++){
			var eachArgMove = moveArray[i];
			for(var j = 0; j < this.moves.length; j++){
				var eachThisMove = this.moves[j];
				if(eachArgMove.equals(eachThisMove)){
					this.moves.splice(j, 1);
				}
			}
		}
		
		return this;
	}

    public minusIgnoreType(movesArg: MoveCollection): MoveCollection{
        var result: Move[] = new Array();

        var moveArray: Move[] = movesArg.getMoves();
        var length = this.moves.length;
        for(var i = 0; i < moveArray.length; i++){
            var eachArgMove = moveArray[i];
            for(var j = 0; j < this.moves.length; j++){
                var eachThisMove = this.moves[j];
                if(eachArgMove.equalsIgnoreType(eachThisMove)){
                    this.moves.splice(j, 1);
                }
            }
        }

        return this;
    }

    public containsDestination(pos: Pos){
        for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            if(eachMove.getDest().equals(pos)){
                return true;
            }
        }
        return false;
    }

    public containsType(type: MoveType){
        for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            if(eachMove.getType() == type){
                return true;
            }
        }
        return false;
    }

    public getTypeSubset(type: MoveType): MoveCollection{
        var result = new MoveCollection();

        for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            if(eachMove.getType() == type){
                result.add(eachMove);
            }
        }

        return result;
    }
	
	public getDestinationSubset(pos: Pos): MoveCollection{
        var result = new MoveCollection();

        for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            if(eachMove.getDest().equals(pos)){
                result.add(eachMove);
            }
        }

        return result;
    }
	
	public getNumberOfTypes(): number{
		var typeSet = new Set();
		
        for(var moveIdx in this.getMoves()){
            var eachMove = this.moves[moveIdx];
            typeSet.add(eachMove.getType());
        }
	
		return typeSet.size;
	}
	
	public size(): number{
		return this.moves.length;
	}
	
    public shuffle(){
        Algorithms.shuffle(this.moves);
    }
}