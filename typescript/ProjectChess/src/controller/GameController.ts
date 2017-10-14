enum ControllerState{
    ONE_OF_MY_PIECES_SELECTED,
    ONE_OF_OPPONENTS_PIECES_SELECTED
}

class GameController extends Player{
    baseElement: HTMLElement;
    chessGame: ChessGame;
    myColor: Color = Color.WHITE;
    selectedMove: Move;
    boardView: Board;

    constructor(baseElement: HTMLElement){
        super(this.myColor);
        this.baseElement = baseElement;
    }

    start(){
        var board: BoardModel = BoardFactory.getStandardBoard();
        this.boardView = Board.fromSerial(board.serialize());
        var miniMaxAI = new MiniMaxPlayer(Color.BLACK);
        this.chessGame = new ChessGame(board, this, miniMaxAI);
    }

    update(){
        this.boardView = Board.fromSerial(this.getBoardModel().serialize());
        this.baseElement.innerHTML = this.boardView.toHTML();
        ConsoleController.update();
    }

    addClickListeners(){
        this.addMyPieceClickListeners();
        this.addOppPieceClickListeners();
        this.addSquareClickListeners();
    }

    addMyPieceClickListeners():void {
        var pieces: Piece[] = this.boardView.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            if(each.getColor() == this.getColor()){
                var coSqr = this.boardView.getSquareAtPos(each.getX(), each.getY());
                //document.getElementById(coSqr.getId()).onclick = this.getMyPieceClickListenerFunction(coSqr.getId());
                this.setElementOnClick(coSqr.getId(),this.getMyPieceClickListenerFunction(coSqr.getId()));
            }
        }
    }

    getMyPieceClickListenerFunction(id: string){
        return function(){
            if(!this.myPieceIsSelected()){

            }
            else if(this.myPieceIsSelected() && this.representsMovableSpace(id)){

            }
            else if(this.myPieceIsSelected() && !(this.representsMovableSpace(id))){

            }
        };
    }

    addOppPieceClickListeners(){
        var pieces: Piece[] = this.boardView.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            if(each.getColor() == this.swapColor(this.getColor())){
                var coSqr = this.boardView.getSquareAtPos(each.getX(), each.getY());
                //document.getElementById(coSqr.getId()).onclick = this.getMyPieceClickListenerFunction(coSqr.getId());
                this.setElementOnClick(coSqr.getId(),this.getOppPieceClickListenerFunction(coSqr.getId()));
            }
        }
    }

    getOppPieceClickListenerFunction(id: string){
        return function(){
            if(!this.oppPieceIsSelected()){

            }
            else if(this.oppPieceIsSelected()){

            }
        };
    }

    addSquareClickListeners(){
        var squares: Square[] = this.boardView.getSquares();
        for (var square in squares) {
            var each = squares[square];
                //document.getElementById(coSqr.getId()).onclick = this.getMyPieceClickListenerFunction(coSqr.getId());
                this.setElementOnClick(each.getId(),this.getOppPieceClickListenerFunction(each.getId()));
            }
        }

    getSquareClickListenerFunction(id: string){
        return function(){
            if(this.oppPieceIsSelected()){

            }
            else if(this.myPieceIsSelected() && this.representsMovableSpace(id)){

            }
            else if(this.myPieceIsSelected() && !(this.representsMovableSpace(id))){

            }
            else if(!(this.oppPieceIsSelected()) && !(this.myPieceIsSelected())){

            }
        };
    }

    getBoardModel(): BoardModel{
        return this.chessGame.board;
    }

    getNextMove(board): Move{
        return this.selectedMove;
    }

    swapColor(color: Color): Color{
        if(color == Color.BLACK){
            return Color.WHITE;
        }
        else{
            return Color.BLACK;
        }
    }

    setElementOnClick(id:String, func :Function):void {
        document.getElementById(id).onclick = func;
    }
}
