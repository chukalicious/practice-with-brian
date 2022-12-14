const express = require("express");

const server = express();

server.use(express.json());

const Questions = require("./api/questions/questions-model");

server.get("/questions", (req, res) => {
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

server.get("/questions/:id", (req, res) => {
  Questions.findById(req.params.id)
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
        message: "Error retrieving the question",
      });
    });
});

server.post("/questions/add", (req, res) => {
  const body = req.body;
  console.log(body);
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

server.delete("/questions/:id", (req, res) => {
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

server.put("/questions/:id", (req, res) => {
  const changes = req.body;
  console.log("changes: ", changes);
  const { id } = req.params;
  Questions.update(id, changes)
    .then((changes) => {
      res.status(201).json(changes);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating the question",
      });
    });
});

// OTHER ENDPOINTS
server.get("/", (req, res) => {
  res.send(`
    <h2>Pride and Prejudice Trivia API</h2>
    <p>Have fun!</p>
  `);
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
