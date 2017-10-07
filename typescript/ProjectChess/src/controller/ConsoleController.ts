class ConsoleController{

    static run(){
        document.body.innerHTML = new ConsoleEntry(100,100,100,100, "Hello world!").toHTML();
    }
}
