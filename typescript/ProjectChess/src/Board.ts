class Board extends HTMLObject{
    squares: Square[] = new Array();
    rows: Row[] = new Array();
	numRows: number;
	numColumns: number;
	offsetTop: number;
	offsetLeft: number;
	
	squareSize: number = 50;
	rowHeight: number = 50;

	

    constructor(numCol: number, numRows: number, offsetTop?: number, offsetLeft?: number) {
        super();
        if (offsetTop == null) {
            offsetTop = 100;
        }
        if (offsetLeft == null) {
            offsetLeft = 100;
        }
		this.initialize(numCol, numRows, offsetTop, offsetLeft);
	}
	
	initialize(numCol: number, numRows: number, offsetTop: number, offsetLeft: number){
		this.numRows = numRows;
		this.numColumns = numCol;
		this.offsetTop = offsetTop;
		this.offsetLeft = offsetLeft;
		
		var cornerColor: Color = Color.WHITE;
		
		for(var i: number = 0; i < this.numRows; i++){
			var row: Row = new Row(this.offsetLeft, this.offsetTop + (i * this.rowHeight), this.squareSize * this.numColumns, this.rowHeight, this.numColumns);
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
	
	
    toHTML():string {
        var result: string = "";

        for (var row in this.rows) {
            result += this.rows[row].toHTML();
        }

        return result;
    }


}