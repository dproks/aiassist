const { qna_collection_name, getClient, getCollection } = require("./utils");
const client = getClient();

async function getEntries() {
  try {
    await client.connect();
    await client.db("aiassist").command({ ping: 1 });

    const db = await client.db();

    const qna_collection = await getCollection(db, qna_collection_name);

    const entries = await qna_collection.find({}).toArray();

    return entries;
  } catch (error) {
    console.log("getEntries error: ", error);
  } finally {
    await client.close();
  }
}

module.exports = { getEntries };
