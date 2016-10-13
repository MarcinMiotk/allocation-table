import {TimeTranslator} from "./TimeTranslator";
export class TimeTranslatorFake implements TimeTranslator {

    time(timeSequenceIndex:number):string {
        let result = "";

        switch(timeSequenceIndex) {
            case 1 : result += "2016-10-14 09:00"; break;
            case 2 : result += "2016-10-14 10:00"; break;
            case 3 : result += "2016-10-14 11:00"; break;
            case 4 : result += "2016-10-14 12:00"; break;
            case 5 : result += "2016-10-14 13:00"; break;
            case 6 : result += "2016-10-14 14:00"; break;
            case 7 : result += "2016-10-14 15:00"; break;
            case 8 : result += "2016-10-14 16:00"; break;
            case 9 : result += "2016-10-17 09:00"; break;
            case 10 : result += "2016-10-17 10:00"; break;
        }

        return result;
    }
}