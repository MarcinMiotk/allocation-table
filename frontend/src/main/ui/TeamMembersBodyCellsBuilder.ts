import {TeamMembersProvider} from "../team/TeamMembersProvider";
import {TeamMemberHandlerAccessor} from "./TeamMemberHandlerAccessor";
import {TeamMemberHandler} from "./TeamMemberHandler";
import {TimeHandlerAccessor} from "./TimeHandlerAccessor";
export class TeamMembersBodyCellsBuilder {

    private provider:TeamMembersProvider;

    constructor(provider:TeamMembersProvider) {
        this.provider = provider;
    }

    build(table:JQuery) {
        this.removeAllTeamCellsFromBodyTemplate(table);
        table.find("tbody tr").each(jQuery.proxy(this.forEachRow, this));
    }

    forEachRow(index:number, element:Element) {
        let tr:JQuery = jQuery(element);
        for(let member of this.provider.load()) {
            let cell:JQuery = jQuery("<td>");
            cell.text(member.id +" hour "+TimeHandlerAccessor.get(tr).id);
            var handler:TeamMemberHandler = {
                member: member
            };
            TeamMemberHandlerAccessor.set(cell, handler);

            tr.append(cell);
        }
    }


    removeAllTeamCellsFromBodyTemplate(table:JQuery) {
        table.find("tbody tr td:not(:first-child)").remove();
    }
}