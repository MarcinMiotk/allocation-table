import {VisualizedTasksProvider} from "../../main/tasks/VisualizedTasksProvider";
import {VisualizedTasksProviderFake} from "../../main/tasks/VisualizedTasksProviderFake";
import {VisualizedTask} from "../../main/tasks/VisualizedTask";
describe("In the VisualizedTasksProviderFake", ()=> {
    describe("the load method", () => {

        let sut:VisualizedTasksProvider = new VisualizedTasksProviderFake();

        it("should return 10 elements", () => {
            expect(sut.load().length).toEqual(10);
        });

        it("each item should have unique ID", () => {
           let tasks:Array<VisualizedTask> = sut.load();
            let counters:{[id:string] : number;} = { };
            for(let task of tasks) {
                if(counters[task.id]!=null) {
                    counters[task.id] = counters[task.id] + 1;
                } else {
                    counters[task.id] = 1;
                }
            }
            for(let task of tasks) {
                expect(counters[task.id]).toEqual(1);
            }
        });

        it("each item should have unique color", () => {
            let tasks:Array<VisualizedTask> = sut.load();
            let counters:{[color:string] : number;} = { };
            for(let task of tasks) {
                if(counters[task.color]!=null) {
                    counters[task.color] = counters[task.color] + 1;
                } else {
                    counters[task.color] = 1;
                }
            }
            for(let task of tasks) {
                expect(counters[task.color]).toEqual(1);
            }
        });

    });

    describe("the constructor method", () =>{

    });
});