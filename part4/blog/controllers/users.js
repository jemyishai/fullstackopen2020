const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const userFound = await User.findById(request.params.id).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  if (userFound) {
    response.json(userFound);
  } else {
    response.status(404).end();
  }
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log(body.password)
  if (body.password.length < 3) {
    console.log('HERERERER')
    response
      .status(400)
      .send({ error: "invalid password - must be at least 3 characters" });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  }
});

module.exports = usersRouter;
