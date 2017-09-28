class Square extends HTMLObject{

    constructor(left: number, top: number, width: number, height: number){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
    }

    toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
                .addClass("square")
                .addStyle("position", "absolute")
                .addStyle("left", this.getLeftPos() + "")
                .addStyle("top", this.getTopPos() + "")
                .addStyle("width", this.getWidth() + "px")
                .addStyle("height", this.getHeight() + "px")
                .addStyle("border", "1px solid black");
        return builder.toString();
    }


}