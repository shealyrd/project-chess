abstract class Player{
	color: Color;

	constructor(color: Color){
		this.color = color;
	}

	getColor(): Color{
		return this.color;
	}

	abstract getNextMove(board): Move;

}