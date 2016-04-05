import { DatabaseService } from '../services/DatabaseService';
import ErrorHandler from '../services/ErrorHandler';
import _ from 'lodash';

export default class Setting {

  constructor(setting) {
    _.extend(this, setting);
  }

  save(callback) {
    Setting.update(this, callback);
  }

  static findOrCreate(callback) {
    DatabaseService.db.transaction((tx) => {
      console.log('Starting transaction...');
      tx.executeSql("SELECT * FROM settings;", [], (tx, { rows }) => {
        console.log('Got rows: ', rows);
        if (rows.length) {
          callback(null, new Setting(rows[0]));
        } else {
          console.log("Inserting values");


          tx.executeSql("INSERT INTO settings(hourlyRate, outBonus, debitFee, unitBonus) VALUES " +
            "(?, ?, ?, ?);", [0, 0, 0, 0], (tx) => {
              console.log('Inserted! Selecting...');
              tx.executeSql("SELECT * FROM settings;", [], (tx, { rows }) => {
                console.log('Success! Calling back with: ', rows[0]);
                callback(null, new Setting(rows[0]));
              }, ErrorHandler);
            }, ErrorHandler);


        }
      }, ErrorHandler);
    }, null, ErrorHandler)
  }

  static update(shift, callback) {
    DatabaseService.db.transaction((tx) => {
      tx.executeSql("UPDATE settings SET " +
        "hourlyRate=?, " +
        "outBonus=?, " +
        "debitFee=?, " +
        "unitBonus=? WHERE id=?;", [
          shift.hourlyRate,
          shift.outBonus,
          shift.debitFee,
          shift.unitBonus,
          shift.id
        ], callback, ErrorHandler);
    }, null, ErrorHandler);
  }

}