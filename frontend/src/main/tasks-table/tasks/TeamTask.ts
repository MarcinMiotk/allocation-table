import {TeamTaskEstimation} from "./TeamTaskEstimation";
export interface TeamTask {
    id:string;
    color:string;
    deadline:string;
    subject:string;
    whoCanDo:Array<TeamTaskEstimation>;
}