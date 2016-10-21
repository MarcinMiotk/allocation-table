import {TimeHandler} from "./TimeHandler";
export class TimeHandlerAccessor {


    static get(row:JQuery):TimeHandler {
        return row.data("TimeHandler");
    }

    static set(row:JQuery, handler:TimeHandler):void {
        row.data("TimeHandler", handler);
    }
}