/// <reference path='../../typings/main.d.ts' />
class RestService {
    getIdAndTitle(id: number,callback :(id:number, title:string)=>void) : void {
	    VSS.require(["VSS/Service", "TFS/WorkItemTracking/RestClient"], function (VSS_Service, TFS_Wit_WebApi){
		// alert("insited VSS");
		
		// Get the REST client
		var witClient = VSS_Service.getCollectionClient(TFS_Wit_WebApi.WorkItemTrackingHttpClient);
		
		var items = [id];
		witClient.getWorkItems(/* some work item IDs */ items, ["System.Title"]).then(
		function(workItems) {
		    callback(id,workItems[0].fields["System.Title"]);
		});
	    });
	}
}
