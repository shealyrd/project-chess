abstract class Piece extends HTMLObject{
    z: number;
	color: Color;
	
    constructor(left: number, top: number, width: number, height: number, z:number, color: Color){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
        this.setZ(z);
		this.setColor(color);
    }

    setZ(z: number) {
        this.z = z;
    }
	
    getZ(): number {
        return this.z;
    }
	
	
	abstract getWhiteImg(): string;
	abstract getBlackImg(): string;
	
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
                .addStyle("left", this.getLeftPos() + "")
                .addStyle("top", this.getTopPos() + "")
                .addStyle("width", this.getWidth() + "px")
                .addStyle("height", this.getHeight() + "px")
				.addStyle("z-index", this.getZ() + "");
				
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

}
