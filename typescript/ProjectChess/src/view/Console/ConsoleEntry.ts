class ConsoleEntry extends HTMLObject{
    text: string;

    constructor(left: number, top: number, width: number, height: number, text: string){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
        this.setText(text);
    }

    setText(text: string){
        this.text = text;
    }

    getText(): string{
        return this.text;
    }

    toHTML(): string{
        var innerDiv: string = "{msg}";
        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("font-size", this.getHeight() + "px")
            .addStyle("border", "1px solid black");

        builder.addInnerDiv(innerDiv.replace("{msg}", this.getText()));

        return builder.toString();
    }
}