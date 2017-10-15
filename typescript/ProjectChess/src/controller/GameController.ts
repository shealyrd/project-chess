class GameController extends Player{
    baseElement: HTMLElement;
    chessGame: ChessGame;
    myColor: Color = Color.WHITE;
    boardView: Board;

    //temp storage
    SELECTED_PIECE: PieceModel;
    CHOSEN_MOVE: Move;

    offsetTop: number;
    offsetLeft: number;
    squareWidth: number;
    squareHeight: number;

    constructor(baseElement: HTMLElement, offsetTop?: number, offsetLeft?: number, squareWidth?: number, squareHeight?: number){
        super(Color.WHITE);
        this.baseElement = baseElement;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
        this.squareWidth = squareWidth;
        this.squareHeight = squareHeight;
    }

    start(){
        var board: BoardModel = BoardFactory.getStandardBoard();
        //alert(this.offsetTop + " " + this.offsetLeft + " " + this.squareWidth + " " + this.squareHeight);
        this.boardView = Board.fromSerial(board.serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        var miniMaxAI = new MiniMaxPlayer(Color.BLACK);
        this.chessGame = new ChessGame(board, this, miniMaxAI);
        this.update();
        this.chessGame.start();
    }

    update(){
        this.baseElement.innerHTML = this.boardView.toHTML();
        if (this.chessGame.currentTurn == this.getColor()) {
            this.addClickListeners();
        }
        else{
            this.turnOffClickListeners();
        }
        //ConsoleController.update();
    }

    turnOffClickListeners():void {
        var squares: Square[] = this.boardView.getSquares();
        for (var square in squares) {
            var each = squares[square];
            this.setElementOnClick(each.getId(), () => {});
        }
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
            if (each.getColor() == this.getColor()) {
                var coSqr = this.boardView.getSquareAtPos(each.getPos());
                //document.getElementById(coSqr.getId()).onclick = this.getMyPieceClickListenerFunction(coSqr.getId());
                this.setElementOnClick(coSqr.getId(),this.getMyPieceClickListenerFunction(coSqr.getId(), this));

            }
        }
    }

    getMyPieceClickListenerFunction(id: string, control: GameController){
        return function () {
            if(!control.myPieceIsSelected()){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
            }
            else if(control.myPieceIsSelected()){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
            }
            else if(control.myPieceIsSelected() && !(control.representsMovableSpace(id))){
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if(control.myPieceIsSelected() && control.representsMovableSpace(id)){
                var sqr: Square = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr);
                control.signalOpponentsMove();
            }
        };
    }

    addOppPieceClickListeners(){
        var pieces: Piece[] = this.boardView.getPieces();
        for (var piece in pieces) {
            var each = pieces[piece];
            if (each.getColor() == this.swapColor(this.getColor())) {
                var coSqr = this.boardView.getSquareAtPos(each.getPos());
                this.setElementOnClick(coSqr.getId(),this.getOppPieceClickListenerFunction(coSqr.getId(), this));
            }
        }
    }

    getOppPieceClickListenerFunction(id: string, control: GameController){
        return function () {
            if (!control.oppPieceIsSelected() && !control.myPieceIsSelected()) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if (control.oppPieceIsSelected()) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if(control.myPieceIsSelected() && !(control.representsMovableSpace(id))){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if(control.myPieceIsSelected() && control.representsMovableSpace(id)){
                var sqr: Square = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr);
            }
        };
    }

    addSquareClickListeners(){
        var squares: Square[] = this.boardView.getSquares();
        for (var square in squares) {
            var each = squares[square];
            if (this.hasNoClickListener(each.getId())) {
                this.setElementOnClick(each.getId(),this.getSquareClickListenerFunction(each.getId(), this));
            }
        }
    }

    getSquareClickListenerFunction(id: string, control: GameController){
        return function () {
            if(control.oppPieceIsSelected()){
                control.unselectPiece();
                control.resetSquareColors();
            }
            else if(control.myPieceIsSelected() && control.representsMovableSpace(id)){
                var sqr: Square = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr);
            }
            else if(control.myPieceIsSelected() && !(control.representsMovableSpace(id))){
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
        };
    }

    hasNoClickListener(id: string) {
        return document.getElementById(id).onclick == null || document.getElementById(id).onclick == undefined;
    }

    getBoardModel(): BoardModel{
        return this.chessGame.board;
    }

    swapColor(color: Color): Color{
        if(color == Color.BLACK){
            return Color.WHITE;
        }
        else{
            return Color.BLACK;
        }
    }

    setElementOnClick(id: string, func: () => void ):void {
        document.getElementById(id).onclick = func;
    }

    setSelectedPiece(piece: PieceModel){
        this.SELECTED_PIECE = piece;
    }

    myPieceIsSelected():boolean {
        return ((this.SELECTED_PIECE != null && this.SELECTED_PIECE != undefined) && this.SELECTED_PIECE.getColor() == this.getColor());
    }

    representsMovableSpace(id: string): boolean {
        var moves: MoveCollection = this.SELECTED_PIECE.getPossibleMoves();
        var sqr: Square = this.boardView.getSquareById(id);
        var thisMove = new Move(this.SELECTED_PIECE.getPos(), new Pos(sqr.getX(), sqr.getY()));
        return moves.contains(thisMove);
    }

    oppPieceIsSelected():boolean {
        return ((this.SELECTED_PIECE != null && this.SELECTED_PIECE != undefined) && this.SELECTED_PIECE.getColor() == this.swapColor(this.getColor()));
    }

    getSquareAtId(id: string): Square{
        return this.boardView.getSquareById(id);
    }

    tracePieceMoves(piece: PieceModel, hex: string):void {
        var moves: MoveCollection = piece.getPossibleMoves();
        this.setSquaresToColor(moves, hex);
        this.setSquareToColor(piece.getPos(), hex);
        this.setSelectedPiece(piece);
        this.update();
    }

    moveSelectedPieceToSquare(sqr:Square):void {
        this.turnOffClickListeners();
        var move: Move = new Move(this.SELECTED_PIECE.getPos(), sqr.getPos());
        this.setChosenMove(move);
        this.unselectPiece();
        this.resetSquareColors();
        this.signalOpponentsMove();
    }

    getPieceAtSquareId(id: string): PieceModel{
        var sqr = this.getSquareAtId(id);
        var result: PieceModel = this.getBoardModel().getPieceFromPosition(sqr.getPos());
        return result;
    }

    unselectPiece():void {
        this.SELECTED_PIECE = null;
    }

    resetSquareColors():void {
        this.boardView.unselectAllSquares();
    }

    signalOpponentsMove():void {
        this.turnOffClickListeners();
        this.chessGame.executeNextMove();
    }

    getNextMove(board): Move{
        return this.getChosenMove();
    }

    getChosenMove():Move {
        return this.CHOSEN_MOVE;
    }

    setChosenMove(move: Move){
        this.CHOSEN_MOVE = move;
    }

    isAutoExecute(): boolean{
        return false;
    }

    afterMove(board: BoardModel) {
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.update();
        this.turnOffClickListeners();
    }


    beforeMove(board: BoardModel) {
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.update();
        this.turnOffClickListeners();
    }

    setSquareToColor(pos: Pos, hex: string):void {
        var eachSqr: Square = this.boardView.getSquareAtPos(pos);
        eachSqr.setHexColor(hex);
    }

    setSquaresToColor(moves: MoveCollection, hex: string):void {
        for(var moveIdx in moves.getMoves()){
            var eachMove: Move = moves.getMoves()[moveIdx];
            var eachSqr: Square = this.boardView.getSquareAtPos(eachMove.getDest());
            eachSqr.setHexColor(hex);
        }
    }

    readyForMove(){
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        this.update();
        this.addClickListeners();
    }
}