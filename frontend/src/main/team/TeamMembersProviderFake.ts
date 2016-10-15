import {TeamMembersProvider} from "./TeamMembersProvider";
import {TeamMember} from "./TeamMember";
export class TeamMembersProviderFake implements TeamMembersProvider{

    load():Array<TeamMember> {
        var members:Array<TeamMember> = new Array();
        for(let i:number=0; i<8; i++) {
            members.push({
                id: "user"+i
            });
        }
        return members;
    }
}