define("main/tasks/VisualizedTask", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/team/TeamMember", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/estimations/EstimationProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/AllocationTablePlugin", ["require", "exports"], function (require, exports) {
    "use strict";
    var AllocationTablePlugin = (function () {
        function AllocationTablePlugin(table, options) {
            this.mapping = new AllocationsRepository();
            this.table = table;
            this.options = options;
        }
        AllocationTablePlugin.prototype.attach = function () {
            this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));
        };
        AllocationTablePlugin.prototype.forEachCell = function (index, element) {
            jQuery(element).removeAttr("style"); // clear presentation suggestions
            var moment = new TeamMemberAllocationMoment(index, jQuery(element), this, this.options.countTeamMembers);
            moment.attach();
            this.mapping.registerCell(moment);
        };
        return AllocationTablePlugin;
    }());
    exports.AllocationTablePlugin = AllocationTablePlugin;
    var TeamMemberAllocationMoment = (function () {
        function TeamMemberAllocationMoment(gridIndex, cell, plugin, countTeamMembersFunction) {
            this.cell = cell;
            this.plugin = plugin;
            var teamMembers = countTeamMembersFunction();
            this.teamMemberIndex = gridIndex % teamMembers;
            this.sequence = Math.floor(gridIndex / teamMembers);
        }
        TeamMemberAllocationMoment.prototype.attach = function () {
            this.cell.data("allocation-moment", this);
            this.cell.hover(jQuery.proxy(this.onCellHoverIn, this), jQuery.proxy(this.onCellHoverOut, this));
        };
        TeamMemberAllocationMoment.prototype.onCellHoverIn = function (event) {
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
        TeamMemberAllocationMoment.prototype.onCellHoverOut = function (event) {
            this.forConsecutiveTeamCells(event, function (moment) {
                if (moment.cell.hasClass("moving")) {
                    moment.cell.removeClass("moving");
                    moment.cell.text("");
                }
            });
        };
        TeamMemberAllocationMoment.prototype.forConsecutiveTeamCells = function (event, handler, estimation) {
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
        return TeamMemberAllocationMoment;
    }());
    exports.TeamMemberAllocationMoment = TeamMemberAllocationMoment;
    var AllocationsRepository = (function () {
        function AllocationsRepository() {
            this.byTeamMember = {};
        }
        AllocationsRepository.prototype.add = function (moment) {
            if (this.byTeamMember[moment.teamMemberIndex] == null) {
                this.byTeamMember[moment.teamMemberIndex] = new Array();
            }
            this.byTeamMember[moment.teamMemberIndex].push(moment);
        };
        AllocationsRepository.prototype.getNextElementsByTeamMember = function (moment) {
            var meAndNextElements = new Array();
            var allCellsOfMember = this.byTeamMember[moment.teamMemberIndex];
            for (var i = moment.sequence; i < allCellsOfMember.length; i++) {
                meAndNextElements.push(allCellsOfMember[i]);
            }
            return meAndNextElements;
        };
        return AllocationsRepository;
    }());
    exports.AllocationsRepository = AllocationsRepository;
});
/**
 * Created by mami on 2016-10-13.
 */
console.log("Hello World - is said :)");
define("main/allocations/AllocatedTaskToMember", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/allocations/AllocationsProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/allocations/AllocationsProviderFake", ["require", "exports"], function (require, exports) {
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
            /*
                    return [
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        },
                        {
                            what: "TASK-1",
                            who: "mami",
                            hourStart: 3
                        }
                    ];
                    */
        };
        return AllocationsProviderFake;
    }());
    exports.AllocationsProviderFake = AllocationsProviderFake;
});
define("main/estimations/EstimationProviderFake", ["require", "exports"], function (require, exports) {
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
define("main/providers/TimeTranslator", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/providers/TimeTranslatorFake", ["require", "exports"], function (require, exports) {
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
define("main/tasks/VisualizedTasksProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/tasks/VisualizedTasksProviderFake", ["require", "exports"], function (require, exports) {
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
define("main/team/TeamMembersProvider", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/team/TeamMembersProviderFake", ["require", "exports"], function (require, exports) {
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
describe("my first test", function () {
    it("my first expectation :)", function () {
        expect(true).toBeTruthy("What? Why was true not truthy?");
    });
});
define("test/allocations/AllocationsProviderFake.spec", ["require", "exports", "main/allocations/AllocationsProviderFake"], function (require, exports, AllocationsProviderFake_1) {
    "use strict";
    describe("In the AllocationsProviderFake", function () {
        describe("the load allocations", function () {
            var sut = new AllocationsProviderFake_1.AllocationsProviderFake();
            it("should return 10 elements", function () {
                expect(sut.allocations().length).toEqual(10);
            });
            it("each item should have unique ID", function () {
                var allocations = sut.allocations();
                var counters = {};
                for (var _i = 0, allocations_1 = allocations; _i < allocations_1.length; _i++) {
                    var allocation = allocations_1[_i];
                    if (counters[allocation.what] != null) {
                        counters[allocation.what] = counters[allocation.what] + 1;
                    }
                    else {
                        counters[allocation.what] = 1;
                    }
                }
                for (var _a = 0, allocations_2 = allocations; _a < allocations_2.length; _a++) {
                    var allocation = allocations_2[_a];
                    expect(counters[allocation.what]).toEqual(1);
                }
            });
        });
    });
});
define("test/estimations/EstimationProviderFake.spec", ["require", "exports", "main/estimations/EstimationProviderFake"], function (require, exports, EstimationProviderFake_1) {
    "use strict";
    describe("In the EstimationProviderFake", function () {
        describe("the estimate method", function () {
            var sut = new EstimationProviderFake_1.EstimationProviderFake();
            it("should return 0 if error", function () {
                var estimation = sut.estimate(null, null);
                expect(estimation).toEqual(0);
            });
            it("should return at least 4 for any Member and Task combination", function () {
                var estimation = sut.estimate({
                    id: "TASK-001",
                    color: "red"
                }, {
                    id: "mami"
                });
                expect(estimation).toBeGreaterThanOrEqual(4);
            });
        });
    });
});
define("test/providers/TimeTranslatorFake.spec", ["require", "exports", "main/providers/TimeTranslatorFake"], function (require, exports, TimeTranslatorFake_1) {
    "use strict";
    describe("TimeTranslatorFake", function () {
        it("returns 1 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(1);
            // assert
            expect(result).toEqual("2016-10-14 09:00");
        });
        it("returns 2 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(2);
            // assert
            expect(result).toEqual("2016-10-14 10:00");
        });
        it("returns 3 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(3);
            // assert
            expect(result).toEqual("2016-10-14 11:00");
        });
        it("returns 4 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(4);
            // assert
            expect(result).toEqual("2016-10-14 12:00");
        });
        it("returns 5 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(5);
            // assert
            expect(result).toEqual("2016-10-14 13:00");
        });
        it("returns 6 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(6);
            // assert
            expect(result).toEqual("2016-10-14 14:00");
        });
        it("returns 7 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(7);
            // assert
            expect(result).toEqual("2016-10-14 15:00");
        });
        it("returns 8 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(8);
            // assert
            expect(result).toEqual("2016-10-14 16:00");
        });
        it("returns 9 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(9);
            // assert
            expect(result).toEqual("2016-10-17 09:00");
        });
        it("returns 10 hour", function () {
            // arrange
            var time = new TimeTranslatorFake_1.TimeTranslatorFake();
            // act
            var result = time.time(10);
            // assert
            expect(result).toEqual("2016-10-17 10:00");
        });
    });
});
define("test/tasks/VisualizedTasksProviderFake.spec", ["require", "exports", "main/tasks/VisualizedTasksProviderFake"], function (require, exports, VisualizedTasksProviderFake_1) {
    "use strict";
    describe("In the VisualizedTasksProviderFake", function () {
        describe("the load method", function () {
            var sut = new VisualizedTasksProviderFake_1.VisualizedTasksProviderFake();
            it("should return 10 elements", function () {
                expect(sut.load().length).toEqual(10);
            });
            it("each item should have unique ID", function () {
                var tasks = sut.load();
                var counters = {};
                for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                    var task = tasks_1[_i];
                    if (counters[task.id] != null) {
                        counters[task.id] = counters[task.id] + 1;
                    }
                    else {
                        counters[task.id] = 1;
                    }
                }
                for (var _a = 0, tasks_2 = tasks; _a < tasks_2.length; _a++) {
                    var task = tasks_2[_a];
                    expect(counters[task.id]).toEqual(1);
                }
            });
            it("each item should have unique color", function () {
                var tasks = sut.load();
                var counters = {};
                for (var _i = 0, tasks_3 = tasks; _i < tasks_3.length; _i++) {
                    var task = tasks_3[_i];
                    if (counters[task.color] != null) {
                        counters[task.color] = counters[task.color] + 1;
                    }
                    else {
                        counters[task.color] = 1;
                    }
                }
                for (var _a = 0, tasks_4 = tasks; _a < tasks_4.length; _a++) {
                    var task = tasks_4[_a];
                    expect(counters[task.color]).toEqual(1);
                }
            });
        });
        describe("the constructor method", function () {
        });
    });
});
define("test/team/TeamMembersProviderFake.spec", ["require", "exports", "main/team/TeamMembersProviderFake"], function (require, exports, TeamMembersProviderFake_1) {
    "use strict";
    describe("In the TeamMembersProviderFake", function () {
        describe("the load method", function () {
            var sut = new TeamMembersProviderFake_1.TeamMembersProviderFake();
            it("should return 8 elements", function () {
                expect(sut.load().length).toEqual(8);
            });
            it("each item should have unique ID", function () {
                var members = sut.load();
                var counters = {};
                for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                    var member = members_1[_i];
                    if (counters[member.id] != null) {
                        counters[member.id] = counters[member.id] + 1;
                    }
                    else {
                        counters[member.id] = 1;
                    }
                }
                for (var _a = 0, members_2 = members; _a < members_2.length; _a++) {
                    var member = members_2[_a];
                    expect(counters[member.id]).toEqual(1);
                }
            });
        });
    });
});
//# sourceMappingURL=allocation-table-test.js.map