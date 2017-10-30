class AlertText extends HTMLObject{
    z: number;
    contentStr: string;

    constructor(width: number, height: number, z: number){
        super();
        this.setWidth(width);
        this.setHeight(height);
        this.z = z;
    }

    centerInSquare(sqrOffsetLeft: number, sqrOffsetTop: number, sqrWidth: number, sqrHeight: number){
        this.setLeftPos(sqrOffsetLeft + (sqrWidth/2 - this.getWidth()/2));
        this.setTopPos(sqrOffsetTop + (sqrHeight/2 - this.getHeight()/2));
    }

    setContent(str: string){
        this.contentStr = str;
    }

    setZ(z: number) {
        this.z = z;
    }

    getZ(): number {
        return this.z;
    }

    toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("z-index", this.getZ() + "")
            .addStyle("height", this.getHeight() + "px")
            .addStyle("font-size", this.getHeight() / 2 + "px")
            .addStyle("pointer-events", "none")
            .addStyle("line-height", this.getHeight() + "px");

        builder.addInnerDiv(this.contentStr);

        return builder.toString();
    }
}
