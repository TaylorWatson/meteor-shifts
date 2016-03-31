import moment from 'moment';

class Shift {
  constructor(shift) {
    if (shift) {
      this.id = shift.id;
      this.title = shift.title || '';
      this.location = shift.location || '';
      this.startTime = shift.startTime || new Date();
      this.endTime = shift.endTime || new Date();
      this.clockInTime = shift.clockInTime || new Date();
      this.clockOutTime = shift.clockOutTime || new Date();
      this.job = shift.job;
    } else {
      this.startTime = new Date();
      this.endTime = new Date();
    }
  }

  validate(callback) {
    this.errors = []; // -> clear errors array
    if (!this.title) {
      this.errors.push({ title: "Title is required." });
    }
    if ( moment(this.endTime).isBefore(moment(this.startTime)) ) {
      this.errors.push({ startTime: "Start time is later than end time." });
    }
    callback && callback(this.errors.length ? this.errors : null);
    if (this.errors.length) {
      return this.errors;
    } else {
      return;
    }
  }
}

export { Shift }