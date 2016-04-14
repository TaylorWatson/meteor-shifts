import _ from 'lodash';
import moment from 'moment';
import ErrorHandler from '../services/ErrorHandler';
import Setting from './Setting';
import { DatabaseService } from '../services/DatabaseService';
import { DEBIT } from '../enum/paymentOptions';

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

  setClockInTime(v) {
    if (!this.clockInTime) {
      this.clockInTime = new Date();
    }
    let [ hour, minuteStr ] = v.split(':');
    hour = Number(hour);
    let minute = Number(minuteStr.substr(0, 2));
    if (minuteStr.substr(2, 2) == "AM" && hour == 12) {
      hour = 0;
    } else if (minuteStr.substr(2, 2) == "PM" && hour != 12) {
      hour += 12;
    }
    this.clockInTime = (moment(new Date(this.clockInTime)).set({
      hour, minute, second: 0, millisecond: 0
    })).toDate();
  }

  setSettings(setting) {
    this.hourlyRate = setting.hourlyRate;
    this.outBonus = setting.outBonus;
    this.debitFee = setting.debitFee;
    this.unitBonus = setting.unitBonus;
  }

  getHoursWorked() {
    if (!this.clockInTime) {
      throw new Error("Shift is not in process.");
    }

    let start = moment(new Date(this.clockInTime));
    let end;
    if (!this.clockOutTime) {
      end = moment(new Date());
    } else {
      end = moment(new Date(this.clockOutTime));
    }

    let duration = moment.duration(end.diff(start));
    let hours = duration.asHours();

    return hours;
  }

  getTotalsPromise() {
    return new Promise((resolve, reject) => {
      Delivery.deliveryList(this.id, (err, deliveries) => {
        if (err) {
          reject(err);
        } else {
          let hoursWorked = this.getHoursWorked();
          console.log('Hours worked: ' + hoursWorked);
          let hourlyIncomeEarned = hoursWorked * (this.hourlyRate || 1);

          let numberOfDeliveries = deliveries.length;
          let deliveryBonusIncome = numberOfDeliveries * this.unitBonus;
          let numberOfOuts = _.filter(deliveries, { isOut: true }).length;
          let outBonusIncome = numberOfOuts * this.outBonus;

          let totalTips = _.sumBy(deliveries, 'tipAmount');
          let numberOfStiffs = _.filter(deliveries, { tipAmount: 0 }).length;

          let numberOfDebitFees = _.filter(deliveries, { paymentType: DEBIT }).length;
          let debitFeeDeductions = numberOfDebitFees * this.debitFee;

          let grandTotalIncome = (
              hourlyIncomeEarned
            + deliveryBonusIncome
            + outBonusIncome
            + totalTips
            - debitFeeDeductions
          );

          let calculatedHourly = grandTotalIncome / hoursWorked;

          resolve({
            shift: this,
            deliveries,
            hoursWorked,
            hourlyIncomeEarned,
            numberOfDeliveries,
            totalTips,
            deliveryBonusIncome,
            numberOfOuts,
            outBonusIncome,
            numberOfDebitFees,
            debitFeeDeductions,
            grandTotalIncome,
            numberOfStiffs,
            calculatedHourly
          });
        }
      });
    });
  }

  static find(callback) {
    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts ORDER BY startTime;";

      tx.executeSql(sql, [], (tx, results) => {

        console.log('Got shift results: ', results);


        let shifts = _.map(_.range(results.rows.length), i => new Shift(results.rows.item(i)));

        console.log('Shifts: ', shifts);

        callback(null, shifts);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static findUpcoming(callback) {
    Shift.find((err, shifts) => {
      shifts = _.filter(shifts, (s) => {
        let nowMinusSix = moment(new Date()).add({ hours: -6 });
        let shiftTime = moment(new Date(s.startTime));
        
        if (shiftTime.isBefore(nowMinusSix)) return false;
        if (s.clockInTime && s.clockOutTime) return false;
        return true;
      });

      callback(null, shifts);
    });
  }

  static findOne(id, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts WHERE id = ?";

      tx.executeSql(sql, [id], (tx, results) => {

        if (!results.rows.length) callback("No results by that ID");

        callback(null, new Shift(results.rows.item(0)));
      }, ErrorHandler);
    }, ErrorHandler);

  }

  static insert(shift, callback) {

    let fields = [
      'title', 'location',
      'startTime', 'endTime',
      'clockInTime', 'clockOutTime',
      'hourlyRate', 'outBonus', 'debitFee',
      'unitBonus'
    ];

    let values = [];
    let options = [];

    _.each(fields, field => {
      values.push('?');
      options.push(shift[field]);
    });

    DatabaseService.db.transaction(tx => {
      let sql = "INSERT INTO shifts" +
      `(${ fields.join(', ') })` +
      `VALUES (${ values.join(',') })`;

      console.log('Inserting: ', sql);

      tx.executeSql(sql, options, (tx, result) => {
        console.log('Write success: ', result);
        callback && callback(null, result);
      }, ErrorHandler);
    }, ErrorHandler);
  }

  static update(shift, callback) {

    let fields = [
      'title', 'location', 'startTime',
      'endTime', 'clockInTime', 'clockOutTime',
      'hourlyRate', 'outBonus', 'debitFee', 'unitBonus'
    ];

    let set = [];
    let options = [];

    _.each(fields, field => {
      set.push(`${field}=?`);
      options.push(shift[field]);
    });

    options.push(shift.id);

    DatabaseService.db.transaction(tx => {
      let sql = "UPDATE shifts SET " +
      `${ set.join(', ') } ` +
      "WHERE id=?";

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

    Setting.find((err, setting) => {

      DatabaseService.db.transaction(tx => {
        let sql = "SELECT * FROM shifts WHERE clockInTime IS NOT NULL AND clockOutTime IS NULL;";
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length) {
            callback("YOU ARE ALREADY CLOCKED IN FOOL!!!!!!!!!!!!!");
            return;
          }
          let sql = "UPDATE shifts SET " +
          "clockInTime=?," +
          "hourlyRate=?," +
          "outBonus=?," +
          "debitFee=?," +
          "unitBonus=? " +
          "WHERE id=?;";
          let options = [
            new Date(),
            setting.hourlyRate,
            setting.outBonus,
            setting.debitFee,
            setting.unitBonus,
            id];

          tx.executeSql(sql, options, (tx, results) => {
            callback(null, results);
          }, ErrorHandler);
        }, ErrorHandler);
      });

    });

  }

  static clockOutTime(id, callback) {

    DatabaseService.db.transaction(tx => {
      let sql = "SELECT * FROM shifts WHERE clockInTime IS NOT NULL AND clockOutTime IS NULL;";
      tx.executeSql(sql, [], (tx, result) => {
        // console.log(result);
        // if (result.rows.length !== 1) {
        //   callback("You need to clock in to clock out.");
        //   return;
        // }

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