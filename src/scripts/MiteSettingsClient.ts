/// <reference path='../../typings/main.d.ts' />

export class MiteSettingsClient {
    private accountKey = "accountKey";
    private apiKey = "apiKey";
    private projectIdKey = "projectIdKey";
    private serviceIdKey = "serviceIdKey";
    
    save(form :any) :void{
	// save to local storage
	localStorage.setItem(this.accountKey,form.account.value);
	localStorage.setItem(this.apiKey,form.apiKey.value);
	localStorage.setItem(this.projectIdKey,form.project_id.value);
	localStorage.setItem(this.serviceIdKey,form.service_id.value);
    }
    loadData(form:any) :void {
	form.account.value = localStorage.getItem(this.accountKey);
	form.apiKey.value = localStorage.getItem(this.apiKey);
	form.project_id.value = localStorage.getItem(this.projectIdKey);
	form.service_id.value = localStorage.getItem(this.serviceIdKey);
    }

    getAccountKey() :string {
	return localStorage.getItem(this.accountKey);
    }
    
    getApiKey() :string {
	return localStorage.getItem(this.apiKey);
    }
    
    getProjectIdKey() :string {
	return localStorage.getItem(this.projectIdKey);
    }
    
    getServiceIdKey() :string {
	return localStorage.getItem(this.serviceIdKey);	
    }
}
