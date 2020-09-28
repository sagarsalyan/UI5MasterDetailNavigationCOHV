sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, Filter, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("App.ProductOrderConfirmation.controller.CreatePOC", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf App.ProductOrderConfirmation.view.CreatePOC
		 */
		onInit: function () {
			debugger;

			var batchUrls = [];

			batchUrls.push(this.getOwnerComponent().getModel().createBatchOperation("/ZmmOrderSet", "GET"));
			batchUrls.push(this.getOwnerComponent().getModel().createBatchOperation("/ZunitSet", "GET"));
			batchUrls.push(this.getOwnerComponent().getModel().createBatchOperation("/ZcapacitySet", "GET"));

			var that = this;
			this.getOwnerComponent().getModel().addBatchReadOperations(batchUrls);
			var busyDialog = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialog.open();
			this.getOwnerComponent().getModel().submitBatch(function (oData, oResponse) {

				debugger;
				busyDialog.close();
				that.orderhelp = oData.__batchResponses[0].data;
				that.unithelp = oData.__batchResponses[1].data;
				that.capcathelp = oData.__batchResponses[2].data;
			}, function (error) {
				// ERROR LOGIC
				debugger;
				busyDialog.close();
				// sap.m.MessageBox.error("Error");
				// var errorMsg = JSON.parse(error.response.body);
				// errorMsg = errorMsg.error.message.value;
				// that.errMsg(errorMsg);
			});

			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},

		_handleRouteMatched: function (oEvent) {
			debugger;

			if (oEvent.getParameter("name") == "CreatePOC") {
				this.yield = NaN;
				this.scrap = NaN;
				this.rewrk = NaN;
				this.Aufnr = "0";
				this.getView().byId("CreateLayout").setSelectedSection(null);
				this.getView().byId("confirmation").setValue("");
				this.getView().byId("order").setValue("");
				this.getView().byId("material").setValue("");
				this.getView().byId("operation").setValue("");
				this.getView().byId("sequence").setValue("");
				this.getView().byId("sequence").setDescription("");
				this.getView().byId("suboperation").setValue("");
				this.getView().byId("capcat").setValue("");
				this.getView().byId("split").setValue("");
				this.getView().byId("wrkcntr").setValue("");
				this.getView().byId("plant").setValue("");
				this.getView().byId("plant").setDescription("");
				this.getView().byId("confrmtype").setSelectedKey("X");
				this.getView().byId("clropnres").setSelected(false);
				this.getView().byId("location").setValue("");
				this.getView().byId("oprname").setValue("");
				this.getView().byId("yeild").setValue("");
				this.getView().byId("yunit").setValue("");
				this.getView().byId("scrap").setValue("");
				this.getView().byId("rewrk").setValue("");
				this.getView().byId("reasonforvar").setValue("");
				this.getView().byId("inputactivity1").setValue("");
				this.getView().byId("inputactivityunit1").setValue("");
				this.getView().byId("chkactivity1").setSelected(false);
				this.getView().byId("inputactivity2").setValue("");
				this.getView().byId("inputactivityunit2").setValue("");
				this.getView().byId("chkactivity2").setSelected(false);
				this.getView().byId("inputactivity3").setValue("");
				this.getView().byId("inputactivityunit3").setValue("");
				this.getView().byId("chkactivity3").setSelected(false);
				this.getView().byId("inputactivity4").setValue("");
				this.getView().byId("inputactivityunit4").setValue("");
				this.getView().byId("chkactivity4").setSelected(false);
				this.getView().byId("inputactivity5").setValue("");
				this.getView().byId("inputactivityunit5").setValue("");
				this.getView().byId("chkactivity5").setSelected(false);
				this.getView().byId("inputactivity6").setValue("");
				this.getView().byId("inputactivityunit6").setValue("");
				this.getView().byId("chkactivity6").setSelected(false);
				this.getView().byId("personnelno").setValue("");
				this.getView().byId("timeid").setValue("");
				var today = new Date();
				this.getView().byId("startexectbc").setDateValue(today);
				this.getView().byId("startexectbc").setValueState("None");
				this.getView().byId("finishexectbc").setDateValue(today);
				this.getView().byId("finishexectbc").setValueState("None");
				this.getView().byId("forecastendtbc").setDateValue(today);
				this.getView().byId("forecastendtbc").setValueState("None");
				this.getView().byId("postdate").setDateValue(today);
				this.getView().byId("postdate").setValueState("None");
				this.getView().byId("breaktime").setValue("");
				this.getView().byId("unit").setValue("");
				this.getView().byId("text").setValue("");

			}
		},
		onBack: function () {
			debugger;

			var that = this;
			MessageBox.show("Do you want to terminate entry of confirmations?", {
				icon: MessageBox.Icon.INFORMATION,
				title: "Data will be lost.",
				actions: [MessageBox.Action.YES, MessageBox.Action.NO],
				onClose: function (oAction) {
					debugger;
					if (oAction == "YES") {
						var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
						oRouter.navTo("Split", true);
					}

				}
			});
		},
		onOrderNumberSubmit: function (oEvent) {
			debugger;
			var orderNo = oEvent.getSource().getValue();
			var that = this;
			
			var busyDialogg = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialogg.open();
			this.getOwnerComponent().getModel().read("/ZMMLOCK?OrderNo='"+orderNo+"'", {
				success: function (oData, oResponse) {

					debugger;
					busyDialogg.close();
				},
				error: function (err, oResponse) {
					debugger;
					busyDialogg.close();

				}
			});
			
			
			var busyDialog = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/operheaderSet('" + orderNo + "')?$expand=operationnav", {
				success: function (oData, oResponse) {

					debugger;
					busyDialog.close();
				},
				error: function (err, oResponse) {
					debugger;
					busyDialog.close();

				}
			});
		},
		onInputChange: function (oEvent) {
			oEvent.getSource().setValueState("None");
			this.getView().byId("errorMessage").setVisible(false);
		},
		_handleOperationHelp: function (oEvent) {
			debugger;
			this.getView().byId("errorMessage").setVisible(false);
			this.getView().byId("operation").setValueState("None");
			this.getView().byId("confirmation").setValueState("None");
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._operationrDialog) {
				this._operationrDialog = sap.ui.xmlfragment(
					"App.ProductOrderConfirmation.fragment.OperationHelp",
					this
				);
				this.getView().addDependent(this._operationrDialog);
			}
			var that = this;

			var busyDialog = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/activitySet('" + this.Aufnr + "')?$expand=actnav", {
				success: function (oData, oResponse) {

					debugger;
					busyDialog.close();
					that.operationhelp = oData.actnav;
					if (that.operationhelp.results.length == 0) {
						MessageBox.error(that.Aufnr + " is already confirmed.");
					} else {
						var oModel = new sap.ui.model.json.JSONModel(that.operationhelp);
						sap.ui.getCore().byId("OperationHelp").setModel(oModel, "Operation");
						that._operationrDialog.open(sInputValue);
					}
				},
				error: function (err, oResponse) {
					debugger;
					busyDialog.close();

				}
			});

		},
		_handleOperationSearch: function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([
				new Filter("Vornr", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Vplfl", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Bmsch", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Ltxa1", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Werks", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Arbpl", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Xmnga", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Lmnga", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Rmnga", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Matnr", sap.ui.model.FilterOperator.Contains, sValue)
			]);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleOperationClose: function (evt) {
			debugger;
			var oSelectedItem = evt.getParameter("selectedItem");
			var isMust = false;
			if (oSelectedItem) {
				// evt.getSource().getBinding("items")
				var str = evt.getParameter("selectedItem").getBindingContextPath();
				var stri = str.split("/");
				var operationdata = evt.getSource().getBinding("items").oList[stri[stri.length - 1]];

				var operations = sap.ui.getCore().byId("OperationHelp").getModel("Operation").getData().results;

				var selectIndex = stri[stri.length - 1];
				for (var i = parseInt(selectIndex) - 1; i >= 0; i--) {
					if (operations[i].Meilr == "X") {
						var actNo = operations[i].Vornr;
						isMust = true;
						break;
					}
				}
				if (isMust) {
					//err
					isMust = false;
					MessageBox.error("Message no. RU460 : Milestone operation " + actNo + " of sequence 0 in order " + this.Aufnr +
						" not yet confirmed")
				} else {
					var material = this.getView().byId('material'),
						sequence = this.getView().byId('sequence'),
						wrkcntr = this.getView().byId('wrkcntr'),
						scrap = this.getView().byId("scrap"),
						rewrk = this.getView().byId("rewrk"),
						operationno = this.getView().byId("operation"),
						yieldqty = this.getView().byId("yeild"),
						yieldunit = this.getView().byId("yunit"),

						plant = this.getView().byId("plant"),
						conf = this.getView().byId("confirmation"),
						act1 = this.getView().byId("inputactivity1"),
						actu1 = this.getView().byId("inputactivityunit1"),
						act2 = this.getView().byId("inputactivity2"),
						actu2 = this.getView().byId("inputactivityunit2"),
						act3 = this.getView().byId("inputactivity3"),
						actu3 = this.getView().byId("inputactivityunit3");
					operationno.setValue(operationdata.Vornr);
					yieldqty.setValue(Number(operationdata.Bmsch));
					yieldunit.setValue(operationdata.Meinh);
					plant.setValue(operationdata.Werks);
					plant.setDescription(operationdata.Ltxa1);
					material.setValue(operationdata.Matnr);
					sequence.setValue(operationdata.Vplfl);
					sequence.setDescription(operationdata.Ltxa1);
					scrap.setValue(Number(operationdata.Xmnga));
					rewrk.setValue(Number(operationdata.Rmnga));
					wrkcntr.setValue(operationdata.Arbpl);
					conf.setValue(operationdata.Rueck);
					act1.setValue(operationdata.Ism01);
					actu1.setValue(operationdata.Ile01);
					act2.setValue(operationdata.Ism02);
					actu2.setValue(operationdata.Ile02);
					act3.setValue(operationdata.Ism03);
					actu3.setValue(operationdata.Ile03);

					this.yield = Number(operationdata.Bmsch);
					this.scrap = Number(operationdata.Xmnga);
					this.rewrk = Number(operationdata.Rmnga);
				}

			}
		},
		_handleOrderHelp: function (oEvent) {
			debugger;
			this.getView().byId("errorMessage").setVisible(false);
			this.getView().byId("order").setValueState("None");
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._orderDialog) {
				this._orderDialog = sap.ui.xmlfragment(
					"App.ProductOrderConfirmation.fragment.OrderHelp",
					this
				);
				this.getView().addDependent(this._orderDialog);
			}
			var oModel = new sap.ui.model.json.JSONModel(this.orderhelp);
			sap.ui.getCore().byId("OrderHelp").setModel(oModel, "OrderNum");
			this._orderDialog.open(sInputValue);
		},
		_handleOrderSearch: function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([
				new Filter("Aufnr", sap.ui.model.FilterOperator.Contains, sValue)

			]);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleOrderClose: function (evt) {
			debugger;
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var oInput = this.getView().byId('order'),
					sDescription = oSelectedItem.getTitle();
				oInput.setValue(sDescription);
			}
			this.Aufnr = sDescription;
			var that = this;
			
			var busyDialogg = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialogg.open();
			this.getOwnerComponent().getModel().read("/ZMMLOCK?OrderNo='"+this.Aufnr+"'", {
				success: function (oData, oResponse) {

					debugger;
					if(oData.ZMMLOCK.Message!=""){
						that.getView().byId("errorMessage").setVisible(true);
						that.getView().byId("errorMessage").setText(oData.ZMMLOCK.Message);
						that.getView().byId('order').setValueState("Error")
						that.getView().byId('order').setValueStateText(oData.ZMMLOCK.Message)
						// MessageBox.error(oData.ZMMLOCK.Message);
					}
					busyDialogg.close();
				},
				error: function (err, oResponse) {
					debugger;
					busyDialogg.close();

				}
			});
			
			
			

			var busyDialog = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/operheaderSet('" + sDescription + "')?$expand=operationnav", {
				success: function (oData, oResponse) {

					debugger;
					busyDialog.close();
					that.releaseDate = oData.Ftrms;
				},
				error: function (err, oResponse) {
					debugger;
					busyDialog.close();

				}
			});
		},
		_handleCapCat: function (oEvent) {
			debugger;
			this.getView().byId("errorMessage").setVisible(false);
			this.getView().byId("capcat").setValueState("None");
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._capcatDialog) {
				this._capcatDialog = sap.ui.xmlfragment(
					"App.ProductOrderConfirmation.fragment.CapCatHelp",
					this
				);
				this.getView().addDependent(this._capcatDialog);
			}
			var oModel = new sap.ui.model.json.JSONModel(this.capcathelp);
			sap.ui.getCore().byId("CapCatHelp").setModel(oModel, "CapCat");
			this._capcatDialog.open(sInputValue);
		},
		_handleCapCatSearch: function (evt) {
			debugger;
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([
				new Filter("Kapar", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Txt", sap.ui.model.FilterOperator.Contains, sValue)

			]);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleCapCatClose: function (evt) {
			debugger;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var oInput = this.getView().byId("capcat"),
					sDescription = oSelectedItem.getTitle(),
					sTitle = oSelectedItem.getDescription();
				oInput.setValue(sDescription);
				oInput.setDescription(sTitle);
			}
		},
		_handleUnitHelp: function (oEvent) {
			debugger;
			this.getView().byId("errorMessage").setVisible(false);
			oEvent.getSource().setValueState("None");
			var sInputValue = oEvent.getSource().getValue();

			this.inputUnitId = oEvent.getSource();
			// create value help dialog
			if (!this._unitDialog) {
				this._unitDialog = sap.ui.xmlfragment(
					"App.ProductOrderConfirmation.fragment.UnitHelp",
					this
				);
				this.getView().addDependent(this._unitDialog);
			}
			var oModel = new sap.ui.model.json.JSONModel(this.unithelp);
			sap.ui.getCore().byId("UnitHelp").setModel(oModel, "Unit");
			this._unitDialog.open(sInputValue);
		},
		_handleUnitSearch: function (evt) {
			debugger;
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([
				new Filter("Msehi", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Mseht", sap.ui.model.FilterOperator.Contains, sValue)

			]);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		_handleUnitClose: function (evt) {
			debugger;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var oInput = this.inputUnitId,

					sTitle = oSelectedItem.getTitle();
				oInput.setValue(sTitle);
				// oInput.setDescription(sDescription);
			}

		},
		onYieldSubmit: function (oEvent) {
			var yeild = parseInt(oEvent.getSource().getValue());
			if (yeild != this.yield) {

				MessageBox.warning("Message no. RU117 : Total quantity confirmed not equal to planned quantity to be confirmed");

			}

		},
		onStartDateChange: function (oEvent) {
			debugger;
			var startDate = oEvent.getSource().getDateValue();

			if(startDate < this.releaseDate){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("Date "+startDate.toLocaleString()+" is earlier than release date "+this.releaseDate.toLocaleString());
				MessageBox.warning("Message no. RU074 : Date "+startDate.toLocaleString()+" is earlier than release date "+this.releaseDate.toLocaleString());
			}else if(startDate > this.releaseDate){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("Date "+startDate.toLocaleString()+" is in the future");
				MessageBox.warning("Message no. RU089 : Date "+startDate.toLocaleString()+" is in the future");
			}
			else if(startDate.getDay() == 0 || startDate.getDay() == 6){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("According to factory calendar "+startDate.toLocaleString()+"(Confirmed Start Date of Execution) is not a workday (check entry)");
				MessageBox.warning("Message no. RU029 : According to factory calendar "+startDate.toLocaleString()+"(Confirmed Start Date of Execution) is not a workday (check entry)");
			}
		},
		onFinishDateChange : function (oEvent) {
			debugger;
			oEvent.getSource().setValueState("None");
			var finishDate = oEvent.getSource().getDateValue();

			if(finishDate < this.releaseDate){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("Date "+finishDate.toLocaleString()+" is earlier than release date "+this.releaseDate.toLocaleString());
				MessageBox.warning("Message no. RU074 : Date "+finishDate.toLocaleString()+" is earlier than release date "+this.releaseDate.toLocaleString())
			}else if(finishDate > this.releaseDate){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("Date "+finishDate.toLocaleString()+" is in the future");
				MessageBox.warning("Message no. RU089 : Date "+finishDate.toLocaleString()+" is in the future");
			}else if(finishDate.getDay() == 0 || finishDate.getDay() == 6){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("Date "+finishDate.toLocaleString()+"(Confirmed Start Date of Execution) is not a workday (check entry)");
				MessageBox.warning("Message no. RU089 : Date "+finishDate.toLocaleString()+"(Confirmed Start Date of Execution) is not a workday (check entry)");
			}
		},
		onForecastDateChange : function (oEvent) {
			debugger;
			oEvent.getSource().setValueState("None");
			var forecastDate = oEvent.getSource().getDateValue();

			if(forecastDate < this.releaseDate){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("Date "+forecastDate.toLocaleString()+" is earlier than release date "+this.releaseDate.toLocaleString());
				MessageBox.warning("Message no. RU074 : Date "+forecastDate.toLocaleString()+" is earlier than release date "+this.releaseDate.toLocaleString())
			}
		},
		onPostDateChange: function (oEvent) {
			debugger;
			oEvent.getSource().setValueState("None");
			var postDate = oEvent.getSource().getDateValue();
			var releaseDate = new Date(this.releaseDate.toLocaleDateString());
			if(postDate < releaseDate){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("Posting date "+postDate.toLocaleDateString()+" is earlier than release date "+releaseDate.toLocaleDateString()+" of the order");
				MessageBox.warning("Message no. RU073 : Posting date "+postDate.toLocaleDateString()+" is earlier than release date "+releaseDate.toLocaleDateString()+" of the order")
			}else if(postDate.getDay() == 0 || postDate.getDay() == 6){
				oEvent.getSource().setValueState("Warning");
				oEvent.getSource().setValueStateText("According to factory calendar "+postDate.toLocaleDateString()+"(Posting Date) is not a workday (check entry)");
				MessageBox.warning("Message no. RU029 : According to factory calendar "+postDate.toLocaleDateString()+"(Posting Date) is not a workday (check entry)");
			}
		},

		onSave: function () {
			debugger;
			var confirmation = this.getView().byId("confirmation").getValue();
			var order = this.getView().byId("order").getValue();
			var material = this.getView().byId("material").getValue();
			var operation = this.getView().byId("operation").getValue();
			var sequence = this.getView().byId("sequence").getValue();
			var suboperation = this.getView().byId("suboperation").getValue();
			var capcat = this.getView().byId("capcat").getValue();
			var split = this.getView().byId("split").getValue();
			var wrkcntr = this.getView().byId("wrkcntr").getValue();
			var plant = this.getView().byId("plant").getValue();
			var confrmtype = this.getView().byId("confrmtype").getSelectedKey();
			var markno = this.getView().byId("markno").getValue();
			var clropnres = this.getView().byId("clropnres").getSelected();
			var location = this.getView().byId("location").getValue();
			var oprname = this.getView().byId("oprname").getValue();

			var act1 = this.getView().byId("inputactivity1").getValue();
			var actunit1 = this.getView().byId("inputactivityunit1").getValue();
			var actflag1 = this.getView().byId("chkactivity1").getSelected();
			var act2 = this.getView().byId("inputactivity2").getValue();
			var actunit2 = this.getView().byId("inputactivityunit2").getValue();
			var actflag2 = this.getView().byId("chkactivity2").getSelected();
			var act3 = this.getView().byId("inputactivity3").getValue();
			var actunit3 = this.getView().byId("inputactivityunit3").getValue();
			var actflag3 = this.getView().byId("chkactivity3").getSelected();
			var act4 = this.getView().byId("inputactivity4").getValue();
			var actunit4 = this.getView().byId("inputactivityunit4").getValue();
			var actflag4 = this.getView().byId("chkactivity4").getSelected();
			var act5 = this.getView().byId("inputactivity5").getValue();
			var actunit5 = this.getView().byId("inputactivityunit5").getValue();
			var actflag5 = this.getView().byId("chkactivity5").getSelected();
			var act6 = this.getView().byId("inputactivity6").getValue();
			var actunit6 = this.getView().byId("inputactivityunit6").getValue();
			var actflag6 = this.getView().byId("chkactivity6").getSelected();

			var yeild = this.getView().byId("yeild").getValue();
			var yunit = this.getView().byId("yunit").getValue();
			var scrap = this.getView().byId("scrap").getValue();
			var rewrk = this.getView().byId("rewrk").getValue();
			var reasonforvar = this.getView().byId("reasonforvar").getValue();

			var personnelno = this.getView().byId("personnelno").getValue();
			var timeid = this.getView().byId("timeid").getValue();

			var startexectbc = this.getView().byId("startexectbc").getDateValue();
			var startexecctd = this.getView().byId("startexecctd").getDateValue();
			var startexecpfc = this.getView().byId("startexecpfc").getDateValue();
			var finishexectbc = this.getView().byId("finishexectbc").getDateValue();
			var finishexecctd = this.getView().byId("finishexecctd").getDateValue();
			var finishexecpfc = this.getView().byId("finishexecpfc").getDateValue();
			var forecastendtbc = this.getView().byId("forecastendtbc").getDateValue();
			var forecastendctd = this.getView().byId("forecastendctd").getDateValue();
			var forecastendpfc = this.getView().byId("forecastendpfc").getDateValue();

			var postdate = this.getView().byId("postdate").getDateValue();
			var breaktime = this.getView().byId("breaktime").getValue();
			var unit = this.getView().byId("unit").getValue();

			var text = this.getView().byId("text").getValue();

			if (confirmation == "" || order == "" || operation == "" || (Number(yeild) != "" ? !Number.isInteger(Number(yeild)) : false)) {

				if (order == "") {
					this.getView().byId("order").setValueState("Error");
					this.getView().byId("order").setValueStateText("Please select Order No.");
					if (!this.getView().byId("errorMessage").getVisible()) {
						this.getView().byId("errorMessage").setVisible(true);
						this.getView().byId("errorMessage").setText(
							"Message no. RU001 : Enter confirmation number or order/sequence/operation/suboperation");
					}
				} else {
					this.getView().byId("order").setValueState("None");
				}

				if (confirmation == "") {
					this.getView().byId("confirmation").setValueState("Error");
					this.getView().byId("confirmation").setValueStateText("Enter Confirmation No.");
					if (!this.getView().byId("errorMessage").getVisible()) {
						this.getView().byId("errorMessage").setVisible(true);
						this.getView().byId("errorMessage").setText(
							"Message no. RU006 : Sequence 0 operation  not found in order " + this.Aufnr + ", check entry");
					}
				} else {
					this.getView().byId("confirmation").setValueState("None");
				}

				if (operation == "") {
					this.getView().byId("operation").setValueState("Error");
					this.getView().byId("operation").setValueStateText("Please select Operation");
					if (!this.getView().byId("errorMessage").getVisible()) {
						this.getView().byId("errorMessage").setVisible(true);
						this.getView().byId("errorMessage").setText("Message no. RU006 : Sequence 0 operation  not found in order " + order +
							", check entry");
					}
				} else {
					this.getView().byId("operation").setValueState("None");
				}
				//sss
				if (Number(yeild) != "" ? !Number.isInteger(Number(yeild)) : false) {
					this.getView().byId("yeild").setValueState("Error");
					this.getView().byId("yeild").setValueStateText("Input must be in the format _.___.___.__~,___V");
					if (!this.getView().byId("errorMessage").getVisible()) {
						this.getView().byId("errorMessage").setVisible(true);
						this.getView().byId("errorMessage").setText("Message no. 00088 : Input must be in the format _.___.___.__~,___V");
					}
				} else {
					this.getView().byId("yeild").setValueState("None");
				}

				//ObjectPageLayout Validation
				if (order == "" || operation == "")
					this.getView().byId("CreateLayout").setSelectedSection(this.getView().byId("idLayoutGeneral"));
				// else if(location == "")	
				// 	this.getView().byId("CreateLayout").setSelectedSection(this.getView().byId("idLayoutLocation"));
				// else if(scrap == "" || rewrk == "")
				// 	this.getView().byId("CreateLayout").setSelectedSection(this.getView().byId("idLayoutQuantities"));

				//ObjectPageLayout Validation	

			} else {

				var tmpObj = {

					"Rueck": confirmation,
					"Rmzhl": "00000001",
					"Ersda": "\/Date(1574380800000)\/",
					"Ernam": "DEVELOPER19",
					"Laeda": null,
					"Aenam": "",
					"Budat": "\/Date(1574380800000)\/",
					"Arbid": "10004166",
					"Werks": plant,
					"Ltxa1": "",
					"Txtsp": "",
					"Iserh": "0.000",
					"Zeier": "",
					"Ile01": actunit1,
					"Ism01": act1 ? act1 : "0.000",
					"Ile02": actunit2,
					"Ism02": act2 ? act2 : "0.000",
					"Ile03": actunit3,
					"Ism03": act3 ? act3 : "0.000",
					"Ile04": actunit4,
					"Ism04": act4 ? act4 : "0.000",
					"Ile05": actunit5,
					"Ism05": act5 ? act5 : "0.000",
					"Ile06": actunit6,
					"Ism06": act6 ? act6 : "0.000",
					"Abarb": "000",
					"Ismnw": "0.0",
					"Ismne": "",
					"Learr": "",
					"Idaur": "0.0",
					"Idaue": "",
					"Zcode": "",
					"Loart": "",
					"Qualf": "",
					"Anzma": "0.00",
					"Logrp": "",
					"Gmnga": "1",
					"Lmnga": yeild,
					"Xmnga": "0",
					"Gmein": "EA",
					"Meinh": "EA",
					"Grund": "",
					"Pernr": "00000000",
					"Isdd": "\/Date(1574380800000)\/",
					"Isdz": "PT13H09M08S",
					"Ierd": null,
					"Ierz": "PT00H00M00S",
					"Isbd": null,
					"Isbz": "PT00H00M00S",
					"Iebd": null,
					"Iebz": "PT00H00M00S",
					"Isad": null,
					"Isaz": "PT00H00M00S",
					"Iedd": "\/Date(1574380800000)\/",
					"Iedz": "PT13H09M08S",
					"Pedd": null,
					"Pedz": "PT00H00M00S",
					"Wablnr": "",
					"Weblnr": "",
					"Aueru": "X",
					"Ausor": false,
					"Stndr": false,
					"Manur": "1",
					"Meilr": "",
					"Aufpl": "0000018547",
					"Aplzl": "00000006",
					"Aufnr": order,
					"Aplfl": "0",
					"Vornr": operation,
					"Sumnr": "00000000",
					"Ofm01": "0.000",
					"Ofe01": "",
					"Lek01": false,
					"Ofm02": "0.000",
					"Ofe02": "",
					"Lek02": false,
					"Ofm03": "0.000",
					"Ofe03": "",
					"Lek03": false,
					"Ofm04": "0.000",
					"Ofe04": "",
					"Lek04": false,
					"Ofm05": "0.000",
					"Ofe05": "",
					"Lek05": false,
					"Ofm06": "0.000",
					"Ofe06": "",
					"Lek06": false,
					"Ofmnw": "0.0",
					"Ofmne": "",
					"Leknw": false,
					"Odaur": "0.0",
					"Odaue": "",
					"Stokz": false,
					"Stzhl": "00000000",
					"Smeng": "1.000",
					"RueckMst": "0000000000",
					"RmzhlMst": "00000000",
					"Pdsnr": "000001353950",
					"Kapid": "00000000",
					"Split": 0,
					"Zausw": "00000000",
					"Orind": "2",
					"Origf": "",
					"Canum": "0000",
					"BelnrIst": "",
					"BelnrUmb": "",
					"Rmnga": "0",
					"Catsbelnr": "",
					"Satza": "L40",
					"Erzet": "PT17H39M08S",
					"Catsprice": "0.00",
					"Catstcurr": "",
					"Catspeinh": "0.000",
					"Bemot": "",
					"Iprz1": "0.000",
					"Ipre1": "",
					"Iprk1": false,
					"Exnam": "",
					"Exerd": null,
					"Exerz": "PT00H00M00S",
					"Prz01": "",
					"Oprz1": "0.000",
					"Opre1": "",
					"Skokrs": "",
					"Skostl": "",
					"Nodat": false,
					"Ismnu": "",
					"Ofmnu": "",
					"Packno": "0000000000",
					"Extid": "00000000-0000-0000-0000-000000000000",
					"Schgrup": "",
					"Kaptprog": "",
					"Obmat": "",
					"Obcha": "",
					"Licha": "",
					"Myear": "0000",
					"MeSfcid": "",
					"Me2ndConfQty": "0",
					"RoleId": "",
					"Ucmat": "",
					"Uccha": "",
					"WtyInd": "",
					"loacation": "",
					"operationame": ""

				};

				var pocObj = {

					"Rueck": confirmation,
					"Rmzhl": "00000001",
					"Ersda": "\/Date(1574380800000)\/",
					"Ernam": "DEVELOPER19",
					"Laeda": null,
					"Aenam": "",
					"Budat": postdate,
					"Arbid": "",
					"Werks": plant,
					"Ltxa1": text,
					"Txtsp": "",
					"Iserh": breaktime == "" ? null : breaktime,
					"Zeier": unit,
					"Ile01": actunit1,
					"Ism01": act1 ? act1 : "0.000",
					"Ile02": actunit2,
					"Ism02": act2 ? act2 : "0.000",
					"Ile03": actunit3,
					"Ism03": act3 ? act3 : "0.000",
					"Ile04": actunit4,
					"Ism04": act4 ? act4 : "0.000",
					"Ile05": actunit5,
					"Ism05": act5 ? act5 : "0.000",
					"Ile06": actunit6,
					"Ism06": act6 ? act6 : "0.000",
					"Abarb": "000",
					"Ismnw": "0.0",
					"Ismne": "",
					"Learr": "",
					"Idaur": "0.0",
					"Idaue": "",
					"Zcode": "",
					"Loart": "",
					"Qualf": "",
					"Anzma": "0.00",
					"Logrp": "",
					"Gmnga": "1",
					"Lmnga": yeild,
					"Xmnga": scrap,
					"Gmein": "EA",
					"Meinh": yunit,
					"Grund": reasonforvar,
					"Pernr": personnelno,
					"Isdd": startexectbc ? startexectbc : "",
					"Isdz": startexectbc ? "PT" + startexectbc.getHours() + "H" + startexectbc.getMinutes() + "M" + startexectbc.getSeconds() + "S" : "",
					"Ierd": null,
					"Ierz": "PT00H00M00S",
					"Isbd": null,
					"Isbz": "PT00H00M00S",
					"Iebd": null,
					"Iebz": "PT00H00M00S",
					"Isad": null,
					"Isaz": "PT00H00M00S",
					"Iedd": finishexectbc ? finishexectbc : "",
					"Iedz": finishexectbc ? "PT" + finishexectbc.getHours() + "H" + finishexectbc.getMinutes() + "M" + finishexectbc.getSeconds() +
						"S" : "",
					"Pedd": forecastendtbc ? forecastendtbc : "",
					"Pedz": forecastendtbc ? "PT" + forecastendtbc.getHours() + "H" + forecastendtbc.getMinutes() + "M" + forecastendtbc.getSeconds() +
						"S" : "",
					"Wablnr": material,
					"Weblnr": "",
					"Aueru": confrmtype,
					"Ausor": clropnres,
					"Stndr": false,
					"Manur": "1",
					"Meilr": "",
					"Aufpl": "",
					"Aplzl": "",
					"Aufnr": order,
					"Aplfl": sequence,
					"Vornr": operation,
					"Sumnr": "00000000",
					"Ofm01": "0.000",
					"Ofe01": "",
					"Lek01": actflag1,
					"Ofm02": "0.000",
					"Ofe02": "",
					"Lek02": actflag2,
					"Ofm03": "0.000",
					"Ofe03": "",
					"Lek03": actflag3,
					"Ofm04": "0.000",
					"Ofe04": "",
					"Lek04": actflag4,
					"Ofm05": "0.000",
					"Ofe05": "",
					"Lek05": actflag5,
					"Ofm06": "0.000",
					"Ofe06": "",
					"Lek06": actflag6,
					"Ofmnw": "0.0",
					"Ofmne": "",
					"Leknw": false,
					"Odaur": "0.0",
					"Odaue": "",
					"Stokz": false,
					"Stzhl": "00000000",
					"Smeng": "1.000",
					"RueckMst": "0000000000",
					"RmzhlMst": "00000000",
					"Pdsnr": "",
					"Kapid": "00000000",
					"Split": split != "" ? parseInt(split) : 0,
					"Zausw": timeid,
					"Orind": "2",
					"Origf": "",
					"Canum": "0000",
					"BelnrIst": "",
					"BelnrUmb": "",
					"Rmnga": rewrk,
					"Catsbelnr": "",
					"Satza": "L40",
					"Erzet": "PT17H39M08S",
					"Catsprice": "0.00",
					"Catstcurr": "",
					"Catspeinh": "0.000",
					"Bemot": "",
					"Iprz1": "0.000",
					"Ipre1": "",
					"Iprk1": false,
					"Exnam": "",
					"Exerd": null,
					"Exerz": "PT00H00M00S",
					"Prz01": "",
					"Oprz1": "0.000",
					"Opre1": "",
					"Skokrs": "",
					"Skostl": "",
					"Nodat": false,
					"Ismnu": "",
					"Ofmnu": "",
					"Packno": "0000000000",
					"Extid": "00000000-0000-0000-0000-000000000000",
					"Schgrup": "",
					"Kaptprog": "",
					"Obmat": "",
					"Obcha": "",
					"Licha": "",
					"Myear": "0000",
					"MeSfcid": "",
					"Me2ndConfQty": "0",
					"RoleId": "",
					"Ucmat": "",
					"Uccha": "",
					"WtyInd": "",
					"operationame": oprname,
					"loacation": location

				};
				var that = this;

				var busyDialog = new sap.m.BusyDialog({
					"text": "Saving..."
				});
				busyDialog.open();
				this.getOwnerComponent().getModel().create("/confirmationSet", pocObj, {
					success: function (oData, oResponse) {

						debugger;
						busyDialog.close();
						var Rueck = oData.Rueck;
						var msg = "Confirmations " + Rueck + " saved for order number " + order;
						MessageBox.success(msg, {
							actions: [MessageBox.Action.OK],
							onClose: function (oAction) {
								that.getView().byId("CreateLayout").setSelectedSection(null);
								that.getView().byId("confirmation").setValue("");
								that.getView().byId("order").setValue("");
								that.getView().byId("material").setValue("");
								that.getView().byId("operation").setValue("");
								that.getView().byId("sequence").setValue("");
								that.getView().byId("sequence").setDescription("");
								that.getView().byId("suboperation").setValue("");
								that.getView().byId("capcat").setValue("");
								that.getView().byId("capcat").setDescription("");
								that.getView().byId("split").setValue("");
								that.getView().byId("wrkcntr").setValue("");
								that.getView().byId("plant").setValue("");
								that.getView().byId("plant").setDescription("");
								that.getView().byId("confrmtype").setSelectedKey("X");
								that.getView().byId("clropnres").setSelected(false);
								that.getView().byId("location").setValue("");
								that.getView().byId("oprname").setValue("");
								that.getView().byId("yeild").setValue("");
								that.getView().byId("yunit").setValue("");
								that.getView().byId("scrap").setValue("");
								that.getView().byId("rewrk").setValue("");
								that.getView().byId("reasonforvar").setValue("");
								that.getView().byId("inputactivity1").setValue("");
								that.getView().byId("inputactivityunit1").setValue("");
								that.getView().byId("chkactivity1").setSelected(false);
								that.getView().byId("inputactivity2").setValue("");
								that.getView().byId("inputactivityunit2").setValue("");
								that.getView().byId("chkactivity2").setSelected(false);
								that.getView().byId("inputactivity3").setValue("");
								that.getView().byId("inputactivityunit3").setValue("");
								that.getView().byId("chkactivity3").setSelected(false);
								that.getView().byId("inputactivity4").setValue("");
								that.getView().byId("inputactivityunit4").setValue("");
								that.getView().byId("chkactivity4").setSelected(false);
								that.getView().byId("inputactivity5").setValue("");
								that.getView().byId("inputactivityunit5").setValue("");
								that.getView().byId("chkactivity5").setSelected(false);
								that.getView().byId("inputactivity6").setValue("");
								that.getView().byId("inputactivityunit6").setValue("");
								that.getView().byId("chkactivity6").setSelected(false);
								that.getView().byId("personnelno").setValue("");
								that.getView().byId("timeid").setValue("");
								var today = new Date();
								that.getView().byId("startexectbc").setDateValue(today);
								that.getView().byId("startexectbc").setValueState("None");
								that.getView().byId("finishexectbc").setDateValue(today);
								that.getView().byId("finishexectbc").setValueState("None");
								that.getView().byId("forecastendtbc").setDateValue(today);
								that.getView().byId("forecastendtbc").setValueState("None");
								that.getView().byId("postdate").setDateValue(today);
								that.getView().byId("postdate").setValueState("None");
								that.getView().byId("breaktime").setValue("");
								that.getView().byId("unit").setValue("");
								that.getView().byId("text").setValue("");
							}
						});

					},
					error: function (err, oResponse) {
						debugger;
						busyDialog.close();
						if (err) {
							MessageBox.error(err.response.statusText);
						} else {
							MessageBox.error("Some error have occured.");
						}

					}
				});

			}
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf App.ProductOrderConfirmation.view.CreatePOC
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf App.ProductOrderConfirmation.view.CreatePOC
		 */
		onAfterRendering: function () {
			debugger;
			var that = this;
			this.byId("yeild").attachBrowserEvent("focusout", function () {
				debugger;
				// this.setValue("Text field is blur");
				var yeild = Number(this.getValue());

				if (!Number.isInteger(yeild)) {
					MessageBox.error("Message no. 00088 : Input must be in the format _.___.___.__~,___V");
					this.setValueState("Error");
					this.setValueStateText("Input must be in the format _.___.___.__~,___V");
				} else if (yeild != that.yield) {
					MessageBox.warning("Message no. RU117 : Total quantity confirmed not equal to planned quantity to be confirmed");
					this.setValueState("Warning");
					this.setValueStateText("Total quantity confirmed not equal to planned quantity to be confirmed");
				}
			});

			this.byId("scrap").attachBrowserEvent("focusout", function () {
				debugger;
				// this.setValue("Text field is blur");
				var scrap = Number(this.getValue());
				if (scrap != that.scrap) {
					MessageBox.warning("Message no. RU117 : Total quantity confirmed not equal to planned quantity to be confirmed");
				}
			});

			this.byId("rewrk").attachBrowserEvent("focusout", function () {
				debugger;
				// this.setValue("Text field is blur");
				var rewrk = Number(this.getValue());
				if (rewrk != that.rewrk) {
					MessageBox.warning("Message no. RU117 : Total quantity confirmed not equal to planned quantity to be confirmed");
				}
			});
		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf App.ProductOrderConfirmation.view.CreatePOC
		 */
		//	onExit: function() {
		//
		//	}

	});

});