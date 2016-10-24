export class TasksTablePlugin {

    table:JQuery;
    options:TasksTableOptions;

    constructor(table:JQuery, options:TasksTableOptions) {
        this.table = table;
        this.options = options;
    }

    attach():TasksTablePlugin {
//        new TeamMembersHeaderBuilder().build(this.table, this.options.teamMembersProvider);
//        new TimescaleBodyCellsBuilder().build(this.table, this.options.countHoursInTimescale, this.options.timeTranslator);
        //
//        let cellsBuilder:TeamMembersBodyCellsBuilder = new TeamMembersBodyCellsBuilder(this.options.teamMembersProvider, this.options.estimationProvider);
 //       cellsBuilder.build(this.table);
  //      this.cachedCellsBuilder = cellsBuilder;
        //
        this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCell, this));

        return this;
    }


    forEachCell(index:number, element:Element) {
        let cell:JQuery = jQuery(element);
//        let memberHandler:TeamMemberHandler = TeamMemberHandlerAccessor.get(cell);
//        let timeHandler:TimeHandler = TimeHandlerAccessor.get(cell.parent());

 //       let moment:TeamMemberAndTimeCell = new TeamMemberAndTimeCell(
  //          cell,
  //          memberHandler,
  //          timeHandler
  //      );
  //      moment.attach();
    }


}


export interface TasksTableOptions {
    url:string;
    gridElementsSelector:string;
}
