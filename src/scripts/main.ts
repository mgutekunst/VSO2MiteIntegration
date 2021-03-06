/// <reference path='../../typings/main.d.ts' />
/// <reference path='./RestService.ts' />
/// <reference path='./TitleCreator.ts' />
/// <reference path='./MiteClient.ts' />
/// <reference path='./MiteSettingsClient.ts' />

import settings = require('./MiteSettingsClient');
import client = require('./MiteClient');
import restService = require('./RestService');
import title = require('./TitleCreator');

let config :client.IMiteConfig;
let miteCall :client.IMiteCall;

config = {
    account: undefined,
    apiKey :undefined
};

miteCall = {
    time_entry: {
	project_id: undefined,
	service_id: undefined,
	note: undefined
    }
}

let settingsClient = new settings.MiteSettingsClient();
settingsClient.getAccountKey((v)=> config.account = v);
settingsClient.getApiKey((v)=> config.apiKey = v);

settingsClient.getProjectIdKey((v)=>miteCall.time_entry.project_id = v);
settingsClient.getServiceIdKey((v)=>miteCall.time_entry.service_id = v);

var menuContributionHandler = (function () {
    "use strict";
    return {
	// This is a callback that gets invoked when a user clicks the newly contributed menu item
	// The actionContext parameter contains context data surrounding the circumstances of this
	// action getting invoked.
	execute: function (actionContext) {

	    let rest = new restService.RestService();
	    let creator = new title.TitleCreator(actionContext);

	    if(config.apiKey === undefined || config.account === undefined){
		alert("please insert settings first");
		return;
	    }

	    let mite = new client.MiteClient(config);
	    
	    rest.getIdAndTitle(actionContext.workItemId,function(id:number, title:string){
		let carstenTitle = creator.createTitle(id,title);
		miteCall.time_entry.note = carstenTitle;	
		mite.createTimeEntry(miteCall,function(response :client.IMiteCall){
		    mite.startTimeEntry(response.time_entry.id, function(response) {
			alert("Timer started");
		    });
		});
	    });
	}
    };
}());

// Associate the menuContributionHandler object with the "myAction" menu contribution from the manifest.
VSS.register("home", menuContributionHandler);

