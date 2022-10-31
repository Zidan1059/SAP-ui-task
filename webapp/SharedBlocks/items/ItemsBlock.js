sap.ui.define(
    ["sap/ui/core/library", "sap/uxap/BlockBase"],
    function (coreLibrary, BlockBase) {
        "use strict";

        var GoalsBlock = BlockBase.extend(
            "sap.ui.task.SharedBlocks.items.ItemsBlock",
            {
                metadata: {
                    views: {
                        Collapsed: {
                            viewName:
                                "sap.ui.task.SharedBlocks.items.ItemsBlock",
                            type: "XML",
                        },
                        Expanded: {
                            viewName:
                                "sap.ui.task.SharedBlocks.items.ItemsBlock",
                            type: "XML",
                        },
                    },
                },
            }
        );
        return GoalsBlock;
    }
);
