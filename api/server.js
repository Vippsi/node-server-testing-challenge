const express = require("express");
const Users = require("../users/usersModel");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ server: "is running" });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

server.post("/users", (req, res) => {
  Users.insert(req.body).then((ids) => {
    res.status(201).json({ data: ids });
  })
  .catch(err => {
      res.status(500).json({err: err.message})
  })
});

server.delete("/users/:id", (req, res) => {
    Users.remove(req.params.id).then(user => {
        res.status(200).end()
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})
module.exports = server;
