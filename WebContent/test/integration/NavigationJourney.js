/*global QUnit, opaTest*/

sap.ui.define([ 
	"terragene/aprobentrega/localService/mockserver",
	"sap/ui/test/opaQunit",
	"./pages/App" 
], function(mockserver) {
	"use strict";

	QUnit.module("Navigation");

	opaTest("Should open the Hello dialog", function(Given, When, Then) {
		// initialize the mock server
		mockserver.init();

		// Arrangements
		Given.iStartMyUIComponent({
			componentConfig : {
				name : "terragene.aprobentrega"
			}
		});

		// Actions
		When.onTheAppPage.iPressTheSayHelloWithDialogButton();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheHelloDialog();

		// Cleanup
		Then.iTeardownMyApp();
	});
});