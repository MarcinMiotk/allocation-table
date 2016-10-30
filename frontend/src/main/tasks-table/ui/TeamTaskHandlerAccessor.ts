import {TeamTaskHandler} from "./TeamTaskHandler";
import {TeamTask} from "../tasks/TeamTask";
export class TeamTaskHandlerAccessor {

    static get(row:JQuery):TeamTaskHandler {
        return row.data("TeamTaskHandler");
    }

    static set(row:JQuery, handler:TeamTaskHandler):void {
        row.data("TeamTaskHandler", handler);
    }
}