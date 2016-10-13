/**
 * Created by mami on 2016-10-13.
 */
console.log("Hello World - is said :)");
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
describe("my first test", function () {
    it("my first expectation :)", function () {
        expect(true).toBeTruthy("What? Why was true not truthy?");
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
//# sourceMappingURL=allocation-table.js.map