const listHelper = require("../utils/list_helper");
const listOfBlogs = require("../utils/list_helper").listOfBlogs;


describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listOfBlogs);
    expect(result).toBe(36);
  });
});
