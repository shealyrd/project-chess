class ConsoleEntry extends HTMLObject{
    text: string;

    constructor(left: number, top: number, width: number, height: number, text: string){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
    }

    setText(text: string){
        this.text = text;
    }

    getText(): string{
        return this.text;
    }

    toHTML(){
        var innerDiv: string = "<p>{msg}</p>";
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "")
            .addStyle("top", this.getTopPos() + "")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("border", "1px solid black");

        builder.addInnerDiv(innerDiv.replace("{msg}", this.getText));
    }
}