const { qna_collection_name, getClient, getCollection } = require("./utils");
const client = getClient();

async function addEntry(entry) {
  try {
    await client.connect();

    await client.db("aiassist").command({ ping: 1 });

    const db = await client.db();

    const qna_collection = await getCollection(db, qna_collection_name);

    await qna_collection.insertOne(entry);
  } catch (error) {
    console.log("addEntry error: ", error);
  } finally {
    await client.close();
  }
}

module.exports = { addEntry };
