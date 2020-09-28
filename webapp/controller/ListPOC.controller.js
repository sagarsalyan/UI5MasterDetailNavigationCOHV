sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"App/ProductOrderConfirmation/util/Formatter",
	"sap/ui/model/Filter"
], function (Controller, MessageBox, Formatter,Filter) {
	"use strict";

	return Controller.extend("App.ProductOrderConfirmation.controller.ListPOC", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf App.ProductOrderConfirmation.view.ListPOC
		 */
		formatter: Formatter,
		onInit: function () {
			debugger;
			var that = this;
			var busyDialog = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialog.open();
			//var that = this;
			that.getOwnerComponent().getModel().read("/getorderSet", {
				async: false,
				success: function (oData, oResponse) {
					busyDialog.close();
					debugger;
					var oModel = new sap.ui.model.json.JSONModel(oData);
					that.getView().byId("ConfirmList").setModel(oModel, "ConfirmModel");

					var itemCount = that.getView().byId("ConfirmList").getModel("ConfirmModel").getData().results.length;
					that.getView().byId("idMasterPage").setTitle("Product Order Confirmation(" + itemCount + ")");

					var firstItem = that.getView().byId("ConfirmList").getItems()[0];
					var confirmno = firstItem.getProperty("title");
					//var contractIndex=evt.getParameters().listItem.getBindingContext("ContractModel").getProperty().Zzagreementnum;
					if (confirmno == "")
						confirmno = "0";
					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
					oRouter.navTo("DetailPOC", {
						cpath: confirmno
					}, true);
				},
				error: function (error) {
					busyDialog.close();
					debugger;
					that.getView().byId("idMasterPage").setTitle("Product Order Confirmation");

					MessageBox.error("No Data Found")
					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
					oRouter.navTo("DetailPOC", {
						cpath: "0"
					}, true);
				}
			});
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function (oEvent) {
			debugger;
			if (oEvent.getParameter("name") == "ListPOC") {
				var that = this;
				var busyDialog = new sap.m.BusyDialog({
					"text": "Loading..."
				});
				busyDialog.open();
				//var that = this;
				that.getOwnerComponent().getModel().read("/getorderSet", {
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						debugger;
						var oModel = new sap.ui.model.json.JSONModel(oData);
						that.getView().byId("ConfirmList").setModel(oModel, "ConfirmModel");

						var itemCount = that.getView().byId("ConfirmList").getModel("ConfirmModel").getData().results.length;
						that.getView().byId("idMasterPage").setTitle("Product Order Confirmation(" + itemCount + ")");

						var firstItem = that.getView().byId("GPList").getItems()[0];
						var confirmno = firstItem.getProperty("title");
						//var contractIndex=evt.getParameters().listItem.getBindingContext("ContractModel").getProperty().Zzagreementnum;
						if (confirmno == "")
							confirmno = "0";
						var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
						oRouter.navTo("DetailPOC", {
							cpath: confirmno
						}, true);
					},
					error: function (error) {
						busyDialog.close();
						debugger;
						that.getView().byId("idMasterPage").setTitle("Product Order Confirmation");

						MessageBox.error("No Data Found")
						var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
						oRouter.navTo("DetailPOC", {
							cpath: "0"
						}, true);
					}
				});
			}
		},
		handleRefresh: function () {
			debugger;

			setTimeout(function () {
				this.byId("pullToRefresh").hide();
				var that = this;

				that.getOwnerComponent().getModel().read("/getorderSet", {
					async: false,
					success: function (oData, oResponse) {

						debugger;
						var oModel = new sap.ui.model.json.JSONModel(oData);
						that.getView().byId("ConfirmList").setModel(oModel, "ConfirmModel");

						var itemCount = that.getView().byId("ConfirmList").getModel("ConfirmModel").getData().results.length;
						that.getView().byId("idMasterPage").setTitle("Product Order Confirmation(" + itemCount + ")");

					},
					error: function (error) {

						debugger;
						that.getView().byId("idMasterPage").setTitle("Product Order Confirmation");

						MessageBox.error("No Data Found")

					}
				});
			}.bind(this), 1000);

		},
		onPress: function () {

			if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment("App.ProductOrderConfirmation.fragment.Sort", this);
				this.getView().addDependent(this.dialog);
			}
			this.dialog.open();

		},
		closeDialog: function () {
			this.dialog.close();
		},
		handleConfirm: function (oevt) {

			debugger;
			var aFilters = [];
			var aSorters = [];
			var oView = this.getView();
			var oTable = oView.byId("ConfirmList");
			var mParams = oevt.getParameters();
			var oBinding = oTable.getBinding("items");
			// applygroup
			if (mParams.groupItem) {
				var sPath = mParams.groupItem.getKey();

				var bDescending = mParams.groupDescending;
				var vGroup = function (oContext) {
					var name = oContext.getProperty(sPath);

					return {
						key: name,
						text: name
					};
				};
				aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
			}

			//		applysorter
			var sPath1 = mParams.sortItem.getKey();
			var bDescending = mParams.sortDescending;
			aSorters.push(new sap.ui.model.Sorter(sPath1, bDescending));
			oBinding.sort(aSorters);

			// apply filters 

			for (var i = 0, l = mParams.filterItems.length; i < l; i++) {
				var oItem = mParams.filterItems[i];
				var aSplit = oItem.getKey().split("-");
				var sPath = aSplit[0];
				var vOperator = aSplit[1];
				var vValue1 = aSplit[2];
				var vValue2 = aSplit[3];
				var oFilter = new sap.ui.model.Filter(sPath, vOperator, vValue1, vValue2);
				aFilters.push(oFilter);
			}
			oBinding.filter(aFilters);
			//var itemCount = this.getView().byId("master").getAggregation("items").length;
			//this.getView().byId("idMasterPage").setTitle("Agreements("+itemCount+")");

		},
		onSearch: function (oevent) {

			// build filter array
			var aFilter = [];

			//var sQuery = oevent.getParameter("query");
			var sQuery = oevent.getSource().getValue();
			// var oFilter = new sap.ui.model.Filter("Purdocnum","Contains",sQuery);
			
			
			var oFilter = new Filter([
				new Filter("Rueck", sap.ui.model.FilterOperator.Contains, sQuery),
				new Filter("Vornr", sap.ui.model.FilterOperator.Contains, sQuery),
				new Filter("Aufnr", sap.ui.model.FilterOperator.Contains, sQuery)
			]);
			

			aFilter.push(oFilter);

			// filter binding
			var oList = this.getView().byId("ConfirmList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);

		},
		onConfirmSelect: function (evt) {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			var id = evt.getParameters().listItem.getBindingContext("ConfirmModel").getProperty().Rueck;

			router.navTo("DetailPOC", {
				cpath: id
			}, true);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf App.ProductOrderConfirmation.view.ListPOC
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf App.ProductOrderConfirmation.view.ListPOC
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf App.ProductOrderConfirmation.view.ListPOC
		 */
		//	onExit: function() {
		//
		//	}

	});

});