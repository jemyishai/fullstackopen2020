const blogsRouter = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  const foundBlog = await Blog.findById(req.params.id);
  if (foundBlog) {
    res.json(foundBlog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  if (!body.likes) {
    body.likes = 0;
  }

  if (!body.url || !body.title) {
    response.status(400).end();
  } else {
    const blog = new Blog(body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
