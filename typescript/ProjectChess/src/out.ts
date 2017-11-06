enum State{

    WHITES_TURN,
    BLACKS_TURN,
    FINISH

}class StaticColors{
    static BASIC_BOARD_WHITE = "#f0d9b5";
    static BASIC_BOARD_BLACK = "#b58863";
    static SQUARE_SELECTION_BLUE = "#7294da";
    static SQUARE_SELECTION_RED = "#e60000";
}class Algorithms{
    static shuffle (array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}
}class CallbackPool{
    private callbacks: {(): void;}[] = [];
    
    constructor(...callbacks: {(): void;}[]){
        this.callbacks = callbacks;
    }
   
    public addCallback(callback: {(): void;}): CallbackPool{
        this.callbacks.push(callback);
        return this;
    }
    
    public fire(): void{
        for(var i = 0; i < this.callbacks.length; i++){
            this.callbacks[i]();
        }
    }
    
    public reset(): void{
        this.callbacks = [];
    }
}class IDSequence{
    static count: number = 0;

    static nextVal(): number{
        IDSequence.count = IDSequence.count + 1;
        return IDSequence.count;
    }
}abstract class HTMLObject {
    topPos: number;
    leftPos: number;
    height: number;
    width: number;
    id: string = IDSequence.nextVal() + "";

    setTopPos(input: number): void{
        this.topPos = input;
    }

    setLeftPos(input: number): void{
        this.leftPos = input;
    }

    setHeight(input: number): void{
        this.height = input;
    }

    setWidth(input: number): void{
        this.width = input;
    }

    getTopPos(): number{
        return this.topPos;
    }

    getLeftPos(): number{
        return this.leftPos;
    }

    getId(): string{
        return this.id;
    }

    setId(id: string){
       this.id = id;
    }

    getHeight(): number{
        return this.height;
    }

    getWidth(): number{
        return this.width;
    }

    abstract toHTML(): string;
}class HTMLBuilder{

    styles = {};
    classes: string[] = new Array();
	innerDivs: string[] = new Array();
    base: string = "<div {info-template}>{inner}</div>";
    id: string;



    newDiv(): HTMLBuilder{
        return this;
    }

    setId(id: string): HTMLBuilder{
        this.id = id;
        return this;
    }

    addStyle(type: string, value: string): HTMLBuilder{
        this.styles[type] = value;
        return this;
    }

    addClass(classname: string): HTMLBuilder{
        this.classes.push(classname);
        return this;
    }
	
	addInnerDiv(innerDiv: string): HTMLBuilder{
        this.innerDivs.push(innerDiv);
        return this;
    }

    toString(): string{
        var result: string;
        var style: string;
        var idDef: string = "";
        var classDef: string;
		var innerDivDef: string = "";

        if(this.id != undefined){
            idDef = "id=\"" + this.id + "\"";
        }


        style = "style=\"";
        for(var each in this.styles){
            style = style + each + ": " + this.styles[each] + "; ";
        }
        style = style + "\"";

        classDef = "class=\"";
        for (var eachClass in this.classes) {
            classDef = classDef + this.classes[eachClass] + " ";
        }
        classDef = classDef + "\"";
		
		if(this.innerDivs.length > 0){
			for(var eachDiv in this.innerDivs){
				innerDivDef += this.innerDivs[eachDiv];
			}
		}

        result = this.base.replace("{info-template}", (idDef + " " + classDef + " " + style));
		result = result.replace("{inner}", innerDivDef);

        return result;
    }
}enum Color{
	WHITE,
	BLACK
}enum SquareType{
    NORMAL = 0,
    NON_EXISTENT = 1
}enum PieceType{

    PAWN = 1,
    KNIGHT = 2,
    BISHOP = 3,
    ROOK = 4,
    QUEEN = 5,
    KING = 6,
	WAR_MACHINE = 7,
	MINISTER = 8,
	GENERAL = 9,
	GIRAFFE_RIDER = 10,
	PICKET = 11,
	ELEPHANT_RIDER = 12,
	CAMEL_RIDER = 13,
	HERO = 14
}
class PieceLocation{
    x : number;
    y: number;
    type: PieceType;
    color: Color;

    constructor(x:number, y: number, type: PieceType, color: Color){
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = color;
    }

    getX(): number{
        return this.x;
    }
    getY(): number{
        return this.y;
    }
    getType(): PieceType{
        return this.type;
    }
    getColor(): Color{
        return this.color;
    }
}
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
        return blackImages;
    }
}class Piece extends HTMLObject{
    z: number;
	color: Color;
	x: number;
    y: number;
    type: PieceType;

    constructor(left: number, top: number, width: number, height: number, z:number, color: Color, type: PieceType){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
        this.setZ(z);
		this.setColor(color);
        this.setType(type);
    }

    setType(type: PieceType){
        this.type = type;
    }

    getType(): PieceType{
        return this.type;
    }

    setZ(z: number) {
        this.z = z;
    }
	
    getZ(): number {
        return this.z;
    }

    setX(x:number){
      this.x = x;
    }
    getX(): number{
        return this.x;
    }

    setY(y:number){
        this.y = y;
    }

    getY(): number{
        return this.y;
    }

	getWhiteImg(): string{
        return PieceImageDatabase.getImageURL(this.getType(), Color.WHITE);
    }

    getBlackImg(): string{
        return PieceImageDatabase.getImageURL(this.getType(), Color.BLACK);
    }


	static getSizeRatio(): number{
        return 1.5;
    }
	
	setColor(color: Color){
		this.color = color;
	}
	
	getColor(): Color{
		return this.color;
	}
	
	toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
                .addClass("piece")
                .addStyle("position", "absolute")
                .addStyle("left", this.getLeftPos() + "px")
                .addStyle("top", this.getTopPos() + "px")
                .addStyle("width", this.getWidth() + "px")
                .addStyle("height", this.getHeight() + "px")
				.addStyle("z-index", this.getZ() + "")
				.addStyle("pointer-events", "none")
                .setId(this.getId());

				var contentImg: string;
				if(this.getColor() == Color.WHITE){
					contentImg = this.getWhiteImg();
				}
				else if(this.getColor() == Color.BLACK){
					contentImg = this.getBlackImg();
				}
				
				builder.addStyle("content", "url(" + contentImg + ")");
				
        return builder.toString();
    }

    getPos():Pos {
        return new Pos(this.getX(), this.getY());
    }
}
class Square extends HTMLObject{
	col: Color;
	x: number;
    y: number;
    hexColor: string;
	sqrType: SquareType = SquareType.NORMAL;

    constructor(left: number, top: number, width: number, height: number){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
    }

    setX(x: number){
        this.x = x;
    }

    setY(y: number){
        this.y = y;
    }

    setHexColor(hex: string){
        this.hexColor = hex;
    }

	setType(type: SquareType){
		this.sqrType = type;
	}
	
	getType(): SquareType{
		return this.sqrType;
	}
	
    resetHexColor(){
       var hexColor: string;

        switch(this.col){
            case Color.WHITE: hexColor = "#f0d9b5"; break;
            case Color.BLACK: hexColor = "#b58863"; break;
        }

        this.setHexColor(hexColor);
    }

    getY(): number{
        return this.y;
    }

    getX(): number{
        return this.x;
    }

	setColor(newCol: Color){
		this.col = newCol;
        this.resetHexColor();
	}
	
	getColor(): Color{
		return this.col;
	}

    getPos(): Pos{
        return new Pos(this.getX(), this.getY());
    }

    toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
                .addClass("square")
                .addStyle("position", "absolute")
                .addStyle("left", this.getLeftPos() + "px")
                .addStyle("top", this.getTopPos() + "px")
                .addStyle("width", this.getWidth() + "px")
                .addStyle("height", this.getHeight() + "px");

        builder.setId(this.getId());

		if(!(this.getType() == SquareType.NON_EXISTENT)){
		    builder.addStyle("border", "1px solid black");
			builder.addStyle("background-color", this.hexColor);
		}

        return builder.toString();
    }

} class Row extends HTMLObject{
    squares: Square[] = new Array();
	numSquares: number;
	y: number;
	
    constructor(left: number, top: number, width: number, height: number, sqrCount: number){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
		this.setNumSquares(sqrCount);

    }

	initialize(){
		for(var i: number = 0; i < this.getNumSquares(); i++){
			var newSquare: Square = new Square(this.getSquareLeftPos(i), 0, this.getSquareWidth(), this.getHeight());
			newSquare.setX(i);
			newSquare.setY(this.getY());
			newSquare.setId("square_" + i + "_" + this.getY());
			this.squares.push(newSquare);
		}
	}
	
	getSquares(): Square[]{
		return this.squares;
	}
	
	setY(y: number){
		this.y = y;
	}

	getY(): number{
		return this.y;
	}
	
	setNumSquares(sqrCount: number){
		this.numSquares = sqrCount;
	}
	
	getNumSquares(): number{
		return this.numSquares;
	}
	
	getSquareWidth(): number{
		return Math.ceil(this.getWidth() / this.numSquares);
	}
	
	getSquareLeftPos(index: number): number{
		return (index * this.getSquareWidth());
	}
	
	setAlternating(starting: Color){
		for(var each in this.squares){
			this.squares[each].setColor(starting);
			
			if(starting == Color.WHITE){
				starting = Color.BLACK;
			}
			else if(starting == Color.BLACK){
				starting = Color.WHITE;
			}
		}
	}

    toHTML():string {
		var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
                .addClass("row")
                .addStyle("position", "absolute")
                .addStyle("left", this.getLeftPos() + "px")
                .addStyle("top", this.getTopPos() + "px")
                .addStyle("width", this.getWidth() + "px")
                .addStyle("height", this.getHeight() + "px");
        for(var each in this.squares) {
            builder.addInnerDiv(this.squares[each].toHTML());
        }
        return builder.toString();
    }


}class Board extends HTMLObject{
    squares: Square[] = new Array();
    rows: Row[] = new Array();
    pieces: Piece[] = new Array();

    locations: PieceLocation[] = new Array();

    numRows: number;
    numColumns: number;
    offsetTop: number;
    offsetLeft: number;

    squareWidth: number;
    squareHeight: number;



    constructor(numCol: number, numRows: number, offsetTop?: number, offsetLeft?: number, squareWidth?: number, squareHeight?: number) {
        super();
        if (offsetTop == null) {
            offsetTop = 25;
        }
        if (offsetLeft == null) {
            offsetLeft = 25;
        }
        if (squareWidth == null) {
            squareWidth = 50;
        }
        if (squareHeight == null) {
            squareHeight = 50;
        }
        this.squareHeight = squareHeight;
        this.squareWidth = squareWidth;
        this.initialize(numCol, numRows, offsetTop, offsetLeft);
    }

    initialize(numCol: number, numRows: number, offsetTop: number, offsetLeft: number){
        this.numRows = numRows;
        this.numColumns = numCol;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;

        this.rows = new Array();
        var cornerColor: Color = Color.WHITE;

        for(var i: number = 0; i < this.numRows; i++){
            var row: Row = new Row(this.offsetLeft, this.offsetTop + (i * this.squareHeight), this.squareWidth * this.numColumns, this.squareHeight, this.numColumns);
            row.setY(i);
            row.initialize();
            row.setAlternating(cornerColor);
            this.rows.push(row);

            if(cornerColor == Color.WHITE){
                cornerColor = Color.BLACK;
            }
            else if(cornerColor == Color.BLACK){
                cornerColor = Color.WHITE;
            }
        }
    }

    getPieces(): Piece[]{
        return this.pieces;
    }
	
	getSquares(): Square[]{
		var result: Square[] = new Array();
		
		for(var row in this.rows){
			var each: Row = this.rows[row];
            var meSqrs = each.getSquares();
			for(var square in each.getSquares()){
                var eachSqr = meSqrs[square];
				result.push(eachSqr);
			}
		}
		
        return result;
    }


    addPiece(piece: PieceType, x: number, y: number, color: Color){
        var newPiece: Piece;
       /* switch(piece){
            case PieceType.ROOK: newPiece = new Rook(this.calcPosFromLeft(x), this.calcPosFromTop(Rook.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Rook.getSizeRatio()), y, color); break;
            case PieceType.QUEEN: newPiece = new Queen(this.calcPosFromLeft(x), this.calcPosFromTop(Queen.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Queen.getSizeRatio()), y, color); break;
            case PieceType.BISHOP: newPiece = new Bishop(this.calcPosFromLeft(x), this.calcPosFromTop(Bishop.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Bishop.getSizeRatio()), y, color); break;
            case PieceType.PAWN: newPiece = new Pawn(this.calcPosFromLeft(x), this.calcPosFromTop(Pawn.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Pawn.getSizeRatio()), y, color); break;
            case PieceType.KNIGHT: newPiece = new Knight(this.calcPosFromLeft(x), this.calcPosFromTop(Knight.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Knight.getSizeRatio()), y, color); break;
            case PieceType.KING: newPiece = new King(this.calcPosFromLeft(x), this.calcPosFromTop(King.getSizeRatio(), y), this.squareWidth, (this.squareHeight * King.getSizeRatio()), y, color); break;
            case PieceType.GENERAL: newPiece = new General(this.calcPosFromLeft(x), this.calcPosFromTop(Knight.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Knight.getSizeRatio()), y, color); break;
            case PieceType.MINISTER: newPiece = new Minister(this.calcPosFromLeft(x), this.calcPosFromTop(King.getSizeRatio(), y), this.squareWidth, (this.squareHeight * King.getSizeRatio()), y, color); break;
        }*/
        newPiece = new Piece(this.calcPosFromLeft(x), this.calcPosFromTop(Piece.getSizeRatio(), y), this.squareWidth, (this.squareHeight * Piece.getSizeRatio()), y, color, piece);
        newPiece.setX(x);
        newPiece.setY(y);
        this.pieces.push(newPiece);
        this.addLocation(x, y, piece, color);
    }

    toHTML():string {
        var result: string = "";

        for (var row in this.rows) {
            result += this.rows[row].toHTML();
        }

        for (var piece in this.pieces) {
            result += this.pieces[piece].toHTML();
        }

        return result;
    }

    public setStandard(){
        this.addPiece(PieceType.ROOK, 0, 0, Color.BLACK);
        this.addPiece(PieceType.KNIGHT, 1, 0, Color.BLACK);
        this.addPiece(PieceType.BISHOP, 2, 0, Color.BLACK);
        this.addPiece(PieceType.QUEEN, 3, 0, Color.BLACK);
        this.addPiece(PieceType.KING, 4, 0, Color.BLACK);
        this.addPiece(PieceType.BISHOP, 5, 0, Color.BLACK);
        this.addPiece(PieceType.KNIGHT, 6, 0, Color.BLACK);
        this.addPiece(PieceType.ROOK, 7, 0, Color.BLACK);

        this.addPiece(PieceType.PAWN, 0, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 1, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 2, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 3, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 4, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 5, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 6, 1, Color.BLACK);
        this.addPiece(PieceType.PAWN, 7, 1, Color.BLACK);


        this.addPiece(PieceType.ROOK, 0, 7, Color.WHITE);
        this.addPiece(PieceType.KNIGHT, 1, 7, Color.WHITE);
        this.addPiece(PieceType.BISHOP, 2, 7, Color.WHITE);
        this.addPiece(PieceType.QUEEN, 3, 7, Color.WHITE);
        this.addPiece(PieceType.KING, 4, 7, Color.WHITE);
        this.addPiece(PieceType.BISHOP, 5, 7, Color.WHITE);
        this.addPiece(PieceType.KNIGHT, 6, 7, Color.WHITE);
        this.addPiece(PieceType.ROOK, 7, 7, Color.WHITE);

        this.addPiece(PieceType.PAWN, 0, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 1, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 2, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 3, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 4, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 5, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 6, 6, Color.WHITE);
        this.addPiece(PieceType.PAWN, 7, 6, Color.WHITE);
    }

    private addLocation(x: number, y: number, type: PieceType, color: Color){
        var newLocation = new PieceLocation(x, y, type, color);
        this.locations.push(newLocation);
    }

    private calcPosFromLeft(x:number): number{
        return this.offsetLeft + (x * this.squareWidth);
    }

    private calcPosFromTop(ratio: number, y:number): number{
        return (this.offsetTop + (y * this.squareHeight)) + (this.squareHeight * ( 1 - ratio));
    }

    public getPieceById(id: string): Piece{
        for(var piece in this.pieces){
            var each = this.pieces[piece];
            if(each.getId() == id){
                return each;
            }
        }
    }

	public getSquareById(id: string): Square{
		var locSquares = this.getSquares();
        for(var square in locSquares){
            var each = locSquares[square];
            if(each.getId() == id){
                return each;
            }
        }
    }
	
    public static fromSerial(serial: string, offsetTop?: number, offsetLeft?: number, squareWidth?: number, squareHeight?: number): Board{
        var result: Board;
        var locations: PieceLocation[] = new Array();
        var length: number;
        var height: number;
		var dataHalves: string[] = serial.split("-");
        var rows: string[] = dataHalves[0].split("/");
		var configRows: string[] = dataHalves[1].split("/");
        height = rows.length;

        for(var y = 0; y < rows.length; y++){
            var row = rows[y];
            var squares: string[] = row.split(",");
            length = squares.length;

            for(var x = 0; x < squares.length; x++){
                var sqrData:string = squares[x].substring(1, squares[x].length - 1);

                if(sqrData.length != 0){
                    var sqrDataSplit = sqrData.split("_");
                    var thisColor: Color;

                    if(sqrDataSplit[1] == "W"){
                        thisColor = Color.WHITE;
                    }
                    else{
                        thisColor = Color.BLACK;
                    }
                    var newLoc: PieceLocation = new PieceLocation(x, y, +sqrDataSplit[0], thisColor);
                    locations.push(newLoc);
                }
            }
        }

        result = new Board(length, height, offsetTop, offsetLeft, squareWidth, squareHeight);

        for(var eachLoc in locations){
            var location: PieceLocation = locations[eachLoc];
            result.addPiece(location.getType(), location.getX(), location.getY(), location.getColor());
        }
		
        for(var y = 0; y < rows.length; y++){
            var row = configRows[y];
            var squares: string[] = row.split(",");
            length = squares.length;

            for(var x = 0; x < squares.length; x++){
                var eachSqr: Square = result.getSquareAtPos(new Pos(x,y));
				var sqrData: string = squares[x].substring(1, squares[x].length - 1);
				eachSqr.setType(+sqrData);
            }
        }
        return result;
    }

    public serialize(): string{
        var serialization: string = "";
        var pieceMap: string[][] = [];

        for(var r: number = 0; r < this.numRows; r++ ){
            pieceMap[r] = [];
        }

        for (var location in this.locations) {
            var currLoc = this.locations[location];
            var strRep = "[" + currLoc.getType() + "_";
            if(currLoc.getColor() == Color.WHITE){
                strRep += "W"
            }
            else if(currLoc.getColor() == Color.BLACK){
                strRep += "B"
            }
            strRep += "]";
            pieceMap[currLoc.getX()][currLoc.getY()] = strRep;
        }

        for(var y: number = 0; y < this.numRows; y++ ){
            for (var x: number = 0; x < this.numColumns; x++){
                if (pieceMap[x][y] == undefined) {
                    serialization += "[]";
                }
                else {
                    serialization += pieceMap[x][y];
                }
                serialization += ",";
            }
            serialization = serialization.substring(0, serialization.length - 1);
            serialization += "/";
        }
        serialization = serialization.substring(0, serialization.length - 1);
		
		serialization += "-";
		
		for(var y: number = 0; y < this.numRows; y++ ){
            for (var x: number = 0; x < this.numColumns; x++){
                serialization += "[" + this.getSquareAtPos(new Pos(x,y)).getType() + "],";
            }
            serialization = serialization.substring(0, serialization.length - 1);
            serialization += "/";
        }
		serialization = serialization.substring(0, serialization.length - 1);
		
        return serialization;
    }

    unselectAllSquares(){
        var locSquares = this.getSquares();
        for(var square in locSquares){
            var each = locSquares[square];
            each.resetHexColor();
        }
    }

    getSquareAtPos(pos: Pos): Square{
        var locSquares = this.getSquares();
        for(var square in locSquares){
            var each = locSquares[square];
            if(each.getPos().equals(pos)){
                return each;
            }
        }
    }

    getPixelHeight(): number{
        return this.numRows * this.squareHeight + this.offsetTop;
    }

    getPixelWidth(): number{
        return this.numColumns * this.squareWidth + this.offsetLeft;
    }
}class Throbber extends HTMLObject{
    contentImg: string = "http://v3.preloaders.net/preloaders/5/colored/5.png";
    z: number;

    constructor(width: number, height: number, z: number){
        super();
        this.setWidth(width);
        this.setHeight(height);
        this.z = z;
    }

    centerInSquare(sqrOffsetLeft: number, sqrOffsetTop: number, sqrWidth: number, sqrHeight: number){
        this.setLeftPos(sqrOffsetLeft + (sqrWidth/2 - this.getWidth()/2));
        this.setTopPos(sqrOffsetTop + (sqrHeight/2 - this.getHeight()/2));
    }

    setZ(z: number) {
        this.z = z;
    }

    getZ(): number {
        return this.z;
    }

    toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
            .addClass("throbber spin")
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("z-index", this.getZ() + "")
            .addStyle("height", this.getHeight() + "px");

        builder.addStyle("content", "url(" + this.contentImg + ")");

        return builder.toString();
    }


}class AlertText extends HTMLObject{
    z: number;
    contentStr: string;

    constructor(width: number, height: number, z: number){
        super();
        this.setWidth(width);
        this.setHeight(height);
        this.z = z;
    }

    centerInSquare(sqrOffsetLeft: number, sqrOffsetTop: number, sqrWidth: number, sqrHeight: number){
        this.setLeftPos(sqrOffsetLeft + (sqrWidth/2 - this.getWidth()/2));
        this.setTopPos(sqrOffsetTop + (sqrHeight/2 - this.getHeight()/2));
    }

    setContent(str: string){
        this.contentStr = str;
    }

    setZ(z: number) {
        this.z = z;
    }

    getZ(): number {
        return this.z;
    }

    toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("z-index", this.getZ() + "")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("font-size", this.getHeight() / 2 + "px")
            .addStyle("pointer-events", "none")
            .addStyle("line-height", this.getHeight() + "px");

        builder.addInnerDiv(this.contentStr);

        return builder.toString();
    }
}
class Pos{
    private X: number;
    private Y: number;

    constructor(x: number, y: number){
        this.X = x;
        this.Y = y;
    }

    getX(): number{
        return this.X;
    }
    getY(): number{
        return this.Y;
    }

    toString(): string{
        return this.getX() + ", " + this.getY();
    }

    equals(pos: Pos): boolean{
        return (this.getX() == pos.getX()) && (this.getY() == pos.getY());
    }

    plus(addPos: Pos): Pos{
        var newX = this.getX() + addPos.getX();
        var newY = this.getY() + addPos.getY();
        return new Pos(newX, newY);
    }
}
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

}class MoveCollection{

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
}class MoveFactory{

    static getAllUpwards(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() - 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            y -= 1;
        }

        return new MoveCollection(result);
    }

    static getAllDownwards(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX();
        var y = piece.getPos().getY() + 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            y += 1;
        }

        return new MoveCollection(result);
    }

    static getAllLeft(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY();

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            x -= 1;
        }

        return new MoveCollection(result);
    }

    static getAllRight(piece: PieceModel): MoveCollection{
        var board: BoardModel = piece.getBoardModel();
        var result: Move[] = new Array();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY();

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(piece.getBoardModel().isFree(new Pos(x, y)) == false){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.push(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.push(new Move(piece.getPos(), new Pos(x, y)));
            x += 1;
        }

        return new MoveCollection(result);
    }

	static getGiraffeMovement(piece: PieceModel){
		var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();
		
		var x = piece.getPos().getX();
        var y = piece.getPos().getY();
		
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x + 1, y - 1))); 
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x - 1, y - 1)));
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x + 1, y + 1)));
		result.addAll(MoveFactory.getGiraffeMovementQuarter(piece, new Pos(x - 1, y + 1)));
		
		return result;
	}
	

	
	static getGiraffeMovementQuarter(piece: PieceModel, pos: Pos): MoveCollection{
		var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();
		
		var x = pos.getX();
        var y = pos.getY();
		
		var positionsThatMustBeClear: Pos[] = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y - 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
                if(!piece.getBoardModel().isFree(new Pos(x, y))){
                    if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                        result.add(new Move(piece.getPos(), new Pos(x, y)));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                y -= 1;
            }
        }

        x = pos.getX();
        y = pos.getY();

        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x + 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
                if(!piece.getBoardModel().isFree(new Pos(x, y))){
                    if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                        result.add(new Move(piece.getPos(), new Pos(x, y)));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                x += 1;
            }
        }

        x = pos.getX();
        y = pos.getY();

        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x - 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        x = x - 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
                if(!piece.getBoardModel().isFree(new Pos(x, y))){
                    if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                        result.add(new Move(piece.getPos(), new Pos(x, y)));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                x -= 1;
            }
        }

        x = pos.getX();
        y = pos.getY();

        positionsThatMustBeClear = new Array();
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y + 1;
        positionsThatMustBeClear.push(new Pos(x,y));
        y = y + 1;

        if(piece.getBoardModel().isAllFree(positionsThatMustBeClear)) {
            while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
                if(!piece.getBoardModel().isFree(new Pos(x, y))){
                    if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                        result.add(new Move(piece.getPos(), new Pos(x, y)));
                        break;
                    }
                    else{
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                y += 1;
            }
        }

        return result;
	}
	

    static getAllCardinal(piece: PieceModel){
        var result: MoveCollection = new MoveCollection();

        result.addAll(MoveFactory.getAllRight(piece));
        result.addAll(MoveFactory.getAllLeft(piece));
        result.addAll(MoveFactory.getAllUpwards(piece));
        result.addAll(MoveFactory.getAllDownwards(piece));

        return result;
    }

    static getAllLeftUpDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() - 1;

        while(piece.getBoardModel().isValidPosition(new Pos(x, y))) {
            if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else {
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y)));
            x -= 1;
            y -= 1;
        }


        return result;
    }

    static getAllRightUpDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() - 1;

    while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
        if(!piece.getBoardModel().isFree(new Pos(x, y))){
            if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                break;
            }
            else{
                break;
            }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y)));
            x += 1;
            y -= 1;
        }

        return result;
    }

    static getAllRightDownDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() + 1;
        var y = piece.getPos().getY() + 1;


        while(piece.getBoardModel().isValidPosition(new Pos(x, y))){
            if(!piece.getBoardModel().isFree(new Pos(x, y))){
                if(piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()){
                    result.add(new Move(piece.getPos(), new Pos(x, y)));
                    break;
                }
                else{
                    break;
                }
            }
            result.add(new Move(piece.getPos(), new Pos(x, y)));
            x += 1;
            y += 1;
        }

        return result;
    }

    static getAllLeftDownDiagonal(piece: PieceModel){
        var board: BoardModel = piece.getBoardModel();
        var result: MoveCollection = new MoveCollection();

        var x = piece.getPos().getX() - 1;
        var y = piece.getPos().getY() + 1;

            while (piece.getBoardModel().isValidPosition(new Pos(x, y))) {
                if (!piece.getBoardModel().isFree(new Pos(x, y))) {
                    if (piece.getBoardModel().getPieceFromPosition(new Pos(x, y)).getColor() != piece.getColor()) {
                        result.add(new Move(piece.getPos(), new Pos(x, y)));
                        break;
                    }
                    else {
                        break;
                    }
                }
                result.add(new Move(piece.getPos(), new Pos(x, y)));
                x -= 1;
                y += 1;
            }


        return result;
    }

    static getAllDiagonal(piece: PieceModel){
        var result: MoveCollection = new MoveCollection();

        result.addAll(MoveFactory.getAllLeftDownDiagonal(piece));
        result.addAll(MoveFactory.getAllRightDownDiagonal(piece));
        result.addAll(MoveFactory.getAllRightUpDiagonal(piece));
        result.addAll(MoveFactory.getAllLeftUpDiagonal(piece));

        return result;
    }

    static getRelativeToPiece(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();

        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                }
            }
            else{
                result.add(new Move(piece.getPos(), new Pos(newX, newY)));
            }
        }

        return result;
    }

    static getRelativeToPieceNonCapturing(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();
        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
            }
            else{
                result.add(new Move(piece.getPos(), new Pos(newX, newY)));
            }
        }

        return result;
    }

    static getRelativeToPieceOnlyIfCapturable(piece: PieceModel, x: number, y: number){
        var result: MoveCollection = new MoveCollection();

        var newX: number = piece.getPos().getX() + x;
        var newY: number = piece.getPos().getY() + y;

        if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
            if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                    result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                }
            }
        }

        return result;
    }

    static getLineForward(piece: PieceModel, length: number, direction: number){
        var result: MoveCollection = new MoveCollection();

        if(direction > 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() - 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                            result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                            count--;
                            newY--;
                        }
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY--;
                    }
                }
            }
        }
        if(direction < 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() + 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        if (piece.getBoardModel().getPieceFromPosition(new Pos(newX, newY)).getColor() != piece.getColor()) {
                            result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                            count--;
                            newY++;
                        }
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY++;
                    }
                }
            }
        }

        return result;
    }

    static getLineForwardNoncapturing(piece: PieceModel, length: number, direction: number){
        var result: MoveCollection = new MoveCollection();

        if(direction > 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() - 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        break;
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY--;
                    }
                }
                else{
                    break;
                }
            }
        }
        if(direction < 0){
            var count = length;
            var newX: number = piece.getPos().getX();
            var newY: number = piece.getPos().getY() + 1;

            while(count > 0){
                if(piece.getBoardModel().isValidPosition(new Pos(newX, newY))){
                    if (!piece.getBoardModel().isFree(new Pos(newX, newY))) {
                        break;
                    }
                    else{
                        result.add(new Move(piece.getPos(), new Pos(newX, newY)));
                        count--;
                        newY++;
                    }
                }
                else{
                    break;
                }
            }
        }

        return result;
    }
}abstract class PieceModel{
    private pos: Pos;
    private color: Color;
    private boardModel: BoardModel;
    private type: PieceType;

    constructor(board: BoardModel, pos: Pos, color: Color, type: PieceType){
        this.pos = pos;
        this.color = color;
        this.boardModel = board;
        this.type = type;
    }

    getPos(): Pos{
        return this.pos;
    }

    getColor(): Color{
        return this.color;
    }

    getBoardModel(): BoardModel{
        return this.boardModel;
    }

    getType(): PieceType{
        return this.type;
    }

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllUpwards(this);
    }
	
	transformInto(type: PieceType){
		this.getBoardModel().removePiece(this.getPos());
		this.getBoardModel().addPiece(type, this.getPos().getX(), this.getPos().getY(), this.getColor());
	}
	
    abstract onMove(move: Move);
    abstract giveInternalAttributes(piece: PieceModel);
}class RookModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.ROOK);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllCardinal(this);
    }
}class PawnModel extends PieceModel{
    hasMoved: boolean;

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.PAWN);
    }

    onMove(move: Move){
       this.hasMoved = true;
	   if(this.getBoardModel().isOnOppositeBackRank(move.getDest(), this.getColor())){
			this.transformInto(PieceType.QUEEN);
			//alert("I'm promoting!");
			//this.getBoardModel().addPiece();
	   }
    }

    giveInternalAttributes(piece: PieceModel) {
        var currPiece = piece as PawnModel;
        currPiece.hasMoved = this.hasMoved;

    }

    getDirection(): number{
        return this.getBoardModel().getDirection(this.getColor());
    }

    getPossibleMoves(): MoveCollection{

        if(this.hasMoved){
            return MoveFactory.getRelativeToPieceNonCapturing(this, 0, -1 * this.getDirection())
                    .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, -1, -1 * this.getDirection()))
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, 1, -1 * this.getDirection()));
        }
        else{
            //alert(MoveFactory.getLineForward(this, 2, this.getDirection()).getMoves.length);
            return MoveFactory.getRelativeToPieceNonCapturing(this, 0, -1 * this.getDirection())
                .addAll(MoveFactory.getLineForwardNoncapturing(this, 2, this.getDirection())
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, -1, -1 * this.getDirection()))
                .addAll(MoveFactory.getRelativeToPieceOnlyIfCapturable(this, 1, -1 * this.getDirection())));
        }

    }
}class GiraffeRiderModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.GIRAFFE_RIDER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
		return MoveFactory.getGiraffeMovement(this);
    }
}class KnightModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.KNIGHT);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, -2, -1)
        .addAll(MoveFactory.getRelativeToPiece(this, 2, -1))
        .addAll(MoveFactory.getRelativeToPiece(this, -2, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 2, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, -2))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, -2));
    }
}class BishopModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.BISHOP);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllDiagonal(this);
    }
}class KingModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.KING);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, 1, 1)
        .addAll(MoveFactory.getRelativeToPiece(this, 1, -1))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, -1))
        .addAll(MoveFactory.getRelativeToPiece(this, 0, -1))
        .addAll(MoveFactory.getRelativeToPiece(this, 0, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, 0))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, 0));
    }
}class QueenModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.QUEEN);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getAllCardinal(this)
            .addAll(MoveFactory.getAllDiagonal(this));
    }
}class GeneralModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.GENERAL);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, 0, -1)
            .addAll(MoveFactory.getRelativeToPiece(this, 0, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 0))
            .addAll(MoveFactory.getRelativeToPiece(this, 1, 0));
    }
}class MinisterModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.MINISTER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, 1, 1)
            .addAll(MoveFactory.getRelativeToPiece(this, 1, -1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, 1))
            .addAll(MoveFactory.getRelativeToPiece(this, -1, -1));
    }
}class WarMachineModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.WAR_MACHINE);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, -2, 0)
        .addAll(MoveFactory.getRelativeToPiece(this, 2, 0))
        .addAll(MoveFactory.getRelativeToPiece(this, 0, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, 0, -2));
    }
}class PicketModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.PICKET);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
	
		var x = this.getPos().getX();
		var y = this.getPos().getY();
	
		var invalidMoves = new MoveCollection();
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y + 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y + 2)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y + 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y + 2)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 1, y - 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x - 2, y - 2)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 1, y - 1)));
		invalidMoves.add(new Move(this.getPos(), new Pos(x + 2, y - 2)));
		
		return MoveFactory.getAllDiagonal(this).minus(invalidMoves);
    }
}class ElephantRiderModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.ELEPHANT_RIDER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
		 return MoveFactory.getRelativeToPiece(this, -2, -2)
        .addAll(MoveFactory.getRelativeToPiece(this, 2, -2))
        .addAll(MoveFactory.getRelativeToPiece(this, -2, 2))
        .addAll(MoveFactory.getRelativeToPiece(this, 2, 2));
    }
}class CamelRiderModel extends PieceModel{

    constructor(board: BoardModel, pos: Pos, color: Color){
        super(board, pos, color, PieceType.CAMEL_RIDER);
    }

    onMove(){}
    giveInternalAttributes(piece: PieceModel){}

    getPossibleMoves(): MoveCollection{
        return MoveFactory.getRelativeToPiece(this, -3, -1)
        .addAll(MoveFactory.getRelativeToPiece(this, 3, -1))
        .addAll(MoveFactory.getRelativeToPiece(this, -3, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 3, 1))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, -3))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, 3))
        .addAll(MoveFactory.getRelativeToPiece(this, 1, 3))
        .addAll(MoveFactory.getRelativeToPiece(this, -1, -3));
    }
}class PieceFactory{

    static createPiece(board: BoardModel, pos: Pos, color: Color, type: PieceType): PieceModel{
        var newPiece: PieceModel;
        switch(type){
            case PieceType.ROOK: newPiece = new RookModel(board, pos, color); break;
            case PieceType.BISHOP: newPiece = new BishopModel(board, pos, color); break;
            case PieceType.PAWN: newPiece = new PawnModel(board, pos, color); break;
            case PieceType.KING: newPiece = new KingModel(board, pos, color); break;
            case PieceType.KNIGHT: newPiece = new KnightModel(board, pos, color); break;
            case PieceType.QUEEN: newPiece = new QueenModel(board, pos, color); break;
            case PieceType.GENERAL: newPiece = new GeneralModel(board, pos, color); break;
            case PieceType.MINISTER: newPiece = new MinisterModel(board, pos, color); break;
            case PieceType.GIRAFFE_RIDER: newPiece = new GiraffeRiderModel(board, pos, color); break;
            case PieceType.WAR_MACHINE: newPiece = new WarMachineModel(board, pos, color); break;
            case PieceType.CAMEL_RIDER: newPiece = new CamelRiderModel(board, pos, color); break;
            case PieceType.ELEPHANT_RIDER: newPiece = new ElephantRiderModel(board, pos, color); break;
            case PieceType.PICKET: newPiece = new PicketModel(board, pos, color); break;
        }
        return newPiece;
    }

    static createPieceByTransposition(pos: Pos, piece: PieceModel): PieceModel{
        var newPiece: PieceModel = PieceFactory.createPiece(piece.getBoardModel(), pos, piece.getColor(), piece.getType());
        piece.giveInternalAttributes(newPiece);
        return newPiece;
    }
}class BoardModel{
    HEIGHT: number;
    WIDTH: number;

    pos2PieceMap: Map<Pos, PieceModel> = new Map();
	pos2SquareType: Map<Pos, SquareType> = new Map();
	
    constructor(argWidth:number, argHeight:number){
        this.HEIGHT = argHeight;
        this.WIDTH = argWidth;

        for(var y:number = 0; y < argHeight; y++){
            for(var x:number = 0; x < argWidth; x++){
                this.pos2PieceMap.set(new Pos(x, y), null);
				this.pos2SquareType.set(new Pos(x, y), SquareType.NORMAL);
            }
        }
    }

    addPiece(type: PieceType, x: number, y: number, color: Color){
        this.placePiece(PieceFactory.createPiece(this, new Pos(x, y), color, type));
    }

    placePiece(piece: PieceModel){
        this.pos2PieceMap.set(piece.getPos(), piece);
    }
	
	setSquareTypeAtPos(pos: Pos, type: SquareType){
        this.pos2SquareType.forEach((value, key, map) => {
            if (pos.equals(key)) {
                this.pos2SquareType.set(key, type);
            }
        });
	}
	
    getDirection(color: Color): number{
        if(Color.WHITE == color){
            return 1;
        }
        else if(Color.BLACK == color){
            return -1;
        }
    }
	
	getBackRank(color: Color): Pos[]{
		var result: Pos[] = new Array();
		
		if(this.getDirection(color) > 0){
			for(var i = 0; i < this.getWidth(); i++){
				result.push(new Pos(i, 0));
			}
		}
		else{
			for(var i = 0; i < this.getWidth(); i++){
				result.push(new Pos(i, this.getHeight() - 1));
			}
		}
		
		return result;
	}
	
	isOnOppositeBackRank(pos: Pos, color: Color): boolean{
		var backRank: Pos[] = this.getBackRank(color);
		
		for(var eachIdx in backRank){
			var eachPos = backRank[eachIdx];
			if(eachPos.equals(pos)){
				return true;
			}
		}
		
		return false;
	}
	
    isFree(pos: Pos): boolean{
        var result: boolean;
        this.pos2PieceMap.forEach((value, key, map) => {
            if (pos.equals(key)) {
                result = (value == null || value == undefined);
            }
        });

        return result;
    }

    isAllFree(positions: Pos[]):boolean{
        for(var posIdx in positions){
            var eachPosition = positions[posIdx];
            if(!(this.isFree(eachPosition))){
                return false;
            }
        }

        return true;
    }

    isCapturable(pos: Pos, color: Color): boolean{
        return this.isFree(pos)
    }

    getHeight(): number{
        return this.HEIGHT;
    }

    getWidth(): number{
        return this.WIDTH;
    }

    getAllPieces(): PieceModel[]{
        var result: PieceModel[] = new Array();
        this.pos2PieceMap.forEach((value, key, map) => {
            if(value != null){
                result.push(value);
            }
        });
        return result;
    }

    getAllPiecesOfColor(color: Color): PieceModel[]{
        var result: PieceModel[] = new Array();
        this.pos2PieceMap.forEach((value, key, map) => {
            if(value != null && value != undefined ){
                if(value.getColor() == color){
                    result.push(value);
                }
            }
        });
        return result;
    }

    removePiece(pos: Pos){
        this.pos2PieceMap.forEach((value, key, map) => {
            if(key.equals(pos)){
                this.pos2PieceMap.delete(key);
            }
        });
        this.pos2PieceMap.set(pos, null);
    }

    executeMove(move: Move){
        var originalPiece: PieceModel = this.getPieceFromPosition(move.getOrigin());
        originalPiece.onMove(move);
        this.movePiece(originalPiece.getPos(), move.getDest());
    }

    movePiece(origin: Pos, dest: Pos) {
        var piece = this.getPieceFromPosition(origin);
        this.removePiece(piece.getPos());
        this.removePiece(dest);
        var transposedPiece = PieceFactory.createPieceByTransposition(dest, piece);
        this.placePiece(transposedPiece);
    }

    isValidPosition(pos: Pos): boolean{
        var result = false;
        this.pos2SquareType.forEach((value, key, map) => {
            if (pos.equals(key)) {
                if(value != SquareType.NON_EXISTENT){
                    result = true;
                }

            }
        });
        return result;
    }

    serialize(): string{
        var result = "";
        for(var y: number = 0; y < this.getHeight(); y++){
            for (var x: number = 0; x < this.getWidth(); x++){
                var thisPiece = this.getPieceFromPosition(new Pos(x, y));

                result += "[";
                if(thisPiece != null){
                    result += thisPiece.getType() + "_";

                    if(thisPiece.getColor() == Color.BLACK){
                        result += "B";
                    }
                    else{
                        result += "W";
                    }
                }
                result += "],";
            }
            result = result.substring(0, result.length - 1);
            result += "/";
        }
        result = result.substring(0, result.length - 1);
		
		result += "-";
		
		for(var y: number = 0; y < this.getHeight(); y++){
            for (var x: number = 0; x < this.getWidth(); x++){
                result += "[" + this.getSquareTypeFromPosition(new Pos(x,y)) + "],";
            }
            result = result.substring(0, result.length - 1);
            result += "/";
        }
		result = result.substring(0, result.length - 1);
        return result;
    }

    reset(){
        this.pos2PieceMap.clear();
        this.pos2SquareType.clear();
        for(var y:number = 0; y < this.getHeight(); y++){
            for(var x:number = 0; x < this.getWidth(); x++){
                this.pos2PieceMap.set(new Pos(x, y), null);
				this.pos2SquareType.set(new Pos(x, y), SquareType.NORMAL);
            }
        }
    }

    getAllMovesForColor(color: Color): MoveCollection{
        var pieces: PieceModel[] = this.getAllPiecesOfColor(color);
        var resultArr: MoveCollection = new MoveCollection();
        for(var pieceIdx in pieces){
            var eachPiece: PieceModel = pieces[pieceIdx];
            resultArr.addAll(eachPiece.getPossibleMoves());
        }
        return resultArr;
    }

    populateFromSerial(serial: string) {
        this.reset();
		var halvedData:string[] = serial.split("-");
		var configRows:string[] = halvedData[1].split("/");
        var rows:string[] = halvedData[0].split("/");
        for (var y = 0; y < rows.length; y++) {
            var row = rows[y];
            var squares:string[] = row.split(",");
            var length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var sqrData:string = squares[x].substring(1, squares[x].length - 1);

                if (sqrData.length != 0) {
                    var sqrDataSplit = sqrData.split("_");
                    var thisColor:Color;

                    if (sqrDataSplit[1] == "W") {
                        thisColor = Color.WHITE;
                    }
                    else {
                        thisColor = Color.BLACK;
                    }
                    this.addPiece(+sqrDataSplit[0], x, y, thisColor);
                }
            }
        }
	    for (var y = 0; y < configRows.length; y++) {
            var row = configRows[y];
            var squares:string[] = row.split(",");
            var length = squares.length;
            for (var x = 0; x < squares.length; x++) {
                var sqrData:string = squares[x].substring(1, squares[x].length - 1);
				this.setSquareTypeAtPos(new Pos(x,y), +sqrData);
            }
        }
    }

    getPieceFromPosition(pos: Pos): any{
        var result;
        this.pos2PieceMap.forEach((value, key, map) => {
            if (pos.equals(key)) {
                result = this.pos2PieceMap.get(key);
            }
        });

        return result;
    }
	
	 getSquareTypeFromPosition(pos: Pos): any{
        var result;
        this.pos2SquareType.forEach((value, key, map) => {
            if (pos.equals(key)) {
                result = this.pos2SquareType.get(key);
            }
        });

        return result;
    }
}class BoardFactory{
    static STANDARD_BOARD: string = "[4_B],[2_B],[3_B],[5_B],[6_B],[3_B],[2_B],[4_B]/[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[]/[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W]/[4_W],[2_W],[3_W],[5_W],[6_W],[3_W],[2_W],[4_W]-[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]/[0],[0],[0],[0],[0],[0],[0],[0]";
    static TAMERLANE_BOARD: string = "[],[12_B],[],[13_B],[],[7_B],[],[7_B],[],[13_B],[],[12_B],[]/[],[4_B],[2_B],[11_B],[10_B],[9_B],[6_B],[8_B],[10_B],[11_B],[2_B],[4_B],[]/[],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[1_B],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[],[],[],[],[],[],[],[],[],[],[],[]/[],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[1_W],[]/[],[4_W],[2_W],[11_W],[10_W],[9_W],[6_W],[8_W],[10_W],[11_W],[2_W],[4_W],[]/[],[12_W],[],[13_W],[],[7_W],[],[7_W],[],[13_W],[],[12_W],[]-[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]/[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[1]";

    static getStandardBoard(): BoardModel{
        var board: BoardModel = new BoardModel(8,8);
        board.populateFromSerial(BoardFactory.STANDARD_BOARD);
        return board;
    }
    static getTamerlaneBoard(): BoardModel{
        var board: BoardModel = new BoardModel(13,10);
        board.populateFromSerial(BoardFactory.TAMERLANE_BOARD);
        return board;
    }
}abstract class Player{
	color: Color;
	autoExecute: boolean

	constructor(color: Color){
		this.color = color;
	}

	getColor(): Color{
		return this.color;
	}

	readyForMove(){}
	afterMove(board: BoardModel){}
	beforeMove(board: BoardModel){}
	onGameEnd(){}

	abstract getNextMove(board: BoardModel): Move;
	abstract isAutoExecute(): boolean;

}class MiniMaxPlayer extends Player{

	getNextMove(board: BoardModel):Move{
		var moves: MoveCollection = board.getAllMovesForColor(this.getColor());
		moves.shuffle();
		var bestValuation: number = Number.MAX_SAFE_INTEGER * -1;
		var bestMove: Move = this.rootMiniMax(board, 2, this.getColor());
		return bestMove;
	}
	
	rootMiniMax(board: BoardModel, depth: number, color: Color): Move{
		var bestMove: Move;
		var bestValuation: number = Number.MAX_SAFE_INTEGER * -1;
		var alpha = Number.MAX_SAFE_INTEGER * -1;
		var beta = Number.MAX_SAFE_INTEGER;
			var maxMoves: MoveCollection = board.getAllMovesForColor(color);
			maxMoves.shuffle();
			for(var maxMoveIdx in maxMoves.getMoves()) {
				var eachMaxMove:Move = maxMoves.getMoves()[maxMoveIdx];
				var currentValuation = this.minimax(eachMaxMove, board, depth - 1, this.swapColor(color), alpha, beta, false);
				if(currentValuation >= bestValuation){
					bestValuation = currentValuation;
					bestMove = eachMaxMove;
				}
			}

		return bestMove;
	}
	
	minimax(move: Move, board: BoardModel, depth: number, color: Color, alpha: number, beta: number, maximize: boolean): number{
		var newBoard: BoardModel = this.applyMove(move, board);
		if(depth == 0){
			return this.evaluate(newBoard, color);
		}
		var bestValuation: number;
		if(maximize){
			bestValuation = Number.MAX_SAFE_INTEGER * -1;
			var maxMoves: MoveCollection = newBoard.getAllMovesForColor(color);
			maxMoves.shuffle();
			for(var maxMoveIdx in maxMoves.getMoves()) {
				var eachMaxMove:Move = maxMoves.getMoves()[maxMoveIdx];
				bestValuation = Math.max(bestValuation, this.minimax(eachMaxMove, newBoard, depth - 1, this.swapColor(color), alpha, beta, false));
				alpha = Math.max(alpha, bestValuation);
				if(beta <= alpha){
					break;
				}
			}
		}
		else if(!maximize){
			bestValuation = Number.MAX_SAFE_INTEGER;
			var minMoves: MoveCollection = newBoard.getAllMovesForColor(color);
			minMoves.shuffle();
			for(var minMoveIdx in minMoves.getMoves()) {
				var eachMinMove:Move = minMoves.getMoves()[minMoveIdx];
				bestValuation = Math.min(bestValuation, this.minimax(eachMinMove, newBoard, depth - 1, this.swapColor(color), alpha, beta, true));
				beta = Math.min(beta, bestValuation);
				if(beta <= alpha){
					break;
				}
			}
		}
		return bestValuation;
	}

	swapColor(color: Color): Color{
		if(color == Color.BLACK){
			return Color.WHITE;
		}
		else{
			return Color.BLACK;
		}
	}

	applyMove(move: Move, board: BoardModel): BoardModel{
		var newBoard = new BoardModel(board.getWidth(), board.getHeight());
		newBoard.populateFromSerial(board.serialize());
		newBoard.executeMove(move);
		return newBoard;
	}


	evaluate(board: BoardModel, color: Color): number{
		var result = 0;
		/*result += board.getAllPiecesOfColor(color).length;
		result -= board.getAllPiecesOfColor(this.swapColor(color)).length;*/
		result += this.getMaterial(board, color);
		result += (this.getMobility(board, color) * 0.01);
		return result;
	}

	getMaterial(board: BoardModel, color: Color){
		var pieces = board.getAllPieces();
		var value = 0;
		for(var pieceIdx in pieces){
			var eachPiece =  pieces[pieceIdx];
			var thisValue = 0;
			switch(eachPiece.getType()){
				case PieceType.ROOK: thisValue += 5; break;
				case PieceType.PAWN: thisValue += 1; break;
				case PieceType.QUEEN: thisValue += 9; break;
				case PieceType.KNIGHT: thisValue += 3; break;
				case PieceType.BISHOP: thisValue += 3; break;
				case PieceType.GIRAFFE_RIDER: thisValue += 4; break;
				case PieceType.GENERAL: thisValue += 1; break;
				case PieceType.MINISTER: thisValue += 1; break;
				case PieceType.CAMEL_RIDER: thisValue += 3; break;
				case PieceType.ELEPHANT_RIDER: thisValue += 3; break;
				case PieceType.WAR_MACHINE: thisValue += 2; break;
				case PieceType.PICKET: thisValue += 2; break;
				case PieceType.KING: thisValue += 1000; break;
			}
			if(eachPiece.getColor() == color){
				value += thisValue;
			}
			else{
				value -= thisValue;
			}
		}
		return value;
	}

	getMobility(board: BoardModel, color: Color){
		var myMoves = board.getAllMovesForColor(color);
		var oppMoves = board.getAllMovesForColor(this.swapColor(color));
		return myMoves.getMoves().length - oppMoves.getMoves().length;
	}

	isAutoExecute(){
		return true;
	}

}class GameHTMLContainer{
    parentElement: HTMLElement;
    boardElement: string;
    alertTextElement: string;
    throbberElement: string;

    alertTextOn: boolean;
    throbberOn: boolean;

    constructor(parentElement: HTMLElement){
        this.parentElement = parentElement;
    }

    setBoardHTML(html: string){
        this.boardElement = html;
    }

    setAlertTextHTML(html: string){
        this.alertTextElement = html;
    }

    setThrobberHTML(html: string){
        this.throbberElement = html;
    }

    turnOnAlertText(){
        this.alertTextOn = true;
    }

    turnOffAlertText(){
        this.alertTextOn = false;
    }

    turnOnThrobber(){
        this.throbberOn = true;
    }

    turnOffThrobber(){
        this.throbberOn = false;
    }

    update(){
        var newHTML: string = this.boardElement;
        if(this.alertTextOn){
           newHTML += this.alertTextElement;
        }
        if(this.throbberOn){
            newHTML += this.throbberElement;
        }
        this.parentElement.innerHTML = newHTML;
    }
}class ChessGame{
    board: BoardModel;
    white: Player;
    black: Player;
    currentTurn: Color;
    hasFinished: boolean;

    constructor(board: BoardModel, white: Player, black: Player){
        this.white = white;
        this.black = black;
        this.board = board;
    }

    start(){
        this.currentTurn = Color.WHITE;
        this.getCurrentPlayer().readyForMove();
    }

    executeNextMove(){
        if(!this.isFinished()){
            var move: Move = this.getCurrentPlayer().getNextMove(this.board);
            this.getCurrentPlayer().beforeMove(this.board);
            this.board.executeMove(move);
            this.getCurrentPlayer().afterMove(this.board);
            if(this.hasLost(this.swapColor(this.currentTurn))){
                this.hasFinished = true;
            }
            this.swapPlayers();
        }
        else{
            this.white.onGameEnd();
            this.black.onGameEnd();
        }
        setTimeout(() => {
            if(!this.isFinished()){
                if(this.getCurrentPlayer().isAutoExecute()){
                    this.executeNextMove();
                }
                else{
                    this.getCurrentPlayer().readyForMove();
                }
            }
            else{
                //this.getCurrentPlayer().afterMove(this.board);
                this.white.onGameEnd();
                this.black.onGameEnd();
            }
        }, 10);
    }

    swapPlayers(){
        if(this.currentTurn == Color.WHITE){
            return this.currentTurn = Color.BLACK;
        }
        else{
            return this.currentTurn = Color.WHITE;
        }
    }

    getCurrentPlayer(): Player{
        if(this.currentTurn == Color.WHITE){
            return this.white;
        }
        else{
            return this.black;
        }
    }

    isFinished(): boolean{
        return this.hasFinished;
    }

    hasLost(color: Color): boolean{
        var pieces: PieceModel[] = this.board.getAllPiecesOfColor(color);
        for(var pieceIdx in pieces){
            var eachPiece = pieces[pieceIdx];
            if(eachPiece.getType() == PieceType.KING){
                return false;
            }
        }
        return true;
    }

    isInCheck(color: Color): boolean{
        var pieces: PieceModel[] = this.board.getAllPiecesOfColor(color);
        for(var pieceIdx in pieces){
            var eachPiece = pieces[pieceIdx];
            if(eachPiece.getType() == PieceType.KING){
                if(this.board.getAllMovesForColor(this.swapColor(color)).containsDestination(eachPiece.getPos())){
                    return true;
                }
            }
        }
        return false;
    }

    swapColor(color: Color): Color{
        if(color == Color.BLACK){
            return Color.WHITE;
        }
        else{
            return Color.BLACK;
        }
    }
}class ConsoleEntry extends HTMLObject{
    text: string;

    constructor(left: number, top: number, width: number, height: number, text: string){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
        this.setText(text);
    }

    setText(text: string){
        this.text = text;
    }

    getText(): string{
        return this.text;
    }

    toHTML(): string{
        var innerDiv: string = "{msg}";
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("font-size", this.getHeight() + "px")
            .addStyle("border", "1px solid black");

        builder.addInnerDiv(innerDiv.replace("{msg}", this.getText()));

        return builder.toString();
    }
}class MyConsole extends HTMLObject{
    lines: ConsoleEntry[] = new Array();
    entryHeight: number;
    consoleWidth: number;
    consoleHeight: number;

    constructor(leftPos: number, upPos: number, consoleWidth: number, consoleHeight: number, entryHeight:number){
        super();
        this.consoleHeight = consoleHeight;
        this.consoleWidth = consoleWidth;
        this.entryHeight = entryHeight;
        this.setHeight(this.consoleHeight);
        this.setWidth(this.consoleWidth);
        this.setLeftPos(leftPos);
        this.setTopPos(upPos);
        this.setId("my-console");
    }

    addEntry(text: string){
        var newEntry: ConsoleEntry = new ConsoleEntry(0, (this.entryHeight * (this.lines.length)) - 1, this.getWidth() - 20, this.entryHeight, text);
        this.lines.push(newEntry);
    }

    toHTML(): string{
        var text: string = "";

        for(var lineIdx in this.lines){
            text += this.lines[lineIdx].toHTML();
        }

        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("overflow-y", "scroll")
            .addStyle("position", "absolute")
            .addStyle("border", "1px solid black")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .setId(this.getId());

        builder.addInnerDiv(text);
        return builder.toString();
    }
}class ConsoleController{
    console: MyConsole;

    constructor(leftOffset: number, topOffset: number, width: number, height: number, entrySize:number){
        this.console = new MyConsole(leftOffset, topOffset, width, height, entrySize);
    }

    run(){
        this.update();
    }
    log(txt: string){
        this.console.addEntry(txt);
        this.update();
    }
    update(){
        document.body.innerHTML += this.console.toHTML();
        var element = document.getElementById("my-console");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
}
class GameController extends Player{
    htmlContainer: GameHTMLContainer;
    chessGame: ChessGame;
    myColor: Color = Color.WHITE;
    boardView: Board;
    consoleCtrl: ConsoleController;
    //temp storage
    SELECTED_PIECE: PieceModel;
    CHOSEN_MOVE: Move;

    offsetTop: number;
    offsetLeft: number;
    squareWidth: number;
    squareHeight: number;

    throbber: Throbber;
    alertText: AlertText;

    constructor(htmlContainer: GameHTMLContainer, offsetTop?: number, offsetLeft?: number, squareWidth?: number, squareHeight?: number){
        super(Color.WHITE);
        this.htmlContainer = htmlContainer;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
        this.squareWidth = squareWidth;
        this.squareHeight = squareHeight;
    }


    start(){
        var board: BoardModel = BoardFactory.getTamerlaneBoard();
        this.throbber = new Throbber(this.squareWidth * 2, this.squareHeight * 2, 99);
        this.throbber.centerInSquare(this.offsetLeft, this.offsetTop, this.squareWidth * board.getWidth(), this.squareHeight * board.getHeight());
        this.htmlContainer.setThrobberHTML(this.throbber.toHTML());
        this.alertText = new AlertText(this.squareWidth * 2, this.squareHeight * 2, 100);
        this.alertText.centerInSquare(this.offsetLeft, this.offsetTop, this.squareWidth * board.getWidth(), this.squareHeight * board.getHeight());
        this.consoleCtrl = new ConsoleController(this.offsetLeft, this.offsetTop + (this.squareWidth * board.getWidth()), this.squareWidth * 8, this.squareWidth * 2, 50);
        this.boardView = Board.fromSerial(board.serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        var miniMaxAI = new MiniMaxPlayer(Color.BLACK);
        this.chessGame = new ChessGame(board, this, miniMaxAI);
        this.update();
        this.chessGame.start();
    }

    update(){
        this.htmlContainer.setBoardHTML(this.boardView.toHTML());
        this.htmlContainer.update();

        if (this.chessGame.currentTurn == this.getColor()) {
            this.addClickListeners();
        }
        else{
            this.turnOffClickListeners();
        }
    }

    turnOffClickListeners():void {
        var squares: Square[] = this.boardView.getSquares();
        for (var square in squares) {
            var each = squares[square];
            this.setElementOnClick(each.getId(), () => {});
        }
    }

    addClickListeners(){
        this.addMyPieceClickListeners();
        this.addOppPieceClickListeners();
        this.addSquareClickListeners();
    }

    addMyPieceClickListeners():void {
        var pieces: Piece[] = this.boardView.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            if (each.getColor() == this.getColor()) {
                var coSqr = this.boardView.getSquareAtPos(each.getPos());
                //document.getElementById(coSqr.getId()).onclick = this.getMyPieceClickListenerFunction(coSqr.getId());
                this.setElementOnClick(coSqr.getId(),this.getMyPieceClickListenerFunction(coSqr.getId(), this));

            }
        }
    }

    log(txt: string){
        if(this.consoleCtrl){
            this.consoleCtrl.log(txt);
        }
    }


    turnOnThrobber(){
        this.htmlContainer.turnOnThrobber();
    }

    getMyPieceClickListenerFunction(id: string, control: GameController){
        return function () {
            if(!control.myPieceIsSelected()){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
            }
            else if(control.myPieceIsSelected() && control.selectedPieceIsAtSquareId(id)){
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if(control.myPieceIsSelected() && !control.selectedPieceIsAtSquareId(id)){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
            }
            else if(control.myPieceIsSelected() && !(control.representsMovableSpace(id))){
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if(control.myPieceIsSelected() && control.representsMovableSpace(id)){
                var sqr: Square = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr);
                control.signalOpponentsMove();
            }
        };
    }

    addOppPieceClickListeners(){
        var pieces: Piece[] = this.boardView.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            if (each.getColor() == this.swapColor(this.getColor())) {
                var coSqr = this.boardView.getSquareAtPos(each.getPos());
                this.setElementOnClick(coSqr.getId(),this.getOppPieceClickListenerFunction(coSqr.getId(), this));
            }
        }
    }

    getOppPieceClickListenerFunction(id: string, control: GameController){
        return function () {
            if (!control.oppPieceIsSelected() && !control.myPieceIsSelected()) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if (control.oppPieceIsSelected() && !control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if (control.oppPieceIsSelected() && control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if(control.myPieceIsSelected() && !(control.representsMovableSpace(id))){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if(control.myPieceIsSelected() && control.representsMovableSpace(id)){
                var sqr: Square = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr);
            }
        };
    }

    addSquareClickListeners(){
        var squares: Square[] = this.boardView.getSquares();
        for (var square in squares) {
            var each = squares[square];
            if (this.hasNoClickListener(each.getId())) {
                this.setElementOnClick(each.getId(),this.getSquareClickListenerFunction(each.getId(), this));
            }
        }
    }

    getSquareClickListenerFunction(id: string, control: GameController){
        return function () {
            if(control.oppPieceIsSelected()){
                control.unselectPiece();
                control.resetSquareColors();
            }
            else if(control.myPieceIsSelected() && control.representsMovableSpace(id)){
                var sqr: Square = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr);
            }
            else if(control.myPieceIsSelected() && !(control.representsMovableSpace(id))){
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
        };
    }

    hasNoClickListener(id: string) {
        return document.getElementById(id).onclick == null || document.getElementById(id).onclick == undefined;
    }

    getBoardModel(): BoardModel{
        return this.chessGame.board;
    }

    swapColor(color: Color): Color{
        if(color == Color.BLACK){
            return Color.WHITE;
        }
        else{
            return Color.BLACK;
        }
    }

    setElementOnClick(id: string, func: () => void ):void {
        document.getElementById(id).onclick = func;
    }

    setSelectedPiece(piece: PieceModel){
        this.SELECTED_PIECE = piece;
    }

    myPieceIsSelected():boolean {
        return ((this.SELECTED_PIECE != null && this.SELECTED_PIECE != undefined) && this.SELECTED_PIECE.getColor() == this.getColor());
    }

    representsMovableSpace(id: string): boolean {
        var moves: MoveCollection = this.SELECTED_PIECE.getPossibleMoves();
        var sqr: Square = this.boardView.getSquareById(id);
        var thisMove = new Move(this.SELECTED_PIECE.getPos(), new Pos(sqr.getX(), sqr.getY()));
        return moves.contains(thisMove);
    }

    oppPieceIsSelected():boolean {
        return ((this.SELECTED_PIECE != null && this.SELECTED_PIECE != undefined) && this.SELECTED_PIECE.getColor() == this.swapColor(this.getColor()));
    }

    getSquareAtId(id: string): Square{
        return this.boardView.getSquareById(id);
    }

    tracePieceMoves(piece: PieceModel, hex: string):void {
        var moves: MoveCollection = piece.getPossibleMoves();
        this.setSquaresToColor(moves, hex);
        this.setSquareToColor(piece.getPos(), hex);
        this.setSelectedPiece(piece);
        this.update();
    }

    moveSelectedPieceToSquare(sqr:Square):void {
        this.turnOffClickListeners();
        var move: Move = new Move(this.SELECTED_PIECE.getPos(), sqr.getPos());
        this.setChosenMove(move);
        this.unselectPiece();
        this.resetSquareColors();
        this.signalOpponentsMove();
    }

    getPieceAtSquareId(id: string): PieceModel{
        var sqr = this.getSquareAtId(id);
        var result: PieceModel = this.getBoardModel().getPieceFromPosition(sqr.getPos());
        return result;
    }

    unselectPiece():void {
        this.SELECTED_PIECE = null;
    }

    resetSquareColors():void {
        this.boardView.unselectAllSquares();
    }

    signalOpponentsMove():void {
        this.turnOffClickListeners();
        this.chessGame.executeNextMove();
    }

    getNextMove(board): Move{
        return this.getChosenMove();
    }

    getChosenMove():Move {
        return this.CHOSEN_MOVE;
    }

    setChosenMove(move: Move){
        this.CHOSEN_MOVE = move;
    }

    isAutoExecute(): boolean{
        return false;
    }

    afterMove(board: BoardModel) {
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.doCheckLogging();
		this.turnOnThrobber();
        this.update();
        this.turnOffClickListeners();
    }


    beforeMove(board: BoardModel) {
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.update();
        this.turnOffClickListeners();
    }

    setSquareToColor(pos: Pos, hex: string):void {
        var eachSqr: Square = this.boardView.getSquareAtPos(pos);
        eachSqr.setHexColor(hex);
    }

    selectedPieceIsAtSquareId(id:string):Boolean {
        var sqr: Square = this.getSquareAtId(id);
        if(this.SELECTED_PIECE.getPos().equals(sqr.getPos())){
            return true;
        }
        return false;
    }

    setSquaresToColor(moves: MoveCollection, hex: string):void {
        for(var moveIdx in moves.getMoves()){
            var eachMove: Move = moves.getMoves()[moveIdx];
            var eachSqr: Square = this.boardView.getSquareAtPos(eachMove.getDest());
            eachSqr.setHexColor(hex);
        }
    }

    doCheckLogging(): boolean{
        if(this.chessGame.isInCheck(this.getColor())){
            this.showAlertText("Check!");
            return true;
        }
        else if(this.chessGame.isInCheck(this.swapColor(this.getColor()))){
             this.showAlertText("Check!");
            return true;
        }
        else if(this.chessGame.hasLost(this.getColor())){
            this.showAlertText("You Lose!");
            return true;
        }
        else if(this.chessGame.hasLost(this.swapColor(this.getColor()))){
            this.showAlertText("You Win!");
            return true;
        }
        return false;
    }

    showAlertText(txtToShow: string){
            var lock: boolean = true;
            this.alertText.setContent(txtToShow);
            this.htmlContainer.setAlertTextHTML(this.alertText.toHTML());
            this.htmlContainer.turnOnAlertText();
            this.htmlContainer.update();
            setTimeout(() => {
                this.htmlContainer.turnOffAlertText();
                this.htmlContainer.update();
                this.addClickListeners();
            }, 3000);
    }

    readyForMove(){
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
		this.turnOffThrobber();
        this.update();
        if(!this.doCheckLogging()){
            this.addClickListeners();
        }
    }

    turnOffThrobber():void {
        this.htmlContainer.turnOffThrobber();
    }

    onGameEnd(){
        this.turnOffThrobber();
        this.doCheckLogging();
    }
}class Preloader{
    static imageLinks: string[] = new Array("http://v3.preloaders.net/preloaders/5/colored/5.png",
											"https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif");
	static images = new Array();
	
	static preload(){
		for (var i = 0; i < Preloader.imageLinks.length; i++) {
			var newImage = new Image();
			newImage.src = Preloader.imageLinks[i];
			Preloader.images.push(newImage);
		}
	}

}
class CSSClass{
	name: string;
    styles = {};
	
	constructor(name: string){
		this.name = name;
	}
	
	addStyle(type: string, value: string){
		this.styles[type] = value;
	}
	
	toString(): string{
		var result: string = "";
		result += "." + this.name +"{";
		
        for (var each in this.styles) {
            result += each + ": " + this.styles[each] + "; ";
        }
		result += "}";
        return result;
	}
}class CSSManager{
	static classes: CSSClass[] = new Array();
	static raw: string[] = new Array();
	
	public static initAndApply(){
        CSSManager.addSpinning();
        CSSManager.addSqr();
		CSSManager.apply();
	}
	
    public static apply() {
        
		var style = document.createElement("style"); 
		var styleString: string = "";
		
		for(var classIdx in CSSManager.classes){
			var eachClass = CSSManager.classes[classIdx];
			styleString += eachClass.toString();
		}
		for(var rawIdx in CSSManager.raw){
			var eachRaw = CSSManager.raw[rawIdx];
			styleString += eachRaw.toString();
		}
		style.innerHTML += styleString;
	    document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	private static addSpinning(){
		var spinClass: CSSClass = new CSSClass("spin");
		spinClass.addStyle("animation", "3s rotate linear infinite");
		
		CSSManager.addClass(spinClass);
		CSSManager.addRaw("@keyframes rotate {from {transform: rotate(0deg);} to {transform: rotate(360deg);}}");
	}
	
	private static addSqr(){
		var sqrClass: CSSClass = new CSSClass("sqr");
		sqrClass.addStyle("height", "30px");
		sqrClass.addStyle("width", "30px");
        sqrClass.addStyle("background", "red");
		
		CSSManager.addClass(sqrClass);
	}
	
	private static addClass(clazz: CSSClass){
		CSSManager.classes.push(clazz);
	}
	
	private static addRaw(raw: string){
		CSSManager.raw.push(raw);
	}
}class GameBox{

    public static start(){
        Preloader.preload();
        CSSManager.initAndApply();
        var container: GameHTMLContainer = new GameHTMLContainer(document.body);
        var game = new GameController(container, 100, 100, 50, 50);
        game.start();
    }
}class BoardBuilderHTMLContainer{
	parentElement: HTMLElement;
	boardView: Board;
	typeSquares: Square[];
	xInput: HTMLElement;
	yInput: HTMLElement;
	newBoardButton: HTMLElement;
	boardDiv: HTMLIFrameElement;
	outputDiv: HTMLTextAreaElement;

	constructor(parentElement: HTMLElement){
		this.parentElement = parentElement;
	}

	init(){

		this.xInput = this.createXInput();
		this.yInput = this.createYInput();
		this.newBoardButton = this.createNewBoardButton();

		var xInputContainer: HTMLElement = document.createElement('div');
		xInputContainer.id = "xInputContainer";
		xInputContainer .innerHTML += "Width: ";
		xInputContainer.appendChild(this.xInput);

		var yInputContainer: HTMLElement = document.createElement('div');
		yInputContainer.id = "yInputContainer";
		yInputContainer .innerHTML += "Height: ";
		yInputContainer.appendChild(this.yInput);

		var board_div: HTMLIFrameElement = document.createElement('iframe');
		board_div.id = "board-div";
		board_div.scrolling = "no";
		board_div.frameBorder = "0";
		board_div.style["seamless"] = "seamless";
		board_div.style.overflow = "hidden";
		this.boardDiv = board_div;

		var breakDiv = document.createElement('br');
		var breakDiv2 = document.createElement('br');

		var outputDiv = document.createElement('textarea');
		outputDiv.rows = 8;
		outputDiv.cols = 100;
		this.outputDiv = outputDiv;

		this.parentElement.appendChild(xInputContainer);
		this.parentElement.appendChild(yInputContainer);
		this.parentElement.appendChild(this.newBoardButton);
		this.parentElement.appendChild(breakDiv);
		this.parentElement.appendChild(board_div);
		this.parentElement.appendChild(breakDiv2);
		this.parentElement.appendChild(outputDiv);

	}

	update(){
		this.updateBoardHTML();
		this.outputDiv.value = this.boardView.serialize();
	}

	updateBoardHTML(){
		this.boardDiv.contentDocument.body.innerHTML = this.boardView.toHTML();
		this.boardDiv.height = this.boardView.getPixelHeight() + 5 + "px";
		this.boardDiv.width = this.boardView.getPixelWidth() + 5 + "px";
	}

	getBoardView(){
	 return this.boardView;
	}

	getTypeSquares(){
	 return this.typeSquares;
	}

	getXInput(){
		return this.xInput;
	}

	getYInput(){
		return this.yInput;
	}

	getNewBoardButton(){
		return this.newBoardButton;
	}

	setBoardView(board: Board){
	 this.boardView = board;
	}

	setXInput(element: HTMLElement){
		this.xInput = element;
	}

	setYInput(element: HTMLElement){
		this.yInput = element;
	}

	setNewBoardButton(element: HTMLElement){
		this.newBoardButton = element;
	}

	createXInput(): HTMLElement{
		var xInput = document.createElement('input');
		xInput.id = "xInput";
		return xInput;
	}

	createYInput(): HTMLElement{
		var yInput = document.createElement('input');
		yInput.id = "yInput";
		return yInput;
	}

	createNewBoardButton(): HTMLElement{
		var newBoardButton = document.createElement('button');
		newBoardButton.id = "newBoardButton";
		newBoardButton.innerHTML = "Create New Board";
		return newBoardButton;
	}

	/*createTypesContainer():HTMLElement {
		var typesContainer = document.createElement('div');
		typesContainer.id = "typesContainer";

		var typesContainer = document.createElement('div');
	}*/
}
class BoardBuilderController{
	container: BoardBuilderHTMLContainer;
	selectedSquareType: SquareType;

	constructor(container: BoardBuilderHTMLContainer){
		this.container = container;
	}

	start(){
		this.getContainer().init();
		this.setAllClickListeners();
	}
	
    setElementOnClick(id: string, func: () => void ):void {
        document.getElementById(id).onclick = func;
    }
	
	update(){
		this.getContainer().update();
		this.setAllClickListeners();
	}
	
	setAllClickListeners(){
		//this.setAllBoardSquareListerners();
		//this.setAllSquareTypeListerners();
		this.setNewBoardButtonListener();
	}
	
	setNewBoardButtonListener(){
		var newBoardButton = this.getContainer().getNewBoardButton();
		this.setElementOnClick("newBoardButton", this.getNewBoardButtonOnClickFunction(this));
	}
	
	/*setAllBoardSquareListeners(){
		var sqrs = this.getContainer().getBoardSquares();
		for(var sqrIdx in sqrs){
			var eachSqr = sqrs[sqrIdx];
			this.setElementOnClick(eachSqr.getId(), this.getBoardSquareOnClickFunction(eachSqr.getId(), this));
		}
	}*/
	
	/*setAllSquareTypeListerners(){
		var sqrs = this.getContainer().getTypeSquares();
		for(var sqrIdx in sqrs){
			var eachSqr = sqrs[sqrIdx];
			this.setElementOnClick(eachSqr.getId(), this.getSquareTypeOnClickFunction(eachSqr.getId(), this));
		}
	}*/
	
	getContainer(): BoardBuilderHTMLContainer{
		return this.container;
	}
	
	getNewBoardButtonOnClickFunction(controller: BoardBuilderController): () => void {
		return () => {
			var currentX = (<HTMLInputElement>document.getElementById("xInput")).value;
			var currentY = (<HTMLInputElement>document.getElementById("yInput")).value;
			var newBoard: Board = new Board(+currentX, +currentY, 0, 0);
			controller.getContainer().setBoardView(newBoard);
			controller.update();
		};

	}

	/*getSquareTypeOnClickFunction(id: string, controller: BoardBuilderController){
		return new function () 
		{
			this.selectedSquareType = controller.getContainer().getTypeSquareFromId(id).getType();
			this.selectedSquareType = controller.getContainer().getTypeSquareFromId(id).getType();
		};
	}
	
	getBoardSquareOnClickFunction(id: string, controller: BoardBuilderController){
		return new function () 
		{
			var sqr = controller.getContainer().getBoardSquareFromId(id);
			sqr.setSquareType(this.selectedSquareType);
			controller.update();
		};
	}*/
}class BoardBuilder{

    static start(){
        var container = new BoardBuilderHTMLContainer(document.body);
        var controller = new BoardBuilderController(container);
        controller.start();
    }
}
