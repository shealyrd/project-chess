abstract class HTMLObject {
    topPos: number;
    leftPos: number;
    height: number;
    width: number;
    id: number = IDSequence.nextVal();

    setTopPos(input: number): void{
        this.topPos = input;
    }

    setLeftPos(input: number): void{
        this.leftPos = input;
    }

    setHeight(input: number): void{
        this.height = input;
    }

    setWidth(input: number): void{
        this.width = input;
    }

    getTopPos(): number{
        return this.topPos;
    }

    getLeftPos(): number{
        return this.leftPos;
    }

    getId(): number{
        return this.id;
    }

    getHeight(): number{
        return this.height;
    }

    getWidth(): number{
        return this.width;
    }

    abstract toHTML(): string;
}