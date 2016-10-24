import {TeamMembersProvider} from "../team/TeamMembersProvider";
import {TeamMemberHandlerAccessor} from "./TeamMemberHandlerAccessor";
import {TeamMemberHandler, TeamMemberHandlerOperations} from "./TeamMemberHandler";
import {TimeHandlerAccessor} from "./TimeHandlerAccessor";
import {TeamMember} from "../team/TeamMember";
import {EstimationProvider} from "../estimations/EstimationProvider";
import {VisualizedTask} from "../tasks/VisualizedTask";
import {AllocatedTaskToMember} from "../allocations/AllocatedTaskToMember";
import {TeamMemberAndTimeCell} from "./TeamMemberAndTimeCell";
export class TeamMembersBodyCellsBuilder {

    private members:Array<TeamMemberHandlerOperations>;

    constructor(provider:TeamMembersProvider, estimationProvider:EstimationProvider) {
        this.members = new Array();
        for(let member of provider.load()) {
            this.members.push(new TeamMemberHandlerOperations(member, (what:VisualizedTask) => {
                return estimationProvider.estimate(what, member);
            }));
        }
    }

    build(table:JQuery) {
        this.removeAllTeamCellsFromBodyTemplate(table);
        table.find("tbody tr").each(jQuery.proxy(this.forEachRow, this));
    }

    forEachRow(index:number, element:Element) {
        let tr:JQuery = jQuery(element);
        for(let member of this.members) {
            let cell:JQuery = jQuery("<td>");
            let handler:TeamMemberHandler = {
                member : member
            };
            TeamMemberHandlerAccessor.set(cell, handler);

            tr.append(cell);
        }
    }


    removeAllTeamCellsFromBodyTemplate(table:JQuery) {
        table.find("tbody tr td:not(:first-child)").remove();
    }

    // ==============

    display(who:string, what:VisualizedTask, hourStart:number) {
        let member:TeamMemberHandlerOperations = this.get(who);
        let consecutiveCells:Array<TeamMemberAndTimeCell> = member.getNextCells(hourStart);
        let estimation:number = member.estimateFor(what);
        let coloredHours = 0;
        for(let c of consecutiveCells) {

            c.cell.css("background-color", what.color);
          //  c.cell.text(what.id);

            // TODO: I will assign VisualizedTask here


            coloredHours++;
            if(coloredHours>=estimation) {
                break;
            }
        }
    }

    get(memberId:string):TeamMemberHandlerOperations {
        for(let member of this.members) {
            if(member.member.id==memberId) {
                return member;
            }
        }
        return null;
    }
}