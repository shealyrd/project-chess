class GameBox{

    public static start(){
        Preloader.preload();
        CSSManager.initAndApply();
        var container: GameHTMLContainer = new GameHTMLContainer(document.body);
        var game = new GameController(container, 0, 0, 50, 50);
        game.start();
    }
}