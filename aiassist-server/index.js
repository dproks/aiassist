require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const entriesRouter = require("./src/routes/entries");

const app = express();

const PORT = 3100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", entriesRouter);

main().catch((err) => console.log("Error starting app:", err));

async function main() {
  console.log("Äpp is starting on port:", PORT);

  app.listen(PORT);
}
