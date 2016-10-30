export class EstimationsCellBuilder {
    private cell:JQuery;

    constructor(cell:JQuery) {
        this.cell = cell;
    }

    attach() {
        // TODO: get users from TeamMembers provider

        for(var i=1; i<9; i++) {
            this.cell.append("user"+i);
            this.cell.append(" ");

            let input:JQuery = jQuery("<input>");
            input.val(4);
            input.attr("type", "number");
            this.cell.append(input);
            this.cell.append(jQuery("<br/>"));
        }
    }
}