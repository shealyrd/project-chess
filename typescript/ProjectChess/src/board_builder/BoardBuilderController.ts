class BoardBuilderController{
	container: BoardBuilderHTMLContainer;
	selectedSquareType: SquareType;

	constructor(container: BoardBuilderHTMLContainer){
		this.container = container;
	}

	start(){
		this.getContainer().init();
		this.setAllClickListeners();
	}
	
    setElementOnClick(id: string, func: () => void ):void {
        document.getElementById(id).onclick = func;
    }
	
	update(){
		this.getContainer().update();
		this.setAllClickListeners();
	}
	
	setAllClickListeners(){
		//this.setAllBoardSquareListerners();
		//this.setAllSquareTypeListerners();
		this.setNewBoardButtonListener();
	}
	
	setNewBoardButtonListener(){
		var newBoardButton = this.getContainer().getNewBoardButton();
		this.setElementOnClick("newBoardButton", this.getNewBoardButtonOnClickFunction(this));
	}
	
	/*setAllBoardSquareListeners(){
		var sqrs = this.getContainer().getBoardSquares();
		for(var sqrIdx in sqrs){
			var eachSqr = sqrs[sqrIdx];
			this.setElementOnClick(eachSqr.getId(), this.getBoardSquareOnClickFunction(eachSqr.getId(), this));
		}
	}*/
	
	/*setAllSquareTypeListerners(){
		var sqrs = this.getContainer().getTypeSquares();
		for(var sqrIdx in sqrs){
			var eachSqr = sqrs[sqrIdx];
			this.setElementOnClick(eachSqr.getId(), this.getSquareTypeOnClickFunction(eachSqr.getId(), this));
		}
	}*/
	
	getContainer(): BoardBuilderHTMLContainer{
		return this.container;
	}
	
	getNewBoardButtonOnClickFunction(controller: BoardBuilderController): () => void {
		return () => {
			var currentX = (<HTMLInputElement>document.getElementById("xInput")).value;
			var currentY = (<HTMLInputElement>document.getElementById("yInput")).value;
			var newBoard: Board = new Board(+currentX, +currentY, 0, 0);
			controller.getContainer().setBoardView(newBoard);
			controller.update();
		};

	}

	/*getSquareTypeOnClickFunction(id: string, controller: BoardBuilderController){
		return new function () 
		{
			this.selectedSquareType = controller.getContainer().getTypeSquareFromId(id).getType();
			this.selectedSquareType = controller.getContainer().getTypeSquareFromId(id).getType();
		};
	}
	
	getBoardSquareOnClickFunction(id: string, controller: BoardBuilderController){
		return new function () 
		{
			var sqr = controller.getContainer().getBoardSquareFromId(id);
			sqr.setSquareType(this.selectedSquareType);
			controller.update();
		};
	}*/
}