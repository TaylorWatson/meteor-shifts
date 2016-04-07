import ErrorHandler from './ErrorHandler';

class DatabaseService {

  constructor() {}

  init() {
    this.db = openDatabase('shiftsDB', '1.0', 'Shifts DB', 2 * 1024 * 1024);
    this.db.transaction((tx) => {

      tx.executeSql("CREATE TABLE IF NOT EXISTS shifts(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "title VARCHAR(20) NOT NULL," +
        "location VARCHAR(20)," +
        "startTime DATETIME," +
        "endTime VARCHAR(8)," +
        "clockInTime DATETIME," +
        "clockOutTime DATETIME," +
        "job VARCHAR(20));", [], null, ErrorHandler);

      tx.executeSql("CREATE TABLE IF NOT EXISTS deliveries (" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "shiftId INTEGER," +
        "deliveryNumber INTEGER," +
        "tipAmount DOUBLE," +
        "paymentType INTEGER," +
        "deliveryAmount DOUBLE);", [], null, ErrorHandler);

      tx.executeSql("CREATE TABLE IF NOT EXISTS settings (" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "hourlyRate DECIMAL(4,2)," +
        "outBonus DECIMAL(4,2)," + 
        "debitFee DECIMAL(4,2)," +
        "unitBonus DECIMAL(4,2));", [], null, ErrorHandler);

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

    recursiveTransaction = (tx) => {
      let statement = statements.shift();
      if (statement) {
        tx.executeSql(statement, [], recursiveTransaction, ErrorHandler);
      } else {
        this.init();
      }
    }

    this.db.transaction(recursiveTransaction, ErrorHandler);
  }

}

DatabaseService = new DatabaseService();

try {
  window.DatabaseService = DatabaseService;
} catch (e) {}

export { DatabaseService }