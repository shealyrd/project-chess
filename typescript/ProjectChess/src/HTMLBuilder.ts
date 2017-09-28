class HTMLBuilder{

    styles = {};
    classes: string[] = new Array();
    base: string = "<div {info-template}></div>";

    newDiv(): HTMLBuilder{
        return this;
    }

    addStyle(type: string, value: string): HTMLBuilder{
        this.styles[type] = value;
        return this;
    }

    addClass(classname: string): HTMLBuilder{
        this.classes.push(classname);
        return this;
    }

    toString(): string{
        var result: string;
        var style: string;
        var classDef: string;

        style = "style=\"";
        for(var each in this.styles){
            style = style + each + ": " + this.styles[each] + "; ";
        }
        style = style + "\"";

        classDef = "class=\"";
        for (var eachClass in this.classes) {
            classDef = classDef + this.classes[eachClass] + " ";
        }
        classDef = classDef + "\"";

        result = this.base.replace("{info-template}", (classDef + " " + style));

        return result;
    }
}