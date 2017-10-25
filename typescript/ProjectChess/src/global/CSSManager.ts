class CSSManager{
	static classes: CSSClass[] = new Array();
	static raw: string[] = new Array();
	
	public static initAndApply(){
        CSSManager.addSpinning();
        CSSManager.addSqr();
		CSSManager.apply();
	}
	
    public static apply() {
        
		var style = document.createElement("style"); 
		var styleString: string = "";
		
		for(var classIdx in CSSManager.classes){
			var eachClass = CSSManager.classes[classIdx];
			styleString += eachClass.toString();
		}
		for(var rawIdx in CSSManager.raw){
			var eachRaw = CSSManager.raw[rawIdx];
			styleString += eachRaw.toString();
		}
		style.innerHTML += styleString;
	    document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	private static addSpinning(){
		var spinClass: CSSClass = new CSSClass("spin");
		spinClass.addStyle("animation", "3s rotate linear infinite");
		
		CSSManager.addClass(spinClass);
		CSSManager.addRaw("@keyframes rotate {from {transform: rotate(0deg);} to {transform: rotate(360deg);}}");
	}
	
	private static addSqr(){
		var sqrClass: CSSClass = new CSSClass("sqr");
		sqrClass.addStyle("height", "30px");
		sqrClass.addStyle("width", "30px");
        sqrClass.addStyle("background", "red");
		
		CSSManager.addClass(sqrClass);
	}
	
	private static addClass(clazz: CSSClass){
		CSSManager.classes.push(clazz);
	}
	
	private static addRaw(raw: string){
		CSSManager.raw.push(raw);
	}
}