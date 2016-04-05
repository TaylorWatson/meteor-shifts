import Shift from '../client/imports/models/Shift';
import { expect } from 'chai';
import { each } from 'lodash';


describe("Shift Model", () => {
  it('should exist...', () => {
    expect( Shift ).to.exist;
  });

  it('should have static methods find, findOne, insert, update, delete, clockInTime, clockOutTime', () => {
    let methods = ['find', 'findOne', 'insert', 'update', 'delete', 'clockInTime', 'clockOutTime'];

    each(methods, (method) => {
      expect( Shift[method] ).to.exist;
    });
  });

  it('should have instance methods validate, save, and setTime', () => {
    let methods = ['validate', 'save', 'setTime'];

    each(methods, (method) => {
      expect( new Shift()[method] ).to.exist;
    });
  });

  it('setTime should create a new time if it doesn\'t exist.', () => {
    let shift = new Shift();

    expect(shift.startTime).not.to.exist;

    shift.setTime("08:30PM");

    expect( shift.startTime ).to.exist;
  });

  it('setTime should update the existing time with the new time string', () => {
    let shift = new Shift();
    shift.setTime("08:10PM");
    expect( shift.startTime.toString() ).to.contain("20:10:00");
    shift.setTime("08:10AM");
    expect( shift.startTime.toString() ).to.contain("08:10:00");
  });

  it('_new should be truthy when new', () => {
    let shift = new Shift();

    expect( shift._isNew ).to.be.truthy;
  });

  it('_new should not be truthy when instantiated from existing shift', () => {
    let shift = new Shift({ id: 2 });

    expect( shift._isNew ).not.to.be.truthy;
  });
});