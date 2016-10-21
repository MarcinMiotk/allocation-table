import {AllocationsProvider} from "./AllocationsProvider";
import {AllocatedTaskToMember} from "./AllocatedTaskToMember";
export class AllocationsProviderFake implements AllocationsProvider {

    allocations():Array<AllocatedTaskToMember> {

        var allocations:Array<AllocatedTaskToMember> = new Array();


        allocations.push({
            what: "TASK-1",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-2",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-3",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-4",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-5",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-6",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-7",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-8",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-9",
            who: "mami",
            hourStart: 3
        });

        allocations.push({
            what: "TASK-10",
            who: "mami",
            hourStart: 3
        });

        return allocations;
    }
}