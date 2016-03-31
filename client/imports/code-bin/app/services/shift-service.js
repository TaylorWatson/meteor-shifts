import { DatabaseService } from './database-service';
import { Shift } from '../models/shift';
import _ from 'lodash';
import moment from 'moment';
import ErrorHandler from './error-handler';

class ShiftService {
  constructor () {}

  find(callback) {
    let shifts = [];
    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts;";

      tx.executeSql(sql, [], (tx, results) => {

        _.each(results.rows, (shift) => {
          shifts.push(new Shift(shift));
        });

        callback(null, shifts);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  findOne(id, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts WHERE id = ?";

      tx.executeSql(sql, [id], (tx, results) => {

        if (!results.rows.length) callback("No results by that ID");

        callback(null, new Shift(results.rows[0]));
      }, ErrorHandler);
    }, ErrorHandler);
  }

  insert(shift, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "INSERT INTO shifts" +
      "(title, location, startTime, endTime, clockInTime, clockOutTime)" +
      "VALUES (?,?,?,?,?,?)";


      var options = [
        shift.title,
        shift.location || '',
        shift.startTime,
        shift.endTime,
        shift.clockInTime,
        shift.clockOutTime
      ];

      tx.executeSql(sql, options, (tx, result) => {
        callback && callback(result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  update(shift, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "UPDATE shifts SET " +
      "title=?, location=?, startTime=?, endTime=?, clockInTime=?, clockOutTime=?" +
      "WHERE id=?";

      let options = [
        shift.title,
        shift.location,
        shift.startTime,
        shift.endTime,
        shift.clockInTime,
        shift.clockOutTime,
        shift.id
      ];


      tx.executeSql(sql, options, (tx, result) => {

        callback(null, result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  delete(id, callback) {
    DatabaseService.db.transaction(tx => {
      let sql = "DELETE FROM shifts WHERE id=?;";

      tx.executeSql(sql, [id], (tx, result) => {

        callback(null, result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  clockInTime(id, callback) {

    DatabaseService.db.transaction(tx => {
      console.log('STARTING CLOCK IN PROCEDURE EH');
      let sql = "SELECT * FROM shifts WHERE clockInTime IS NOT NULL AND clockOutTime IS NULL;";
      console.log('WITH SQL: ', sql);
      tx.executeSql(sql, [], (tx, results) => {
        console.log('Executed first successfully!', results);
        if (results.rows.length) {
          callback("YOU ARE ALREADY CLOCKED IN FOOL!!!!!!!!!!!!!");
          console.log(results);
          console.log('ERRORS');
          return;
        }
        console.log('grabbing results');
        console.log(results);
        let sql = "UPDATE shifts SET " +
        "clockInTime=? " +
        "WHERE id=?;";
        let options = [
          new Date(),
          id];

          console.log('Executing with sql and optiosn: ', sql, options);
        tx.executeSql(sql, options, (tx, results) => {
          console.log('CALLBACK WAHOO', results);
          callback(null, results);
        }, ErrorHandler);
      }, ErrorHandler);
    });

  }

  clockOutTime(id, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts WHERE clockInTime IS NULL AND clockOutTime IS NULL;";
      tx.executeSql(sql, [], (tx, result) => {
        if (results.rows.length) {
          callback("YOU ARE ALREADY CLOCKED OUT FOOL!!!!!!!!!!!!!");
          return;
        }

        let sql = "UPDATE shifts SET " +
        "clockOutTime=? " +
        "WHERE id=?;";
        let options = [
          new Date(),
          id];
        tx.executeSql(sql, options, (tx, result) => {
          callback(null, result);
        }, ErrorHandler);
      }, ErrorHandler);
    });

  }

  findClockedIn() {
    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shift WHERE clockInTime IS NOT NULL AND clockOutTime IS NULL;";
      tx.executeSql(sql, [], (tx, result) => {
        if (result.rows.length) {
          return result;
        }
      }, ErrorHandler);
    });
  }

}

ShiftService = new ShiftService();

export { ShiftService }
