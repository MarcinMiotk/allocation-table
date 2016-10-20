$(document).ready(function() {
    require(["AllocationTablePlugin", "estimations/EstimationProviderFake"], function (allocationsTable, estimation) {
        new allocationsTable.AllocationTablePlugin(jQuery("div.allocations table"), {
            url: "Who you are?",
            estimationProvider: new estimation.EstimationProviderFake(),
            gridElementsSelector: "tbody tr td:not(:first-child)",
            countTeamMembers: function () {
                return 6;
            }
        }).attach();
    });
});

