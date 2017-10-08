abstract class AbstractController{
    id: string;
    leftPos: number;

    constructor(id: string, leftPos: number, topPos: number){
        this.id = id;
    }

    getId():string{
        return this.id;
    }

    abstract update();
}