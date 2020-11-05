import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import Memory from "lowdb/adapters/Memory";
import { v4 } from "uuid";
import * as _ from "lodash";

export interface TableDefinition {
  isLedger?: boolean;
  isMemory?: boolean;
  name: string;
};

interface DatabaseFileLayout<T> {
  entries: T[];
  name: string;
  count: number;
};

export interface DatabaseEntry {
  _id?: string;
  recordCreated?: number;
  recordUpdated?: number;
};

class Database<T extends DatabaseEntry> {

  private readonly _adapter: lowdb.AdapterSync;
  private readonly _db: lowdb.LowdbSync<DatabaseFileLayout<T>>;
  private readonly _tableDefinition: TableDefinition;
  private _initialized: boolean = false;

  /**
   * Database constructor.
   * @param tableDefinition the definition for the database table.
   * @param {{ isTest?: boolean }} options the options.
   */
  constructor(tableDefinition: TableDefinition, options: { isTest?: boolean; } = { isTest: false }) {
    const { name, isMemory } = tableDefinition;
    const { isTest } = options; // TODO: implement

    // @ts-ignore
    if (!isTest && isMemory) this._adapter = new Memory();
    else this._adapter = new FileSync(`./do-dydns.${tableDefinition.name}.db`);

    // @ts-ignore
    this._db = new lowdb(this._adapter);
    let tableDefaults: DatabaseFileLayout<T> = { name, count: 0, entries: [] };
    this._db.defaults(tableDefaults)
      .write();

    this._tableDefinition = tableDefinition;
  }

  /**
   * Get the number of records in the database.
   */
  count(): Promise<number> {
    this._checkInitialized();
    return new Promise((resolve, _) => {
      resolve(
        this._db.get("count")
          .value()
      );
    });
  }

  /**
   * Delete a record from the database.
   * @param id the id.
   */
  delete(id: string): Promise<string> {
    this._checkInitialized();
    const { name, isLedger } = this._tableDefinition;
    if (isLedger) return Promise.reject(`Table ${name} is a ledger table. You cannot delete from a ledger table.`);
    return new Promise((resolve, _) => {
      this._getTable()
        .remove(r => r._id === id)
        .write();

      this._decreaseRecordCount();

      resolve(id);
    });
  }

  /**
   * Check to see if a record exists in the database.
   * @returns {Promise<boolean>}
   */
  exists(id: string) {
    this._checkInitialized();
    return this.get(id)
      .then(record => record != null && record != undefined)
      .catch(_ => false);
  }

  /**
   * Find a record in the database from some filters.
   * @param findObj an object containing the filters.
   */
  find(findObj: object): Promise<T> {
    this._checkInitialized();
    return new Promise((resolve, _) => {
      resolve(
        this._getTable()
          .find(findObj)
          .value() as T
      );
    });
  }

  /**
   * Get a record from the database based on a id.
   * @param id the id.
   */
  get(id: string): Promise<T> {
    this._checkInitialized();
    return new Promise((resolve, _) => {
      resolve(
        this._getTable()
          .find(r => r._id === id)
          .value() as T
      );
    });
  }

  /**
   * Get all records from the database.
   */
  getAll(): Promise<T[]> {
    this._checkInitialized();
    return new Promise((resolve, _) => {
      const all = this._getTable().value();
      resolve(all);
    });
  }

  /**
   * Override this stub.
   */
  initialize(): Promise<void> {
    this._initialized = true;
    return Promise.resolve();
  }

  /**
   * Insert a record into the database.
   * @param data the data.
   */
  insert(data: T): Promise<T> {
    this._checkInitialized();
    if (data._id === undefined) data._id = v4();

    return this.exists(data._id)
      .then(exists => {
        if (!exists) {
          const now = Date.now();
          data.recordCreated = now;
          data.recordUpdated = now;
          this._getTable()
            .push(data)
            .write();
          this._increaseRecordCount();
        }
        return data;
      });
  }

  /**
   * Update a record in the database.
   * @param data the data.
   * @returns {Promise<void>}
   */
  update(data: T): Promise<T> {
    this._checkInitialized();
    const { name, isLedger } = this._tableDefinition;
    if (isLedger) return Promise.reject(`Table ${name} is a ledger table. You cannot update a ledger table.`);
    return new Promise((resolve, reject) => {
      const now = Date.now();
      data.recordUpdated = now;
      this._getTable()
        .find((o: T) => o._id === data._id)
        .assign(data)
        .write();
      resolve(data);
    });
  }

  /**
   * Update the fields of more than one object in the table.
   * @param updateData the data to update.
   * @param findObj the find object.
   */
  updateBy(updateData: T, findObj: object): Promise<T[]> {
    this._checkInitialized();
    const { name, isLedger } = this._tableDefinition;
    if (isLedger) return Promise.reject(`Table ${name} is a ledger table. You cannot update a ledger table.`);
    return new Promise((resolve, reject) => {
      const now = Date.now();
      const updated: T[] = [];
      this._getTable()
        .each((item) => {
          // if we should update the item, update it
          if (_.some([item], findObj)) {
            item = Object.assign(item, updateData);
            item.recordUpdated = now;
            updated.push(item);
          }
        })
        .write();
      resolve(updated);
    });
  }

  /**
   * Check to see if the database has been initialized or not.
   */
  private _checkInitialized() {
    if (!this._initialized) {
      throw new Error("You must call initialize()!");
    }
  }

  /**
   * Decrease the record counter.
   */
  private _decreaseRecordCount() {
    const currentCount = this._db.get("count").value();
    return this._db.set("count", currentCount - 1).write();
  }

  /**
   * Get the table from the lowdb db.
   */
  private _getTable() {
    return this._db.get("entries");
  }

  /**
   * Increase the record counter.
   */
  private _increaseRecordCount() {
    const currentCount = this._db.get("count").value();
    return this._db.set("count", currentCount + 1).write();
  }
}

export default Database;