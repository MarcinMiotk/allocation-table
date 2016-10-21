$(document).ready(function() {
    require(
            [
                "AllocationTablePlugin",
                "estimations/EstimationProviderFake",
                "team/TeamMembersProviderFake",
                "providers/TimeTranslatorSecondFake"
            ], function (allocationsTable, estimation, team, time) {

        var teamMembersProvider = new team.TeamMembersProviderFake();
        var teamMembersSize = teamMembersProvider.load().length;
//
        new allocationsTable.AllocationTablePlugin(jQuery("div.allocations table"), {
            url: "Who you are?",
            estimationProvider: new estimation.EstimationProviderFake(),
            timeTranslator: new time.TimeTranslatorSecondFake(),
            teamMembersProvider: teamMembersProvider,
            gridElementsSelector: "tbody tr td:not(:first-child)",
            countTeamMembers: function() {
                return teamMembersSize;
            },
            countHoursInTimescale: function () {
                return 200;
            }
        }).attach();
    });
});

