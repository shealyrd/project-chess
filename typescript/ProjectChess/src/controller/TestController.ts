class TestController{
    static board: Board;
    static boardModel: BoardModel;


    static run2() {
        TestController.board = new Board(8, 8);
        document.body.innerHTML = TestController.board.toHTML();

        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13) {

                TestController.setStandard();
                TestController.update();
            }

        }
    }

    static setStandard(){
        TestController.boardModel = new BoardModel(8,8);
        TestController.boardModel.addPiece(PieceType.ROOK, 0, 0, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.KNIGHT, 1, 0, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.BISHOP, 2, 0, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.QUEEN, 3, 0, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.KING, 4, 0, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.BISHOP, 5, 0, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.KNIGHT, 6, 0, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.ROOK, 7, 0, Color.BLACK);

        TestController.boardModel.addPiece(PieceType.PAWN, 0, 1, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.PAWN, 1, 1, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.PAWN, 2, 1, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.PAWN, 3, 1, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.PAWN, 4, 1, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.PAWN, 5, 1, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.PAWN, 6, 1, Color.BLACK);
        TestController.boardModel.addPiece(PieceType.PAWN, 7, 1, Color.BLACK);


        TestController.boardModel.addPiece(PieceType.ROOK, 3, 3, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.KNIGHT, 1, 7, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.BISHOP, 2, 7, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.QUEEN, 3, 7, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.KING, 4, 7, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.BISHOP, 5, 7, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.KNIGHT, 6, 7, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.ROOK, 7, 7, Color.WHITE);

        TestController.boardModel.addPiece(PieceType.PAWN, 0, 6, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.PAWN, 1, 6, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.PAWN, 2, 6, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.PAWN, 3, 6, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.PAWN, 4, 6, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.PAWN, 5, 6, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.PAWN, 6, 6, Color.WHITE);
        TestController.boardModel.addPiece(PieceType.PAWN, 7, 6, Color.WHITE);



        TestController.board = Board.fromSerial(TestController.boardModel.serialize());
    }

    static update(){
        document.body.innerHTML = TestController.board.toHTML();
        var pieces: Piece[] = TestController.board.getPieces();
		var squares: Square[] = TestController.board.getSquares();
        for (var piece in pieces) {
            var each = pieces[piece];
            document.getElementById(each.getId() + "").setAttribute("onclick", "clickingExample("+ + each.getId() + ")");
        }
		for (var square in squares) {
            var each = squares[square];
            document.getElementById(each.getId() + "").setAttribute("onclick", "clickingExample3("+ + each.getId() + ")");
        }
    }
}

var clickState = 1;
var savedPiece: PieceModel;

var clickingExample = (e) => {
    var meView = TestController.board.getPieceById(e);
    var meModel = TestController.boardModel.getPieceFromPosition(new Pos(meView.getX(), meView.getY()));
    if(clickState == 1){
        savedPiece = meModel;
        clickState = 2;
    }
    else if (clickState == 2) {
        TestController.boardModel.addPiece(savedPiece.getType(), meView.getX(), meView.getY(), savedPiece.getColor());
        TestController.boardModel.removePiece(savedPiece.getPos());
        TestController.board = Board.fromSerial(TestController.boardModel.serialize());
        TestController.update();
        clickState = 1
    }
    savedPiece = meModel;

    //alert(JSON.stringify(meModel));
};

var clickingExample2 = (e) => {
    var meView = TestController.board.getPieceById(e);
    var meModel = TestController.boardModel.getPieceFromPosition(new Pos(meView.getX(), meView.getY()));
    if(clickState == 1){
        savedPiece = meModel;
        clickState = 2;
    }
    else if (clickState == 2) {
        var move: Move = new Move(savedPiece.getPos(), new Pos(meView.getX(), meView.getY()));
        TestController.boardModel.executeMove(move);
        TestController.board = Board.fromSerial(TestController.boardModel.serialize());
        TestController.update();
        clickState = 1
    }
    savedPiece = meModel;

    //alert(JSON.stringify(meModel));
};

var clickingExample3 = (e) => {
    var meView: Square = TestController.board.getSquareById(e);
	alert("Found square " + meView.getX() + ", " + meView.getY());
};