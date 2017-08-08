package projectchess2;

public class MoveFactory {
	
	public static MoveCollection getAllUpwards(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX();
		int y = piece.getPos().getY() - 1;
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			y -= 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllDownwards(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX();
		int y = piece.getPos().getY() + 1;
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			y += 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllRight(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX() + 1;
		int y = piece.getPos().getY();
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x += 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllLeft(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX() - 1;
		int y = piece.getPos().getY();
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x -= 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllCardinal(Piece piece){
		return getAllUpwards(piece)
				.addAll(getAllDownwards(piece))
				.addAll(getAllLeft(piece))
				.addAll(getAllRight(piece));
	}
	
	public static MoveCollection getAllLeftUpDiagonal(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX() - 1;
		int y = piece.getPos().getY() - 1;
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x -= 1;
			y -= 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllLeftDownDiagonal(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX() - 1;
		int y = piece.getPos().getY() + 1;
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x -= 1;
			y += 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllRightDownDiagonal(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX() + 1;
		int y = piece.getPos().getY() + 1;
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x += 1;
			y += 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllRightUpDiagonal(Piece piece){
		MoveCollection result = new MoveCollection();
		
		int x = piece.getPos().getX() + 1;
		int y = piece.getPos().getY() - 1;
		
		while(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
			result.add(new Move(piece.getPos(), new Pos(x, y)));
			if(!piece.getBoard().isFreeSpace(new Pos(x, y))){
				break;
			}
			x += 1;
			y -= 1;
		}
		
		return result;
	}
	
	public static MoveCollection getAllDiagonal(Piece piece){
		return getAllRightUpDiagonal(piece)
				.addAll(getAllRightDownDiagonal(piece))
				.addAll(getAllLeftDownDiagonal(piece))
				.addAll(getAllLeftUpDiagonal(piece));
	}
	
	public static MoveCollection getMoveByRelativePositions(Piece piece, Pos... posArr){
		MoveCollection result = new MoveCollection();
		
		int x, y;
		
		for(Pos pos: posArr){
			x = piece.getPos().getX() + pos.getX();
			y = piece.getPos().getY() + pos.getY();
			
			if(piece.getBoard().isCapturableSpace(new Pos(x, y), piece.getSide())){
				result.add(new Move(piece.getPos(), new Pos(x, y)));
			}
		}

		return result;
	}
	
	public static MoveCollection getNoncapturingMoveByRelativePositions(Piece piece, Pos... posArr){
		MoveCollection result = new MoveCollection();
		
		int x, y;
		
		for(Pos pos: posArr){
			x = piece.getPos().getX() + pos.getX();
			y = piece.getPos().getY() + pos.getY();
			
			if(piece.getBoard().isFreeSpace(new Pos(x, y))){
				result.add(new Move(piece.getPos(), new Pos(x, y)));
			}
		}

		return result;
	}
	
	public static MoveCollection getMoveByRelativePositionsOnlyIfCapturable(Piece piece, Pos... posArr){
		MoveCollection result =  new MoveCollection();
		
		for(Move move: getMoveByRelativePositions(piece, posArr)){
			if(!piece.getBoard().isFreeSpace(move.getDest())){
				result.add(move);
			}
		}

		return result;
	}
}
