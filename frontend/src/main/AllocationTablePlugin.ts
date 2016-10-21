
import {EstimationProvider} from "./estimations/EstimationProvider";
import {TeamMembersProvider} from "./team/TeamMembersProvider";
import {TeamMembersBodyCellsBuilder} from "./ui/TeamMembersBodyCellsBuilder";
import {TeamMembersHeaderBuilder} from "./ui/TeamMembersHeaderBuilder";
import {TimescaleBodyCellsBuilder} from "./ui/TimescaleBodyCellsBuilder";
import {TimeTranslator} from "./providers/TimeTranslator";
import {TeamMemberAndTimeCellMapping} from "./ui/TeamMemberAndTimeCellMapping";
import {TeamMemberAndTimeCell} from "./ui/TeamMemberAndTimeCell";
import {TeamMemberHandlerAccessor} from "./ui/TeamMemberHandlerAccessor";
import {TeamMemberHandler} from "./ui/TeamMemberHandler";
import {TimeHandler} from "./ui/TimeHandler";
import {TimeHandlerAccessor} from "./ui/TimeHandlerAccessor";

export class AllocationTablePlugin {
    table:JQuery;
    options:AllocationTableOptions;
    mapping:TeamMemberAndTimeCellMapping = new TeamMemberAndTimeCellMapping();

    constructor(table:JQuery, options:AllocationTableOptions) {
        this.table = table;
        this.options = options;
    }

    attach():void {
        new TeamMembersHeaderBuilder().build(this.table, this.options.teamMembersProvider);
        new TimescaleBodyCellsBuilder().build(this.table, this.options.countHoursInTimescale, this.options.timeTranslator);
        new TeamMembersBodyCellsBuilder(this.options.teamMembersProvider).build(this.table);

        this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));
    }

    forEachCell(index:number, element:Element) {
        let cell:JQuery = jQuery(element);
        let memberHandler:TeamMemberHandler = TeamMemberHandlerAccessor.get(cell);
        let timeHandler:TimeHandler = TimeHandlerAccessor.get(cell.parent());

        let moment:TeamMemberAndTimeCell = new TeamMemberAndTimeCell(
            index,
            cell,
            this,
            this.options.countTeamMembers);
        moment.attach();




        this.mapping.registerCell(moment);
    }
}


export interface AllocationTableOptions {
    url:string;
    gridElementsSelector:string;
    countTeamMembers:()=>number;
    countHoursInTimescale:()=>number;
    estimationProvider:EstimationProvider;
    teamMembersProvider:TeamMembersProvider;
    timeTranslator:TimeTranslator;
}


