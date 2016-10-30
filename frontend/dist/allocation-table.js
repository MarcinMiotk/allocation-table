define("tasks/VisualizedTask", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("team/TeamMember", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("estimations/EstimationProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("team/TeamMembersProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("ui/TimeHandler", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("ui/TeamMemberAndTimeCell", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamMemberAndTimeCell = (function () {
        function TeamMemberAndTimeCell(cell, teamMemberHandler, timeHandler, readSelectedTask) {
            this.cell = cell;
            this.teamMemberHandler = teamMemberHandler;
            this.timeHandler = timeHandler;
            this.readSelectedTask = readSelectedTask;
            // push me
            this.teamMemberHandler.member.registerCell(this);
        }
        TeamMemberAndTimeCell.prototype.attach = function () {
            this.cell.data("allocation-moment", this);
            this.cell.hover(jQuery.proxy(this.onCellHoverIn, this), jQuery.proxy(this.onCellHoverOut, this));
        };
        TeamMemberAndTimeCell.prototype.onCellHoverIn = function (event) {
            var cell = jQuery(event.target).data("allocation-moment");
            var task = this.readSelectedTask();
            if (task != null) {
                var estimation = cell.teamMemberHandler.member.estimateFor(task);
                this.forConsecutiveTeamCells(event, function (moment) {
                    moment.cell.addClass("moving");
                    moment.cell.text("moving");
                    moment.cell.css("background-color", task.color);
                }, estimation);
            }
        };
        TeamMemberAndTimeCell.prototype.onCellHoverOut = function (event) {
            this.forConsecutiveTeamCells(event, function (moment) {
                if (moment.cell.hasClass("moving")) {
                    moment.cell.removeClass("moving");
                    moment.cell.css("background-color", "");
                    moment.cell.text("");
                }
            });
        };
        TeamMemberAndTimeCell.prototype.forConsecutiveTeamCells = function (event, handler, estimation) {
            if (estimation === void 0) { estimation = 10000; }
            var cell = jQuery(event.target).data("allocation-moment");
            var nextElements = cell.teamMemberHandler.member.getNextCells(cell.timeHandler.id);
            var howManyCells = estimation;
            var i = 1;
            for (var _i = 0, nextElements_1 = nextElements; _i < nextElements_1.length; _i++) {
                var cell_1 = nextElements_1[_i];
                handler(cell_1);
                i++;
                if (i > howManyCells) {
                    break;
                }
            }
        };
        return TeamMemberAndTimeCell;
    }());
    exports.TeamMemberAndTimeCell = TeamMemberAndTimeCell;
});
define("ui/TeamMemberHandler", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamMemberHandlerOperations = (function () {
        function TeamMemberHandlerOperations(member, estimateFor) {
            this.member = member;
            this.estimateFor = estimateFor;
            this.cells = new Array();
        }
        TeamMemberHandlerOperations.prototype.registerCell = function (cell) {
            this.cells.push(cell);
        };
        TeamMemberHandlerOperations.prototype.getNextCells = function (sinceTimeSequenceId) {
            var meAndNextElements = new Array();
            for (var i = sinceTimeSequenceId - 1; i < this.cells.length; i++) {
                meAndNextElements.push(this.cells[i]);
            }
            return meAndNextElements;
        };
        return TeamMemberHandlerOperations;
    }());
    exports.TeamMemberHandlerOperations = TeamMemberHandlerOperations;
});
define("ui/TeamMemberHandlerAccessor", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamMemberHandlerAccessor = (function () {
        function TeamMemberHandlerAccessor() {
        }
        TeamMemberHandlerAccessor.get = function (cell) {
            return cell.data("TeamMemberHandler");
        };
        TeamMemberHandlerAccessor.set = function (cell, handler) {
            cell.data("TeamMemberHandler", handler);
        };
        return TeamMemberHandlerAccessor;
    }());
    exports.TeamMemberHandlerAccessor = TeamMemberHandlerAccessor;
});
define("ui/TimeHandlerAccessor", ["require", "exports"], function (require, exports) {
    "use strict";
    var TimeHandlerAccessor = (function () {
        function TimeHandlerAccessor() {
        }
        TimeHandlerAccessor.get = function (row) {
            return row.data("TimeHandler");
        };
        TimeHandlerAccessor.set = function (row, handler) {
            row.data("TimeHandler", handler);
        };
        return TimeHandlerAccessor;
    }());
    exports.TimeHandlerAccessor = TimeHandlerAccessor;
});
define("allocations/AllocatedTaskToMember", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("ui/TeamMembersBodyCellsBuilder", ["require", "exports", "ui/TeamMemberHandlerAccessor", "ui/TeamMemberHandler"], function (require, exports, TeamMemberHandlerAccessor_1, TeamMemberHandler_1) {
    "use strict";
    var TeamMembersBodyCellsBuilder = (function () {
        function TeamMembersBodyCellsBuilder(provider, estimationProvider) {
            this.members = new Array();
            var _loop_1 = function(member) {
                this_1.members.push(new TeamMemberHandler_1.TeamMemberHandlerOperations(member, function (what) {
                    return estimationProvider.estimate(what, member);
                }));
            };
            var this_1 = this;
            for (var _i = 0, _a = provider.load(); _i < _a.length; _i++) {
                var member = _a[_i];
                _loop_1(member);
            }
        }
        TeamMembersBodyCellsBuilder.prototype.build = function (table) {
            this.removeAllTeamCellsFromBodyTemplate(table);
            table.find("tbody tr").each(jQuery.proxy(this.forEachRow, this));
        };
        TeamMembersBodyCellsBuilder.prototype.forEachRow = function (index, element) {
            var tr = jQuery(element);
            for (var _i = 0, _a = this.members; _i < _a.length; _i++) {
                var member = _a[_i];
                var cell = jQuery("<td>");
                var handler = {
                    member: member
                };
                TeamMemberHandlerAccessor_1.TeamMemberHandlerAccessor.set(cell, handler);
                tr.append(cell);
            }
        };
        TeamMembersBodyCellsBuilder.prototype.removeAllTeamCellsFromBodyTemplate = function (table) {
            table.find("tbody tr td:not(:first-child)").remove();
        };
        // ==============
        TeamMembersBodyCellsBuilder.prototype.display = function (who, what, hourStart) {
            var member = this.get(who);
            var consecutiveCells = member.getNextCells(hourStart);
            var estimation = member.estimateFor(what);
            var coloredHours = 0;
            for (var _i = 0, consecutiveCells_1 = consecutiveCells; _i < consecutiveCells_1.length; _i++) {
                var c = consecutiveCells_1[_i];
                c.cell.css("background-color", what.color);
                //  c.cell.text(what.id);
                // TODO: I will assign VisualizedTask here
                coloredHours++;
                if (coloredHours >= estimation) {
                    break;
                }
            }
        };
        TeamMembersBodyCellsBuilder.prototype.get = function (memberId) {
            for (var _i = 0, _a = this.members; _i < _a.length; _i++) {
                var member = _a[_i];
                if (member.member.id == memberId) {
                    return member;
                }
            }
            return null;
        };
        return TeamMembersBodyCellsBuilder;
    }());
    exports.TeamMembersBodyCellsBuilder = TeamMembersBodyCellsBuilder;
});
define("ui/TeamMembersHeaderBuilder", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamMembersHeaderBuilder = (function () {
        function TeamMembersHeaderBuilder() {
        }
        TeamMembersHeaderBuilder.prototype.build = function (table, provider) {
            this.removeAllTeamHeadersFromTemplate(table);
            var tr = table.find("thead tr");
            for (var _i = 0, _a = provider.load(); _i < _a.length; _i++) {
                var member = _a[_i];
                var header = jQuery("<th>");
                header.text(member.id);
                tr.append(header);
            }
        };
        TeamMembersHeaderBuilder.prototype.removeAllTeamHeadersFromTemplate = function (table) {
            table.find("thead tr th:not(:first-child)").remove();
        };
        return TeamMembersHeaderBuilder;
    }());
    exports.TeamMembersHeaderBuilder = TeamMembersHeaderBuilder;
});
define("providers/TimeTranslator", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("ui/TimescaleBodyCellsBuilder", ["require", "exports", "ui/TimeHandlerAccessor"], function (require, exports, TimeHandlerAccessor_1) {
    "use strict";
    var TimescaleBodyCellsBuilder = (function () {
        function TimescaleBodyCellsBuilder() {
        }
        TimescaleBodyCellsBuilder.prototype.build = function (table, allHours, timeTranslator) {
            this.removeAllTimescaleRows(table);
            //
            var body = table.find("tbody");
            for (var i = 1; i < allHours(); i++) {
                var row = jQuery("<tr>");
                {
                    var timeTd = jQuery("<td>");
                    timeTd.text(timeTranslator.time(i));
                    row.append(timeTd);
                    this.attachTimeHandler(row, timeTranslator, i);
                }
                body.append(row);
            }
        };
        TimescaleBodyCellsBuilder.prototype.attachTimeHandler = function (row, timeTranslator, hourId) {
            var handler = {
                id: hourId
            };
            TimeHandlerAccessor_1.TimeHandlerAccessor.set(row, handler);
        };
        TimescaleBodyCellsBuilder.prototype.removeAllTimescaleRows = function (table) {
            table.find("tbody tr").remove();
        };
        return TimescaleBodyCellsBuilder;
    }());
    exports.TimescaleBodyCellsBuilder = TimescaleBodyCellsBuilder;
});
define("allocations/AllocationsProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("tasks/VisualizedTasksProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("AllocationTablePlugin", ["require", "exports", "ui/TeamMembersBodyCellsBuilder", "ui/TeamMembersHeaderBuilder", "ui/TimescaleBodyCellsBuilder", "ui/TeamMemberAndTimeCell", "ui/TeamMemberHandlerAccessor", "ui/TimeHandlerAccessor"], function (require, exports, TeamMembersBodyCellsBuilder_1, TeamMembersHeaderBuilder_1, TimescaleBodyCellsBuilder_1, TeamMemberAndTimeCell_1, TeamMemberHandlerAccessor_2, TimeHandlerAccessor_2) {
    "use strict";
    var AllocationTablePlugin = (function () {
        function AllocationTablePlugin(table, options) {
            this.table = table;
            this.options = options;
        }
        AllocationTablePlugin.prototype.attach = function () {
            new TeamMembersHeaderBuilder_1.TeamMembersHeaderBuilder().build(this.table, this.options.teamMembersProvider);
            new TimescaleBodyCellsBuilder_1.TimescaleBodyCellsBuilder().build(this.table, this.options.countHoursInTimescale, this.options.timeTranslator);
            //
            var cellsBuilder = new TeamMembersBodyCellsBuilder_1.TeamMembersBodyCellsBuilder(this.options.teamMembersProvider, this.options.estimationProvider);
            cellsBuilder.build(this.table);
            this.cachedCellsBuilder = cellsBuilder;
            //
            this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));
            return this;
        };
        AllocationTablePlugin.prototype.display = function (provider, tasksProvider) {
            var tasksCache = {};
            for (var _i = 0, _a = tasksProvider.load(); _i < _a.length; _i++) {
                var task = _a[_i];
                tasksCache[task.id] = task;
            }
            var allocations = provider.allocations();
            for (var _b = 0, allocations_1 = allocations; _b < allocations_1.length; _b++) {
                var allocated = allocations_1[_b];
                this.cachedCellsBuilder.display(allocated.who, tasksCache[allocated.what], allocated.hourStart);
            }
            return this;
        };
        AllocationTablePlugin.prototype.forEachCell = function (index, element) {
            var cell = jQuery(element);
            var memberHandler = TeamMemberHandlerAccessor_2.TeamMemberHandlerAccessor.get(cell);
            var timeHandler = TimeHandlerAccessor_2.TimeHandlerAccessor.get(cell.parent());
            var moment = new TeamMemberAndTimeCell_1.TeamMemberAndTimeCell(cell, memberHandler, timeHandler, this.options.readSelectedTask);
            moment.attach();
        };
        return AllocationTablePlugin;
    }());
    exports.AllocationTablePlugin = AllocationTablePlugin;
});
/**
 * Created by mami on 2016-10-13.
 */
console.log("Hello World - is said :)");
define("allocations/AllocationsProviderFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var AllocationsProviderFake = (function () {
        function AllocationsProviderFake() {
        }
        AllocationsProviderFake.prototype.allocations = function () {
            var allocations = new Array();
            allocations.push({
                what: "TASK-1",
                who: "user0",
                hourStart: 22
            });
            allocations.push({
                what: "TASK-2",
                who: "user1",
                hourStart: 14
            });
            allocations.push({
                what: "TASK-3",
                who: "user1",
                hourStart: 10
            });
            allocations.push({
                what: "TASK-4",
                who: "user3",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-5",
                who: "user4",
                hourStart: 7
            });
            allocations.push({
                what: "TASK-6",
                who: "user4",
                hourStart: 18
            });
            allocations.push({
                what: "TASK-7",
                who: "user5",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-8",
                who: "user6",
                hourStart: 12
            });
            allocations.push({
                what: "TASK-9",
                who: "user7",
                hourStart: 3
            });
            return allocations;
        };
        return AllocationsProviderFake;
    }());
    exports.AllocationsProviderFake = AllocationsProviderFake;
});
define("estimations/EstimationProviderFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var EstimationProviderFake = (function () {
        function EstimationProviderFake() {
        }
        EstimationProviderFake.prototype.estimate = function (what, who) {
            if (what != null && who != null) {
                /*
                if(who.id=="user0") {
                    return 5;
                }
                if(who.id=="user1") {
                    return 3;
                }
                */
                return 4;
            }
            else {
                return 0;
            }
        };
        return EstimationProviderFake;
    }());
    exports.EstimationProviderFake = EstimationProviderFake;
});
define("providers/TimeTranslatorFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var TimeTranslatorFake = (function () {
        function TimeTranslatorFake() {
        }
        TimeTranslatorFake.prototype.time = function (timeSequenceIndex) {
            var result = "";
            switch (timeSequenceIndex) {
                case 1:
                    result += "2016-10-14 09:00";
                    break;
                case 2:
                    result += "2016-10-14 10:00";
                    break;
                case 3:
                    result += "2016-10-14 11:00";
                    break;
                case 4:
                    result += "2016-10-14 12:00";
                    break;
                case 5:
                    result += "2016-10-14 13:00";
                    break;
                case 6:
                    result += "2016-10-14 14:00";
                    break;
                case 7:
                    result += "2016-10-14 15:00";
                    break;
                case 8:
                    result += "2016-10-14 16:00";
                    break;
                case 9:
                    result += "2016-10-17 09:00";
                    break;
                case 10:
                    result += "2016-10-17 10:00";
                    break;
            }
            return result;
        };
        return TimeTranslatorFake;
    }());
    exports.TimeTranslatorFake = TimeTranslatorFake;
});
define("providers/TimeTranslatorSecondFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var TimeTranslatorSecondFake = (function () {
        function TimeTranslatorSecondFake() {
        }
        TimeTranslatorSecondFake.prototype.time = function (timeSequenceIndex) {
            var result = "";
            result = "Godzina " + timeSequenceIndex;
            return result;
        };
        return TimeTranslatorSecondFake;
    }());
    exports.TimeTranslatorSecondFake = TimeTranslatorSecondFake;
});
define("tasks/VisualizedTasksProviderFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var VisualizedTasksProviderFake = (function () {
        function VisualizedTasksProviderFake() {
            this.accesibleColors = [
                "#A1BE95",
                "#E2DFA2",
                "#92AAC7",
                "#ED5752",
                "#4897D8",
                "#FFDB5C",
                "#FA5E59",
                "#F8A055",
                "#AF4425",
                "#662E1C",
                "#C9A66B",
            ];
        }
        VisualizedTasksProviderFake.prototype.load = function () {
            var tasks = new Array();
            for (var i = 0; i < 10; i++) {
                var nextColor;
                nextColor = this.accesibleColors[i];
                tasks.push({
                    id: "TASK-" + i,
                    color: nextColor
                });
            }
            return tasks;
        };
        return VisualizedTasksProviderFake;
    }());
    exports.VisualizedTasksProviderFake = VisualizedTasksProviderFake;
});
define("tasks-table/tasks/TeamTaskEstimation", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("tasks-table/tasks/TeamTask", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("tasks-table/tasks/TeamTasksProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("tasks-table/ui/TeamTaskHandler", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("tasks-table/ui/TeamTaskHandlerAccessor", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamTaskHandlerAccessor = (function () {
        function TeamTaskHandlerAccessor() {
        }
        TeamTaskHandlerAccessor.get = function (row) {
            return row.data("TeamTaskHandler");
        };
        TeamTaskHandlerAccessor.set = function (row, handler) {
            row.data("TeamTaskHandler", handler);
        };
        return TeamTaskHandlerAccessor;
    }());
    exports.TeamTaskHandlerAccessor = TeamTaskHandlerAccessor;
});
define("tasks-table/ui/WhoCanBuilder", ["require", "exports"], function (require, exports) {
    "use strict";
    var WhoCanBuilder = (function () {
        function WhoCanBuilder(cell) {
            this.cell = cell;
        }
        WhoCanBuilder.prototype.attach = function () {
            // TODO: get users from TeamMembers provider
            for (var i = 1; i < 9; i++) {
                var button = jQuery("<button>");
                button.text("user" + i);
                button.attr("type", "button");
                button.addClass("btn");
                if (i % 2 == 0) {
                    button.addClass("btn-on");
                }
                else {
                    button.addClass("btn-off");
                }
                this.cell.append(" ");
                this.cell.append(button);
            }
        };
        return WhoCanBuilder;
    }());
    exports.WhoCanBuilder = WhoCanBuilder;
});
define("tasks-table/ui/EstimationsCellBuilder", ["require", "exports"], function (require, exports) {
    "use strict";
    var EstimationsCellBuilder = (function () {
        function EstimationsCellBuilder(cell) {
            this.cell = cell;
        }
        EstimationsCellBuilder.prototype.attach = function () {
            // TODO: get users from TeamMembers provider
            for (var i = 1; i < 9; i++) {
                this.cell.append("user" + i);
                this.cell.append(" ");
                var input = jQuery("<input>");
                input.val(4);
                input.attr("type", "number");
                this.cell.append(input);
                this.cell.append(jQuery("<br/>"));
            }
        };
        return EstimationsCellBuilder;
    }());
    exports.EstimationsCellBuilder = EstimationsCellBuilder;
});
define("tasks-table/ui/TasksBodyCellsBuilder", ["require", "exports", "tasks-table/ui/TeamTaskHandlerAccessor", "tasks-table/ui/WhoCanBuilder", "tasks-table/ui/EstimationsCellBuilder"], function (require, exports, TeamTaskHandlerAccessor_1, WhoCanBuilder_1, EstimationsCellBuilder_1) {
    "use strict";
    var TasksBodyCellsBuilder = (function () {
        function TasksBodyCellsBuilder(tasksProvider) {
            this.tasksProvider = tasksProvider;
        }
        TasksBodyCellsBuilder.prototype.build = function (table) {
            this.removeAllTeamCellsFromBodyTemplate(table);
            this.addRowsTo(table.find("tbody"));
        };
        TasksBodyCellsBuilder.prototype.addRowsTo = function (tbody) {
            var sequence = 1;
            for (var _i = 0, _a = this.tasksProvider.all(); _i < _a.length; _i++) {
                var task = _a[_i];
                var row = jQuery("<tr>");
                {
                    TeamTaskHandlerAccessor_1.TeamTaskHandlerAccessor.set(row, {
                        task: task
                    });
                }
                {
                    var color = jQuery("<td>");
                    color.addClass("color");
                    color.css("background-color", task.color);
                    color.text(sequence++);
                    row.append(color);
                }
                {
                    var cell = jQuery("<td>");
                    cell.text(task.id);
                    row.append(cell);
                }
                {
                    var cell = jQuery("<td>");
                    cell.text(task.deadline);
                    row.append(cell);
                }
                {
                    var cell = jQuery("<td>");
                    cell.text(task.subject);
                    row.append(cell);
                }
                {
                    var cell = jQuery("<td>");
                    cell.addClass("who-can");
                    {
                        var whoCan = new WhoCanBuilder_1.WhoCanBuilder(cell);
                        whoCan.attach();
                    }
                    row.append(cell);
                }
                {
                    var cell = jQuery("<td>");
                    cell.addClass("estimations");
                    {
                        var estimationsCell = new EstimationsCellBuilder_1.EstimationsCellBuilder(cell);
                        estimationsCell.attach();
                    }
                    row.append(cell);
                }
                {
                    var cell = jQuery("<td>");
                    cell.addClass("remove-task");
                    {
                        var remove = jQuery("<button>");
                        remove.attr("type", "button");
                        remove.text("Usuń");
                        cell.append(remove);
                    }
                    row.append(cell);
                }
                tbody.append(row);
            }
        };
        TasksBodyCellsBuilder.prototype.removeAllTeamCellsFromBodyTemplate = function (table) {
            table.find("tbody tr").remove();
        };
        return TasksBodyCellsBuilder;
    }());
    exports.TasksBodyCellsBuilder = TasksBodyCellsBuilder;
});
define("tasks-table/TasksTablePlugin", ["require", "exports", "tasks-table/ui/TasksBodyCellsBuilder", "tasks-table/ui/TeamTaskHandlerAccessor"], function (require, exports, TasksBodyCellsBuilder_1, TeamTaskHandlerAccessor_2) {
    "use strict";
    var TasksTablePlugin = (function () {
        function TasksTablePlugin(table, options) {
            this.table = table;
            this.options = options;
        }
        TasksTablePlugin.prototype.attach = function () {
            new TasksBodyCellsBuilder_1.TasksBodyCellsBuilder(this.options.tasksProvider).build(this.table);
            this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCellWithColor, this));
            return this;
        };
        TasksTablePlugin.prototype.forEachCellWithColor = function (index, element) {
            var cell = jQuery(element);
            var taskHandler = TeamTaskHandlerAccessor_2.TeamTaskHandlerAccessor.get(cell.parent());
            cell.click(taskHandler, jQuery.proxy(this.onClickedTask, this));
        };
        TasksTablePlugin.prototype.onClickedTask = function (eventObject) {
            this.unselectAllRows();
            var clickedTask = eventObject.data.task;
            jQuery(eventObject.target).parent().find("td:nth-child(2)").css("background-color", clickedTask.color);
            this.options.selectTask(clickedTask);
        };
        TasksTablePlugin.prototype.unselectAllRows = function () {
            this.table.find(this.options.gridElementsSelector).each(function (index, element) {
                var cell = jQuery(element);
                cell.parent().find("td:nth-child(2)").css("background-color", "");
            });
        };
        return TasksTablePlugin;
    }());
    exports.TasksTablePlugin = TasksTablePlugin;
});
define("tasks-table/tasks/TeamTasksProviderFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamTasksProviderFake = (function () {
        function TeamTasksProviderFake() {
        }
        TeamTasksProviderFake.prototype.all = function () {
            var result = new Array();
            result.push({
                color: "green",
                id: "JIRA-001",
                deadline: "5.10.2016",
                subject: "Jakiś temat",
                whoCanDo: [
                    {
                        who: "user0",
                        estimation: 3
                    },
                    {
                        who: "user1",
                        estimation: 7
                    }
                ]
            });
            result.push({
                color: "pink",
                id: "JIRA-002",
                deadline: "6.10.2016",
                subject: "Inny temat o jakiejś treści",
                whoCanDo: [
                    {
                        who: "user0",
                        estimation: 4
                    },
                    {
                        who: "user1",
                        estimation: 4
                    }
                ]
            });
            result.push({
                color: "brown",
                id: "JIRA-003",
                deadline: "7.10.2016",
                subject: "Odbisać na maile",
                whoCanDo: [
                    {
                        who: "user0",
                        estimation: 4
                    },
                    {
                        who: "user1",
                        estimation: 4
                    }
                ]
            });
            result.push({
                color: "yellow",
                id: "JIRA-004",
                deadline: "12.10.2016",
                subject: "Rozmowa rekrutacyjna",
                whoCanDo: [
                    {
                        who: "user0",
                        estimation: 4
                    },
                    {
                        who: "user1",
                        estimation: 4
                    }
                ]
            });
            result.push({
                color: "white",
                id: "JIRA-005",
                deadline: "22.10.2016",
                subject: "Konsultacja telefoniczna z klientem ABCD",
                whoCanDo: [
                    {
                        who: "user0",
                        estimation: 4
                    },
                    {
                        who: "user1",
                        estimation: 4
                    }
                ]
            });
            return result;
        };
        return TeamTasksProviderFake;
    }());
    exports.TeamTasksProviderFake = TeamTasksProviderFake;
});
define("team/TeamMembersProviderFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamMembersProviderFake = (function () {
        function TeamMembersProviderFake() {
        }
        TeamMembersProviderFake.prototype.load = function () {
            var members = new Array();
            for (var i = 0; i < 8; i++) {
                members.push({
                    id: "user" + i
                });
            }
            return members;
        };
        return TeamMembersProviderFake;
    }());
    exports.TeamMembersProviderFake = TeamMembersProviderFake;
});
//# sourceMappingURL=allocation-table.js.map