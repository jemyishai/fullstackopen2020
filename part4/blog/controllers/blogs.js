const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  const foundBlog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  if (foundBlog) {
    res.json(foundBlog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!body.likes) {
    body.likes = 0;
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!body.url || !body.title) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  const { likes, title, author, url } = request.body;
  await Blog.findByIdAndUpdate(
    request.params.id,
    { likes, title, author, url },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  response.status(200).end();
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  // console.log("check:", user, blog);
  // console.log('user._id.toString()', user._id.toString())
  // console.log(blog.user.toString() === user._id.toString())
  // console.log('blog._id.toString()',blog.user.toString())

  if (blog.user.toString() === user._id.toString()) {
    console.log("made it here");

     // can I delete right off the blog obj??
    await Blog.findByIdAndRemove(request.params.id);

    //remove from user as well
    //do I need to to do this to user if the populate nonsense is setup?
    user.blogs = user.blogs.filter(blog=>blog.id.toString() !== request.params.id)
    await user.save()
  } else{
    return response.status(401).json({ error: "you didn't author this blog" });
  }

  response.status(204).end();
});

module.exports = blogsRouter;
