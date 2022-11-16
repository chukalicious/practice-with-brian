const Questions = require("./questions-model");
const express = require("express");

const router = express.Router();

router.get("/questions", (req, res) => {
  // inside the body req.body
  // inside parameters of the path req.params
  // inside the query string req.query
  // inside a header req.headers
  Questions.find()
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the questions",
      });
    });
});

router.get("/:id", (req, res) => {
  Adopter.findById(req.params.id)
    .then((question) => {
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ message: "Question not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the adopter",
      });
    });
});

router.post("/questions/add", (req, res) => {
  const body = req.body;
  Questions.add(body)
    .then((body) => {
      if (body.question && body.answer && body.detail && body.point) {
        res.status(201).json(body);
      } else {
        res.status(400).json({
          message:
            "The question body must contain a question, an answer, a justification for the answer, and a points number",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the question",
      });
    });
});

router.delete("/:id", (req, res) => {
  Questions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The question has been nuked" });
      } else {
        res.status(404).json({ message: "The question could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error removing the question",
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  Questions.update(id, changes)
    .then((changes) => {
      if (
        changes.question &&
        changes.answer &&
        changes.detail &&
        changes.point
      ) {
        res.status(201).json(changes);
      } else {
        res.status(400).json({
          message:
            "The question body must contain a question, an answer, a justification for the answer, and a points number",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the question",
      });
    });
});

module.exports = router;
