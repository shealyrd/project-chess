class BoardBuilderController{
	container: BoardBuilderHTMLContainer;
	//selectedSquareType: SquareType;
	selectedPieceType: PieceType;

	constructor(container: BoardBuilderHTMLContainer){
		this.container = container;
	}

	start(){
		this.getContainer().init();
		this.setNewBoardButtonListener();
	}
	
    setElementOnClick(id: string, func: () => void ):void {
        document.getElementById(id).onclick = func;
    }
	
	update(){
		this.getContainer().update();
		this.setAllClickListeners();
	}
	
	setAllClickListeners(){
		this.setAllBoardSquareListeners();
		//this.setAllSquareTypeListerners();
	}
	
	setNewBoardButtonListener(){
		var newBoardButton = this.getContainer().getNewBoardButton();
		this.setElementOnClick("newBoardButton", this.getNewBoardButtonOnClickFunction(this));
	}
	
	setAllBoardSquareListeners(){
		var sqrs = this.getContainer().getBoardSquares();
		for(var sqrIdx in sqrs){
			var eachSqr = sqrs[sqrIdx];
			//this.setElementOnClick(eachSqr.getId(), this.getBoardSquareOnClickFunction(eachSqr.getId(), this));
			this.getContainer().getSquareElementFromId(eachSqr.getId()).onclick = this.getBoardSquareOnClickFunction(eachSqr.getId(), this);
		}
	}

	setAllPieceTypeListeners(){
		var pieces = this.getContainer().getPieceTypeDivs();

		for(var eachPieceIdx in pieces){
			var eachPieceDiv: HTMLElement = pieces[eachPieceIdx];
			eachPieceDiv.onclick = this.getPieceTypeClickListener(eachPieceDiv, this);
		}
	}

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
	}*/



	getBoardSquareOnClickFunction(id: string, controller: BoardBuilderController){
		return () =>
		{
			var sqr: Square = controller.getContainer().getBoardSquareFromId(id);
			if(sqr.getType() == SquareType.NORMAL){
				sqr.setType(SquareType.NON_EXISTENT)
			}
			else{
				sqr.setType(SquareType.NORMAL)
			}
			//sqr.setType(this.selectedSquareType);
			controller.update();
		};
	}

	getPieceTypeClickListener(eachPieceDiv:HTMLElement, boardBuilderController:BoardBuilderController): () => void {
		return () => {
			boardBuilderController.getContainer().revertAllPieceTypeBorders();
			eachPieceDiv.style.border = "1px solid black";
			var pieceType = +(eachPieceDiv.id.substring(11, eachPieceDiv.id.length));
			boardBuilderController.selectedPieceType = pieceType;
		}
	}
}