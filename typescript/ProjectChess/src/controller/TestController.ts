class TestController{
    static board: Board;


    static run() {
        TestController.board = new Board(8, 8);
        document.body.innerHTML = TestController.board.toHTML();

        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13) {
                TestController.board.setStandard();
            }

            document.body.innerHTML = TestController.board.toHTML();
        }
    }

}