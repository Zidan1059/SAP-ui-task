sap.ui.define(
    ["sap/ui/core/library", "sap/uxap/BlockBase"],
    function (coreLibrary, BlockBase) {
        "use strict";

        var ViewType = coreLibrary.mvc.ViewType;

        var GoalsBlock = BlockBase.extend(
            "sap.ui.task.SharedBlocks.header.HeaderBlock",
            {
                metadata: {
                    views: {
                        Collapsed: {
                            viewName:
                                "sap.ui.task.SharedBlocks.header.HeaderBlock",
                            type: ViewType.XML,
                        },
                        Expanded: {
                            viewName:
                                "sap.ui.task.SharedBlocks.header.HeaderBlock",
                            type: ViewType.XML,
                        },
                    },
                },
            }
        );
        return GoalsBlock;
    }
);
