import {TeamMember} from "../team/TeamMember";
import {TeamMemberAndTimeCell} from "./TeamMemberAndTimeCell";
import {VisualizedTask} from "../tasks/VisualizedTask";
export interface TeamMemberHandler {
    member:TeamMemberHandlerOperations;
}

export class TeamMemberHandlerOperations {

    cells:Array<TeamMemberAndTimeCell>;
    member:TeamMember;
    estimateFor:(task:VisualizedTask)=>number;

    constructor(member:TeamMember, estimateFor:(task:VisualizedTask)=>number) {
        this.member = member;
        this.estimateFor = estimateFor;
        this.cells = new Array();
    }

    registerCell(cell:TeamMemberAndTimeCell):void {
        this.cells.push(cell);
    }

    getNextCells(sinceTimeSequenceId:number):Array<TeamMemberAndTimeCell> {
        let meAndNextElements:Array<TeamMemberAndTimeCell> = new Array();
        for(let i:number=sinceTimeSequenceId; i<this.cells.length; i++) {
            meAndNextElements.push(this.cells[i]);
        }
        return meAndNextElements;
    }
}

