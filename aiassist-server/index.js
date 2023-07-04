const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleRootGet, handleRootPost } = require("./src/");

const app = express();

const PORT = 3100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", handleRootGet);

app.post("/", handleRootPost);

main().catch((err) => console.log("Error starting app:", err));

async function main() {
	console.log("Äpp is starting on port:", PORT);

	app.listen(PORT);
}
