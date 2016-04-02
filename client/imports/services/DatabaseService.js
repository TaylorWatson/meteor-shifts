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
        "endTime DATETIME," +
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

    }, ErrorHandler);
  }

  getDatabase() {
    return this.db;
  }

  refresh() {
    this.db.transaction(tx => {
      tx.executeSql(
        "DROP TABLE IF EXISTS shifts;",
        [],
        (tx) => {
          tx.executeSql(
            "DROP TABLE IF EXISTS deliveries;",
            [],
            () => {
              this.init();
            },
            ErrorHandler
          );
        },
        ErrorHandler
      );
    }, ErrorHandler);
  }

}

DatabaseService = new DatabaseService();

try {
  window.DatabaseService = DatabaseService;
} catch (e) {}

export { DatabaseService }