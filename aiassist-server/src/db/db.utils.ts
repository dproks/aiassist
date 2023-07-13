const db_username = process.env.MONGO_INITDB_ROOT_USERNAME;
const db_pwd = process.env.MONGO_INITDB_ROOT_PASSWORD;

export const dbUri = `mongodb://${db_username}:${db_pwd}@dkrcomp-mongo/`;
export const promptEntriesCollectionName = "EntriesCollection";
