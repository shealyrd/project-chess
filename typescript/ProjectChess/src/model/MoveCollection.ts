class MoveCollection{

    private moves: Move[] = new Array();

    public add(move: Move){
        this.moves.push(move);
    }

    public getMoves(): Move[]{
        return this.moves;
    }
}