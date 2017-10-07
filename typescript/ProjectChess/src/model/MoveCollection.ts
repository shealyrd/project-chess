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
        moveArray.forEach((e, i, me) => {
            this.moves.forEach((f, j, me2) => {
                if(!(f.getDest().equals(e.getDest()))) {
                        result.push(e);
                }
            });
        });
        this.moves = result;
        return this;
    }
}