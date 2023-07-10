const { getSimpleAnswer } = require("../ai/regularCall");
const { addDBEntry, getDBEntries } = require("../db");
const { generateEntry, mapEntries, clg } = require("../utils");

async function handleGetEntries(req, res) {
  const limit = parseInt(req.query.limit);
  const entries = await getDBEntries(limit);
  const mapped = mapEntries(entries);
  res.send(mapped);
}

async function handleAddEntry(req, res) {
  let inputEntry = req.body;
  await addDBEntry(inputEntry);
  const response = await getSimpleAnswer(inputEntry.value);
  const outputEntry = generateEntry(response.text);
  await addDBEntry(outputEntry);
  delete outputEntry._id;

  res.send(outputEntry);
}

module.exports = { handleGetEntries, handleAddEntry };
