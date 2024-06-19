const { sequelize, User } = require("./db");
(async function () {
  await sequelize.sync({ force: true });
  await User.bulkCreate([
    {
      id: "221000000",
      email: "anne@gmail.com",
      username: "anne",
      password: "anne",
      role: "Student",
    },
    {
      id: "221000001",
      email: "beatrice@gmail.com",
      username: "beatrice",
      password: "beatrice",
      role: "Student",
    },
    {
      id: "221000002",
      email: "clara@gmail.com",
      username: "clara",
      password: "clara",
      role: "Student",
    },
    {
      id: "221000003",
      email: "diana@gmail.com",
      username: "diana",
      password: "diana",
      role: "Teacher",
    },
    {
      id: "221000004",
      email: "ellaine@gmail.com",
      username: "ellaine",
      password: "ellaine",
      role: "Teacher",
    },
  ]);
})();
