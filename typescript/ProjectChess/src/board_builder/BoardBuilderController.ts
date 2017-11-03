class BoardBuilderController{
	container: BoardBuilderHTMLContainter;
	selectedSquareType: SquareType;
	
	start(){
		
	}
	
    setElementOnClick(id: string, func: () => void ):void {
        document.getElementById(id).onclick = func;
    }
	
	update(){
		this.getContainer().update();
		this.setAllClickListeners();
	}
	
	setAllClickListeners(){
		this.setAllBoardSquareListerners();
		this.setAllSquareTypeListerners();
		this.setNewBoardButtonListener();
	}
	
	setNewBoardButtonListener(){
		var newBoardButton = this.getContainer().getNewBoardButton();
		newBoardButton.onclick = this.getNewBoardButtonOnClickFunction(this);
	}
	
	setAllBoardSquareListerners(){
		var sqrs = this.getContainer().getBoardSquares();
		for(var sqrIdx in sqrs){
			var eachSqr = sqrs[sqrIdx];
			this.setElementOnClick(eachSqr.getId(), this.getBoardSquareOnClickFunction(eachSqr.getId(), this));
		}
	}
	
	setAllSquareTypeListerners(){
		var sqrs = this.getContainer().getTypeSquares();
		for(var sqrIdx in sqrs){
			var eachSqr = sqrs[sqrIdx];
			this.setElementOnClick(eachSqr.getId(), this.getSquareTypeOnClickFunction(eachSqr.getId(), this));
		}
	}
	
	getContainer(): BoardBuilderHTMLContainter{
		return this.container;
	}
	
	getNewBoardButtonOnClickFunction(controller: BoardBuilderController){
		return new function () 
		{
		    var currentX = document.getElementById("xInput").value;
			var currentY = document.getElementById("yInput").value;
			Board newBoard = new Board(currentX, currentY);
			controller.getContainer().setBoard(newBoard);
			controller.update();
		}
	
	
	getSquareTypeOnClickFunction(id: string, controller: BoardBuilderController){
		return new function () 
		{
			this.selectedSquareType = controller.getContainer().getTypeSquareFromId(id).getType();
		}
	}
	
	getBoardSquareOnClickFunction(id: string, controller: BoardBuilderController){
		return new function () 
		{
			var sqr = controller.getContainer().getBoardSquareFromId(id);
			sqr.setSquareType(this.selectedSquareType);
			controller.update();
		}
	}
}