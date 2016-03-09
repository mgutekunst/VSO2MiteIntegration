/// <reference path='../typings/VSS.d.ts' />

// class ExecutionObject{
// 	 constructor(){
// 		 this.execute = function(ac){
// 			 alert("Wohoo");
// 		 }
// 	 }
// 	execute: Function;
// }

//  class Connector {
// 	"use strict"
// 	public execute() : ExecutionObject {
// 		return  new ExecutionObject;
		
// 	}
// }

var menuContributionHandler = (function () {
    "use strict";
    return {
	// This is a callback that gets invoked when a user clicks the newly contributed menu item
	// The actionContext parameter contains context data surrounding the circumstances of this
	// action getting invoked.
	execute: function (actionContext) {
	    alert("Hello, mite");

	}
    };
}());

// Associate the menuContributionHandler object with the "myAction" menu contribution from the manifest.
VSS.register("home", menuContributionHandler);

