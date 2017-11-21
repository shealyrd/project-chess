class GameController extends Player{
    htmlContainer: GameHTMLContainer;
    chessGame: ChessGame;
    myColor: Color = Color.WHITE;
    boardView: Board;
    consoleCtrl: ConsoleController;
    //temp storage
    SELECTED_PIECE: PieceModel;
    CHOSEN_MOVE: Move;

    offsetTop: number;
    offsetLeft: number;
    squareWidth: number;
    squareHeight: number;

    throbber: Throbber;
    alertText: AlertText;

    constructor(htmlContainer: GameHTMLContainer, offsetTop?: number, offsetLeft?: number, squareWidth?: number, squareHeight?: number){
        super(Color.WHITE);
        this.htmlContainer = htmlContainer;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
        this.squareWidth = squareWidth;
        this.squareHeight = squareHeight;
    }


    start(){
        //var board: BoardModel = BoardFactory.getTamerlaneBoard();
        var board: BoardModel = BoardFactory.testBoard();
        this.throbber = new Throbber(this.squareWidth * 2, this.squareHeight * 2, 99);
        this.throbber.centerInSquare(this.offsetLeft, this.offsetTop, this.squareWidth * board.getWidth(), this.squareHeight * board.getHeight());
        this.htmlContainer.setThrobberHTML(this.throbber.toHTML());
        this.alertText = new AlertText(this.squareWidth * 2, this.squareHeight * 2, 100);
        this.alertText.centerInSquare(this.offsetLeft, this.offsetTop, this.squareWidth * board.getWidth(), this.squareHeight * board.getHeight());
        this.consoleCtrl = new ConsoleController(this.offsetLeft, this.offsetTop + (this.squareWidth * board.getWidth()), this.squareWidth * 8, this.squareWidth * 2, 50);
        this.boardView = Board.fromSerial(board.serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
        var miniMaxAI = new MiniMaxPlayer(Color.BLACK);
        this.chessGame = new ChessGame(board, this, miniMaxAI);
        this.update();
        this.chessGame.start();
    }

    update(){
        this.htmlContainer.setBoardHTML(this.boardView.toHTML());
        this.htmlContainer.update();

        if (this.chessGame.currentTurn == this.getColor()) {
            this.addClickListeners();
        }
        else{
            this.turnOffClickListeners();
        }
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

    log(txt: string){
        if(this.consoleCtrl){
            this.consoleCtrl.log(txt);
        }
    }


    turnOnThrobber(){
        this.htmlContainer.turnOnThrobber();
    }

    getMyPieceClickListenerFunction(id: string, control: GameController){
        return function () {
            if(!control.myPieceIsSelected()){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                if(thisPiece.getPossibleMoves().containsType(MoveType.FLING)){
                    var choiceModal = new ChoiceModal();
                    choiceModal.addChoice("Move");
                    choiceModal.addChoice("Fire");
                    choiceModal.setInMiddleOfElement(control.htmlContainer.boardParentElement);
                    choiceModal.setOnChoice((result) => {
                        control.htmlContainer.hideChoiceModal();
                        control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
                    });
                    control.htmlContainer.setChoiceModal(choiceModal);
                    control.htmlContainer.showChoiceModal();
                }
                else{
                    control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_BLUE);
                }

            }
            else if(control.myPieceIsSelected() && control.selectedPieceIsAtSquareId(id)){
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if(control.myPieceIsSelected() && !control.selectedPieceIsAtSquareId(id)){
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
                control.moveSelectedPieceToSquare(sqr, MoveType.CAPTURE);
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
            else if (control.oppPieceIsSelected() && !control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if (control.oppPieceIsSelected() && control.selectedPieceIsAtSquareId(id)) {
                control.unselectPiece();
                control.resetSquareColors();
                control.update();
            }
            else if(control.myPieceIsSelected() && !(control.representsMovableSpace(id))){
                control.unselectPiece();
                control.resetSquareColors();
                var thisPiece: PieceModel = control.getPieceAtSquareId(id);
                control.tracePieceMoves(thisPiece, StaticColors.SQUARE_SELECTION_RED);
            }
            else if(control.myPieceIsSelected() && control.representsMovableSpace(id)){
                var sqr: Square = control.getSquareAtId(id);
                control.moveSelectedPieceToSquare(sqr, MoveType.CAPTURE);
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
                control.moveSelectedPieceToSquare(sqr, MoveType.NONCAPTURE);
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
        var thisMove = new Move(this.SELECTED_PIECE.getPos(), new Pos(sqr.getX(), sqr.getY()), MoveType.NONEXECUTABLE);
        return moves.containsIgnoreType(thisMove);
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

    moveSelectedPieceToSquare(sqr:Square, type: MoveType):void {
        this.turnOffClickListeners();
        var move: Move = new Move(this.SELECTED_PIECE.getPos(), sqr.getPos(), type);
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
        this.doCheckLogging();
		this.turnOnThrobber();
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

    selectedPieceIsAtSquareId(id:string):Boolean {
        var sqr: Square = this.getSquareAtId(id);
        if(this.SELECTED_PIECE.getPos().equals(sqr.getPos())){
            return true;
        }
        return false;
    }

    setSquaresToColor(moves: MoveCollection, hex: string):void {
        for(var moveIdx in moves.getMoves()){
            var eachMove: Move = moves.getMoves()[moveIdx];
            var eachSqr: Square = this.boardView.getSquareAtPos(eachMove.getDest());
            eachSqr.setHexColor(hex);
        }
    }

    doCheckLogging(): boolean{
        if(this.chessGame.isInCheck(this.getColor())){
            this.showAlertText("Check!");
            return true;
        }
        else if(this.chessGame.isInCheck(this.swapColor(this.getColor()))){
             this.showAlertText("Check!");
            return true;
        }
        else if(this.chessGame.hasLost(this.getColor())){
            this.showAlertText("You Lose!");
            return true;
        }
        else if(this.chessGame.hasLost(this.swapColor(this.getColor()))){
            this.showAlertText("You Win!");
            return true;
        }
        return false;
    }

    showAlertText(txtToShow: string){
            var lock: boolean = true;
            this.alertText.setContent(txtToShow);
            this.htmlContainer.setAlertTextHTML(this.alertText.toHTML());
            this.htmlContainer.turnOnAlertText();
            this.htmlContainer.update();
            setTimeout(() => {
                this.htmlContainer.turnOffAlertText();
                this.htmlContainer.update();
                this.addClickListeners();
            }, 3000);
    }

    readyForMove(){
        this.boardView = Board.fromSerial(this.getBoardModel().serialize(), this.offsetTop, this.offsetLeft, this.squareWidth, this.squareHeight);
		this.turnOffThrobber();
        this.update();
        if(!this.doCheckLogging()){
            this.addClickListeners();
        }
    }

    turnOffThrobber():void {
        this.htmlContainer.turnOffThrobber();
    }

    onGameEnd(){
        this.turnOffThrobber();
        this.doCheckLogging();
    }
}