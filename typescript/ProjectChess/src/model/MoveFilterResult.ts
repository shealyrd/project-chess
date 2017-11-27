class MoveFilterResult{
	passesFilter: boolean
	breakLoop: boolean
	
    constructor(passesFilter: boolean, breakLoop: boolean){
        this.passesFilter = passesFilter;
		this.breakLoop = breakLoop;
    }

}