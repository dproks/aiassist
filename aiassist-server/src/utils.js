const { uuid } = require("uuidv4");

function clg(...args) {
  console.log(`DBG: ${args}`);
}

const generateEntry = (
  value,
  id = uuid(),
  type = "answer",
  date = JSON.stringify(new Date())
) => ({
  value,
  type,
  date,
  id,
});

function mapEntries(entries) {
  const result = entries.map((entry) => ({
    id: entry.id,
    type: entry.type,
    date: entry.date,
    value: entry.value,
  }));

  return result;
}

module.exports = { clg, generateEntry, mapEntries };
