import moment from 'moment';

export const SampleShifts = [{
  title: "Test 1",
  startTime: new Date(),
  clockInTime: (moment(new Date()).add({ days: -1 })).toDate(),
  clockOutTime: (moment(new Date()).add({ days: -1, hours: 3 })).toDate(),
  hourlyRate: 7,
  outBonus: 1.1,
  debitFee: 1.5,
  unitBonus: 1
}, {
  title: "Test 2",
  startTime: new Date(),
  clockInTime: (moment(new Date())).toDate(),
  clockOutTime: (moment(new Date()).add({ hours: 4 })).toDate(),
  hourlyRate: 7,
  outBonus: 1.1,
  debitFee: 1.5,
  unitBonus: 1
}, {
  title: "Test 3",
  startTime: new Date(),
  clockInTime: (moment(new Date()).add({ days: 1 })).toDate(),
  clockOutTime: (moment(new Date()).set({ days: 1, hours: 5 })).toDate(),
  hourlyRate: 7,
  outBonus: 1.1,
  debitFee: 1.5,
  unitBonus: 1
}];

export const SampleDeliveries = [{
  shiftId: 1,
  deliveryNumber: 100,
  tipAmount: 2.50,
  paymentType: 1
}, {
  shiftId: 1,
  deliveryNumber: 101,
  tipAmount: 3.50,
  paymentType: 1
}, {
  shiftId: 1,
  deliveryNumber: 102,
  tipAmount: 4.50,
  paymentType: 1
}, {
  shiftId: 2,
  deliveryNumber: 100,
  tipAmount: 5.50,
  paymentType: 1
}, {
  shiftId: 2,
  deliveryNumber: 102,
  tipAmount: 7,
  paymentType: 1
}, {
  shiftId: 3,
  deliveryNumber: 105,
  tipAmount: 10,
  paymentType: 1
}];