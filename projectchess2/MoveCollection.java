package projectchess2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public class MoveCollection implements Iterable<Move>{
	public List<Move> moves = new ArrayList<Move>();
	
	public void add(Move move){
		moves.add(move);
	}
	
	public MoveCollection addAll(MoveCollection coll){
		for(Move move: coll){
			add(move);
		}
		return this;
	}
	
	public boolean contains(Move move){
		return moves.contains(move);
	}
	
	@Override
	public Iterator<Move> iterator() {
		return moves.iterator();
	}
	
	public void shuffle(){
		Collections.shuffle(moves);
	}
	
}
