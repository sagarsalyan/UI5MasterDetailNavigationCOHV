jQuery.sap.declare("App.ProductOrderConfirmation.util.Formatter");
jQuery.sap.require("sap.ca.ui.model.format.DateFormat");
jQuery.sap.require("sap.ca.ui.model.format.NumberFormat");

sap.ui.define(function () {
	"use strict";

	var Formatter = {

		formatDate: function (oDate) {
			debugger;
			var oDateFormat = sap.ca.ui.model.format.DateFormat.getTimeInstance({
				pattern: "dd/MM/yyyy"
			});
			return oDateFormat.format(oDate);
		},
		formatODate: function (date) {
			if (date != "")
				var dateArr = date.split("/");
			if (dateArr)
				return dateArr[2] + "-" + dateArr[1] + "-" + dateArr[0] + "T" + "00:00:00";
			else
				return undefined;
		},
		formatSlno: function (oslno) {
			debugger;
			return oslno.replace(/^0+/, '');
		},
		disDate: function (oDate) {
			var oDateFormat = sap.ca.ui.model.format.DateFormat.getTimeInstance({
				pattern: "dd/MM/yyyy"
			});
			return oDateFormat.format(oDate);
		},
		formatDateTime : function(oDate,oTime){
			debugger;
			if(oDate){
				var d = oDate.toLocaleDateString();
			}
			if(oTime){
				var t = new Date(oTime).toLocaleTimeString();
			}

			return (d?d:"") + " " + (t?t:"");
		},
		setFileIcon: function (fileType) {
			debugger;
			if (fileType) {
				if (fileType.split("/")[1] == "pdf")
					return "sap-icon://pdf-attachment";
				else if (fileType.split("/")[0] == "text")
					return "sap-icon://attachment-text-file";
				else if (fileType.split("/")[0] == "image")
					return "sap-icon://background";
				else if (fileType.split("/")[0] == "video")
					return "sap-icon://video";
				else if (fileType.split("/")[0] == "audio")
					return "sap-icon://attachment-audio";
			}
		},
		formateSlno: function (slno) {
			debugger;
			return slno.replace(/^0+/, '');
		}
	};
	return Formatter;

});