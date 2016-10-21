import {TimeTranslator} from "../providers/TimeTranslator";
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
            }
            body.append(row);
        }
    }


    removeAllTimescaleRows(table:JQuery) {
        table.find("tbody tr").remove();
    }

}