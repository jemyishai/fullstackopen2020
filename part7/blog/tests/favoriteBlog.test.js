const listHelper = require("../utils/list_helper");
const listOfBlogs = require("../utils/list_helper").listOfBlogs

describe("favorite blog", () => {

  test("finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.", () => {
    const result = listHelper.favoriteBlog(listOfBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
