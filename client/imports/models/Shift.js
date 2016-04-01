import _ from 'lodash';
import moment from 'moment';
import Shifts from '../../../lib/imports/collections/Shifts';

export default class Shift {
  constructor(shift) {
    if (!shift || !shift._id) {
      this._isNew = true;
    } else {
      this._isNew = false;
    }

    _.extend(this, shift || {});
    this.errors = [];
  }

  validate() {
    this.errors.length = 0;

    if (!this.title) {
      this.errors.push({ title: "Title is required." });
    }

    if (moment(this.endTime).isBefore(moment(this.startTime))) {
      this.errors.push({ startTime: "Start time is later than end time." });
    }
    
    return !this.errors.length;
  }

  save() {
    let filteredObj = {};
    let ignored = ['save', 'validate', '_isNew', 'errors'];

    _.map(_.keys(this), (key) => {
      console.log(key);

      if (!_.intersection(ignored, [key]).length) {
        filteredObj[key] = this[key];
      }
    });

    console.log(filteredObj);
    if (this._isNew) {
      return Shifts.insert(filteredObj);
    } else {
      return Shifts.update(this._id, { $set: filteredObj });
    }
  }
}