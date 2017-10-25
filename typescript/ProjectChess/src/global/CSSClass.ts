class CSSClass{
	name: string;
    styles = {};
	
	constructor(name: string){
		this.name = name;
	}
	
	addStyle(type: string, value: string){
		this.styles[type] = value;
	}
	
	toString(): string{
		var result: string = "";
		result += "." + this.name +"{";
		
        for (var each in this.styles) {
            result += each + ": " + this.styles[each] + "; ";
        }
		result += "}";
        return result;
	}
}