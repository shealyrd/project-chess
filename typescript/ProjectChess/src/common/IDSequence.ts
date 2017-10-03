class IDSequence{
    static count: number = 0;

    static nextVal(): number{
        IDSequence.count = IDSequence.count + 1;
        return IDSequence.count;
    }
}