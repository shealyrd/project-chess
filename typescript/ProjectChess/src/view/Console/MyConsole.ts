class MyConsole extends HTMLObject{
    lines: ConsoleEntry[] = new Array();
    entryHeight: number = 20;
    consoleWidth: number = 400;
    consoleHeight: number = 200;

    constructor(leftPos: number, upPos: number){
        super();
        this.setHeight(this.consoleHeight);
        this.setWidth(this.consoleWidth);
        this.setLeftPos(leftPos);
        this.setTopPos(upPos);
        this.setId("my-console");
    }

    addEntry(text: string){
        var newEntry: ConsoleEntry = new ConsoleEntry(0, (this.entryHeight * (this.lines.length)) - 1, this.getWidth() - 20, this.entryHeight, text);
        this.lines.push(newEntry);
    }

    toHTML(): string{
        var text: string = "";

        for(var lineIdx in this.lines){
            text += this.lines[lineIdx].toHTML();
        }

        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("overflow-y", "scroll")
            .addStyle("position", "absolute")
            .addStyle("border", "1px solid black")
            .addStyle("left", this.getLeftPos() + "")
            .addStyle("top", this.getTopPos() + "")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px")
            .setId(this.getId());

        builder.addInnerDiv(text);
        return builder.toString();
    }
}