import {EstimationProvider} from "./EstimationProvider";
import {VisualizedTask} from "../tasks/VisualizedTask";
import {TeamMember} from "../team/TeamMember";
export class EstimationProviderFake implements EstimationProvider {

    estimate(what:VisualizedTask, who:TeamMember):number {
        if(what!=null && who !=null) {
            /*
            if(who.id=="user0") {
                return 5;
            }
            if(who.id=="user1") {
                return 3;
            }
            */
            return 4;
        } else {
            return 0;
        }
    }
}