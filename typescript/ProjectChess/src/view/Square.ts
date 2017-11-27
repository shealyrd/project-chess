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

	   	if(this.getType() == SquareType.WATER){
			hexColor = "#74ccf4";
		}
		else{
			switch(this.col){
				case Color.WHITE: hexColor = "#f0d9b5"; break;
				case Color.BLACK: hexColor = "#b58863"; break;
			}
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

} 