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

    // binding
    this.count = this.count.bind(this);
    this.delete = this.delete.bind(this);
    this.exists = this.exists.bind(this);
    this.find = this.find.bind(this);
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);

    this._decreaseRecordCount = this._decreaseRecordCount.bind(this);
    this._getTable = this._getTable.bind(this);
    this._increaseRecordCount = this._increaseRecordCount.bind(this);

    this._initialize();
  }

  /**
   * Get the number of records in the database.
   */
  count(): Promise<number> {
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
    return this.get(id)
    .then(record => record != null && record != undefined)
    .catch(_ => false);
  }

  /**
   * Find a record in the database from some filters.
   * @param findObj an object containing the filters.
   */
  find(findObj: object): Promise<T> {
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
    return new Promise((resolve, _) => {
      const all = this._getTable().value();
      resolve(all);
    });
  }

  /**
   * Insert a record into the database.
   * @param data the data.
   */
  insert(data: T): Promise<T> {
    if (!data._id) data._id = v4();

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
    const { name, isLedger } = this._tableDefinition;
    if (isLedger) return Promise.reject(`Table ${name} is a ledger table. You cannot update a ledger table.`);
    return new Promise((resolve, reject) => {
      const now = Date.now();
      data.recordUpdated = now;
      this._getTable()
        .find((o: T) =>  o._id === data._id)
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
   * Decrease the record counter.
   */
  _decreaseRecordCount() {
    const currentCount = this._db.get("count").value();
    return this._db.set("count", currentCount - 1).write();
  }

  /**
   * Get the table from the lowdb db.
   */
  _getTable() {
    return this._db.get("entries");
  }

  /**
   * Increase the record counter.
   */
  _increaseRecordCount() {
    const currentCount = this._db.get("count").value();
    return this._db.set("count", currentCount + 1).write();
  }

  /**
   * Override this stub.
   */
  _initialize() {
    return Promise.resolve();
  }
}

export default Database;