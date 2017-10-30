class Preloader{
    static imageLinks: string[] = new Array("http://v3.preloaders.net/preloaders/5/colored/5.png",
											"https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif");
	static images = new Array();
	
	static preload(){
		for (var i = 0; i < Preloader.imageLinks.length; i++) {
			var newImage = new Image();
			newImage.src = Preloader.imageLinks[i];
			Preloader.images.push(newImage);
		}
	}

}
