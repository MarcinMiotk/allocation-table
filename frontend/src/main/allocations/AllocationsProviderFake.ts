import {AllocationsProvider} from "./AllocationsProvider";
import {AllocatedTaskToMember} from "./AllocatedTaskToMember";
export class AllocationsProviderFake implements AllocationsProvider {

    allocations():Array<AllocatedTaskToMember> {

        var allocations:Array<AllocatedTaskToMember> = new Array();


        allocations.push({
            what: "TASK-1",
            who: "user0",
            hourStart: 22
        });

        allocations.push({
            what: "TASK-2",
            who: "user1",
            hourStart: 14
        });

        allocations.push({
            what: "TASK-3",
            who: "user1",
            hourStart: 10
        });

        allocations.push({
            what: "TASK-4",
            who: "user3",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-5",
            who: "user4",
            hourStart: 7
        });

        allocations.push({
            what: "TASK-6",
            who: "user4",
            hourStart: 18
        });

        allocations.push({
            what: "TASK-7",
            who: "user5",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-8",
            who: "user6",
            hourStart: 12
        });

        allocations.push({
            what: "TASK-9",
            who: "user7",
            hourStart: 3
        });


        return allocations;
    }
}