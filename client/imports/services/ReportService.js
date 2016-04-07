import { DatabaseService } from './DatabaseService';
import Shift from '../models/Shift';
import ErrorHandler from './ErrorHandler';
import moment from 'moment';
import _ from 'lodash';

export default class ReportService {
  static generateReport(startDate, endDate, callback) {
    if (!startDate) {
      throw new Error("Start date is required.");
    } else if (!endDate) {
      throw new Error("End date is required.");
    }

    Shift.find((err, shifts) => {
      let filtered = _.filter(shifts, shift => {
        let day = moment(new Date(shift.startTime));
        return day.isBetween(startDate, endDate) && (shift.clockInTime && shift.clockOutTime);
      });

      Promise.all(
        _.map(filtered, f => f.getTotalsPromise())
      ).then((results) => {
        callback(null, results);
      }).catch(function() {
        console.error('An error occured in the promise chain:');
        console.log(arguments);
      });
    });
  }
}