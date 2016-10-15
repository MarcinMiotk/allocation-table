import {VisualizedTask} from "./VisualizedTask";

export interface VisualizedTasksProvider {
    load():Array<VisualizedTask>;
}