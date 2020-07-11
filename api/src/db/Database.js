const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const Memory = require("lowdb/adapters/Memory");
const { v4: uuid } = require("uuid");

class Database {

  /**
   * Database constructor.
   * @param {{ name: string, isLedger?: boolean, isMemory?: boolean }} tableDefinition the definition for the database table.
   * @param {{ isTest?: boolean }} options the options.
   */
  constructor(tableDefinition, options = { isTest: false }) {
    const { name, isMemory } = tableDefinition;
    const { isTest } = options; // TODO: implement

    if (!isTest && isMemory) this._adapter = new Memory();
    else this._adapter = new FileSync(`./do-dydns.${tableDefinition.name}.db`);

    this._db = new lowdb(this._adapter);
    const tableCount = `${name}Count`;
    let tableDefaults = {};
    tableDefaults[name] = [];
    tableDefaults[tableCount] = 0;
    this._db.defaults(tableDefaults)
    .write();

    this._tableDefinition = tableDefinition;

    // binding
    this.close = this.close.bind(this);
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
   * Close the database.
   */
  close() {
    this._db.close();
  }

  /**
   * Get the number of records in the database.
   * @returns {Promise<number>}
   */
  count() {
    return new Promise((resolve, reject) => {
      const count = `${this._tableDefinition.name}Count`;
      resolve(
        this._db.get(count)
        .value()
      );
    });
  }

  /**
   * Delete a record from the database.
   * @param {string} id the id.
   * @returns {Promise<void>}
   */
  delete(id) {
    const { name, isLedger } = this._tableDefinition;
    if (isLedger) return Promise.reject(`Table ${name} is a ledger table. You cannot delete from a ledger table.`);
    return new Promise((resolve, _) => {
      this._getTable()
      .remove({ _id: id })
      .write();

      this._decreaseRecordCount();

      resolve();
    });
  }

  /**
   * Check to see if a record exists in the database.
   * @param {string} id the id.
   * @returns {Promise<boolean>}
   */
  exists(id) {
    return this.get(id)
    .then(record => record != null && record != undefined && record !== {})
    .catch(_ => false);
  }

  /**
   * Find a record in the database from some filters.
   * @param {any} findObj an object containing the filters.
   * @returns {Promise<and>} the record.
   */
  find(findObj) {
    return new Promise((resolve, reject) => {
      resolve(
        this._getTable()
        .find(findObj)
        .value()
      );
    });
  }

  /**
   * Get a record from the database based on a id.
   * @param {string} id the id.
   * @returns {Promise<any>} the data.
   */
  get(id) {
    return new Promise((resolve, reject) => {
      resolve(
        this._getTable()
        .find({ _id: id })
        .value()
      );
    });
  }

  /**
   * Get all records from the database.
   * @returns {Promise<any[]>}
   */
  getAll() {
    return new Promise((resolve, reject) => {
      const all = this._getTable().value();
      resolve(all || []);
    });
  }

  /**
   * Insert a record into the database.
   * @param {*} data the data.
   * @returns {Promise<void>}
   */
  insert(data) {
    if (!data._id) data._id = uuid();

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
    });
  }

  /**
   * Update a record in the database.
   * @param {*} data the data.
   * @returns {Promise<void>}
   */
  update(data) {
    const { name, isLedger } = this._tableDefinition;
    if (isLedger) return Promise.reject(`Table ${name} is a ledger table. You cannot update a ledger table.`);
    return new Promise((resolve, reject) => {
      const now = Date.now();
      data.recordUpdated = now;
      this._getTable()
      .find({ _id: data._id })
      .assign(data)
      .write();
      resolve();
    });
  }

  /**
   * Decrease the record counter.
   */
  _decreaseRecordCount() {
    const count = `${this._tableDefinition.name}Count`;
    const currentCount = this._db.get(count).value();
    return this._db.set(count, currentCount - 1).write();
  }

  /**
   * Get the table from the lowdb db.
   */
  _getTable() {
    return this._db.get(this._tableDefinition.name);
  }

  /**
   * Increase the record counter.
   */
  _increaseRecordCount() {
    const count = `${this._tableDefinition.name}Count`;
    const currentCount = this._db.get(count).value();
    return this._db.set(count, currentCount + 1).write();
  }

  /**
   * Override this stub.
   * @returns {Promise<void>}
   */
  _initialize() {
    return Promise.resolve();
  }
}

module.exports = Database;
