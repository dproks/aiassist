const uuidv4 = require("uuidv4");

function clg(...args) {
  console.log(`DBG: ${args}`);
}

const generateEntry = (
  value,
  uuid,
  type = "answer",
  date = JSON.stringify(new Date())
) => ({
  value,
  uuid: uuid || uuidv4.uuid(),
  type,
  date,
});

function mapEntries(entries) {
  if (!entries) return entries;
  const result = entries.map((entry) => ({
    uuid: entry.uuid,
    type: entry.type,
    date: entry.date,
    value: entry.value,
  }));

  return result;
}

module.exports = { clg, generateEntry, mapEntries };
