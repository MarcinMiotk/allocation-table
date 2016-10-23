
import {EstimationProvider} from "./estimations/EstimationProvider";
import {TeamMembersProvider} from "./team/TeamMembersProvider";
import {TeamMembersBodyCellsBuilder} from "./ui/TeamMembersBodyCellsBuilder";
import {TeamMembersHeaderBuilder} from "./ui/TeamMembersHeaderBuilder";
import {TimescaleBodyCellsBuilder} from "./ui/TimescaleBodyCellsBuilder";
import {TimeTranslator} from "./providers/TimeTranslator";
import {TeamMemberAndTimeCell} from "./ui/TeamMemberAndTimeCell";
import {TeamMemberHandlerAccessor} from "./ui/TeamMemberHandlerAccessor";
import {TeamMemberHandler} from "./ui/TeamMemberHandler";
import {TimeHandler} from "./ui/TimeHandler";
import {TimeHandlerAccessor} from "./ui/TimeHandlerAccessor";
import {AllocationsProvider} from "./allocations/AllocationsProvider";
import {AllocatedTaskToMember} from "./allocations/AllocatedTaskToMember";
import {VisualizedTasksProvider} from "./tasks/VisualizedTasksProvider";
import {VisualizedTask} from "./tasks/VisualizedTask";

export class AllocationTablePlugin {
    table:JQuery;
    options:AllocationTableOptions;

    constructor(table:JQuery, options:AllocationTableOptions) {
        this.table = table;
        this.options = options;
    }

    cachedCellsBuilder:TeamMembersBodyCellsBuilder;

    attach():AllocationTablePlugin {
        new TeamMembersHeaderBuilder().build(this.table, this.options.teamMembersProvider);
        new TimescaleBodyCellsBuilder().build(this.table, this.options.countHoursInTimescale, this.options.timeTranslator);
        //
        let cellsBuilder:TeamMembersBodyCellsBuilder = new TeamMembersBodyCellsBuilder(this.options.teamMembersProvider, this.options.estimationProvider);
        cellsBuilder.build(this.table);
        this.cachedCellsBuilder = cellsBuilder;
        //
        this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));

        return this;
    }

    display(provider:AllocationsProvider, tasksProvider:VisualizedTasksProvider):AllocationTablePlugin {

        let tasksCache:{[id:string] : VisualizedTask;} = { };
        for(let task of tasksProvider.load()) {
            tasksCache[task.id] = task;
        }

        let allocations:Array<AllocatedTaskToMember> = provider.allocations();
        for(let allocated of allocations) {
            this.cachedCellsBuilder.display(allocated.who, tasksCache[allocated.what], allocated.hourStart);
        }
        return this;
    }



    forEachCell(index:number, element:Element) {
        let cell:JQuery = jQuery(element);
        let memberHandler:TeamMemberHandler = TeamMemberHandlerAccessor.get(cell);
        let timeHandler:TimeHandler = TimeHandlerAccessor.get(cell.parent());

        let moment:TeamMemberAndTimeCell = new TeamMemberAndTimeCell(
            cell,
            memberHandler,
            timeHandler
            );
        moment.attach();
    }
}


export interface AllocationTableOptions {
    url:string;
    gridElementsSelector:string;
    countHoursInTimescale:()=>number;
    estimationProvider:EstimationProvider;
    teamMembersProvider:TeamMembersProvider;
    timeTranslator:TimeTranslator;
}


