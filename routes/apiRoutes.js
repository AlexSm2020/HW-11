// TODO: importing the store

var router = require("express").Router();
var storedNote = require("../db/db");
var store = require("../db/store");

router.get("/notes", async (req, res) => {
  res.json(await store.getNotes());
});

router.post("/notes", function (req, res) { 
  res.json(store.addNote(req.body));
});

router.delete("/notes/:id", function (req, res) { 
  res.json(store.removeNote(req.params.id));
});

module.exports = router;