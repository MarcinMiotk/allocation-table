$(document).ready(function() {
    require(
            [
                "AllocationTablePlugin",
                "estimations/EstimationProviderFake",
                "team/TeamMembersProviderFake",
                "providers/TimeTranslatorSecondFake",
                "allocations/AllocationsProviderFake",
                "tasks/VisualizedTasksProviderFake"
            ], function (
                allocationsTable,
                estimation,
                team,
                time,
                allocationsFake,
                tasksProvider) {

        var teamMembersProvider = new team.TeamMembersProviderFake();
        var teamMembersSize = teamMembersProvider.load().length;
//
        new allocationsTable.AllocationTablePlugin(jQuery("div.allocations table"), {
            url: "Who you are?",
            estimationProvider: new estimation.EstimationProviderFake(),
            timeTranslator: new time.TimeTranslatorSecondFake(),
            teamMembersProvider: teamMembersProvider,
            gridElementsSelector: "tbody tr td:not(:first-child)",
            countHoursInTimescale: function () {
                return 31;
            }
        }).attach().display(new allocationsFake.AllocationsProviderFake(), new tasksProvider.VisualizedTasksProviderFake());
    });
});

