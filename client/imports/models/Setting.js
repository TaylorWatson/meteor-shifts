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

  static find(callback) {
    DatabaseService.db.transaction((tx) => {
      tx.executeSql("SELECT * FROM settings;", [], (tx, { rows }) => {
        if (!rows.length) {
          callback('Settings are not configured.');
          return;
        }
        callback(null, new Setting(rows.item(0)));
      }, ErrorHandler);
    }, ErrorHandler)
  }

  static findOrCreate(callback) {
    DatabaseService.db.transaction((tx) => {
      console.log('Starting transaction...');
      tx.executeSql("SELECT * FROM settings;", [], (tx, results) => {
        console.log('Got results: ', results);
        if (results.rows.length) {
          callback(null, new Setting(results.rows.item(0)));
        } else {
          console.log("Inserting values");


          tx.executeSql("INSERT INTO settings(hourlyRate, outBonus, debitFee, unitBonus, defaultTitle, defaultLocation) VALUES " +
            "(?, ?, ?, ?, ?, ?);", [0, 0, 0, 0, '', ''], (tx) => {
              console.log('Inserted! Selecting...');
              tx.executeSql("SELECT * FROM settings;", [], (tx, { rows }) => {
                callback(null, new Setting(rows.item(0)));
              }, ErrorHandler);
            }, ErrorHandler);


        }
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static update(shift, callback) {
    DatabaseService.db.transaction((tx) => {
      tx.executeSql("UPDATE settings SET " +
        "hourlyRate=?, " +
        "outBonus=?, " +
        "debitFee=?, " +
        "unitBonus=?, " +
        "defaultTitle=?, " +
        "defaultLocation=? WHERE id=?;", [
          shift.hourlyRate,
          shift.outBonus,
          shift.debitFee,
          shift.unitBonus,
          shift.defaultTitle,
          shift.defaultLocation,
          shift.id
        ], callback, ErrorHandler);
    }, ErrorHandler);
  }

}