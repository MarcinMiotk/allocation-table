/**
 * Created by mami on 2016-10-13.
 */
console.log("Hello World - is said :)");
define("main/tasks/VisualizedTask", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/team/TeamMember", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("main/estimations/EstimationProvider", ["require", "exports"], function (require, exports) {
    "use strict";
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
//# sourceMappingURL=allocation-table.js.map