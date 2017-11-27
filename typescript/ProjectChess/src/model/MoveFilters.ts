class MoveFilters{

	static BASIC = (pos: Pos, piece: PieceModel) => {
			var result: MoveFilterResult;
		    if(piece.getBoardModel().isFree(pos) == false){
                if(piece.getBoardModel().getPieceFromPosition(pos).getColor() != piece.getColor()){
					if(piece.getBoardModel().getSquareTypeAtPos(pos) == SquareType.NORMAL){
						result = new MoveFilterResult(true, true);
					}
					else{
						result = new MoveFilterResult(false, true);
					}
                }
                else{
                    result = new MoveFilterResult(false, true);
                }
            }
			else{
				if(piece.getBoardModel().getSquareTypeAtPos(pos) == SquareType.NORMAL){
					result = new MoveFilterResult(true, false);
				}
				else{
					result = new MoveFilterResult(false, true);
				}
			}
            return result;
		};

	static BASIC_ONLY_WATER = (pos: Pos, piece: PieceModel) => {
			var result: MoveFilterResult;
		    if(piece.getBoardModel().isFree(pos) == false){
                if(piece.getBoardModel().getPieceFromPosition(pos).getColor() != piece.getColor()){
					if(piece.getBoardModel().getSquareTypeAtPos(pos) == SquareType.WATER){
						result = new MoveFilterResult(true, true);
					}
					else{
						result = new MoveFilterResult(false, true);
					}
                }
                else{
                    result = new MoveFilterResult(false, true);
                }
            }
			else{
				if(piece.getBoardModel().getSquareTypeAtPos(pos) == SquareType.WATER){
					result = new MoveFilterResult(true, false);
				}
				else{
					result = new MoveFilterResult(false, true);
				}
			}
            return result;
		};
}