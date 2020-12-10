const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
var _ = require("lodash");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
const api = supertest(app);

describe("when there are blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("number of blogs is the same as initialBlogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("a blog contains React Patterns", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("React patterns");
  });

  test("there is an id field", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const aBlog = blogsAtStart[0];

    expect(aBlog.id).toBeDefined();
  });
});

describe("when viewing a specific blog", () => {
  test("a specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    console.log(validNonexistingId);

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("when adding a new blog", () => {
  test("a valid note can be added", async () => {
    const newBlog = {
      title: "New blogs are cool, I guess",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("New blogs are cool, I guess");
  });

  test("if the likes property is missing from the request, it will default to the value 0", async () => {
    const newBlogNoLikes = {
      title: "New blogs with 0 likes",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    };

    await api
      .post("/api/blogs")
      .send(newBlogNoLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("New blogs with 0 likes");

    const addedBlog = _.find(
      blogsAtEnd,
      (blog) => blog.title === "New blogs with 0 likes"
    );
    expect(addedBlog.likes).toEqual(0);
  });

  test("verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
    const newBlogNoTitleNoUrl = {
      author: "Edsger W. Dijkstra",
      likes: 58,
    };

    await api.post("/api/blogs").send(newBlogNoTitleNoUrl).expect(400);
  });
});

describe("when deleting a blog", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});


describe('when updating a blogs info', ()=>{
  test('a blog can be updated', async ()=>{
    const existingBlogWithNewLikes = {
      title: "NEW Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
    }

    const id = "5a422aa71b54a676234d17f8"

    await api
      .put(`/api/blogs/${id}`)
      .send(existingBlogWithNewLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("NEW Go To Statement Considered Harmful");

    const addedBlog = _.find(
      blogsAtEnd,
      (blog) => blog.title === "NEW Go To Statement Considered Harmful"
    );
    expect(addedBlog.likes).toEqual(15);
  })
})

afterAll(() => {
  mongoose.connection.close();
});
