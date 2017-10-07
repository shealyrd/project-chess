class Console extends HTMLObject{
    lines: string[] = new Array();

    toHTML(){
        var text: string = "";

        for(var lineIdx in this.lines){
            text += this.lines[lineIdx] + "/n";
        }

        var builder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("overflow-y", "scroll")
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "")
            .addStyle("top", this.getTopPos() + "")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("height", this.getHeight() + "px");
    }
}