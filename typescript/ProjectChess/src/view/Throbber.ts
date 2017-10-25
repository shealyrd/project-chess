class Throbber extends HTMLObject{
    contentImg: string = "https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif";
    z: number;

    constructor(left: number, top: number, width: number, height: number, z: number){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
        this.z = z;
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
            .addClass("throbber")
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