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
                tasksProvider
        ) {

        var teamMembersProvider = new team.TeamMembersProviderFake();

        new allocationsTable.AllocationTablePlugin(jQuery("div.allocations table"), {
            url: "Who you are?",
            estimationProvider: new estimation.EstimationProviderFake(),
            timeTranslator: new time.TimeTranslatorSecondFake(),
            teamMembersProvider: teamMembersProvider,
            gridElementsSelector: "tbody tr td:not(:first-child)",
            countHoursInTimescale: function () {
                return 61;
            },
            readSelectedTask: function () {
                return {
                    id: jQuery("body").data("choosed-task-id"),
                    color: jQuery("body").data("choosed-task-color")
                };
            }
        }).attach().display(new allocationsFake.AllocationsProviderFake(), new tasksProvider.VisualizedTasksProviderFake());
    });


    // ===================================================================


    require(
        [
            "tasks-table/TasksTablePlugin",
            "tasks-table/tasks/TeamTasksProviderFake"
        ], function (
            plugin,
            tasksProvider
        ) {
            var table = new plugin.TasksTablePlugin(jQuery("div.tasks table"), {
                url: "Fake URL",
                gridElementsSelector: "tbody tr td.color",
                tasksProvider: new tasksProvider.TeamTasksProviderFake(),
                selectTask: function (selectedTask) {
                    jQuery("body").data("choosed-task-id", selectedTask.id);
                    jQuery("body").data("choosed-task-color", selectedTask.color);
                }
            });

            table.attach();
        });
});

