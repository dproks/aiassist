import { Exception } from "./exception";

const EXCEPTION_DB_CONNECT = "500";
const EXCEPTION_DB_INSERT = "501";
const EXCEPTION_DB_READ = "502";

export class DBException extends Exception {}
