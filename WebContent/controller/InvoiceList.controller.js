sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/odata/v2/ODataModel"
], function(Controller, JSONModel, formatter, Filter, FilterOperator, ODataModel) {
	"use strict";

	return Controller.extend("terragene.aprobentrega.controller.InvoiceList", {

		formatter: formatter,
		
		onInit : function() {
			
			var sURL = "http://localhost:8081/https://dev.terragene.com.ar/sap/opu/odata/sap/zsd_entrega_aprob_1_srv/"
			
			var oDataModel = new ODataModel(sURL, {
			     user : "rjerez",
			     password : "Pipobi2018",
			     headers : {
			    	 Authorization : "Basic cmplcmV6OlBpcG9iaTIwMTg="
			     }
			});
			this.getView().setModel(oDataModel, "oDataModel");
			
			var oViewModel = new JSONModel({
				currency : "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		

		onFilterInvoices : function(oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				invoicePath: oItem.getBindingContext("invoice").getPath().substr(1)
			});
		}

	});
});