/// <reference path='../../typings/main.d.ts' />
class TitleCreator {
    private context :any;

    constructor(actionContext : any) {
	this.context = actionContext;
    }
    
    public createTitle(id:number, title:string) {
	alert("Wanted string is\n " + id + " ### " + title);
    }
}
