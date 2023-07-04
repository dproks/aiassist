const { qna_collection_name, getClient, getCollection } = require("./utils");
const client = getClient();

async function getEntries() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("aiassist").command({ ping: 1 });

    const db = await client.db();

    const qna_collection = await getCollection(db, qna_collection_name);

    const entries = await qna_collection.find({}).toArray();

    return entries;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { getEntries };
