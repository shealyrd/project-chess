class ChessGame{
    board: BoardModel;
    white: Player;
    black: Player;
    currentTurn: Color;
    hasFinished: boolean;

    constructor(board: BoardModel, white: Player, black: Player){
        this.white = white;
        this.black = black;
        this.board = board;
    }

    start(){
        this.currentTurn = Color.WHITE;
        this.getCurrentPlayer().readyForMove();
    }

    executeNextMove(){
        if(!this.isFinished()){
            var move: Move = this.getCurrentPlayer().getNextMove(this.board);
            this.getCurrentPlayer().beforeMove(this.board);
            this.board.executeMove(move);
            this.getCurrentPlayer().afterMove(this.board);
            if(this.hasLost(this.swapColor(this.currentTurn))){
                this.hasFinished = true;
            }
            this.swapPlayers();
        }
        else{
            this.white.onGameEnd();
            this.black.onGameEnd();
        }
        setTimeout(() => {
            if(!this.isFinished()){
                if(this.getCurrentPlayer().isAutoExecute()){
                    this.executeNextMove();
                }
                else{
                    this.getCurrentPlayer().readyForMove();
                }
            }
            else{
                //this.getCurrentPlayer().afterMove(this.board);
                this.white.onGameEnd();
                this.black.onGameEnd();
            }
        }, 10);
    }

    swapPlayers(){
        if(this.currentTurn == Color.WHITE){
            return this.currentTurn = Color.BLACK;
        }
        else{
            return this.currentTurn = Color.WHITE;
        }
    }

    getCurrentPlayer(): Player{
        if(this.currentTurn == Color.WHITE){
            return this.white;
        }
        else{
            return this.black;
        }
    }

    isFinished(): boolean{
        return this.hasFinished;
    }

    hasLost(color: Color): boolean{
        var pieces: PieceModel[] = this.board.getAllPiecesOfColor(color);
        for(var pieceIdx in pieces){
            var eachPiece = pieces[pieceIdx];
            if(eachPiece.getType() == PieceType.KING){
                return false;
            }
        }
        return true;
    }

    isInCheck(color: Color): boolean{
        var pieces: PieceModel[] = this.board.getAllPiecesOfColor(color);
        for(var pieceIdx in pieces){
            var eachPiece = pieces[pieceIdx];
            if(eachPiece.getType() == PieceType.KING){
                if(this.board.getAllMovesForColor(this.swapColor(color)).containsDestination(eachPiece.getPos())){
                    return true;
                }
            }
        }
        return false;
    }

    swapColor(color: Color): Color{
        if(color == Color.BLACK){
            return Color.WHITE;
        }
        else{
            return Color.BLACK;
        }
    }
}