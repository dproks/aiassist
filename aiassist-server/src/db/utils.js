const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://aiassistroot:plaguew3ll@dkrcomp-mongo/";
const qna_collection_name = "qna_collection";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
function getClient() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client;
}

async function checkIsCollectionExists(db, collectionName) {
  const list = await db.command({ listCollections: 1 });
  return list.cursor.firstBatch.some((i) => i.name === collectionName);
}

async function getCollection(db, collectionName) {
  const collectionExists = await checkIsCollectionExists(db, collectionName);

  if (!collectionExists) {
    await db.createCollection(collectionName);
  }

  return await db.collection(qna_collection_name);
}

module.exports = {
  qna_collection_name,
  getClient,
  checkIsCollectionExists,
  getCollection,
};
