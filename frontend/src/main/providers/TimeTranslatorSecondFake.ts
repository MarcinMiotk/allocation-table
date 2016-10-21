import {TimeTranslator} from "./TimeTranslator";
export class TimeTranslatorSecondFake implements TimeTranslator {

    time(timeSequenceIndex:number):string {
        let result = "";

        result = "Godzina "+timeSequenceIndex;

        return result;
    }
}