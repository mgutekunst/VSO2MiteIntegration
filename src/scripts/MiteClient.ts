/// <reference path='../../typings/main.d.ts' />

export interface IMiteConfig {
    apiKey: string;
    account: string;
}

export class MiteClient {
    
    private http :XMLHttpRequest;
    private apiKey :string;

    private config :IMiteConfig;
    
    constructor(config: IMiteConfig){
	this.http = new XMLHttpRequest();
	this.config = config;
    }

    createTimeEntry(content :IMiteCall, callback :(response :IMiteCall) => any) : void{

	// add a response handler
	this.http.onreadystatechange = function () {
	    if(this.readyState == 4){
		var obj :IMiteCall = JSON.parse(this.responseText);
		callback(obj);
	    }
	}

	this.http.open("POST","https://corsapi.mite.yo.lk/time_entries.json",true);

	// add some helpful headers. this needs to be done after opening the XMLHttpRequest
	this.setHeaders();
	this.http.setRequestHeader("Content-Type","application/json");


	this.http.send(JSON.stringify(content));
    }

    private setHeaders () :void {
	this.http.setRequestHeader("X-Requested-With",'XMLHttpRequest');
	this.http.setRequestHeader("X-MiteApiKey",this.config.apiKey);
	this.http.setRequestHeader("X-MiteAccount",this.config.account);
    }

    startTimeEntry(id :number, callback :(response :any)=>void) :void {
	this.http.onreadystatechange = function () {
	    if(this.readyState == 4){
		callback(this.responseText);
	    }
	}
	this.http.open("PUT", "https://corsapi.mite.yo.lk/tracker/"+id+".json",true);
	this.setHeaders();
	this.http.send(null);
    }
    
    private onStateChanged(callback :(response :string)=>any) :void{
	if(this.http.readyState == 4 && this.http.status == 200){
	    callback(this.http.responseText);
	}
    };
}

export interface IMiteCall {
    time_entry: ITimeEntry;
}

export interface ITimeEntry {
    project_id :number;
    service_id :number;
    note? :string;
    id? :number
}
