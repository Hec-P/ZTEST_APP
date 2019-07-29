/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([ 
		"terragene/aprobentrega/test/integration/NavigationJourney" 
	], function() {
		QUnit.start();
	});
});