class CallbackPool{
    private callbacks: {(): void;}[] = [];
    
    constructor(...callbacks: {(): void;}[]){
        this.callbacks = callbacks;
    }
   
    public addCallback(callback: {(): void;}): CallbackPool{
        this.callbacks.push(callback);
        return this;
    }
    
    public fire(): void{
        for(var i = 0; i < this.callbacks.length; i++){
            this.callbacks[i]();
        }
    }
    
    public reset(): void{
        this.callbacks = [];
    }
}