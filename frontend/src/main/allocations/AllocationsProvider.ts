import {AllocatedTaskToMember} from "./AllocatedTaskToMember";
export interface AllocationsProvider {
    allocations():Array<AllocatedTaskToMember>;
}