import {TeamMembersProvider} from "../../main/team/TeamMembersProvider";
import {TeamMembersProviderFake} from "../../main/team/TeamMembersProviderFake";
import {TeamMember} from "../../main/team/TeamMember";
describe("In the TeamMembersProviderFake", ()=> {
    describe("the load method", () => {
        let sut:TeamMembersProvider = new TeamMembersProviderFake();
        it("should return 8 elements", () => {
            expect(sut.load().length).toEqual(8);
        });
        it("each item should have unique ID", () => {
            let members:Array<TeamMember> = sut.load();
            let counters:{[id:string] : number;} = { };
            for(let member of members) {
                if(counters[member.id]!=null) {
                    counters[member.id] = counters[member.id] + 1;
                } else {
                    counters[member.id] = 1;
                }
            }
            for(let member of members) {
                expect(counters[member.id]).toEqual(1);
            }
        });
    });
});