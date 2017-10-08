abstract class AbstractController{
    id: string;
    leftPos: number;
    topPos: number;

    constructor(id: string, leftPos: number, topPos: number){
        this.id = id;
        this.leftPos = leftPos;
        this.topPos = topPos;
    }

    getId():string{
        return this.id;
    }

    getLeftPos(): number{
        return this.leftPos;
    }
    getTopPos(): number{
        return this.topPos;
    }

    abstract run();
    abstract update();
}