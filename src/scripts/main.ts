/// <reference path='../../typings/main.d.ts' />
/// <reference path='./RestService.ts' />
/// <reference path='./TitleCreator.ts' />
/// <reference path='./MiteClient.ts' />
/// <reference path='./MiteSettingsClient.ts' />

import settings = require('./MiteSettingsClient');
import client = require('./MiteClient');
import restService = require('./RestService');
import title = require('./TitleCreator');

let config = {
    account: undefined,
    apiKey :undefined
};
let settingsClient = new settings.MiteSettingsClient();
settingsClient.getAccountKey((v)=> config.account = v);
settingsClient.getApiKey((v)=> config.apiKey = v);

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
		let CarstenTitle = creator.createTitle(id,title);
		
		let content :client.IMiteCall = {
		    time_entry: {
			project_id: 1605650,
			service_id: 151147,
			note: CarstenTitle
		    }
		};
		mite.createTimeEntry(content,function(response :client.IMiteCall){
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

