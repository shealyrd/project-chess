class GameHTMLContainer{
    parentElement: HTMLElement;
    boardParentElement: HTMLElement;
    boardElement: string;
    alertTextElement: string;
    throbberElement: string;
    choiceModal: HTMLElement;

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
        /*this.boardParentElement.style.display = "inline-block";
        this.boardParentElement.style.width = "auto";
        this.boardParentElement.style.height = "auto";*/

        //You need to pass in the board and do the math
}
}