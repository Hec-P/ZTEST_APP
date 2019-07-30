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
			var list = this.getView().byId("idList2");
			//Load OData Service
			//var sURL = "http://localhost:8081/https://dev.terragene.com.ar/sap/opu/odata/sap/zsd_entrega_aprob_1_srv/";
			var sURL = "https://dev.terragene.com.ar/sap/opu/odata/sap/zsd_entrega_aprob_1_srv/";
			
				var oDataModel = new ODataModel(sURL, {
				     //user : "rjerez",
				     //password : "Pipobi2018",
				     json : true,
				     useBatch: true,
				     headers : {
				    	 Authorization : "Basic cmplcmV6OlBpcG9iaTIwMTg="
				     }
				});
			sap.ui.getCore().setModel(oDataModel);
			
			var oJsonModel = new JSONModel();
			
			var servicioUrl = "/Entrega_cabSet?"
			oDataModel.read(servicioUrl, {
				success : function(data) {
					//Read output
					alert(data);
					alert(data.results);
					var result = data.results;
				
					//set JSONoutput to a JSONModel
					oJsonModel.setData({
						listItems : result
					});
					
					list.setModel(oJsonModel);
				}, 
				error : function(err) {
					alert(err);
					alert(err.message);
					var errTxt = err.message + "\n" + err.request.requestUri;
					sap.m.MessageBox.show(errTxt, sap.m.MessageBox.Icon.ERROR, "Service Error");
				}
			});
			
			sap.ui.getCore().setModel(oJsonModel, "listItems")
			
			
/*			//Call OdataService
			oDataModel.read(servicioUrl, function(data) {

				//Read output
				var result = data.results;
				
				//set JSONoutput to a JSONModel
				var oModel = new JSONModel();
				oModel.setData({
					listItems : result
				});
				
				//Set output to ListControl			
				list.setModel(oModel);
							
			}, function(err) {
				var errTxt = err.message + "\n" + err.request.requestUri;
			});	
*/
			
			
			
/*
			var sURL = "http://localhost:8081/https://dev.terragene.com.ar/sap/opu/odata/sap/zsd_entrega_aprob_1_srv/Entrega_cab"
			
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
*/
		},
/*		
		pressODataSrv: function(){		
			
			//Get list control reference
			var list = this.getView().byId("idList1");
			
			//Frame Url with EntitySet
			//var url = serviceUrl + "Entrega_cab";
			var url = "http://localhost:8081/https://dev.terragene.com.ar/sap/opu/odata/sap/zsd_entrega_aprob_1_srv/Entrega_cab";
					
			//Call OdataService
			OData.read(url, function(data) {

				//Read output
				var result = data.results;
				
				//set JSONoutput to a JSONModel
				var oModel = new JSONModel();
				oModel.setData({
					listItems : result
				});
				
				//Set output to ListControl			
				list.setModel(oModel);
							
			}, function(err) {
				var errTxt = err.message + "\n" + err.request.requestUri;
				sap.m.MessageBox.show(errTxt, sap.m.MessageBox.Icon.ERROR, "Service Error");
			});	
		},

*/
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