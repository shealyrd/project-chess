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
        TestController.boardModel.placePiece(PieceType.ROOK, 0, 0, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.KNIGHT, 1, 0, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.BISHOP, 2, 0, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.QUEEN, 3, 0, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.KING, 4, 0, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.BISHOP, 5, 0, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.KNIGHT, 6, 0, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.ROOK, 7, 0, Color.BLACK);

        TestController.boardModel.placePiece(PieceType.PAWN, 0, 1, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.PAWN, 1, 1, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.PAWN, 2, 1, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.PAWN, 3, 1, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.PAWN, 4, 1, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.PAWN, 5, 1, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.PAWN, 6, 1, Color.BLACK);
        TestController.boardModel.placePiece(PieceType.PAWN, 7, 1, Color.BLACK);


        TestController.boardModel.placePiece(PieceType.ROOK, 3, 3, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.KNIGHT, 1, 7, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.BISHOP, 2, 7, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.QUEEN, 3, 7, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.KING, 4, 7, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.BISHOP, 5, 7, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.KNIGHT, 6, 7, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.ROOK, 7, 7, Color.WHITE);

        TestController.boardModel.placePiece(PieceType.PAWN, 0, 6, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.PAWN, 1, 6, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.PAWN, 2, 6, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.PAWN, 3, 6, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.PAWN, 4, 6, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.PAWN, 5, 6, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.PAWN, 6, 6, Color.WHITE);
        TestController.boardModel.placePiece(PieceType.PAWN, 7, 6, Color.WHITE);



        TestController.board = Board.fromSerial(TestController.boardModel.serialize());
    }

    static update(){
        document.body.innerHTML = TestController.board.toHTML();
        var pieces: Piece[] = TestController.board.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            document.getElementById(each.getId() + "").setAttribute("onclick", "clickingExample("+ + each.getId() + ")");

        }
    }
}

var clickingExample = (e) => {
    alert("in click");
    var me = TestController.board.getPieceById(e);
    alert(JSON.stringify(me));
};