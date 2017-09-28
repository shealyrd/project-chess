class Row extends HTMLObject{
    squares: Square[] = new Array();
	numSquares: number;
	
	
    constructor(left: number, top: number, width: number, height: number, sqrCount: number){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
		this.setNumSquares(sqrCount);
		
		for(var i: number = 0; i < number; i++){
			var newSquare: Square = new Square(this.getSquareLeftPos(i), this.getTopPos(), this.getSquareWidth(), this.getHeight());
			squares.push(newSquare);
		}
    }
	
	setNumSquares(sqrCount: number){
		this.numSquares = sqrCount;
	}
	
	getNumSquares(): number{
		return numSquares;
	}
	
	getSquareWidth(): number{
		return Math.ceil(width / numSquares));
	}
	
	getSquareLeftPos(index: number): number{
		return this.getLeft() + (i * this.getSquareWidth());
	}

    toHTML():string {
		var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
                .addClass("row")
                .addStyle("position", "absolute")
                .addStyle("left", this.getLeftPos() + "")
                .addStyle("top", this.getTopPos() + "")
                .addStyle("width", this.getWidth() + "px")
                .addStyle("height", this.getHeight() + "px")
        for(var each in this.squares) {
            builder.addInnerDiv(this.squares[each].toHTML());
        }
        return builder.toString();
    }


}