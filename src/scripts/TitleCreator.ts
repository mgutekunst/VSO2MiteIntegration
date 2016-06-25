/// <reference path='../../typings/main.d.ts' />
export class TitleCreator {
    private context :any;

    constructor(actionContext : any) {
	this.context = actionContext;
    }
    
    public createTitle(id:number, title:string) :string {
	return id + "### " + title;
    }
}
