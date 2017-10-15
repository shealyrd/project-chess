class ConsoleController{
    console: MyConsole;

    constructor(leftOffset: number, topOffset: number, width: number, height: number, entrySize:number){
        this.console = new MyConsole(leftOffset, topOffset, width, height, entrySize);
    }

    run(){
        this.update();
    }
    log(txt: string){
        this.console.addEntry(txt);
        this.update();
    }
    update(){
        document.body.innerHTML += this.console.toHTML();
        var element = document.getElementById("my-console");
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
}
