
public class Board {
	private Cell[][] cells;
	
	public void initialize(){
		cells = new Cell[8][8];
		
		Cell newCell = null;
		
		Color color = Color.WHITE;
		
		for(int y = 0; y < 8; y++){
			for(int x = 0; x < 8; x++){
				
				newCell = new Cell(x, y, color);
				cells[x][y] = newCell;
				
				color = Color.change(color);
			}
			color = Color.change(color);
		}
	}
	
	public String toString(){
		StringBuilder builder = new StringBuilder();
		for(int y = 0; y < 8; y++){
			for(int x = 0; x < 8; x++){
				builder.append(cells[x][y].getColor().name());
			}
			builder.append("\n");
		}
		return builder.toString();
	}
}
