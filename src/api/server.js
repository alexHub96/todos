const express = require("../node_modules/express");
const app = express();
const bodyParser = require("../node_modules/body-parser");
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
const {
  getAllRecords,
  getRecordById,
  addNewRecord,
  editRecord,
  deleteRecord
} = require("./controller");

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./" });
});

app.get("/api/todo/:id?", (req, res) => {
  const todoId = parseInt(req.params.id);
  if (todoId) {
    res.json(getRecordById(todoId));
  } else {
    res.json(getAllRecords());
  }
});

app.post("/api/todo", (req, res) => {
  addNewRecord(req.body);
  res.send("Got a POST request at /api/todo/");
});

app.put("/api/todo", (req, res) => {
  editRecord(req.body);
  res.send("Got a PUT request at /api/todo/");
});

app.delete("/api/todo/:id", (req, res) => {
  deleteRecord(parseInt(req.params.id));
  res.send("Got a DELETE request at /api/todo/" + req.params.id);
});

app.get('*', (req, res) => {
  res.sendFile("index.html", { root: "./" });
});

app.listen(5000, () => {
  console.log("App listening on port 5000!");
});
