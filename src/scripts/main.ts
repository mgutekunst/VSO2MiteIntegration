/// <reference path='../../typings/main.d.ts' />
///<reference path='RestService.ts' />
///<reference path='TitleCreator.ts' />
///<reference path='MiteClient.ts' />

var menuContributionHandler = (function () {
    "use strict";
    return {
	// This is a callback that gets invoked when a user clicks the newly contributed menu item
	// The actionContext parameter contains context data surrounding the circumstances of this
	// action getting invoked.
	execute: function (actionContext) {

	    var rest = new RestService();
	    var creator = new TitleCreator(actionContext);
	    var mite = new MiteClient({
	    });

	    
	    rest.getIdAndTitle(actionContext.workItemId,function(id:number, title:string){
		var CarstenTitle = creator.createTitle(id,title);
		
		var content :IMiteCall = {
		    time_entry: {
			project_id: 1605650,
			service_id: 151147,
			note: CarstenTitle
		    }
		};
		mite.createTimeEntry(content,function(response :IMiteCall){
		    mite.startTimeEntry(response.time_entry.id, function(response) {
			alert("Timer started");
		    });
		});
	    });
	    // we're sending json here, so let's add this header
	    
	}
    };
}());

// Associate the menuContributionHandler object with the "myAction" menu contribution from the manifest.
VSS.register("home", menuContributionHandler);

