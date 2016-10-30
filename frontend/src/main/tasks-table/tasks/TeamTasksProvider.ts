import {TeamTask} from "./TeamTask";
export interface TeamTasksProvider {
    all():Array<TeamTask>;
}