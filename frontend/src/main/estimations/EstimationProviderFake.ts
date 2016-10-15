import {EstimationProvider} from "./EstimationProvider";
import {VisualizedTask} from "../tasks/VisualizedTask";
import {TeamMember} from "../team/TeamMember";
export class EstimationProviderFake implements EstimationProvider {

    estimate(what:VisualizedTask, who:TeamMember):number {
        if(what!=null && who !=null) {
            return 4;
        } else {
            return 0;
        }
    }
}