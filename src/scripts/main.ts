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
	    alert("Hello, mite from windows");
	    var rest = new RestService();
	    var creator = new TitleCreator(actionContext);
	    rest.getTitle(actionContext.workItemId,creator.createTitle);
	    var mite = new MiteClient("miteKey");
	    mite.createTimeEntry(function(response){
		alert(response);
	    });
	}
    };
}());

// Associate the menuContributionHandler object with the "myAction" menu contribution from the manifest.
VSS.register("home", menuContributionHandler);

