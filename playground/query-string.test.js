const rewire = require("rewire")
const query_string = rewire("./query-string")
const testQueryString = query_string.__get__("testQueryString")
// @ponicode
describe("testQueryString", () => {
    test("0", async () => {
        await testQueryString()
    })
})
