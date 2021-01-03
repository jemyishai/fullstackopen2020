const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");
var _ = require("lodash");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

// Also, implement tests which check that invalid users are not created and invalid add user operation returns a suitable status code and error message.

// WOULD THIS BE 400 for usernames and passwords that are too short?

// also test password and usernames are there?

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("check that invalid usernames are not created and invalid add user operation returns a suitable status code and error message.", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "`username` (`ro`) is shorter than the minimum allowed length (3)"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("check that invalid password are not created and invalid add user operation returns a suitable status code and error message.", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "rowrowrowyourboat",
      name: "Superuser",
      password: "sa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "invalid password - must be at least 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

//working on tokens here
// must add tokens to these tests in order for them to work

describe("when adding a new blog", () => {
  test("a valid note can be added", async () => {
    const newUser = {
      username: "tokenTest",
      name: "Testy McToken",
      password: "testy",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const loginForToken = await api
      .post("/api/login")
      .send({
        username: "tokenTest",
        password: "testy",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    // console.log('token',loginForToken.body.token)
    const tempToken = loginForToken.body.token;

    const newBlog = {
      title: "New blogs are cool, I guess",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", 'bearer '+ tempToken)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).toContain("New blogs are cool, I guess");
    });

    test("if the likes property is missing from the request, it will default to the value 0", async () => {

      const newUser = {
        username: "anotherTokenTest",
        name: "Testy McToken the third",
        password: "testy",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const loginForToken = await api
        .post("/api/login")
        .send({
          username: "anotherTokenTest",
          password: "testy",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      // console.log('token',loginForToken.body.token)
      const tempToken = loginForToken.body.token;


      const newBlogNoLikes = {
        title: "New blogs with 0 likes",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", 'bearer '+ tempToken)
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

      const newUser = {
        username: "yetAnotherTokenTest",
        name: "Testy McToken the third",
        password: "testy",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const loginForToken = await api
        .post("/api/login")
        .send({
          username: "yetAnotherTokenTest",
          password: "testy",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      // console.log('token',loginForToken.body.token)
      const tempToken = loginForToken.body.token;


      const newBlogNoTitleNoUrl = {
        author: "Edsger W. Dijkstra",
        likes: 58,
      };

      await api.post("/api/blogs").set("Authorization", 'bearer '+ tempToken).send(newBlogNoTitleNoUrl).expect(400);
  });
});

//deleting a blog will also need a token

describe("when deleting a blog", () => {
  test("a blog can be deleted", async () => {

  const newUser = {
    username: "deletedAnotherTokenTest",
    name: "Testy McToken the third",
    password: "testy",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const loginForToken = await api
    .post("/api/login")
    .send({
      username: "deletedAnotherTokenTest",
      password: "testy",
    })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  // console.log('token',loginForToken.body.token)
  const tempToken = loginForToken.body.token;


  const newBlogNoLikes = {
    title: "Going to be deleted very very soon",
    author: "Something John LIndquist made maybe?",
    url: "http://betterthandoing.php.com",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", 'bearer '+ tempToken)
    .send(newBlogNoLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart.find(blog=>blog.title === newBlogNoLikes.title)

    console.log(blogToDelete)
    await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", 'bearer '+ tempToken).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    //a blog is added in this this test and then deleted so we add 1 then subtract 1 to signify this process
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1 - 1);

    const contents = blogsAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });
});

describe("when updating a blogs info", () => {
  test("a blog can be updated", async () => {
    const existingBlogWithNewLikes = {
      title: "NEW Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 15,
    };

    const id = "5a422aa71b54a676234d17f8";

    await api
      .patch(`/api/blogs/${id}`)
      .send(existingBlogWithNewLikes)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("NEW Go To Statement Considered Harmful");

    const addedBlog = _.find(
      blogsAtEnd,
      (blog) => blog.title === "NEW Go To Statement Considered Harmful"
    );
    expect(addedBlog.likes).toEqual(15);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
