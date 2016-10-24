import {TeamMemberHandler} from "./TeamMemberHandler";
import {TimeHandler} from "./TimeHandler";

export class TeamMemberAndTimeCell {
    teamMemberHandler:TeamMemberHandler;
    timeHandler:TimeHandler;
    cell:JQuery;

    constructor(cell:JQuery, teamMemberHandler:TeamMemberHandler, timeHandler:TimeHandler) {
        this.cell = cell;
        this.teamMemberHandler = teamMemberHandler;
        this.timeHandler = timeHandler;
        // push me
        this.teamMemberHandler.member.registerCell(this);
    }

    attach():void {
        this.cell.data("allocation-moment", this);
        this.cell.hover(jQuery.proxy(this.onCellHoverIn, this), jQuery.proxy(this.onCellHoverOut, this));
    }

    onCellHoverIn(event:JQueryEventObject) {
        let cell:TeamMemberAndTimeCell = jQuery(event.target).data("allocation-moment");

        // TODO: load VisualizedTask from CACHE (for example from external place)

        let estimation:number = cell.teamMemberHandler.member.estimateFor({
            id: "TODO", // todo
            color: "TODO" // todo
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
        let cell:TeamMemberAndTimeCell = jQuery(event.target).data("allocation-moment");
        let nextElements:Array<TeamMemberAndTimeCell> = cell.teamMemberHandler.member.getNextCells(cell.timeHandler.id);
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
