const { getChainedAnswer } = require("../ai/chainedCall");
const { addDBEntry, getDBEntries } = require("../db");
const { generateEntry, mapEntries } = require("../utils");

async function handleGetEntries(req, res) {
  const limit = parseInt(req.query.limit);
  const entries = await getDBEntries(limit);
  const mapped = mapEntries(entries);
  res.send(mapped);
}

async function handleAddEntry(req, res) {
  let inputEntry = req.body;
  await addDBEntry(inputEntry);
  const response = await getChainedAnswer(inputEntry.value);
  const outputEntry = generateEntry(response.response);
  await addDBEntry(outputEntry);
  delete outputEntry._id;

  res.send(outputEntry);
}

module.exports = { handleGetEntries, handleAddEntry };
