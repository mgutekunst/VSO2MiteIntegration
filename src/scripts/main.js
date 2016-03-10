// Use an IIFE to create an object that satisfies the IContributedMenuSource contract
var menuContributionHandler = (function () {
    "use strict";
    return {
	// This is a callback that gets invoked when a user clicks the newly contributed menu item
	// The actionContext parameter contains context data surrounding the circumstances of this
	// action getting invoked.
	execute: function (actionContext) {
	    // alert("Hello, mite");

	    VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient"], function (VSS_Service, TFS_Wit_WebApi) {

		// Get the REST client
		var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);

		var items = [actionContext.workItemId];
		witClient.getWorkItems(/* some work item IDs */ items, ["System.Title"]).then(
		function(workItems) {
		    // console.log(JSON.stringify(workItems));
		    alert("Wanted string is\n " + actionContext.workItemId + " ### " + workItems[0].fields["System.Title"]);
		});
	    });
	}
    };
}());

// Associate the menuContributionHandler object with the "myAction" menu contribution from the manifest.
VSS.register("home", menuContributionHandler);
