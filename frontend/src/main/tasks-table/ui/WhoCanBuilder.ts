export class WhoCanBuilder {
    private cell:JQuery;

    constructor(cell:JQuery) {
        this.cell = cell;
    }

    attach() {
        // TODO: get users from TeamMembers provider

        for(var i=1; i<9; i++) {

            let button:JQuery = jQuery("<button>");
            button.text("user"+i);
            button.attr("type", "button");
            button.addClass("btn");

            if(i%2==0) {
                button.addClass("btn-on");
            } else {
                button.addClass("btn-off");
            }

            this.cell.append(" ");
            this.cell.append(button);
        }
    }
}