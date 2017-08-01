package projectchess;

public enum Color {

	WHITE{
		@Override
		public Color swap() {
			return Color.BLACK;
		}

		@Override
		public String toString() {
			return "W";
		}
	},
	BLACK{

		@Override
		public Color swap() {
			return Color.WHITE;
		}

		@Override
		public String toString() {
			return "B";
		}
		
	};
	
	public abstract Color swap();
	public abstract String toString();
}
