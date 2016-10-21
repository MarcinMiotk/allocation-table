
import {EstimationProvider} from "./estimations/EstimationProvider";
import {TeamMembersProvider} from "./team/TeamMembersProvider";
import {TeamMembersBodyCellsBuilder} from "./ui/TeamMembersBodyCellsBuilder";
import {TeamMembersHeaderBuilder} from "./ui/TeamMembersHeaderBuilder";
import {TimescaleBodyCellsBuilder} from "./ui/TimescaleBodyCellsBuilder";
import {TimeTranslator} from "./providers/TimeTranslator";
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
        new TeamMembersBodyCellsBuilder().build(this.table, this.options.teamMembersProvider);

        this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));
    }

    forEachCell(index:number, element:Element) {
        jQuery(element).removeAttr("style");        // clear presentation suggestions
        let moment:TeamMemberAndTimeCell = new TeamMemberAndTimeCell(
            index,
            jQuery(element),
            this,
            this.options.countTeamMembers);
        moment.attach();
        this.mapping.registerCell(moment);
    }
}

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

export interface AllocationTableOptions {
    url:string;
    gridElementsSelector:string;
    countTeamMembers:()=>number;
    countHoursInTimescale:()=>number;
    estimationProvider:EstimationProvider;
    teamMembersProvider:TeamMembersProvider;
    timeTranslator:TimeTranslator;
}

export class TeamMemberAndTimeCellMapping {

    byTeamMember:{[teamMemberIndex:string] : Array<TeamMemberAndTimeCell>;} = { };

    registerCell(moment:TeamMemberAndTimeCell):void {
        if(this.byTeamMember[moment.teamMemberIndex]==null) {
            this.byTeamMember[moment.teamMemberIndex] = new Array();
        }
        this.byTeamMember[moment.teamMemberIndex].push(moment);
    }

    getNextElementsByTeamMember(moment:TeamMemberAndTimeCell):Array<TeamMemberAndTimeCell> {
        let meAndNextElements:Array<TeamMemberAndTimeCell> = new Array();
        let allCellsOfMember:Array<TeamMemberAndTimeCell> = this.byTeamMember[moment.teamMemberIndex];
        for(let i:number=moment.sequence; i<allCellsOfMember.length; i++) {
            meAndNextElements.push(allCellsOfMember[i]);
        }
        return meAndNextElements;
    }
}


