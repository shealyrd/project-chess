class GameHTMLContainer{
    parentElement: HTMLElement;
    boardElement: string;
    alertTextElement: string;
    throbberElement: string;

    alertTextOn: boolean;
    throbberOn: boolean;

    constructor(parentElement: HTMLElement){
        this.parentElement = parentElement;
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

    update(){
        var newHTML: string = this.boardElement;
        if(this.alertTextOn){
           newHTML += this.alertTextElement;
        }
        if(this.throbberOn){
            newHTML += this.throbberElement;
        }
        this.parentElement.innerHTML = newHTML;
    }
}