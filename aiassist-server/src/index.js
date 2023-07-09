const { getSimpleAnswer } = require("./regularCall");
const { addEntry, getEntries } = require("./db");
const { generateEntry, mapEntries } = require("./utils");

async function handleGetEntries(req, res) {
  const entries = await getEntries();
  const mapped = mapEntries(entries);
  res.send(mapped);
}

async function handleAddEntry(req, res) {
  let inputEntry = req.body;
  await addEntry(inputEntry);
  const response = await getSimpleAnswer(inputEntry.value);
  const outputEntry = generateEntry(response.text);
  await addEntry(outputEntry);
  delete outputEntry._id;

  res.send(outputEntry);
}

module.exports = { handleGetEntries, handleAddEntry };
