import {VisualizedTask} from "../tasks/VisualizedTask";
import {TeamMember} from "../team/TeamMember";
export interface EstimationProvider {

    estimate(what:VisualizedTask, who:TeamMember):number;
}