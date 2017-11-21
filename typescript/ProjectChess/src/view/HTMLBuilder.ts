class HTMLBuilder{

    styles = {};
    classes: string[] = new Array();
	innerDivs: string[] = new Array();
    base: string = "<div {info-template}>{inner}</div>";
    id: string;



    newDiv(): HTMLBuilder{
        return this;
    }

    setId(id: string): HTMLBuilder{
        this.id = id;
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
	
	addInnerDiv(innerDiv: string): HTMLBuilder{
        this.innerDivs.push(innerDiv);
        return this;
    }

    toString(): string{
        var result: string;
        var style: string;
        var idDef: string = "";
        var classDef: string = "";
		var innerDivDef: string = "";

        if(this.id != undefined){
            idDef = "id=\"" + this.id + "\"";
        }


        style = "style=\"";
        for(var each in this.styles){
            style = style + each + ": " + this.styles[each] + "; ";
        }
        style = style + "\"";
		
		if(this.classes.length != 0){
		    classDef = "class=\"";
			for (var eachClass in this.classes) {
				classDef = classDef + this.classes[eachClass] + " ";
			}
			classDef = classDef.substring(0, classDef.length - 1);
			classDef = classDef + "\"";
		}

		
		if(this.innerDivs.length > 0){
			for(var eachDiv in this.innerDivs){
				innerDivDef += this.innerDivs[eachDiv];
			}
		}

        result = this.base.replace("{info-template}", (idDef + " " + classDef + " " + style));
		result = result.replace("{inner}", innerDivDef);

        return result;
    }
}