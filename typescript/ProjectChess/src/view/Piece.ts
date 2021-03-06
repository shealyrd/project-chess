class Piece extends HTMLObject{
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
