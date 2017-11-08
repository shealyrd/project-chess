class BoardBuilderHTMLContainer{
	parentElement: HTMLElement;
	boardView: Board;
	typeSquares: Square[];
	xInput: HTMLElement;
	yInput: HTMLElement;
	switchColorsButton: HTMLElement;
	newBoardButton: HTMLElement;
	boardDiv: HTMLIFrameElement;
	outputDiv: HTMLTextAreaElement;
	pieceTypesContainer: HTMLElement;

	constructor(parentElement: HTMLElement){
		this.parentElement = parentElement;
	}

	init(){

		this.xInput = this.createXInput();
		this.yInput = this.createYInput();
		this.newBoardButton = this.createNewBoardButton();
		this.switchColorsButton = this.createSwitchColorsButton();

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
		var breakDiv2 = document.createElement('br');
		var breakDiv3 = document.createElement('br');

		var outputDiv = document.createElement('textarea');
		outputDiv.rows = 8;
		outputDiv.cols = 100;
		this.outputDiv = outputDiv;

		var pieceTypeContainer = this.createPieceTypeContainer();
		this.pieceTypesContainer = pieceTypeContainer;

		this.parentElement.appendChild(xInputContainer);
		this.parentElement.appendChild(yInputContainer);
		this.parentElement.appendChild(this.newBoardButton);
		this.parentElement.appendChild(this.switchColorsButton);
		this.parentElement.appendChild(pieceTypeContainer);
		this.parentElement.appendChild(breakDiv);
		this.parentElement.appendChild(board_div);
		this.parentElement.appendChild(breakDiv2);
		this.parentElement.appendChild(outputDiv);

	}

	update(){
		this.updateBoardHTML();
		this.outputDiv.value = this.boardView.serialize();
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

	setAllPieceTypesToColor(color: Color){
		var typesContainer = document.getElementById("typesContainer");
		while (typesContainer.hasChildNodes()) {
			typesContainer.removeChild(typesContainer.lastChild);
		}
		for(var pieceType in PieceType){
			var piece = new Piece(0, 0, 50, 50, 0, color, +pieceType);
			var newElement = this.createDivFromString(piece.toHTML());
			newElement.id = "piece_type_" + pieceType;
			newElement.style.position = null;
			newElement.style.left = null;
			newElement.style.top = null;
			newElement.style["pointer-events"] = null;
			newElement.style["float"] = "left";
			typesContainer.appendChild(newElement);
		}
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

	createSwitchColorsButton(): HTMLElement{
		var switchColors = document.createElement('button');
		switchColors.id = "switchColorsButton";
		switchColors.innerHTML = "Switch Colors";
		return switchColors;
	}

	createPieceTypeContainer():HTMLElement {
		var typesContainer = document.createElement('div');
		typesContainer.id = "typesContainer";
		typesContainer.style.height = "50px";
		typesContainer.style.width = "100%";
		typesContainer.style.display = "inline-block";
		for(var pieceType in PieceType){
			var piece = new Piece(0, 0, 50, 50, 0, Color.WHITE, +pieceType);
			var newElement = this.createDivFromString(piece.toHTML());
			newElement.id = "piece_type_" + pieceType;
			newElement.style.position = null;
			newElement.style.left = null;
			newElement.style.top = null;
			newElement.style["pointer-events"] = null;
			newElement.style["float"] = "left";
			typesContainer.appendChild(newElement);
		}

		return typesContainer;
	}

	getBoardSquares(): Square[]{
		return this.boardView.getSquares();
	}

	getBoardSquareFromId(id: string): Square{
		return this.boardView.getSquareById(id);
	}

	getSquareElementFromId(id: string): HTMLElement{
		return this.boardDiv.contentDocument.getElementById(id);
	}

	createDivFromString(html: string): HTMLElement{
		var newElement = document.createElement('div');
		newElement.innerHTML = html;
		return <HTMLElement> newElement.firstChild;
	}

	getPieceTypeDivs(): HTMLElement[]{
		var result: HTMLElement[] = new Array();
		var children = this.pieceTypesContainer.children;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			result.push(<HTMLElement> child);
		}
		return result;
	}

	revertAllPieceTypeBorders(){
		var children = this.pieceTypesContainer.children;
		for (var i = 0; i < children.length; i++) {
			var child = <HTMLElement> children[i];
			child.style.border = null;
		}
	}
}
