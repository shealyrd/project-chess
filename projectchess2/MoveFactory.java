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
}
