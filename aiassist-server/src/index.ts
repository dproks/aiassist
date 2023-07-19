import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import entriesRouter from "./routes";
import mongoose from "mongoose";
import { getDBUri } from "./utils";

const app = express();

const PORT = 3100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(getDBUri());

app.use("/api", entriesRouter);

main().catch((err) => console.log("Error starting app: ", err));

async function main() {
  console.log("Äpp is starting on port: ", PORT);
  app.listen(PORT);
}
