/// <reference path='../../typings/main.d.ts' />

class MiteClient {
    
    private http :XMLHttpRequest;
    private apiKey :string;
    
    constructor(apiKey :string){
	this.http = new XMLHttpRequest();
	this.http.onload = this.onRequestLoaded;
	this.apiKey = apiKey;
    }

    onRequestLoaded () :void {
	console.log(this.http.responseText);
    }

    createTimeEntry(callback :(response :string) => any) : void{

	// we're sending json here, so let's add this header
	var content :IMiteCall = {
	    time_entry: {
		project_id: 1605650,
		service_id: 151147,
		note: "1234 ### TestKommentar"
	    }
	};

	// add a response handler
	this.http.onreadystatechange = function () {
	    if(this.readyState == 4){
		callback(this.responseText);
	    }
	}

	this.http.open("POST","https://corsapi.mite.yo.lk/time_entries.json",true);

	// add some helpful headers. this needs to be done after opening the XMLHttpRequest
	this.http.setRequestHeader("X-Requested-With",'XMLHttpRequest');
	this.http.setRequestHeader("X-MiteApiKey",this.apiKey);
	this.http.setRequestHeader("X-MiteAccount","account");
	this.http.setRequestHeader("Content-Type","application/json");

	this.http.send(JSON.stringify(content));
    }
    
    private onStateChanged(callback :(response :string)=>any) :void{
	if(this.http.readyState == 4 && this.http.status == 200){
	    callback(this.http.responseText);
	}
    };
}

interface IMiteCall {
    time_entry: ITimeEntry;
}

interface ITimeEntry {
    project_id :number;
    service_id :number;
    note? :string;
}
