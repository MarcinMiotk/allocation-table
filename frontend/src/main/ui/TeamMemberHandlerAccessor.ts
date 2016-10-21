import {TeamMemberHandler} from "./TeamMemberHandler";
export class TeamMemberHandlerAccessor {

    static get(cell:JQuery):TeamMemberHandler {
        return cell.data("TeamMemberHandler");
    }

    static set(cell:JQuery, handler:TeamMemberHandler):void {
        cell.data("TeamMemberHandler", handler);
    }
}