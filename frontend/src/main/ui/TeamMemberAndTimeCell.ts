import {TeamMemberHandler} from "./TeamMemberHandler";
import {TimeHandler} from "./TimeHandler";
import {VisualizedTask} from "../tasks/VisualizedTask";

export class TeamMemberAndTimeCell {
    private teamMemberHandler:TeamMemberHandler;
    private timeHandler:TimeHandler;
    private cell:JQuery;
    private readSelectedTask: ()=>VisualizedTask;

    constructor(cell:JQuery, teamMemberHandler:TeamMemberHandler, timeHandler:TimeHandler, readSelectedTask: ()=>VisualizedTask) {
        this.cell = cell;
        this.teamMemberHandler = teamMemberHandler;
        this.timeHandler = timeHandler;
        this.readSelectedTask = readSelectedTask;
        // push me
        this.teamMemberHandler.member.registerCell(this);
    }

    attach():void {
        this.cell.data("allocation-moment", this);
        this.cell.hover(jQuery.proxy(this.onCellHoverIn, this), jQuery.proxy(this.onCellHoverOut, this));
    }

    onCellHoverIn(event:JQueryEventObject) {
        let cell:TeamMemberAndTimeCell = jQuery(event.target).data("allocation-moment");

        let task:VisualizedTask = this.readSelectedTask();
        if(task!=null) {
            let estimation:number = cell.teamMemberHandler.member.estimateFor(task);
            this.forConsecutiveTeamCells(event, (moment:TeamMemberAndTimeCell)=> {
                moment.cell.addClass("moving");
                moment.cell.text("moving");
                moment.cell.css("background-color", task.color);
            }, estimation);
        }
    }

    onCellHoverOut(event:JQueryEventObject) {
        this.forConsecutiveTeamCells(event, (moment:TeamMemberAndTimeCell)=> {
            if(moment.cell.hasClass("moving")) {
                moment.cell.removeClass("moving");
                moment.cell.css("background-color", "");
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
