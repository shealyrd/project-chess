class Board extends HTMLObject{
    squares: Square[] = new Array();
    rows: Row[] = new Array();

    constructor(){
        super();
        var row1: Row = new Row(100, 100, 400, 50, 8);
        var row2: Row = new Row(100, 150, 400, 50, 8);
        this.rows.push(row1);
        this.rows.push(row2);
        /*var square1: Square = new Square(100, 100, 50, 50);
        var square2: Square = new Square(100, 150, 50, 50);
        var square3: Square = new Square(150, 100, 50, 50);
        var square4: Square = new Square(150, 150, 50, 50);
        this.squares.push(square1);
        this.squares.push(square2);
        this.squares.push(square3);
        this.squares.push(square4);*/
    }

    toHTML():string {
        var result: string = "";

        for (var row in this.rows) {
            result += this.rows[row].toHTML();
        }
      /*  for(var each in this.squares) {
            //result += this.squares[each].toHTML();

        } */

        return result;
    }


}