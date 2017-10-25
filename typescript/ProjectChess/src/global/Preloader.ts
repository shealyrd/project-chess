class Preloader{
    static imageLinks: string[] = new Array("http://v3.preloaders.net/preloaders/5/colored/5.png");
	static images = new Array();
	
	static preload(){
		for (var i = 0; i < Preloader.imageLinks.length; i++) {
			var newImage = new Image();
			newImage.src = Preloader.imageLinks[i];
			Preloader.images.push(newImage);
		}
	}

}
