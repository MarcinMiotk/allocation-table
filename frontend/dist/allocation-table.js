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
define("ui/TeamMemberHandler", ["require", "exports"], function (require, exports) {
    "use strict";
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
define("ui/TimeHandler", ["require", "exports"], function (require, exports) {
    "use strict";
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
define("ui/TeamMembersBodyCellsBuilder", ["require", "exports", "ui/TeamMemberHandlerAccessor", "ui/TimeHandlerAccessor"], function (require, exports, TeamMemberHandlerAccessor_1, TimeHandlerAccessor_1) {
    "use strict";
    var TeamMembersBodyCellsBuilder = (function () {
        function TeamMembersBodyCellsBuilder(provider) {
            this.provider = provider;
        }
        TeamMembersBodyCellsBuilder.prototype.build = function (table) {
            this.removeAllTeamCellsFromBodyTemplate(table);
            table.find("tbody tr").each(jQuery.proxy(this.forEachRow, this));
        };
        TeamMembersBodyCellsBuilder.prototype.forEachRow = function (index, element) {
            var tr = jQuery(element);
            for (var _i = 0, _a = this.provider.load(); _i < _a.length; _i++) {
                var member = _a[_i];
                var cell = jQuery("<td>");
                cell.text(member.id + " hour " + TimeHandlerAccessor_1.TimeHandlerAccessor.get(tr).id);
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
define("ui/TimescaleBodyCellsBuilder", ["require", "exports", "ui/TimeHandlerAccessor"], function (require, exports, TimeHandlerAccessor_2) {
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
            TimeHandlerAccessor_2.TimeHandlerAccessor.set(row, handler);
        };
        TimescaleBodyCellsBuilder.prototype.removeAllTimescaleRows = function (table) {
            table.find("tbody tr").remove();
        };
        return TimescaleBodyCellsBuilder;
    }());
    exports.TimescaleBodyCellsBuilder = TimescaleBodyCellsBuilder;
});
define("ui/TeamMemberAndTimeCell", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamMemberAndTimeCell = (function () {
        function TeamMemberAndTimeCell(gridIndex, cell, plugin, countTeamMembersFunction) {
            this.cell = cell;
            this.plugin = plugin;
            var teamMembers = countTeamMembersFunction();
            this.teamMemberIndex = gridIndex % teamMembers;
            this.sequence = Math.floor(gridIndex / teamMembers);
        }
        TeamMemberAndTimeCell.prototype.attach = function () {
            this.cell.data("allocation-moment", this);
            this.cell.hover(jQuery.proxy(this.onCellHoverIn, this), jQuery.proxy(this.onCellHoverOut, this));
        };
        TeamMemberAndTimeCell.prototype.onCellHoverIn = function (event) {
            var m = jQuery(event.target).data("allocation-moment");
            var estimation = this.plugin.options.estimationProvider.estimate({
                id: "TODO",
                color: "TODO" // todo
            }, {
                id: "TODO-001" // todo
            });
            this.forConsecutiveTeamCells(event, function (moment) {
                moment.cell.addClass("moving");
                moment.cell.text("moving");
            }, estimation);
        };
        TeamMemberAndTimeCell.prototype.onCellHoverOut = function (event) {
            this.forConsecutiveTeamCells(event, function (moment) {
                if (moment.cell.hasClass("moving")) {
                    moment.cell.removeClass("moving");
                    moment.cell.text("");
                }
            });
        };
        TeamMemberAndTimeCell.prototype.forConsecutiveTeamCells = function (event, handler, estimation) {
            if (estimation === void 0) { estimation = 10000; }
            var moment = jQuery(event.target).data("allocation-moment");
            var nextElements = this.plugin.mapping.getNextElementsByTeamMember(moment);
            var howManyCells = estimation;
            var i = 1;
            for (var _i = 0, nextElements_1 = nextElements; _i < nextElements_1.length; _i++) {
                var cell = nextElements_1[_i];
                handler(cell);
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
define("ui/TeamMemberAndTimeCellMapping", ["require", "exports"], function (require, exports) {
    "use strict";
    var TeamMemberAndTimeCellMapping = (function () {
        function TeamMemberAndTimeCellMapping() {
            this.byTeamMember = {};
        }
        TeamMemberAndTimeCellMapping.prototype.registerCell = function (moment) {
            if (this.byTeamMember[moment.teamMemberIndex] == null) {
                this.byTeamMember[moment.teamMemberIndex] = new Array();
            }
            this.byTeamMember[moment.teamMemberIndex].push(moment);
        };
        TeamMemberAndTimeCellMapping.prototype.getNextElementsByTeamMember = function (moment) {
            var meAndNextElements = new Array();
            var allCellsOfMember = this.byTeamMember[moment.teamMemberIndex];
            for (var i = moment.sequence; i < allCellsOfMember.length; i++) {
                meAndNextElements.push(allCellsOfMember[i]);
            }
            return meAndNextElements;
        };
        return TeamMemberAndTimeCellMapping;
    }());
    exports.TeamMemberAndTimeCellMapping = TeamMemberAndTimeCellMapping;
});
define("AllocationTablePlugin", ["require", "exports", "ui/TeamMembersBodyCellsBuilder", "ui/TeamMembersHeaderBuilder", "ui/TimescaleBodyCellsBuilder", "ui/TeamMemberAndTimeCellMapping", "ui/TeamMemberAndTimeCell", "ui/TeamMemberHandlerAccessor", "ui/TimeHandlerAccessor"], function (require, exports, TeamMembersBodyCellsBuilder_1, TeamMembersHeaderBuilder_1, TimescaleBodyCellsBuilder_1, TeamMemberAndTimeCellMapping_1, TeamMemberAndTimeCell_1, TeamMemberHandlerAccessor_2, TimeHandlerAccessor_3) {
    "use strict";
    var AllocationTablePlugin = (function () {
        function AllocationTablePlugin(table, options) {
            this.mapping = new TeamMemberAndTimeCellMapping_1.TeamMemberAndTimeCellMapping();
            this.table = table;
            this.options = options;
        }
        AllocationTablePlugin.prototype.attach = function () {
            new TeamMembersHeaderBuilder_1.TeamMembersHeaderBuilder().build(this.table, this.options.teamMembersProvider);
            new TimescaleBodyCellsBuilder_1.TimescaleBodyCellsBuilder().build(this.table, this.options.countHoursInTimescale, this.options.timeTranslator);
            new TeamMembersBodyCellsBuilder_1.TeamMembersBodyCellsBuilder(this.options.teamMembersProvider).build(this.table);
            this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));
        };
        AllocationTablePlugin.prototype.forEachCell = function (index, element) {
            var cell = jQuery(element);
            var memberHandler = TeamMemberHandlerAccessor_2.TeamMemberHandlerAccessor.get(cell);
            var timeHandler = TimeHandlerAccessor_3.TimeHandlerAccessor.get(cell.parent());
            var moment = new TeamMemberAndTimeCell_1.TeamMemberAndTimeCell(index, cell, this, this.options.countTeamMembers);
            moment.attach();
            this.mapping.registerCell(moment);
        };
        return AllocationTablePlugin;
    }());
    exports.AllocationTablePlugin = AllocationTablePlugin;
});
/**
 * Created by mami on 2016-10-13.
 */
console.log("Hello World - is said :)");
define("allocations/AllocatedTaskToMember", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("allocations/AllocationsProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("allocations/AllocationsProviderFake", ["require", "exports"], function (require, exports) {
    "use strict";
    var AllocationsProviderFake = (function () {
        function AllocationsProviderFake() {
        }
        AllocationsProviderFake.prototype.allocations = function () {
            var allocations = new Array();
            allocations.push({
                what: "TASK-1",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-2",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-3",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-4",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-5",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-6",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-7",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-8",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-9",
                who: "mami",
                hourStart: 3
            });
            allocations.push({
                what: "TASK-10",
                who: "mami",
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
define("tasks/VisualizedTasksProvider", ["require", "exports"], function (require, exports) {
    "use strict";
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