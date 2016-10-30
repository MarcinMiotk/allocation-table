import {TeamTasksProvider} from "../tasks/TeamTasksProvider";
import {TeamTaskHandlerAccessor} from "./TeamTaskHandlerAccessor";
export class TasksBodyCellsBuilder {

    private tasksProvider:TeamTasksProvider;

    constructor(tasksProvider:TeamTasksProvider) {
        this.tasksProvider = tasksProvider;
    }


    build(table:JQuery) {
        this.removeAllTeamCellsFromBodyTemplate(table);
        this.addRowsTo(table.find("tbody"));

    }

    addRowsTo(tbody:JQuery) {
        let sequence:number = 1;
        for(let task of this.tasksProvider.all()) {
            let row:JQuery = jQuery("<tr>");

            {
                TeamTaskHandlerAccessor.set(row, {
                    task: task
                });
            }

            {   // Color
                let color:JQuery = jQuery("<td>");
                color.addClass("color");
                color.css("background-color", task.color);
                color.text(sequence++);
                row.append(color);
            }

            {   // ID task
                let cell:JQuery = jQuery("<td>");
                cell.text(task.id);
                row.append(cell);
            }

            {   // Deadline
                let cell:JQuery = jQuery("<td>");
                cell.text(task.deadline);
                row.append(cell);
            }

            {   // Subject
                let cell:JQuery = jQuery("<td>");
                cell.text(task.subject);
                row.append(cell);
            }

            {   // Who can do?
                let cell:JQuery = jQuery("<td>");
                cell.addClass("who-can");
                cell.text("....");
                row.append(cell);
            }

            {   // Estimations
                let cell:JQuery = jQuery("<td>");
                cell.addClass("estimations");
                cell.text("....");
                row.append(cell);
            }

            {   // Buttons
                let cell:JQuery = jQuery("<td>");
                cell.addClass("remove-task");
                {
                    let remove:JQuery = jQuery("<button>");
                    remove.attr("type", "button");
                    remove.text("Usuń");
                    cell.append(remove);
                }
                row.append(cell);
            }


            tbody.append(row);
        }
    }


    removeAllTeamCellsFromBodyTemplate(table:JQuery) {
        table.find("tbody tr").remove();
    }



}