const User = require("../model/user");

// Récupérer tous les users (GET)
function getUsers(req, res) {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    }

    res.send(users);
  });
}

// Récupérer un user avec son username et password (POST)
function findUser(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username, password: password }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
}

module.exports = { getUsers, findUser };
