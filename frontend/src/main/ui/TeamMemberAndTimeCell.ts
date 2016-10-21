import {AllocationTablePlugin} from "../AllocationTablePlugin";

export class TeamMemberAndTimeCell {
    teamMemberIndex:number;
    sequence:number;
    cell:JQuery;
    plugin:AllocationTablePlugin;

    constructor(gridIndex:number, cell:JQuery, plugin:AllocationTablePlugin, countTeamMembersFunction:()=>number) {
        this.cell = cell;
        this.plugin = plugin;
        let teamMembers:number = countTeamMembersFunction();
        this.teamMemberIndex = gridIndex%teamMembers;
        this.sequence = Math.floor(gridIndex/teamMembers);
    }

    attach():void {
        this.cell.data("allocation-moment", this);
        this.cell.hover(jQuery.proxy(this.onCellHoverIn, this), jQuery.proxy(this.onCellHoverOut, this));
    }

    onCellHoverIn(event:JQueryEventObject) {
        let m:TeamMemberAndTimeCell = jQuery(event.target).data("allocation-moment");
        let estimation:number =this.plugin.options.estimationProvider.estimate({
            id: "TODO", // todo
            color: "TODO" // todo
        }, {
            id: "TODO-001" // todo
        });
        this.forConsecutiveTeamCells(event, (moment:TeamMemberAndTimeCell)=> {
            moment.cell.addClass("moving");
            moment.cell.text("moving");
        }, estimation);
    }

    onCellHoverOut(event:JQueryEventObject) {
        this.forConsecutiveTeamCells(event, (moment:TeamMemberAndTimeCell)=> {
            if(moment.cell.hasClass("moving")) {
                moment.cell.removeClass("moving");
                moment.cell.text("");
            }
        });
    }

    forConsecutiveTeamCells(event:JQueryEventObject, handler:(moment:TeamMemberAndTimeCell)=>void, estimation:number=10000) {
        let moment:TeamMemberAndTimeCell = jQuery(event.target).data("allocation-moment");
        let nextElements:Array<TeamMemberAndTimeCell> = this.plugin.mapping.getNextElementsByTeamMember(moment);
        let howManyCells:number = estimation;
        let i = 1;
        for(let cell of nextElements) {
            handler(cell);
            i++;
            if(i>howManyCells) {
                break;
            }
        }
    }
}
