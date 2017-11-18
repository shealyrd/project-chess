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

    public shuffle(){
        Algorithms.shuffle(this.moves);
    }
}