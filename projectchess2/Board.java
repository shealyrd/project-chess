package projectchess2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Board {
	
	int HEIGHT = 0;
	int WIDTH = 0;
	
	Map<Pos, Piece> pieceMap;
	
	PieceFactory pieceFactory = new PieceFactory(this);
	
	//public abstract Context getContext(Position pos);
	
	private Board(){};
	
	public Board(int argWidth, int argHeight) {
		HEIGHT = argHeight;
		WIDTH = argWidth;
		
		pieceMap = new HashMap<Pos, Piece>(argHeight * argWidth);
		
		for(int y = 0; y < argHeight; y++){
			for(int x = 0; x < argWidth; x++){
				pieceMap.put(new Pos(x, y), new EmptyPiece());
			}
		}
		
	}

	public int getHeight(){
		return HEIGHT;
	}
	
	public int getWidth(){
		return WIDTH;
	}
	
	public ArrayList<Piece> getPieces(Side side){
		ArrayList<Piece> result = new ArrayList<Piece>();
		for(Piece piece: pieceMap.values()){
			if(!(Piece.isEmpty(piece)) && piece.getSide().equals(side)){
				result.add(piece);
			}
		}
		return result;
	}
	
	public int getDirection(Side side){
		if(side.equals(Side.WHITE)){
			return 1;
		}
		else{
			return -1;
		}
	}
	
	public boolean validPosition(Pos pos){
		return pieceMap.containsKey(pos);
	}
	
	public boolean isFreeSpace(Pos pos){
		return validPosition(pos) && (Piece.isEmpty(pieceMap.get(pos)));
	}
	
	public boolean isCapturableSpace(Pos pos, Side side){
		return isFreeSpace(pos) || (validPosition(pos) && !getPiece(pos).getSide().equals(side));
	}
	
	public void addPiece(Pos pos, PieceType type, Side side){
		Piece newPiece = pieceFactory.createPiece(pos, type, side);
		placePiece(newPiece);
	}
	
	public Piece getPiece(Pos pos){
		return pieceMap.get(pos);
	}
	
	public void movePiece(Piece piece, Pos dest){
		removePiece(piece);
		Piece transposedPiece = pieceFactory.createPieceByTransposition(dest, piece);
		placePiece(transposedPiece);
	}
	
	private void placePiece(Piece piece){
		pieceMap.put(piece.getPos(), piece);
	}
	
	public void removePiece(Piece piece){
		removePiece(piece.getPos());
	}
	
	public void removePiece(Pos origin){
		pieceMap.put(origin, new EmptyPiece());
	}
	
	public void executeMove(Move move){
		if(!isFreeSpace(move.getOrigin())){
			Piece piece = getPiece(move.getOrigin());
			movePiece(piece, move.getDest());
		}
		else{
			System.out.println("Invalid move");
		}
	}
	
	//public abstract boolean isInCheckmate(Side side);
	
	public Board copy(){
		Board newBoard = null;
		try{
			newBoard = this.getClass().getDeclaredConstructor().newInstance();
		}
		catch(Exception e){}
		PieceFactory factory = new PieceFactory(newBoard);
		for(Pos pos: pieceMap.keySet()){
			newBoard.placePiece(factory.copyPiece(getPiece(pos)));
		}
		
		return newBoard;
	}
	
	
}	
