class ConsoleController{
    static console: MyConsole = new MyConsole(100, 400);
    static run(){
        ConsoleController.update();
        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key == 13) {
                ConsoleController.log("New Entry");
            }

        }
    }
    static log(txt: string){
        ConsoleController.console.addEntry(txt);
        ConsoleController.update();
    }
    static update(){
        document.body.innerHTML += ConsoleController.console.toHTML();
        var element = document.getElementById("my-console");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
}
