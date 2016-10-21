import {TeamMembersProvider} from "../team/TeamMembersProvider";
export class TeamMembersBodyCellsBuilder {


    build(table:JQuery, provider:TeamMembersProvider) {
        this.removeAllTeamCellsFromBodyTemplate(table);
        //
        let tr:JQuery = table.find("tbody tr");
        for(let member of provider.load()) {
            let cell:JQuery = jQuery("<td>");
            cell.text(member.id);
            tr.append(cell);
        }
    }


    removeAllTeamCellsFromBodyTemplate(table:JQuery) {
        table.find("tbody tr td:not(:first-child)").remove();
    }
}