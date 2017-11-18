class ChoiceModal{
    choices: string[] = new Array();
    rowHeight: number;
    width: number;
    onChoice: (choice: string) => void;

    constructor(rowHeight?: number, width?: number){
        if(rowHeight == null){
            rowHeight = 23;
        }
        if(width == null){
            width = 154;
        }
        this.rowHeight = rowHeight;
        this.width = width;
    }

    addChoice(newChoice: string){
        this.choices.push(newChoice);
    }

    setOnChoice(inputfunc: (choice: string) => void){
        this.onChoice = inputfunc;
    }

    toHTML():string{
        var builder: HTMLBuilder = new HTMLBuilder();
        var choiceListHTML = this.getChoiceListHTML();

        builder
            .newDiv()
            .addStyle("width", this.width + "px")
            .addStyle("display", "inline-block");

        builder.addInnerDiv(choiceListHTML);

        return builder.toString();
    }

    toHTMLElement(): HTMLElement{
        var newElement = document.createElement('div');
        newElement.innerHTML = this.toHTML();
        var result = <HTMLElement> newElement.firstChild;
        for (var i = 0; i < result.children.length; i++) {
            var eachElement = <HTMLElement> result.children[i];
            eachElement.onmouseover = function() { this.style.backgroundColor = "rgb(222,222,222)"};
            eachElement.onmouseleave = function() { this.style.backgroundColor = "#ebebeb"};
            eachElement.onclick = (function(element, global) {return () => {global.onChoice(element.innerHTML)}}(eachElement, this));
        }

        return result;
    }

    getChoiceListHTML():string {
        var result = "";
        for(var choice in this.choices){
            var eachChoice = this.choices[choice];
            var builder: HTMLBuilder = new HTMLBuilder();
            builder.newDiv()
                .addClass("choice_model_item")
                .addStyle("height", this.rowHeight + "px")
                .addStyle("vertical-align", "middle")
                .addStyle("padding", (this.rowHeight / 1.77) + "px " + (this.rowHeight / 2.3) + "px")
                .addStyle("top", "0")
                .addStyle("font-weight", "300")
                .addStyle("font-size", "18px")
                .addStyle("font-family", "Roboto, sans-serif")
                .addStyle("color", "#555")
                .addStyle("background-color", "#ebebeb");
            builder.addInnerDiv(eachChoice);
            result = result + builder.toString();
        }
        return result;
    }
}