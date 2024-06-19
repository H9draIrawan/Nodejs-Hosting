const express = require("express");
const { User } = require("./db");
const { Op } = require("sequelize");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/users/login", async (req, res) => {
  const users = await User.findAll();
  const user = users.find(
    (user) =>
      (user.username == req.query.user || user.email == req.query.user) &&
      user.password == req.query.password
  );
  if (!user)
    return res.status(401).send({
      msg: "Login failed",
    });
  return res.status(200).send({
    msg: "Login success",
    user: user,
  });
});

app.post("/users/register", async (req, res) => {
  const { email, username } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });
  if (user) return res.status(400).send({ msg: "User already exists" });
  await User.create(req.body);
  return res.status(201).send({ msg: "User created", user: req.body });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
