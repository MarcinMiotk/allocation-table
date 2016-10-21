
import {TeamMemberAndTimeCell} from "./TeamMemberAndTimeCell";
export class TeamMemberAndTimeCellMapping {

    byTeamMember:{[teamMemberIndex:string] : Array<TeamMemberAndTimeCell>;} = { };

    registerCell(moment:TeamMemberAndTimeCell):void {
        if(this.byTeamMember[moment.teamMemberIndex]==null) {
            this.byTeamMember[moment.teamMemberIndex] = new Array();
        }
        this.byTeamMember[moment.teamMemberIndex].push(moment);
    }

    getNextElementsByTeamMember(moment:TeamMemberAndTimeCell):Array<TeamMemberAndTimeCell> {
        let meAndNextElements:Array<TeamMemberAndTimeCell> = new Array();
        let allCellsOfMember:Array<TeamMemberAndTimeCell> = this.byTeamMember[moment.teamMemberIndex];
        for(let i:number=moment.sequence; i<allCellsOfMember.length; i++) {
            meAndNextElements.push(allCellsOfMember[i]);
        }
        return meAndNextElements;
    }
}
