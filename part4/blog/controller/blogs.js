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
    res.status(404).end();
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

// app.put('/api/persons/:id', (req, res, next) => {
//   // console.log(typeof req.params.id)
//   // console.log(req.params.id)
//   // https://github.com/blakehaswell/mongoose-unique-validator#find--updates
//   const { name, number } = req.body
//   Person.findByIdAndUpdate(req.params.id, { name, number }, {
//     new: true,
//     runValidators: true,
//     context: 'query'
//   })
//     .then((updatedPeep) => {
//       res.json(updatedPeep)
//     })
//     .catch((err) => next(err))
// })

blogsRouter.put("/:id", async (request, response, next) =>{
  const {likes, title, author, url} = request.body;
  await Blog.findByIdAndUpdate(request.params.id, { likes, title, author, url}, {
    new: true,
    runValidators: true,
    context: 'query'
  })
  response.status(200).end()
})

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
