require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import entriesRouter from "./routes";

const app = express();

const PORT = 3100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", entriesRouter);

main().catch((err) => console.log("Error starting app: ", err));

async function main() {
  console.log("Äpp is starting on port: ", PORT);
  app.listen(PORT);
}
