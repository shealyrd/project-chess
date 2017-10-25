class Minister extends Piece{

    constructor(left: number, top: number, width: number, height: number, z:number, color: Color){
        super(left, top, width, height, z, color, PieceType.MINISTER);
    }

    static getSizeRatio(): number{
        return 1.5;
    }


}