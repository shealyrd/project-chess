class BoardBuilderHTMLContainer{
	parentElement: HTMLElement;
	boardView: Board;
	typeSquares: Square[];
	xInput: HTMLElement;
	yInput: HTMLElement;
	newBoardButton: HTMLElement;
	boardDiv: HTMLIFrameElement;

	constructor(parentElement: HTMLElement){
		this.parentElement = parentElement;
	}

	init(){

		this.xInput = this.createXInput();
		this.yInput = this.createYInput();
		this.newBoardButton = this.createNewBoardButton();

		var xInputContainer: HTMLElement = document.createElement('div');
		xInputContainer.id = "xInputContainer";
		xInputContainer .innerHTML += "Width: ";
		xInputContainer.appendChild(this.xInput);

		var yInputContainer: HTMLElement = document.createElement('div');
		yInputContainer.id = "yInputContainer";
		yInputContainer .innerHTML += "Height: ";
		yInputContainer.appendChild(this.yInput);

		var board_div: HTMLIFrameElement = document.createElement('iframe');
		board_div.id = "board-div";
		board_div.scrolling = "no";
		board_div.frameBorder = "0";
		board_div.style["seamless"] = "seamless";
		board_div.style.overflow = "hidden";
		this.boardDiv = board_div;

		var breakDiv = document.createElement('br');

		this.parentElement.appendChild(xInputContainer);
		this.parentElement.appendChild(yInputContainer);
		this.parentElement.appendChild(this.newBoardButton);
		this.parentElement.appendChild(breakDiv);
		this.parentElement.appendChild(board_div);

		board_div.insertAdjacentHTML("beforeBegin", " ");
	}

	update(){
		this.updateBoardHTML();
	}

	updateBoardHTML(){
		this.boardDiv.contentDocument.body.innerHTML = this.boardView.toHTML();
		this.boardDiv.height = this.boardView.getPixelHeight() + 5 + "px";
		this.boardDiv.width = this.boardView.getPixelWidth() + 5 + "px";
	}

	getBoardView(){
	 return this.boardView;
	}

	getTypeSquares(){
	 return this.typeSquares;
	}

	getXInput(){
		return this.xInput;
	}

	getYInput(){
		return this.yInput;
	}

	getNewBoardButton(){
		return this.newBoardButton;
	}

	setBoardView(board: Board){
	 this.boardView = board;
	}

	setXInput(element: HTMLElement){
		this.xInput = element;
	}

	setYInput(element: HTMLElement){
		this.yInput = element;
	}

	setNewBoardButton(element: HTMLElement){
		this.newBoardButton = element;
	}

	createXInput(): HTMLElement{
		var xInput = document.createElement('input');
		xInput.id = "xInput";
		return xInput;
	}

	createYInput(): HTMLElement{
		var yInput = document.createElement('input');
		yInput.id = "yInput";
		return yInput;
	}

	createNewBoardButton(): HTMLElement{
		var newBoardButton = document.createElement('button');
		newBoardButton.id = "newBoardButton";
		newBoardButton.innerHTML = "Create New Board";
		return newBoardButton;
	}
}
