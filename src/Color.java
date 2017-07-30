
public enum Color {
	WHITE,
	BLACK;
	
	public static Color change(Color color){
		if(color.equals(Color.WHITE)){
			return Color.BLACK;
		}
		else{
			return Color.WHITE;
		}
	}
}
