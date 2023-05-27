const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

let tick = 0;
let processes = {};
setInterval(() => (tick = tick + 15), 2000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/processes", (req, res) => {
  console.log(req.body);

  const { id } = req.body;

  // create process
  if (id && !processes?.[id]) {
    processes[id] = tick;
  }

  res.sendStatus(201);
});

app.get("/processes", (req, res) => {
  const processed = Object.keys(processes).reduce((acc, key) => {
    acc.push({
      id: key,
      status: processes[key] + 120 > tick ? "in progress" : "finished",
    });

    return acc;
  }, []);

  res.send({
    processes: processed,
  });
});

app.get("/processes/:id", (req, res) => {
  const { id } = req.params;

  let status = "unknown";

  if (!id) {
    res.status(400).send({ error: "id not a valid param" });
  }

  // process in progress
  if (id && processes?.[id] && processes[id] + 120 > tick) {
    status = "in progress";
  }

  // finished process
  if (id && processes?.[id] && processes[id] + 120 <= tick) {
    status = "finished";
  }

  // create process
  if (id && !processes?.[id]) {
    processes[id] = tick;
    status = "started";
  }

  res.status(200).send({ status });
});

app.listen(3000, () => console.log("listening on port 3000"));
