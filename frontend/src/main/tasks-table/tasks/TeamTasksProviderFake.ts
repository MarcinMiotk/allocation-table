import {TeamTasksProvider} from "./TeamTasksProvider";
import {TeamTask} from "./TeamTask";
export class TeamTasksProviderFake implements TeamTasksProvider {

    all():Array<TeamTask> {
        let result:Array<TeamTask> = new Array();

        result.push({
           color: "green",
            id: "JIRA-001",
            deadline: "5.10.2016",
            subject: "Jakiś temat",
            whoCanDo: [
                {
                    who: "user0",
                    estimation: 3
                },
                {
                    who: "user1",
                    estimation: 7
                }
            ]
        });

        result.push({
            color: "pink",
            id: "JIRA-002",
            deadline: "6.10.2016",
            subject: "Inny temat o jakiejś treści",
            whoCanDo: [
                {
                    who: "user0",
                    estimation: 4
                },
                {
                    who: "user1",
                    estimation: 4
                }
            ]
        });

        result.push({
            color: "brown",
            id: "JIRA-003",
            deadline: "7.10.2016",
            subject: "Odbisać na maile",
            whoCanDo: [
                {
                    who: "user0",
                    estimation: 4
                },
                {
                    who: "user1",
                    estimation: 4
                }
            ]
        });

        result.push({
            color: "yellow",
            id: "JIRA-004",
            deadline: "12.10.2016",
            subject: "Rozmowa rekrutacyjna",
            whoCanDo: [
                {
                    who: "user0",
                    estimation: 4
                },
                {
                    who: "user1",
                    estimation: 4
                }
            ]
        });

        result.push({
            color: "white",
            id: "JIRA-005",
            deadline: "22.10.2016",
            subject: "Konsultacja telefoniczna z klientem ABCD",
            whoCanDo: [
                {
                    who: "user0",
                    estimation: 4
                },
                {
                    who: "user1",
                    estimation: 4
                }
            ]
        });

        return result;
    }
}