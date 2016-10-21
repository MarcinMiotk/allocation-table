import {TimeTranslator} from "../providers/TimeTranslator";
import {TimeHandler} from "./TimeHandler";
import {TimeHandlerAccessor} from "./TimeHandlerAccessor";
export class TimescaleBodyCellsBuilder {

    build(table:JQuery, allHours:()=>number, timeTranslator:TimeTranslator) {
        this.removeAllTimescaleRows(table);
        //
        let body:JQuery = table.find("tbody");
        for(var i:number=1; i<allHours(); i++) {
            let row:JQuery = jQuery("<tr>");
            {
                let timeTd:JQuery = jQuery("<td>");
                timeTd.text(timeTranslator.time(i));
                row.append(timeTd);
                this.attachTimeHandler(row, timeTranslator, i);
            }
            body.append(row);
        }
    }

    private attachTimeHandler(row:JQuery, timeTranslator:TimeTranslator, hourId:number) {
        var handler:TimeHandler = {
            id: hourId
        };
        TimeHandlerAccessor.set(row, handler);
    }


    private removeAllTimescaleRows(table:JQuery) {
        table.find("tbody tr").remove();
    }

}