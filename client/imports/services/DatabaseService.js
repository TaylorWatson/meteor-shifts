import ErrorHandler from './ErrorHandler';
import { SampleShifts, SampleDeliveries } from './seed/seed';
import Shift from '../models/Shift';
import Delivery from '../models/Delivery';


class DatabaseService {

  constructor() {}

  init() {

    this.db = window.sqlitePlugin.openDatabase({ name: 'shiftsDB', iosDatabaseLocation: 'Library'}, null, ErrorHandler);
    this.db.transaction((tx) => {

      tx.executeSql("CREATE TABLE IF NOT EXISTS shifts(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "title VARCHAR(20) NOT NULL," +
        "location VARCHAR(20)," +
        "startTime DATETIME," +
        "endTime VARCHAR(8)," +
        "clockInTime DATETIME," +
        "clockOutTime DATETIME," +
        "job VARCHAR(20)," +
        "hourlyRate DECIMAL(4,2)," +
        "outBonus DECIMAL(4,2)," +
        "debitFee DECIMAL(4,2)," +
        "unitBonus DECIMAL(4,2)" +
        ");", [], null, ErrorHandler);

      tx.executeSql("CREATE TABLE IF NOT EXISTS deliveries (" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "shiftId INTEGER," +
        "deliveryNumber INTEGER," +
        "tipAmount DOUBLE," +
        "paymentType INTEGER," +
        "isOut BOOLEAN);", [], null, ErrorHandler);

      tx.executeSql("CREATE TABLE IF NOT EXISTS settings (" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "hourlyRate DECIMAL(4,2)," +
        "outBonus DECIMAL(4,2)," +
        "debitFee DECIMAL(4,2)," +
        "unitBonus DECIMAL(4,2)," +
        "defaultLocation VARCHAR(20)," +
        "defaultTitle VARCHAR(20));", [], null, ErrorHandler);

    }, ErrorHandler);
  }

  getDatabase() {
    return this.db;
  }

  refresh() {
    let statements = [
      "DROP TABLE IF EXISTS shifts;",
      "DROP TABLE IF EXISTS deliveries;",
      "DROP TABLE IF EXISTS settings;"
    ];

    let i = 0;

    let recursiveTransaction = (tx) => {
      let statement = statements.shift();
      if (statement) {
        tx.executeSql(statement, [], recursiveTransaction, ErrorHandler);
      } else {
        this.init();
      }
    }

    this.db.transaction(recursiveTransaction, ErrorHandler);
  }

  seed() {
    let addShift = shift => {
      this.db.transaction(tx => {
        tx.executeSql("INSERT INTO shifts(title, startTime, clockInTime, clockOutTime, hourlyRate, outBonus, debitFee, unitBonus) VALUES (?,?,?,?,?,?,?,?);", [
          shift.title, shift.startTime, shift.clockInTime, shift.clockOutTime, shift.hourlyRate, shift.outBonus, shift.debitFee, shift.unitBonus
        ], null, ErrorHandler);
      }, ErrorHandler);
    }

    let addDelivery = delivery => {
      this.db.transaction(tx => {
        tx.executeSql("INSERT INTO deliveries(shiftId, deliveryNumber, tipAmount, paymentType) VALUES (?,?,?,?);", [
          delivery.shiftId, delivery.deliveryNumber, delivery.tipAmount, delivery.paymentType
        ], null, ErrorHandler);
      }, ErrorHandler);
    }

    _.each(SampleShifts, addShift);
    _.each(SampleDeliveries, addDelivery);
  }

}

DatabaseService = new DatabaseService();

try {
  window.sqlitePlugin.DatabaseService = DatabaseService;
} catch (e) {}

export { DatabaseService }