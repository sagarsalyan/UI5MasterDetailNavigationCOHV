sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"App/ProductOrderConfirmation/util/Formatter"
], function (Controller,Filter,MessageBox,MessageToast,Formatter) {
	"use strict";

	return Controller.extend("App.ProductOrderConfirmation.controller.DetailPOC", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf App.ProductOrderConfirmation.view.DetailPOC
		 */
		formatter:Formatter,
		onInit: function () {
			debugger;
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function (oEvent) {
			debugger;
			if(oEvent.getParameter("name") == "DetailPOC"){
			this.i = oEvent.getParameters().arguments.cpath;
			// this.i = "13890";
				var that = this;
				var busyDialog = new sap.m.BusyDialog({"text":"Loading..."});
				busyDialog.open();
				//var that = this;
				that.getOwnerComponent().getModel().read("/confirmationSet('"+this.i+"')", {
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						debugger;
						that.Aufnr = oData.Aufnr;
						var oModel = new sap.ui.model.json.JSONModel(oData);
						that.getView().byId("CreateLayout").setModel(oModel,"POCModel");
						that.getView().byId("CreateLayout").setSelectedSection(null);
					},
					error: function (error) {
						busyDialog.close();
						debugger;
						
					}
				});	
			}
			
		},
		onCreate:function(){
			var that=this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
			oRouter.navTo("CreatePOC",true);
		},
		onPrint:function(){
			debugger;
			if(this.Aufnr == undefined){
				MessageBox.error("No Data to print");
			}else{
			sap.m.URLHelper.redirect("https://linux-gi6m:8001/sap/opu/odata/sap/ZSTANDARD_SRV_01/confirmbarcodeSet('"+this.Aufnr+"')/$value",true);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf App.ProductOrderConfirmation.view.DetailPOC
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf App.ProductOrderConfirmation.view.DetailPOC
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf App.ProductOrderConfirmation.view.DetailPOC
		 */
		//	onExit: function() {
		//
		//	}

	});

});