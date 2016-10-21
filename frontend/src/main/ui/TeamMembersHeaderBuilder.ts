import {TeamMembersProvider} from "../team/TeamMembersProvider";
export class TeamMembersHeaderBuilder {

    build(table:JQuery, provider:TeamMembersProvider) {
        this.removeAllTeamHeadersFromTemplate(table);
        let tr:JQuery = table.find("thead tr");
        for(let member of provider.load()) {
            let header:JQuery = jQuery("<th>");
            header.text(member.id);
            tr.append(header);
        }
    }

    removeAllTeamHeadersFromTemplate(table:JQuery) {
        table.find("thead tr th:not(:first-child)").remove();
    }
}
