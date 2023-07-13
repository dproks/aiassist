const db_username = process.env.DB_USERNAME;
const db_pwd = process.env.DB_PWD;

export const dbUri = `mongodb://${db_username}:${db_pwd}@dkrcomp-mongo/`;
export const promptEntriesCollectionName = "EntriesCollection";
