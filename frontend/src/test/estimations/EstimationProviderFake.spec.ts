import {EstimationProvider} from "../../main/estimations/EstimationProvider";
import {EstimationProviderFake} from "../../main/estimations/EstimationProviderFake";

describe("In the EstimationProviderFake", ()=> {
    describe("the estimate method", () => {
        let sut:EstimationProvider = new EstimationProviderFake();

        it("should return 0 if error", () => {
            let estimation:number = sut.estimate(null, null);
            expect(estimation).toEqual(0);
        });


        it("should return at least 4 for any Member and Task combination", () => {
            let estimation:number = sut.estimate({
                id: "TASK-001",
                color: "red"
            }, {
                id: "mami"
            });
            expect(estimation).toBeGreaterThanOrEqual(4);
        });

    });
});