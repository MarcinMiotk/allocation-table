import {TeamMember} from "./TeamMember";
export interface TeamMembersProvider {
    load():Array<TeamMember>;
}