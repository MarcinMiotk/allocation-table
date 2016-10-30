import {TasksBodyCellsBuilder} from "./ui/TasksBodyCellsBuilder";
import {TeamTasksProvider} from "./tasks/TeamTasksProvider";
import {TeamTaskHandlerAccessor} from "./ui/TeamTaskHandlerAccessor";
import {TeamTaskHandler} from "./ui/TeamTaskHandler";
import {TeamTask} from "./tasks/TeamTask";
export class TasksTablePlugin {

    table:JQuery;
    options:TasksTableOptions;

    constructor(table:JQuery, options:TasksTableOptions) {
        this.table = table;
        this.options = options;
    }

    attach():TasksTablePlugin {
        new TasksBodyCellsBuilder(this.options.tasksProvider).build(this.table);
        this.table.find(this.options.gridElementsSelector).each(jQuery.proxy(this.forEachCellWithColor, this));
        return this;
    }

    forEachCellWithColor(index:number, element:Element) {
        let cell:JQuery = jQuery(element);
        let taskHandler:TeamTaskHandler = TeamTaskHandlerAccessor.get(cell.parent());
        cell.click(taskHandler, jQuery.proxy(this.onClickedTask, this));
    }




    onClickedTask(eventObject:JQueryEventObject) {
        this.unselectAllRows();
        let clickedTask:TeamTask = (<TeamTaskHandler>eventObject.data).task;
        jQuery(eventObject.target).parent().find("td:nth-child(2)").css("background-color", clickedTask.color);
        this.options.selectTask(clickedTask);
    }

    unselectAllRows() {
        this.table.find(this.options.gridElementsSelector).each(function (index:number, element:Element) {
            let cell:JQuery = jQuery(element);
            cell.parent().find("td:nth-child(2)").css("background-color", "");
        });
    }
}


export interface TasksTableOptions {
    url:string;
    gridElementsSelector:string;
    tasksProvider:TeamTasksProvider;
    selectTask: (clickedTask:TeamTask)=>void;
}
