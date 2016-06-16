/// <reference path='../../typings/main.d.ts' />

export class MiteSettingsClient {
    private accountKey = "accountKey";
    private apiKey = "apiKey";
    private projectIdKey = "projectIdKey";
    private serviceIdKey = "serviceIdKey";

    save(form :any) :void{
	// save to local storage
	this.saveDataToVSS(this.accountKey,form.account.value);
	this.saveDataToVSS(this.apiKey,form.apiKey.value);
	this.saveDataToVSS(this.projectIdKey,form.project_id.value);
	this.saveDataToVSS(this.serviceIdKey,form.service_id.value);
    }
    loadData(form:any) :void {
	this.loadDataFromVSS(this.accountKey, function(value :string) {
	    form.account.value = value;
	});
	this.loadDataFromVSS(this.apiKey, function(value :string) {
	    form.apiKey.value  = value;
	});
	this.loadDataFromVSS(this.projectIdKey, function(value :string) {
	    form.project_id.value  = value;
	});
	this.loadDataFromVSS(this.serviceIdKey, function(value :string) {
	    form.service_id.value  = value;
	});
    }

    private saveDataToVSS(key:string, value:string) :void {
	VSS.getService(VSS.ServiceIds.ExtensionData).then(function(ds:any) {
	    let projectName = VSS.getWebContext().project.name;
	    ds.setValue(`${projectName}_${key}`,value, {scopeType : "User"});
	});
    }

    private loadDataFromVSS(key:string, callback :(value :string)=>void) :void {
	VSS.getService(VSS.ServiceIds.ExtensionData).then(function(ds :any) {
	    let projectName = VSS.getWebContext().project.name;
	    ds.getValue(`${projectName}_${key}`,{scopeType : "User"}).then(callback);
	});
    }

    getAccountKey(callback :(value:string)=>void) :void {
	this.loadDataFromVSS(this.accountKey,callback);
    }
    
    getApiKey(callback :(value:string)=>void) :void {
	this.loadDataFromVSS(this.apiKey,callback);
    }
    
    getProjectIdKey() :string {
	return localStorage.getItem(this.projectIdKey);
    }
    
    getServiceIdKey() :string {
	return localStorage.getItem(this.serviceIdKey);	
    }
}
