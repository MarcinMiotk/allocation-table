import {VisualizedTasksProvider} from "./VisualizedTasksProvider";
import {VisualizedTask} from "./VisualizedTask";
export class VisualizedTasksProviderFake implements VisualizedTasksProvider {

    private accesibleColors:string[] = [
        "#A1BE95",
        "#E2DFA2",
        "#92AAC7",
        "#ED5752",
        "#4897D8",
        "#FFDB5C",
        "#FA5E59",
        "#F8A055",
        "#AF4425",
        "#662E1C",
        "#C9A66B",
    ];


    load():Array<VisualizedTask> {
        var tasks:Array<VisualizedTask> = new Array();

        for(let i:number=0; i<10; i++) {
            var nextColor:string;
            nextColor = this.accesibleColors[i];
            tasks.push({
                id: "TASK-"+i,
                color: nextColor;
            });
        }

        return tasks;
    }
}
