class GameHTMLContainer{
    parentElement: HTMLElement;
    boardParentElement: HTMLElement;
    boardElement: string;
    alertTextElement: string;
    throbberElement: string;
    choiceModal: HTMLElement;

	boardParentWidth: number;
	boardParentHeight: number;
	
    alertTextOn: boolean;
    throbberOn: boolean;


    constructor(parentElement: HTMLElement){
        this.parentElement = parentElement;
        this.boardParentElement= document.createElement("div");

        parentElement.appendChild(this.boardParentElement);
    }

    setBoardHTML(html: string){
        this.boardElement = html;
    }

    setAlertTextHTML(html: string){
        this.alertTextElement = html;
    }

    setThrobberHTML(html: string){
        this.throbberElement = html;
    }
	
	calculateBoardDimensions(){
		var newElement = document.createElement('div');
		newElement.innerHTML = this.boardElement;
		var firstRow = <HTMLElement> newElement.firstChild;
        this.boardParentWidth = +firstRow.style.width.substring(0, firstRow.style.width.length - 2);
		var rowCount = 0;
		for (var i = 0; i < newElement.children.length; i++) {
			if (newElement.children[i].className == "row") {
                rowCount++;
			}        
		}
		this.boardParentHeight = +firstRow.style.height.substring(0, firstRow.style.height.length - 2) * rowCount;
	}
	
	
    turnOnAlertText(){
        this.alertTextOn = true;
    }

    turnOffAlertText(){
        this.alertTextOn = false;
    }

    turnOnThrobber(){
        this.throbberOn = true;
    }

    turnOffThrobber(){
        this.throbberOn = false;
    }

    setChoiceModal(modal: ChoiceModal){
        if(this.choiceModal != null){
            this.parentElement.removeChild(this.choiceModal);
        }
        this.choiceModal = modal.toHTMLElement();
        this.choiceModal.style.display = "none";
        this.choiceModal.style["z-index"] = 1000;
        this.parentElement.appendChild(this.choiceModal);
    }

    showChoiceModal(){
        this.choiceModal.style.display = "block";
    }

    hideChoiceModal(){
        this.choiceModal.style.display = "none";
    }

	
    update(){
        var newHTML: string = this.boardElement;
        if(this.alertTextOn){
           newHTML += this.alertTextElement;
        }
        if(this.throbberOn){
            newHTML += this.throbberElement;
        }
        this.boardParentElement.innerHTML = newHTML ;
		this.calculateBoardDimensions();
		this.boardParentElement.style.position = "absolute";
        this.boardParentElement.style.width = this.boardParentWidth + "px";
        this.boardParentElement.style.height = this.boardParentHeight + "px";
	}
}