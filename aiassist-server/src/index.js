const { getSimpleAnswer } = require("./regularCall");
const { addEntry, getEntries } = require("./db");
const { generateEntry, mapEntries } = require("./utils");

async function handleRootGet(req, res) {
  const entries = await getEntries();
  const mapped = mapEntries(entries);
  res.send(mapped);
}

async function handleRootPost(req, res) {
  let inputEntry = req.body.data;
  await addEntry(inputEntry);
  const response = await getSimpleAnswer(inputEntry.value);
  const outputEntry = generateEntry(response.text);
  await addEntry(outputEntry);
  delete outputEntry._id;

  res.send(outputEntry);
}

module.exports = { handleRootGet, handleRootPost };
