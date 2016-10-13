import {TimeTranslator} from "../../main/providers/TimeTranslator";
import {TimeTranslatorFake} from "../../main/providers/TimeTranslatorFake";
describe("TimeTranslatorFake", () =>{
   it("returns 1 hour", () =>{
       // arrange
       let time:TimeTranslator = new TimeTranslatorFake();

       // act
       let result:string = time.time(1);

       // assert
       expect(result).toEqual("2016-10-14 09:00");
   });

    it("returns 2 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(2);

        // assert
        expect(result).toEqual("2016-10-14 10:00");
    });


    it("returns 3 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(3);

        // assert
        expect(result).toEqual("2016-10-14 11:00");
    });


    it("returns 4 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(4);

        // assert
        expect(result).toEqual("2016-10-14 12:00");
    });


    it("returns 5 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(5);

        // assert
        expect(result).toEqual("2016-10-14 13:00");
    });


    it("returns 6 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(6);

        // assert
        expect(result).toEqual("2016-10-14 14:00");
    });


    it("returns 7 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(7);

        // assert
        expect(result).toEqual("2016-10-14 15:00");
    });


    it("returns 8 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(8);

        // assert
        expect(result).toEqual("2016-10-14 16:00");
    });


    it("returns 9 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(9);

        // assert
        expect(result).toEqual("2016-10-17 09:00");
    });


    it("returns 10 hour", () =>{
        // arrange
        let time:TimeTranslator = new TimeTranslatorFake();

        // act
        let result:string = time.time(10);

        // assert
        expect(result).toEqual("2016-10-17 10:00");
    });
});