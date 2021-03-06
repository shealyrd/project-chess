class Throbber extends HTMLObject{
    contentImg: string = "http://v3.preloaders.net/preloaders/5/colored/5.png";
    z: number;

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

    setZ(z: number) {
        this.z = z;
    }

    getZ(): number {
        return this.z;
    }

    toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
            .addClass("throbber spin")
            .addStyle("position", "absolute")
            .addStyle("left", this.getLeftPos() + "px")
            .addStyle("top", this.getTopPos() + "px")
            .addStyle("width", this.getWidth() + "px")
            .addStyle("z-index", this.getZ() + "")
            .addStyle("height", this.getHeight() + "px");

        builder.addStyle("content", "url(" + this.contentImg + ")");

        return builder.toString();
    }


}