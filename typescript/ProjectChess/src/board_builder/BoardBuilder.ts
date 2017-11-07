class BoardBuilder{

    static start(){
        var container = new BoardBuilderHTMLContainer(document.body);
        var controller = new BoardBuilderController(container);
        controller.start();
    }
}

BoardBuilder.start();