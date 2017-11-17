class PieceImageDatabase{

    static whiteImages: Map<PieceType, string> = PieceImageDatabase.whiteMap();
    static blackImages: Map<PieceType, string> = PieceImageDatabase.blackMap();

    public static getImageURL(type: PieceType, color: Color): string{
        if(color == Color.WHITE){
            return PieceImageDatabase.getWhiteImage(type);
        }
        else if(color == Color.BLACK){
            return PieceImageDatabase.getBlackImage(type);
        }
    }

   static getWhiteImage(type: PieceType): string{
        var result: string = "";
        this.whiteImages.forEach((value, key, map) => {
            if(key == type){
                result = value;
            }
        });
        return result;
    }

   static getBlackImage(type: PieceType): string{
        var result: string = "";
        this.blackImages.forEach((value, key, map) => {
            if(key == type){
                result = value;
            }
        });
        return result;
    }

    static whiteMap(): Map<PieceType, string>{
        var whiteImages: Map<PieceType, string> = new Map();
        whiteImages.set(PieceType.PAWN, 'imgs//pieces//pawn_w.png');
        whiteImages.set(PieceType.KNIGHT, 'imgs//pieces//Knight_W.png');
        whiteImages.set(PieceType.BISHOP, 'imgs//pieces//Bishop_W.png');
        whiteImages.set(PieceType.ROOK, 'imgs//pieces//Rook_W.png');
        whiteImages.set(PieceType.QUEEN, 'imgs//pieces//Queen_W.png');
        whiteImages.set(PieceType.KING, 'imgs//pieces//King_W.png');
        whiteImages.set(PieceType.MINISTER, 'imgs//pieces//Minister_W.png');
        whiteImages.set(PieceType.GENERAL, 'imgs//pieces//General_W.png');
        whiteImages.set(PieceType.GIRAFFE_RIDER, 'imgs//pieces//Giraffe_W.png');
        whiteImages.set(PieceType.CAMEL_RIDER, 'imgs//pieces//Camel_W.png');
        whiteImages.set(PieceType.ELEPHANT_RIDER, 'imgs//pieces//Elephant_W.png');
        whiteImages.set(PieceType.PICKET, 'imgs//pieces//Picket_W.png');
        whiteImages.set(PieceType.WAR_MACHINE, 'imgs//pieces//WarMachine_W.png');
        whiteImages.set(PieceType.CANNON, 'imgs//pieces//WarMachine_W.png');
        return whiteImages;
    }

    static blackMap(): Map<PieceType, string>{
        var blackImages: Map<PieceType, string> = new Map();
        blackImages.set(PieceType.PAWN, 'imgs//pieces//pawn_b.png');
        blackImages.set(PieceType.KNIGHT, 'imgs//pieces//Knight_B.png');
        blackImages.set(PieceType.BISHOP, 'imgs//pieces//Bishop_B.png');
        blackImages.set(PieceType.ROOK, 'imgs//pieces//Rook_B.png');
        blackImages.set(PieceType.QUEEN, 'imgs//pieces//Queen_B.png');
        blackImages.set(PieceType.KING, 'imgs//pieces//King_B.png');
        blackImages.set(PieceType.MINISTER, 'imgs//pieces//Minister_B.png');
        blackImages.set(PieceType.GENERAL, 'imgs//pieces//General_B.png');
        blackImages.set(PieceType.GIRAFFE_RIDER, 'imgs//pieces//Giraffe_B.png');
        blackImages.set(PieceType.CAMEL_RIDER, 'imgs//pieces//Camel_B.png');
        blackImages.set(PieceType.ELEPHANT_RIDER, 'imgs//pieces//Elephant_B.png');
        blackImages.set(PieceType.PICKET, 'imgs//pieces//Picket_B.png');
        blackImages.set(PieceType.WAR_MACHINE, 'imgs//pieces//WarMachine_B.png');
        blackImages.set(PieceType.CANNON, 'imgs//pieces//WarMachine_B.png');
        return blackImages;
    }
}