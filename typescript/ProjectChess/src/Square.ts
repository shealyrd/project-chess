/**
 * Created by Evan on 9/27/2017.
 */


class Square implements HTMLObject{


    toHTML():string {
        var builder: HTMLBuilder = new HTMLBuilder();
        builder.newDiv()
                .addClass("piece")
                .addStyle("position", "absolute")
                .addStyle("left", "100")
                .addStyle("top", "100")
                .addStyle("width", "49px")
                .addStyle("height", "49px")
                .addStyle("border", "1px solid black");
        return builder.toString();
    }


}