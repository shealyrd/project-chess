abstract class Player{
	color: Color;
	autoExecute: boolean

	constructor(color: Color){
		this.color = color;
	}

	getColor(): Color{
		return this.color;
	}

	readyForMove(){}
	afterMove(board: BoardModel){}
	beforeMove(board: BoardModel){}
	onGameEnd(){}

	abstract getNextMove(board: BoardModel): Move;
	abstract isAutoExecute(): boolean;

}