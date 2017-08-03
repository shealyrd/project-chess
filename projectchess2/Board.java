package projectchess2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public abstract class Board {
	
	int HEIGHT = 0;
	int WIDTH = 0;
	
	Map<Pos, Piece> pieceMap;
	
	PieceFactory pieceFactory = new PieceFactory(this);
	
	//public abstract Context getContext(Position pos);
	

	public Board(int argHeight, int argWidth) {
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
	
	public ArrayList<Piece> getPieces(){
		ArrayList<Piece> result = new ArrayList<Piece>();
		for(Piece piece: pieceMap.values()){
			if(!(Piece.isEmpty(piece))){
				result.add(piece);
			}
		}
		return result;
	}
	
	public boolean validPosition(Pos pos){
		return pieceMap.containsKey(pos);
	}
	
	public boolean isFreeSpace(Pos pos){
		return validPosition(pos) && (Piece.isEmpty(pieceMap.get(pos)));
	}
	
	public void addPiece(Pos pos, PieceType type, Side side){
		Piece newPiece = PieceFactory.createPiece(pos, type, side);
		placePiece(newPiece);
	}
	
	public Piece getPiece(Pos pos){
		return pieceMap.get(pos);
	}
	
	public void movePiece(Piece piece, Pos dest){
		removePiece(piece);
		Piece transposedPiece = PieceFactory.createPieceByTransposition(dest, piece);
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
	
	//TODO
	public abstract void executeMove(Move move);
	public abstract boolean isInCheckmate(Side side);
}	
