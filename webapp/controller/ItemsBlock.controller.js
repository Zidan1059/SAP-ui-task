sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.ui.task.controller.ItemsBlock", {
            /**
             * @override
             */
            onInit: function () {
                // set data model on view
                var oData = [
                    {
                        id: "",
                        name: "",
                        product: "",
                        visible: false,
                    },
                ];
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "oModel");
            },

            testHandler: function (oEvent) {
                // let prodId = oEvent.getParameter("selectedItem").getText();
                // console.log("prodId", prodId);
                // var selectedItems = oTable.getSelectedIndices()

                //  let prodId = this.getView().byId("Prod").getSelectedItem();

                // console.log("oComboBox", oComboBox);
                var context = oEvent
                    .getSource()
                    .getParent()
                    .getBindingContext("oModel")
                    .getPath();
                let indexId = context.split("/")[1];
                // let newIndexId = indexId + 1;
                //  let oSelectedProduct = oEvent.getParameters("rowContext");

                let prodId = oEvent.getParameter("selectedItem").getText();

                console.log("indexId", indexId);
                var oTable = this.getView().byId("table");
                console.log("oTable");

                const data = this.getView().getModel("oModel").getData();
                console.log("data lentght", data[indexId]);

                //console.log("oCustomerData", oCustomerData);
                data[indexId].visible = true;

                // this.getView().getModel("oModel").setData(oCustomerData);

                if (data.length - 1 == indexId) {
                    // console.log("data");

                    data.push({
                        id: "",
                        name: "",
                        product: "",
                        quantity: "",
                        visible: false,
                    });
                    console.log("data", data);
                    this.getView().getModel("oModel").setData(data);
                }
            },

            onDeleteButtonPressed: function (oEvent) {
                var context = oEvent
                    .getSource()
                    .getParent()
                    .getBindingContext("oModel")
                    .getPath();
                let indexId = context.split("/")[1];

                const data = this.getView().getModel("oModel").getData();
                console.log("index from delete", data);

                const indexOfDelete = data.findIndex((num) => num === indexId);
                const newindexOfDelete = indexOfDelete - 1;
                console.log("newindexOfDelete", newindexOfDelete);
                var product = this.getView().byId("Prod").getSelectedItem();
              //  console.log("delete prod form data id", product);

                data.splice(newindexOfDelete, 1);

                this.getView().getModel("oModel").setData(data);
            },
        });
    }
);
