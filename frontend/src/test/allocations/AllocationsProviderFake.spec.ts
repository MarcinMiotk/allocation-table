import {VisualizedTasksProvider} from "../../main/tasks/VisualizedTasksProvider";
import {VisualizedTasksProviderFake} from "../../main/tasks/VisualizedTasksProviderFake";
import {VisualizedTask} from "../../main/tasks/VisualizedTask";
import {AllocationsProvider} from "../../main/allocations/AllocationsProvider";
import {AllocationsProviderFake} from "../../main/allocations/AllocationsProviderFake";
import {AllocatedTaskToMember} from "../../main/allocations/AllocatedTaskToMember";
describe("In the AllocationsProviderFake", ()=> {
    describe("the load allocations", () => {

        let sut:AllocationsProvider = new AllocationsProviderFake();

        it("should return 10 elements", () => {
            expect(sut.allocations().length).toEqual(10);
        });

        it("each item should have unique ID", () => {
            let allocations:Array<AllocatedTaskToMember> = sut.allocations();
            let counters:{[id:string] : number;} = { };
            for(let allocation of allocations) {
                if(counters[allocation.what]!=null) {
                    counters[allocation.what] = counters[allocation.what] + 1;
                } else {
                    counters[allocation.what] = 1;
                }
            }
            for(let allocation of allocations) {
                expect(counters[allocation.what]).toEqual(1);
            }
        });
    });
});