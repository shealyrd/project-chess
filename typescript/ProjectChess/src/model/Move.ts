class Move{
    private dest: Pos;
    private origin: Pos;
    private type: MoveType;

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

    equals(move: Move): boolean{
        return this.getDest().equals(move.getDest()) && this.getOrigin().equals(move.getOrigin()) && (this.type ==  move.getType());
    }

    equalsIgnoreType(move: Move): boolean{
        return this.getDest().equals(move.getDest()) && this.getOrigin().equals(move.getOrigin());
    }

}