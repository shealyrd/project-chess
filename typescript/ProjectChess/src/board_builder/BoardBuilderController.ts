class BoardBuilderController{
	container: BoardBuilderHTMLContainter;
	
	start(){
		
	}
	
    setElementOnClick(id: string, func: () => void ):void {
        document.getElementById(id).onclick = func;
    }
	
	update(){
		this.getContainer().update();
		this.setAllClickListeners();
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
			controller.getContainer().setBoardHTML += newBoard.toHTML();
			controller.update();
		}
	}
}

function newBoardButtonOnClick() {
    currentX = document.getElementById("xInput").value;
	currentY = document.getElementById("yInput").value;
    boardView = new Board(currentX, currentY);
	document.body,innerHTML = boardView.toHTML();
}