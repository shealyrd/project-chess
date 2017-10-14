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

    executeNextMove(){
        if(!this.hasFinished){
            var move: Move = this.getCurrentPlayer().getNextMove(this.board);
            this.board.executeMove(move);
            if(this.hasLost(this.swapColor(this.currentTurn))){
                this.hasFinished = true;
            }
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

    hasFinished(): boolean{
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