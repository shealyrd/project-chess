class Row extends HTMLObject{
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
			this.squares.push(newSquare);
		}
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