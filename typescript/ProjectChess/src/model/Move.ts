class Move{
    private dest: Pos;
    private origin: Pos;

    constructor(origin: Pos, dest: Pos){
        this.dest = dest;
        this.origin = origin;
    }

    getDest(): Pos{
        return this.dest;
    }

    getOrigin(): Pos{
        return this.origin;
    }

    equals(move: Move): boolean{
        return this.getDest().equals(move.getDest()) && this.getOrigin().equals(move.getOrigin());
    }

}