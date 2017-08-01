package projectchess;

import java.util.ArrayList;
import java.util.Collection;

public abstract class Filter<T> {
	
	public abstract boolean passesFilter(T t);
	
	public ArrayList<T> filter(Collection<T> coll){
		ArrayList<T> result = new ArrayList<T>();
		for(T t: coll){
			if(passesFilter(t)){
				result.add(t);
			}
		}
		return result;
	}
}
