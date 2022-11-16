sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
    ],
    function (Controller, Fragment, JSONModel, Filter, FilterOperator) {
        "use strict";
        let customerId;

        return Controller.extend("sap.ui.task.controller.HeaderBlock", {
            input1() {
                this.id = "customer";
                this._handleValueHelp();
                this.isTitle = true;
                this.field = 0;
            },

            input2() {
                this.id = "VKORG";
                this._handleValueHelp();
                this.isTitle = false;
                this.field = 2;
            },
            input3() {
                this.id = "VTWEG";
                this._handleValueHelp();
                this.isTitle = false;
                this.field = 3;
            },

            _handleValueHelp: function () {
                var oView = this.getView();
                // console.log("oView", oView);
                if (!this._pValueHelpDialogs) {
                    this._pValueHelpDialogs = Fragment.load({
                        id: oView.getId(),
                        name: "sap.ui.task.view.fragment.ValueHelp",
                        controller: this,
                    }).then(function (oValueHelpDialog) {
                        oView.addDependent(oValueHelpDialog);
                        return oValueHelpDialog;
                    });
                }
                this._pValueHelpDialogs.then(
                    function (oValueHelpDialog) {
                        oValueHelpDialog.open();
                        this._configValueHelpDialog();
                    }.bind(this)
                );
            },
            _configValueHelpDialog: function () {
                var sInputValue = this.byId(this.id).getValue(),
                    oModel = this.getView().getModel("helper"),
                    aProducts = oModel.getProperty("/helpList");

                aProducts.forEach(function (oProduct) {
                    oProduct.selected = oProduct.customerName === sInputValue;
                });
                // console.log("sInputValue", sInputValue);
                oModel.setProperty("/helpList", aProducts);
                console.log("aProducts", aProducts);
                //console.log("sInputValue", selected);
            },
            onCloseDialog(oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem"),
                    oInput = this.byId(this.id);
                console.log("oSelectedItem", oSelectedItem);

                if (!oSelectedItem) {
                    oInput.resetProperty("value");
                    return;
                }
                if (this.isTitle) {
                    oInput.setValue(
                        oSelectedItem.getCells()[this.field].getText() +
                            " " +
                            "(" +
                            oSelectedItem.getCells()[1].getTitle() +
                            ")"
                    );
                    customerId = oSelectedItem.getCells()[1].getTitle();
                    console.log("customerId", customerId);
                    this.populateData(customerId);
                } else {
                    oInput.setValue(
                        oSelectedItem.getCells()[this.field].getText() +
                            " " +
                            "(" +
                            oSelectedItem.getCells()[1].getTitle() +
                            ")"
                    );
                }
            },
            handleSearch: function (oEvent) {
                console.log("src");
                var sValue = oEvent.getParameter("value");

                var oFilter = new Filter(
                    "customerName",
                    FilterOperator.Contains,
                    sValue
                );
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([oFilter]);
            },
            populateData: function (id) {
                let oModelData = this.getView()
                    .getModel("helper")
                    .getProperty("/helpList");
                // (oModel = this.getView().getModel("helper")),
                //     (aProducts = oModel.getProperty("/helpList"));
                console.log("oModelData", oModelData);
                const oCustomerData = oModelData.find(
                    (item) => item.customer === id
                );
                let shipToID = oCustomerData.shipTo;
                this.shipTofun(shipToID);
                let carrierId = oCustomerData.carrier;
                this.carrierfun(carrierId);
            },
            shipTofun: function (id) {
                console.log("sdad", id);
                let oModelData = this.getView()
                    .getModel("shipto")
                    .getProperty("/shipList");
                console.log("shipto cust model", oModelData);

                const oCustomerData = oModelData.find(
                    (item) => item.shipTo === id
                );
                console.log("shipto cust data", oCustomerData);
                this.byId("Ship_to").setValue(oCustomerData.adress);
                this.byId("cusName").setValue(oCustomerData.adressLine1);
                this.byId("STRAS_WE").setValue(oCustomerData.adressLine2);
                this.byId("PSLIZ_WE").setValue(oCustomerData.postCode);
                this.byId("OTROI_WE").setValue(oCustomerData.postOffice);
                this.byId("REGIO_WE").setValue(oCustomerData.district);
                this.byId("LAND1_WE").setValue(oCustomerData.country);
            },
            carrierfun: function (id) {
                console.log("sdad", id);
                let oModelData = this.getView()
                    .getModel("shipto")
                    .getProperty("/shipList");
                console.log("shipto cust model", oModelData);

                const oCustomerData = oModelData.find(
                    (item) => item.carrier === id
                );
                console.log("shipto carrier data", oCustomerData);
                this.byId("Carrier").setValue(oCustomerData.adress);
                this.byId("NAME").setValue(oCustomerData.adressLine1);
                this.byId("STRAS_SP").setValue(oCustomerData.adressLine2);
                this.byId("PSTLZ_SP").setValue(oCustomerData.postCode);
                this.byId("ORT01_SP").setValue(oCustomerData.postOffice);
                this.byId("REGIO_SP").setValue(oCustomerData.district);
                this.byId("LAND1_SP").setValue(oCustomerData.country);
            },
        });
    }
);
