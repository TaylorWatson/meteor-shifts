import _ from 'lodash';
import moment from 'moment';
import ErrorHandler from '../services/ErrorHandler';
import { DatabaseService } from '../services/DatabaseService';

export default class Shift {
  constructor(shift) {
    if (!shift || !shift.id) {
      this._isNew = true;
    } else {
      this._isNew = false;
    }

    _.extend(this, shift || {});
    this._errors = [];
  }

  validate(callback) {
    this._errors.length = 0;

    if (!this.title) {
      this._errors.push({ title: "Title is required." });
      if (callback) {
        return callback("Title is required.");
      }
    }

    if (!this.startTime) {
      this._errors.push({ startTime: "Start time is required." });
      if (callback) {
        return callback("Start time is required.");
      }
    }

    callback();

    return !this._errors.length;
  }

  save(callback) {
    if (!(typeof callback == "function")) {
      throw new Error("Call back is required in save.");
    }

    this.validate(err => {
      if (err) callback(err);
      else {
        if (this._isNew) {
          Shift.insert(this, callback);
        } else {
          Shift.update(this, callback);
        }
      }
    });
  }

  setTime(v) {
    if (!this.startTime) {
      this.startTime = new Date();
    }
    let [ hour, minuteStr ] = v.split(':');
    hour = new Number(hour).valueOf();
    let minute = new Number(minuteStr.substr(0, 2)).valueOf();
    if (minuteStr.substr(2, 2) == "AM" && hour == 12) {
      hour = 0;
    } else if (minuteStr.substr(2, 2) == "PM" && hour != 12) {
      hour += 12;
    }
    this.startTime = (moment(new Date(this.startTime)).set({
      hour, minute, second: 0, millisecond: 0
    })).toDate();
  }

  static find(callback) {
    let shifts = [];
    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts ORDER BY startTime;";

      tx.executeSql(sql, [], (tx, results) => {

        _.each(results.rows, (shift) => {
          shifts.push(new Shift(shift));
        });

        callback(null, shifts);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static findOne(id, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts WHERE id = ?";

      tx.executeSql(sql, [id], (tx, results) => {

        if (!results.rows.length) callback("No results by that ID");

        callback(null, new Shift(results.rows[0]));
      }, ErrorHandler);
    }, ErrorHandler);

  }

  static insert(shift, callback) {

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
        callback && callback(null, result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static update(shift, callback) {

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

  static delete(id, callback) {
    DatabaseService.db.transaction(tx => {
      let sql = "DELETE FROM shifts WHERE id=?;";

      tx.executeSql(sql, [id], (tx, result) => {

        callback(null, result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static clockInTime(id, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts WHERE clockInTime IS NOT NULL AND clockOutTime IS NULL;";
      tx.executeSql(sql, [], (tx, results) => {
        if (results.rows.length) {
          callback("YOU ARE ALREADY CLOCKED IN FOOL!!!!!!!!!!!!!");
          return;
        }
        let sql = "UPDATE shifts SET " +
        "clockInTime=? " +
        "WHERE id=?;";
        let options = [
          new Date(),
          id];

        tx.executeSql(sql, options, (tx, results) => {
          callback(null, results);
        }, ErrorHandler);
      }, ErrorHandler);
    });

  }

  static clockOutTime(id, callback) {

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

}

try {
  window.Shift = Shift;
} catch (e) {}