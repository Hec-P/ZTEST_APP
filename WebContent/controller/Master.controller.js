sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function(Controller, JSONModel, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("terragene.aprobentrega.controller.InvoiceList", {

		onInit : function() {
			var list = this.getView().byId("idList2");

			var oJsonModel = new JSONModel();
			
			var oDataModel = this.getOwnerComponent().getModel("invoice")
			
			var servicioUrl = "/Entrega_cabSet"
			oDataModel.read(servicioUrl, {
				success : function(data) {
					//Read output
					var result = data.results;
				
					//set JSONoutput to a JSONModel
					oJsonModel.setData({
						listaEntregas : result
					});
					
					list.setModel(oJsonModel);
				}, 
				error : function(err) {
					var errTxt = err.message + "\n" + err.request.requestUri;
					MessageBox.show(errTxt, MessageBox.Icon.ERROR, "Service Error");
				}
			});
			
			sap.ui.getCore().setModel(oJsonModel, "listItems")
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