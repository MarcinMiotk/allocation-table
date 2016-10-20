
import {EstimationProvider} from "./estimations/EstimationProvider";
export class AllocationTablePlugin {
    table:JQuery;
    options:AllocationTableOptions;
    repository:AllocationsRepository = new AllocationsRepository();

    constructor(table:JQuery, options:AllocationTableOptions) {
        this.table = table;
        this.options = options;
    }

    attach():void {
        this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));
    }

    forEachCell(index:number, element:Element) {
        jQuery(element).removeAttr("style");        // clear presentation suggestions
        let moment:TeamMemberAllocationMoment = new TeamMemberAllocationMoment(
            index,
            jQuery(element),
            this,
            this.options.countTeamMembers);
        moment.attach();
        this.repository.add(moment);
    }
}

export class TeamMemberAllocationMoment {
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
        let m:TeamMemberAllocationMoment = jQuery(event.target).data("allocation-moment");
        let estimation:number =this.plugin.options.estimationProvider.estimate({
            id: "TODO", // todo
            color: "TODO" // todo
        }, {
            id: "TODO-001" // todo
        });
        this.forConsecutiveTeamCells(event, (moment:TeamMemberAllocationMoment)=> {
            moment.cell.addClass("moving");
            moment.cell.text("moving");
        }, estimation);
    }

    onCellHoverOut(event:JQueryEventObject) {
        this.forConsecutiveTeamCells(event, (moment:TeamMemberAllocationMoment)=> {
            if(moment.cell.hasClass("moving")) {
                moment.cell.removeClass("moving");
                moment.cell.text("");
            }
        });
    }

    forConsecutiveTeamCells(event:JQueryEventObject, handler:(moment:TeamMemberAllocationMoment)=>void, estimation:number=10000) {
        let moment:TeamMemberAllocationMoment = jQuery(event.target).data("allocation-moment");
        let nextElements:Array<TeamMemberAllocationMoment> = this.plugin.repository.getNextElementsByTeamMember(moment);
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
    estimationProvider:EstimationProvider;
}

export class AllocationsRepository {

    byTeamMember:{[teamMemberIndex:string] : Array<TeamMemberAllocationMoment>;} = { };

    add(moment:TeamMemberAllocationMoment):void {
        if(this.byTeamMember[moment.teamMemberIndex]==null) {
            this.byTeamMember[moment.teamMemberIndex] = new Array();
        }
        this.byTeamMember[moment.teamMemberIndex].push(moment);
    }

    getNextElementsByTeamMember(moment:TeamMemberAllocationMoment):Array<TeamMemberAllocationMoment> {
        let meAndNextElements:Array<TeamMemberAllocationMoment> = new Array();
        let allCellsOfMember:Array<TeamMemberAllocationMoment> = this.byTeamMember[moment.teamMemberIndex];
        for(let i:number=moment.sequence; i<allCellsOfMember.length; i++) {
            meAndNextElements.push(allCellsOfMember[i]);
        }
        return meAndNextElements;
    }
}


