const { qna_collection_name, getClient, getCollection } = require("./utils");
const client = getClient();

async function getDBEntries(limit) {
  try {
    await client.connect();
    await client.db("aiassist").command({ ping: 1 });

    const db = await client.db();
    const qna_collection = await getCollection(db, qna_collection_name);
    const collectionLength = await qna_collection.count();
    const skipCount =
      collectionLength - limit > 0 ? collectionLength - limit : 0;

    const entries = await qna_collection.find({}).skip(skipCount).toArray();

    return entries;
  } catch (error) {
    console.log("getDBEntries error: ", error);
  } finally {
    await client.close();
  }
}

module.exports = { getDBEntries };
