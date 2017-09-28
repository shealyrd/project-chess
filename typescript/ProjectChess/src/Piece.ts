abstract class Piece extends HTMLObject{
    z: number;
	contentURL: string;
	
    constructor(left: number, top: number, width: number, height: number, z:number, contentURL: string){
        super();
        this.setTopPos(top);
        this.setLeftPos(left);
        this.setWidth(width);
        this.setHeight(height);
        this.setZ(z);
		this.setContentURL(contentURL);
    }

    setZ(z: number) {
        this.z = z;
    }
	
    getZ(): number {
        return this.z;
    }
	
	setContentURL(url: string){
		this.contentURL = url;
	}
	
	getContentURL(): string{
		return this.contentURL;
	}
	
	toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
                .addClass("piece")
                .addStyle("position", "absolute")
                .addStyle("left", this.getLeftPos() + "")
                .addStyle("top", this.getTopPos() + "")
                .addStyle("width", this.getWidth() + "px")
                .addStyle("height", this.getHeight() + "px")
				.addStyle("content", "url(" + this.getContentURL() + ")")
                .addStyle("z-index", this.getZ() + "");
				
        return builder.toString();
    }
	

}
