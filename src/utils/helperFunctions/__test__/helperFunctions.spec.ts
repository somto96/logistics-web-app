import { removeLoadingState } from "../index";

describe("removeLoadingState", () => {
    it("should remove the loading state from loading in our redux state", () => {
        const data = ["POST_LOGIN"];
        const type = "POST_LOGIN"

        const result = removeLoadingState(data, type);
        expect(result).toEqual([]);
    })
})